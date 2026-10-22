// GL-238: cotygodniowe zestawienie skanów ze Skanera gotowości AI (geolead.pl/narzedzia/skaner-ai/).
// Osobny Cloudflare Worker z Cron Trigger (Pages Functions nie mają harmonogramu).
//
// Wymagane w ustawieniach Workera (Settings → Bindings / Variables and Secrets):
//   DB              binding D1 do tej samej bazy co Pages (geolead-scans)
//   RESEND_API_KEY  secret, klucz API z resend.com (wpisuje właściciel konta)
//   REPORT_TO       zmienna tekstowa, adres odbiorcy zestawienia
//   REPORT_FROM     opcjonalnie, nadawca; domyślnie onboarding@resend.dev
//                   (adres testowy Resend wysyła tylko na adres właściciela konta Resend)
// Cron Trigger: 0 6 * * 1  (poniedziałek 06:00 UTC = 7:00 zimą / 8:00 latem w Polsce)

const DAYS = 7;
const RETENTION_DAYS = 365;
const TZ = 'Europe/Warsaw';

function fmtDate(iso) {
  return new Intl.DateTimeFormat('pl-PL', {
    timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  }).format(new Date(iso));
}

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

const STATUS_PL = { ok: 'wynik', cached: 'wynik (z pamięci)', unreachable: 'strona niedostępna', error: 'błąd skanera' };

async function buildReport(env, now) {
  const since = new Date(now.getTime() - DAYS * 86400000).toISOString();
  const { results } = await env.DB.prepare(
    'SELECT url, scanned_at, status, score FROM scans WHERE scanned_at >= ?1 ORDER BY scanned_at DESC'
  ).bind(since).all();
  const rows = results || [];
  const unique = new Set(rows.map((r) => r.url)).size;
  const period = `${fmtDate(since).slice(0, 10)} - ${fmtDate(now.toISOString()).slice(0, 10)}`;

  const text = [
    `Skaner gotowości AI: zestawienie skanów, ${period}`,
    `Skanów: ${rows.length}, unikalnych adresów: ${unique}`,
    '',
    'Adres | Data wprowadzenia | Status | Wynik',
    ...rows.map((r) => `${r.url} | ${fmtDate(r.scanned_at)} | ${STATUS_PL[r.status] || r.status} | ${r.score ?? '-'}`)
  ].join('\n');

  const tableRows = rows.map((r) => `<tr>
<td style="padding:4px 8px;border:1px solid #ccc"><a href="${esc(r.url)}">${esc(r.url)}</a></td>
<td style="padding:4px 8px;border:1px solid #ccc;white-space:nowrap">${esc(fmtDate(r.scanned_at))}</td>
<td style="padding:4px 8px;border:1px solid #ccc">${esc(STATUS_PL[r.status] || r.status)}</td>
<td style="padding:4px 8px;border:1px solid #ccc;text-align:right">${esc(r.score ?? '-')}</td></tr>`).join('\n');

  const html = `<div style="font-family:Arial,sans-serif;font-size:14px">
<p><strong>Skaner gotowości AI: zestawienie skanów, ${esc(period)}</strong><br>
Skanów: ${rows.length}, unikalnych adresów: ${unique}</p>
${rows.length ? `<table style="border-collapse:collapse">
<tr style="background:#eee"><th style="padding:4px 8px;border:1px solid #ccc;text-align:left">Adres</th>
<th style="padding:4px 8px;border:1px solid #ccc;text-align:left">Data wprowadzenia</th>
<th style="padding:4px 8px;border:1px solid #ccc;text-align:left">Status</th>
<th style="padding:4px 8px;border:1px solid #ccc">Wynik</th></tr>
${tableRows}
</table>` : '<p>W tym tygodniu nie było skanów.</p>'}
<p style="color:#777;font-size:12px">Godziny w czasie polskim. Wpisy starsze niż ${RETENTION_DAYS} dni są usuwane automatycznie.</p></div>`;

  return { subject: `Skaner AI: zestawienie ${period}, liczba skanów: ${rows.length}`, text, html };
}

async function sendEmail(env, report) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.REPORT_FROM || 'GeoLead Skaner <onboarding@resend.dev>',
      to: [env.REPORT_TO],
      subject: report.subject,
      text: report.text,
      html: report.html
    })
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function purgeOld(env, now) {
  const cutoff = new Date(now.getTime() - RETENTION_DAYS * 86400000).toISOString();
  await env.DB.prepare('DELETE FROM scans WHERE scanned_at < ?1').bind(cutoff).run();
}

export default {
  async scheduled(_event, env, ctx) {
    const now = new Date();
    const report = await buildReport(env, now);
    await sendEmail(env, report);
    ctx.waitUntil(purgeOld(env, now));
  },
  async fetch() {
    return new Response('Not found', { status: 404 });
  }
};
