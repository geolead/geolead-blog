# GL-238: rejestr skanów i cotygodniowy mail

## Co robi
1. `functions/api/scan.js` zapisuje każdy poprawny skan do Cloudflare D1: adres (origin), data UTC, status, wynik. Bez IP.
   Gdy binding `DB` nie jest ustawiony, skaner działa jak dotąd i nic nie zapisuje.
2. Worker `workers/scan-report/worker.js` w każdy poniedziałek o 06:00 UTC wysyła mail z tabelą skanów z ostatnich 7 dni
   (adres, data wprowadzenia w czasie polskim, status, wynik) i usuwa wpisy starsze niż 365 dni.

Ten folder NIE jest budowany przez Astro ani Pages. Worker wdraża się osobno w panelu Cloudflare (kroki 4-6).

## Konfiguracja (jednorazowo, panel Cloudflare: dash.cloudflare.com)

1. **Baza D1:** Storage & Databases → D1 → Create → nazwa `geolead-scans`.
2. **Tabela:** w bazie zakładka Console → wklej całą zawartość `schema.sql` → Execute.
3. **Binding dla strony:** Workers & Pages → projekt strony geolead.pl (Pages) → Settings → Bindings → Add → D1 database →
   Variable name `DB`, baza `geolead-scans`. Dla środowiska Production. Potem push GL-238 (albo Retry deployment),
   bo binding działa od kolejnego wdrożenia.
4. **Konto Resend:** resend.com → załóż konto na adres, na który ma przychodzić zestawienie → API Keys → Create (uprawnienie Sending).
   Klucz zakłada i wpisuje PJ. Przy nadawcy `onboarding@resend.dev` Resend wysyła wyłącznie na adres właściciela konta, bez konfiguracji DNS.
5. **Worker:** Workers & Pages → Create → Worker → nazwa `geolead-scan-report` → Deploy → Edit code → wklej całą zawartość `worker.js` → Deploy.
   Settings → Bindings → Add → D1 database → `DB` → `geolead-scans`.
   Settings → Variables and Secrets → `REPORT_TO` (Text) = adres odbiorcy; `RESEND_API_KEY` (Secret) = klucz z kroku 4.
6. **Harmonogram:** Worker → Settings → Trigger Events → Add → Cron Trigger → `0 6 * * 1`.

## Test
- Zrób skan na geolead.pl/narzedzia/skaner-ai/, potem w D1 Console: `SELECT * FROM scans ORDER BY id DESC LIMIT 5;`
- Wysyłkę testową można wywołać z poziomu edytora Workera (Schedule / test scheduled event) albo poczekać do poniedziałku.

## Dane osobowe
Polityka prywatności zaktualizowana w tej samej paczce (rejestr skanów, Resend jako odbiorca, retencja 12 miesięcy).
