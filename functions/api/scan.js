/**
 * Skaner gotowości AI — Cloudflare Pages Function, bez bindingów i pakietów npm.
 * Endpoint: POST /api/scan, JSON { "url": "example.com" }.
 */

const AGENT = 'GeoLeadScanner/1.0 (+https://geolead.pl/narzedzia/skaner-ai/)';
const MAX_BYTES = 2 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 8000;
const MAX_REDIRECTS = 3;
const CACHE_TTL_SECONDS = 3600;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const CACHE_NAMESPACE = 'https://geolead.pl/__scanner_internal__/';

const BOTS = [
  { bot: 'GPTBot', company: 'OpenAI' },
  { bot: 'OAI-SearchBot', company: 'OpenAI' },
  { bot: 'ChatGPT-User', company: 'OpenAI' },
  { bot: 'ClaudeBot', company: 'Anthropic' },
  { bot: 'PerplexityBot', company: 'Perplexity' },
  { bot: 'Google-Extended', company: 'Google' },
  { bot: 'Bingbot', company: 'Microsoft' }
];

const ORG_TYPES = new Set([
  'Organization', 'LocalBusiness', 'ProfessionalService', 'Corporation',
  'Airline', 'AnimalShelter', 'AutomotiveBusiness', 'AutoBodyShop', 'AutoDealer',
  'AutoPartsStore', 'AutoRental', 'AutoRepair', 'AutoWash', 'BikeStore', 'BookStore',
  'ChildCare', 'ClothingStore', 'CollegeOrUniversity', 'ComputerStore',
  'ConvenienceStore', 'Corporation', 'Dentist', 'DryCleaningOrLaundry',
  'EducationalOrganization', 'Electrician', 'ElectronicsStore', 'EmploymentAgency',
  'EntertainmentBusiness', 'FinancialService', 'FoodEstablishment', 'FurnitureStore',
  'GeneralContractor', 'GovernmentOrganization', 'GroceryStore', 'HardwareStore',
  'HealthAndBeautyBusiness', 'HomeAndConstructionBusiness', 'Hospital', 'Hostel',
  'Hotel', 'HVACBusiness', 'InsuranceAgency', 'InternetCafe', 'LegalService',
  'Library', 'LodgingBusiness', 'MedicalBusiness', 'MobilePhoneStore', 'Motel',
  'MovingCompany', 'NGO', 'Notary', 'Optician',
  'PerformingGroup', 'Pharmacy', 'Physician', 'Plumber', 'ProfessionalService',
  'RadioStation', 'RealEstateAgent', 'Restaurant', 'RoofingContractor',
  'School', 'ShoppingCenter', 'SportsOrganization', 'Store', 'TattooParlor',
  'TelevisionStation', 'TouristInformationCenter', 'TravelAgency', 'WholesaleStore',
  'AccountingService', 'AmusementPark', 'ArtGallery', 'Attorney', 'Bakery',
  'BankOrCreditUnion', 'BarOrPub', 'BeautySalon', 'BedAndBreakfast', 'BowlingAlley',
  'Brewery', 'CafeOrCoffeeShop', 'Campground', 'Casino', 'Cemetery',
  'ComedyClub', 'DanceGroup', 'DaySpa', 'DepartmentStore', 'DiagnosticLab',
  'Distillery', 'EmergencyService', 'ExerciseGym', 'FastFoodRestaurant',
  'FireStation', 'Florist', 'FuneralHome', 'GardenStore', 'GasStation',
  'GovernmentOffice', 'HairSalon', 'HealthClub', 'HobbyShop', 'HomeGoodsStore',
  'IceCreamShop', 'JewelryStore', 'MedicalClinic', 'MovieTheater', 'MusicGroup',
  'MusicStore', 'NailSalon', 'NightClub', 'OfficeEquipmentStore', 'PawnShop',
  'PetStore', 'PoliceStation', 'PostOffice', 'ShoeStore', 'SkiResort',
  'SportsClub', 'SportsTeam', 'TaxiService', 'TireShop', 'ToyStore', 'VeterinaryCare'
]);

class ScanIssue extends Error {
  constructor(code) {
    super(code);
    this.code = code;
  }
}

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'Access-Control-Allow-Origin': 'https://geolead.pl',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

function jsonResponse(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...HEADERS, ...extra } });
}

function codeOf(error) {
  if (error instanceof ScanIssue) return error.code;
  if (error && error.name === 'AbortError') return 'timeout';
  return 'fetch_failed';
}

// Ochrona SSRF: normalizujemy przez URL (wyłapuje też nietypowe zapisy IPv4).
// Weryfikacja dotyczy KAŻDEGO URL, także każdego celu przekierowania.
function allowedUrl(value) {
  let url;
  try { url = value instanceof URL ? new URL(value.href) : new URL(value); }
  catch (_) { throw new ScanIssue('invalid_url'); }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') throw new ScanIssue('invalid_url');
  if (url.username || url.password || url.port) throw new ScanIssue('invalid_url');
  const hostname = url.hostname.toLowerCase().replace(/\.+$/, '');
  if (!hostname || !hostname.includes('.') || hostname.includes('..')) throw new ScanIssue('invalid_url');
  if (hostname === 'localhost' || hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') || hostname.endsWith('.internal')) {
    throw new ScanIssue('invalid_url');
  }
  // URL.hostname dla IPv6 zawiera dwukropek/nawiasy; IPv4 jest kanonizowane do cyfr i kropek.
  if (hostname.includes(':') || hostname.includes('[') || /^\d+(?:\.\d+)+$/.test(hostname)) {
    throw new ScanIssue('invalid_url');
  }
  // Odrzucamy hosty o wadliwej składni; dozwolone pozostają domeny IDN (punycode).
  if (!hostname.split('.').every((part) => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(part))) {
    throw new ScanIssue('invalid_url');
  }
  url.hostname = hostname;
  return url;
}

function normalizeInput(value) {
  if (typeof value !== 'string') throw new ScanIssue('invalid_url');
  const raw = value.trim();
  if (!raw || raw.length > 2048 || /[\x00-\x1f\x7f\\]/.test(raw) || raw.startsWith('//')) {
    throw new ScanIssue('invalid_url');
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw) && !/^https?:\/\//i.test(raw)) {
    throw new ScanIssue('invalid_url');
  }
  const full = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  const parsed = allowedUrl(full);
  return parsed.origin; // Ścieżki, query i fragmenty wejściowe nie są skanowane.
}

async function readLimitedStream(stream, maxBytes) {
  if (!stream) return '';
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let size = 0;
  let output = '';
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => {});
        throw new ScanIssue('response_too_large');
      }
      output += decoder.decode(part.value, { stream: true });
    }
    return output + decoder.decode();
  } finally {
    reader.releaseLock();
  }
}

// Każdy hop ma osobne 8 s i limit 2 MB; fetch nie śledzi przekierowań automatycznie.
async function fetchLimited(target, accept = 'text/html, text/plain, application/xml, application/json;q=0.9, */*;q=0.1') {
  let current = allowedUrl(target);
  let redirects = 0;
  const started = performance.now();

  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(current.href, {
        method: 'GET',
        redirect: 'manual',
        headers: { 'User-Agent': AGENT, 'Accept': accept },
        signal: controller.signal
      });
      const location = response.headers.get('Location');
      if ([301, 302, 303, 307, 308].includes(response.status) && location) {
        if (redirects >= MAX_REDIRECTS) {
          await response.body?.cancel().catch(() => {});
          throw new ScanIssue('too_many_redirects');
        }
        let next;
        try { next = new URL(location, current); }
        catch (_) { throw new ScanIssue('invalid_redirect'); }
        try { current = allowedUrl(next); }
        catch (_) { throw new ScanIssue('invalid_redirect'); }
        redirects++;
        await response.body?.cancel().catch(() => {});
        continue;
      }
      const declaredLength = Number(response.headers.get('Content-Length'));
      if (Number.isFinite(declaredLength) && declaredLength > MAX_BYTES) {
        await response.body?.cancel().catch(() => {});
        throw new ScanIssue('response_too_large');
      }
      const body = await readLimitedStream(response.body, MAX_BYTES);
      return {
        body,
        statusCode: response.status,
        finalUrl: current.href,
        contentType: response.headers.get('Content-Type') || '',
        redirects,
        ms: Math.round(performance.now() - started)
      };
    } catch (error) {
      if (error instanceof ScanIssue) throw error;
      if (controller.signal.aborted || error?.name === 'AbortError') throw new ScanIssue('timeout');
      throw new ScanIssue('fetch_failed');
    } finally {
      clearTimeout(timer);
    }
  }
}

function check(id, max, points, details, status) {
  // Punkty są deterministyczne; status nie zmienia przyznanych punktów.
  const score = Math.max(0, Math.min(max, Number(points.toFixed(2))));
  return { id, status: status || (score === max ? 'ok' : score ? 'warn' : 'fail'), points: score, max, details };
}

function failureCheck(id, max, error) {
  return check(id, max, 0, { error: codeOf(error) }, 'fail');
}

function availabilityCheck(home) {
  const points = (home.finalUrl.startsWith('https://') ? 5 : 0) +
    (home.statusCode === 200 ? 3 : 0) + (home.ms < 2000 ? 2 : 0);
  return check('availability', 10, points, {
    finalUrl: home.finalUrl,
    statusCode: home.statusCode,
    ms: home.ms,
    redirects: home.redirects
  }, home.statusCode !== 200 ? 'fail' : undefined);
}

function parseRobots(source) {
  const groups = [];
  const sitemaps = [];
  let group = null;
  for (const original of source.replace(/^\uFEFF/, '').split(/\r?\n/)) {
    const line = original.replace(/#.*$/, '').trim();
    // Pusta linia rozdziela grupy; linia zawierająca tylko komentarz nie.
    if (!line) { if (!original.trim()) group = null; continue; }
    const pos = line.indexOf(':');
    if (pos < 0) continue;
    const name = line.slice(0, pos).trim().toLowerCase();
    const value = line.slice(pos + 1).trim();
    if (name === 'sitemap') {
      if (value && sitemaps.length < 20) sitemaps.push(value);
      continue;
    }
    if (name === 'user-agent') {
      // Kolejne User-agent bez reguł tworzą jedną grupę botów.
      if (!group || group.rules.length) {
        group = { agents: [], rules: [] };
        groups.push(group);
      }
      if (value) group.agents.push(value.toLowerCase());
    } else if ((name === 'allow' || name === 'disallow') && group) {
      group.rules.push({ type: name, path: value });
    }
  }
  return { groups, sitemaps: [...new Set(sitemaps)] };
}

function robotsRuleMatch(pattern, path) {
  if (!pattern) return false; // Disallow: (puste) nie blokuje.
  const anchored = pattern.endsWith('$');
  const core = anchored ? pattern.slice(0, -1) : pattern;
  const regex = '^' + core.split('*').map((part) => part.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')).join('.*') + (anchored ? '$' : '');
  try { return new RegExp(regex).test(path); }
  catch (_) { return false; }
}

function botAllowed(groups, bot, path = '/') {
  const token = bot.toLowerCase();
  // Reguły bardziej konkretnego User-agent mają pierwszeństwo przed '*'.
  const selected = groups.some((g) => g.agents.includes(token))
    ? groups.filter((g) => g.agents.includes(token))
    : groups.filter((g) => g.agents.includes('*'));
  let longest = -1;
  let winner = 'allow';
  for (const group of selected) {
    for (const rule of group.rules) {
      if (!robotsRuleMatch(rule.path, path)) continue;
      const length = rule.path.replace(/[\*$]/g, '').length;
      // Przy tej samej długości Allow wygrywa nad Disallow.
      if (length > longest || (length === longest && rule.type === 'allow')) {
        longest = length;
        winner = rule.type;
      }
    }
  }
  return winner !== 'disallow';
}

async function robotsCheck(origin) {
  const response = await fetchLimited(`${origin}/robots.txt`, 'text/plain, */*;q=0.1');
  if (response.statusCode === 404 || response.statusCode === 410) {
    return {
      check: check('robots', 20, 20, {
        robotsExists: false, bots: BOTS.map((bot) => ({ ...bot, allowed: true })),
        sitemaps: [], statusCode: response.statusCode
      }, 'warn'),
      sitemaps: []
    };
  }
  if (response.statusCode !== 200) throw new ScanIssue('robots_unavailable');
  const parsed = parseRobots(response.body);
  const bots = BOTS.map((bot) => ({ ...bot, allowed: botAllowed(parsed.groups, bot.bot) }));
  const permitted = bots.filter((bot) => bot.allowed).length;
  return {
    check: check('robots', 20, 20 * permitted / BOTS.length, {
      robotsExists: true, bots, sitemaps: parsed.sitemaps, statusCode: response.statusCode
    }, permitted === BOTS.length ? 'ok' : permitted ? 'warn' : 'fail'),
    sitemaps: parsed.sitemaps
  };
}

function decodeEntities(value) {
  const replacements = { amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', ndash: '–', mdash: '—', hellip: '…' };
  return String(value || '').replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (full, name) => {
    if (name.startsWith('#')) {
      const hex = name[1]?.toLowerCase() === 'x';
      const number = parseInt(name.slice(hex ? 2 : 1), hex ? 16 : 10);
      return Number.isFinite(number) && number > 0 && number <= 0x10ffff && !(number >= 0xd800 && number <= 0xdfff)
        ? String.fromCodePoint(number) : full;
    }
    return replacements[name.toLowerCase()] ?? full;
  });
}

function cleanText(markup) {
  return decodeEntities(markup.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')).trim();
}

function stripHiddenHtml(html) {
  let value = html.replace(/<!--[\s\S]*?-->/g, ' ');
  for (const tag of ['script', 'style', 'noscript', 'svg', 'template']) {
    value = value.replace(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}\\s*>`, 'gi'), ' ');
  }
  return value;
}

function visibleTextCheck(html) {
  const body = html.match(/<body\b[^>]*>([\s\S]*?)<\/body\s*>/i)?.[1] || '';
  const visible = stripHiddenHtml(body);
  const words = cleanText(visible).match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu) || [];
  const wordCount = words.length;
  const h1 = visible.match(/<h1\b[^>]*>([\s\S]*?)<\/h1\s*>/i);
  const h2Count = (visible.match(/<h2\b[^>]*>/gi) || []).length;
  const points = wordCount >= 300 ? 15 : wordCount >= 100 ? 8 : 0;
  return check('visible_text', 15, points, {
    wordCount, h1: h1 ? cleanText(h1[1]) : '', h2Count,
    message: wordCount < 100 ? 'strona może wyglądać na pustą dla botów AI' : null,
    messageCode: wordCount < 100 ? 'low_text_without_js' : null
  }, wordCount < 100 ? 'fail' : wordCount < 300 ? 'warn' : 'ok');
}

function getAttributes(tag) {
  const attrs = {};
  const source = tag.replace(/^<\/?[\w:-]+\b/i, '').replace(/\/?\s*>$/, '');
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let result;
  while ((result = pattern.exec(source)) !== null) {
    attrs[result[1].toLowerCase()] = decodeEntities(result[2] ?? result[3] ?? result[4] ?? '');
  }
  return attrs;
}

function extractHead(html) {
  return html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1] || '';
}

function metaAnalysis(html) {
  const head = extractHead(html);
  const title = cleanText(head.match(/<title\b[^>]*>([\s\S]*?)<\/title\s*>/i)?.[1] || '');
  const metas = [...head.matchAll(/<meta\b[^>]*>/gi)].map((m) => getAttributes(m[0]));
  const links = [...head.matchAll(/<link\b[^>]*>/gi)].map((m) => getAttributes(m[0]));
  const meta = (attribute, key) => metas.find((m) => (m[attribute] || '').toLowerCase() === key)?.content || '';
  const description = meta('name', 'description');
  const canonical = links.find((m) => (m.rel || '').toLowerCase().split(/\s+/).includes('canonical'))?.href || '';
  const htmlTag = html.match(/<html\b[^>]*>/i)?.[0] || '';
  const lang = getAttributes(htmlTag).lang || '';
  const ogTitle = meta('property', 'og:title');
  const ogDescription = meta('property', 'og:description');
  const hreflang = links.filter((m) => (m.rel || '').toLowerCase().split(/\s+/).includes('alternate') && m.hreflang).map((m) => m.hreflang);
  const favicon = links.some((m) => (m.rel || '').toLowerCase().split(/\s+/).some((r) => r === 'icon' || r === 'apple-touch-icon'));
  const titleLength = [...title].length;
  const descriptionLength = [...description].length;
  const points = (titleLength >= 10 && titleLength <= 70 ? 3 : 0) +
    (descriptionLength >= 50 && descriptionLength <= 170 ? 3 : 0) +
    (canonical ? 2 : 0) + (lang ? 2 : 0) +
    (ogTitle && ogDescription ? 2 : 0) + (hreflang.length ? 1 : 0) + (favicon ? 2 : 0);
  return {
    check: check('meta', 15, points, {
      title, description, canonical, lang, ogTitle, ogDescription,
      hreflang, favicon, titleLength, descriptionLength
    }), title
  };
}

function schemaType(type) {
  return String(type).split(/[\/#:]/).pop();
}

function traverseSchema(node, result, depth = 0) {
  if (depth > 40 || !node || typeof node !== 'object') return;
  if (Array.isArray(node)) {
    for (const item of node) traverseSchema(item, result, depth + 1);
    return;
  }
  const types = (Array.isArray(node['@type']) ? node['@type'] : [node['@type']]).filter(Boolean).map(schemaType);
  for (const type of types) result.types.add(type);
  if (types.some(isOrganizationType)) result.organizations.push(node);
  // @graph, tablice i węzły zagnieżdżone (np. provider) mogą zawierać kolejne encje.
  for (const [key, value] of Object.entries(node)) {
    if (key !== '@context' && value && typeof value === 'object') traverseSchema(value, result, depth + 1);
  }
}

function isOrganizationType(type) {
  if (ORG_TYPES.has(type)) return true;
  // Popularne rodziny podtypów schema.org; bez pobierania ontologii z zewnątrz.
  return /(?:Business|Organization|Store|Restaurant|Cafe|Bakery|BarOrPub|Hotel|Agency|Contractor|Clinic|Service)$/.test(type) && type !== 'Service';
}

function filled(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.some(filled);
  return value != null && typeof value === 'object' && Object.keys(value).length > 0;
}

function asLinks(value) {
  return (Array.isArray(value) ? value : [value]).filter((item) => typeof item === 'string' && /^https?:\/\//i.test(item)).length;
}

function jsonLdAnalysis(html) {
  const types = new Set();
  const organizations = [];
  let invalidBlocks = 0;
  let validBlocks = 0;
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    const attrs = getAttributes('<script ' + match[1] + '>');
    if (!/^application\/ld\+json\b/i.test(attrs.type || '')) continue;
    try {
      const data = JSON.parse(match[2].trim());
      validBlocks++;
      traverseSchema(data, { types, organizations });
    } catch (_) { invalidBlocks++; }
  }
  let best = null;
  let bestFields = -1;
  for (const org of organizations) {
    const fields = ['name', 'url', 'logo'].filter((f) => filled(org[f])).length +
      (asLinks(org.sameAs) >= 2 ? 4 : 0) + (filled(org.address) || filled(org.telephone) ? 2 : 0);
    if (fields > bestFields) { bestFields = fields; best = org; }
  }
  const missingFields = [];
  if (best) {
    for (const field of ['name', 'url', 'logo']) if (!filled(best[field])) missingFields.push(field);
    if (asLinks(best.sameAs) < 2) missingFields.push('sameAs (2+)');
    if (!filled(best.address) && !filled(best.telephone)) missingFields.push('address / telephone');
  } else {
    missingFields.push('Organization / LocalBusiness');
  }
  // 5 + 8 + 3 × 1 + 4 + 2 + 3 = 25 pkt.
  const points = (validBlocks ? 5 : 0) + (best ? 8 : 0) +
    (best ? ['name', 'url', 'logo'].filter((f) => filled(best[f])).length : 0) +
    (best && asLinks(best.sameAs) >= 2 ? 4 : 0) +
    (best && (filled(best.address) || filled(best.telephone)) ? 2 : 0) +
    ([...types].some((type) => ['FAQPage', 'Service', 'Product', 'Person'].includes(type)) ? 3 : 0);
  const organizationName = best && typeof best.name === 'string' ? best.name.trim().slice(0, 120) : '';
  return {
    check: check('jsonld', 25, points, {
      types: [...types].sort().slice(0, 80), missingFields,
      invalidBlocks, validBlocks, organizationName
    }),
    organizationName
  };
}

async function llmsCheck(origin) {
  const result = await fetchLimited(`${origin}/llms.txt`, 'text/plain, */*;q=0.1');
  const found = result.statusCode === 200 &&
    (result.contentType.toLowerCase().startsWith('text/plain') || result.body.trimStart().startsWith('#'));
  return check('llms', 5, found ? 5 : 0, {
    exists: found, statusCode: result.statusCode,
    note: 'plik pomocniczy, nie gwarantuje rekomendacji'
  });
}

function sitemapCandidate(input, origin) {
  try {
    const url = allowedUrl(new URL(input, `${origin}/`));
    // Akceptujemy własny host (także wersję www i HTTP→HTTPS), nie cudze serwisy.
    const siteHost = new URL(origin).hostname.replace(/^www\./i, '');
    const mapHost = url.hostname.replace(/^www\./i, '');
    return mapHost === siteHost ? url.href : null;
  } catch (_) { return null; }
}

async function sitemapCheck(origin, robotsTask) {
  const defaults = ['/sitemap.xml', '/sitemap-index.xml', '/sitemap_index.xml'];
  const fallback = defaults.map((path) => `${origin}${path}`);
  // Start trzech typowych sitemap następuje równolegle z robots, llms i Wikidata.
  // Handler odrzucenia podpinamy od razu — nawet jeśli robots.txt odpowie wolniej.
  const defaultSettled = Promise.allSettled(fallback.map((url) => fetchLimited(url, 'application/xml, text/xml, */*;q=0.1')));
  const robots = await robotsTask.catch(() => ({ sitemaps: [] }));
  const declared = (robots.sitemaps || []).map((url) => sitemapCandidate(url, origin))
    .filter(Boolean).filter((url) => !fallback.includes(url)).slice(0, 3);
  const urls = [...fallback, ...declared];
  const declaredSettled = Promise.allSettled(declared.map((url) => fetchLimited(url, 'application/xml, text/xml, */*;q=0.1')));
  const settled = [...await defaultSettled, ...await declaredSettled];
  let found = null;
  let firstError = null;
  for (let i = 0; i < settled.length; i++) {
    const item = settled[i];
    if (item.status === 'rejected') {
      firstError ||= codeOf(item.reason);
      continue;
    }
    if (item.value.statusCode === 200 && /<(?:urlset|sitemapindex)\b/i.test(item.value.body)) {
      found = item.value.finalUrl;
      break;
    }
  }
  const details = { exists: Boolean(found), sitemapUrl: found, checked: urls.length };
  if (!found && firstError) details.error = firstError;
  return check('sitemap', 5, found ? 5 : 0, details);
}

async function wikidataCheck(name) {
  if (!name) return check('wikidata', 5, 0, { id: null, label: null, description: null, matched: false });
  const url = new URL('https://www.wikidata.org/w/api.php');
  url.search = new URLSearchParams({
    action: 'wbsearchentities', search: name.slice(0, 120), language: 'pl',
    uselang: 'pl', format: 'json', limit: '3'
  }).toString();
  const result = await fetchLimited(url.href, 'application/json');
  if (result.statusCode !== 200) throw new ScanIssue('wikidata_unavailable');
  let data;
  try { data = JSON.parse(result.body); }
  catch (_) { throw new ScanIssue('wikidata_invalid_json'); }
  const first = Array.isArray(data.search) ? data.search[0] : null;
  const found = Boolean(first && /^Q\d+$/.test(first.id || ''));
  return check('wikidata', 5, found ? 5 : 0, {
    id: found ? first.id : null,
    label: found ? first.label || null : null,
    description: found ? first.description || null : null,
    matched: found
  }, found ? 'warn' : 'fail'); // Przybliżony wynik po nazwie, nie dowód tożsamości.
}

function findFixes(checks) {
  const byId = Object.fromEntries(checks.map((item) => [item.id, item]));
  const d = (id) => byId[id]?.details || {};
  const suggestions = [];
  const add = (id, code, rank) => suggestions.push({ id, code, rank });

  if (d('availability').finalUrl?.startsWith('http://')) add('availability', 'enable_https', 110);
  else if (d('availability').statusCode !== 200) add('availability', 'homepage_not_200', 108);
  else if (d('availability').ms >= 2000) add('availability', 'improve_response_time', 53);

  if (d('robots').error) add('robots', 'robots_unavailable', 102);
  else if (d('robots').bots?.some((bot) => !bot.allowed)) {
    add('robots', d('robots').bots.some((bot) => bot.bot === 'GPTBot' && !bot.allowed)
      ? 'robots_block_gptbot' : 'robots_block_ai_bot', 105);
  }

  if (!d('jsonld').validBlocks) add('jsonld', 'jsonld_missing_org', 100);
  else if (d('jsonld').missingFields?.includes('Organization / LocalBusiness')) add('jsonld', 'jsonld_missing_org', 100);
  else if (d('jsonld').missingFields?.includes('sameAs (2+)')) add('jsonld', 'jsonld_add_sameas', 74);
  else if (d('jsonld').missingFields?.length) add('jsonld', 'jsonld_complete_fields', 72);
  else if (byId.jsonld?.points < 25) add('jsonld', 'jsonld_add_relevant_type', 56);

  if (d('visible_text').wordCount < 100) add('visible_text', 'low_text_without_js', 103);
  else if (d('visible_text').wordCount < 300) add('visible_text', 'expand_visible_text', 67);

  if (byId.meta?.points < 15) add('meta', 'meta_complete', 62);
  if (!d('sitemap').exists) add('sitemap', 'sitemap_publish', 58);
  if (!d('llms').exists) add('llms', 'llms_add_file', 24);
  if (!d('wikidata').matched) add('wikidata', 'wikidata_verify_entity', 18);

  return suggestions.sort((a, b) => b.rank - a.rank).slice(0, 3).map(({ id, code }) => ({ id, code }));
}

function grade(score) {
  return score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 50 ? 'C' : 'D';
}

async function scan(origin) {
  const started = performance.now();
  // Brak odpowiedzi/timeout/za duży dokument główny => HTTP 422; zwykłe 404 nadal skanujemy.
  const home = await fetchLimited(`${origin}/`, 'text/html, application/xhtml+xml;q=0.9, */*;q=0.1');
  const finalOrigin = allowedUrl(home.finalUrl).origin;
  const availability = availabilityCheck(home);
  const jsonld = (() => {
    try { return jsonLdAnalysis(home.body); }
    catch (error) { return { check: failureCheck('jsonld', 25, error), organizationName: '' }; }
  })();
  const visible = (() => {
    try { return visibleTextCheck(home.body); }
    catch (error) { return failureCheck('visible_text', 15, error); }
  })();
  const metadata = (() => {
    try { return metaAnalysis(home.body); }
    catch (error) { return { check: failureCheck('meta', 15, error), title: '' }; }
  })();
  const name = jsonld.organizationName || metadata.title.split(/\s*[|–—]\s*/)[0].trim().slice(0, 120);

  // Promise.allSettled zapewnia izolację awarii każdego z 4 pobrań pomocniczych.
  const robotsTask = robotsCheck(finalOrigin);
  const tasks = [robotsTask, llmsCheck(finalOrigin), sitemapCheck(finalOrigin, robotsTask), wikidataCheck(name)];
  const settled = await Promise.allSettled(tasks);
  const unpack = (index, id, max) => settled[index].status === 'fulfilled'
    ? (id === 'robots' ? settled[index].value.check : settled[index].value)
    : failureCheck(id, max, settled[index].reason);
  const checks = [
    availability,
    unpack(0, 'robots', 20),
    jsonld.check,
    visible,
    metadata.check,
    unpack(1, 'llms', 5),
    unpack(2, 'sitemap', 5),
    unpack(3, 'wikidata', 5)
  ];
  // Sumowanie po wartościach bez zaokrąglania do liczb całkowitych.
  const score = Number(checks.reduce((total, item) => total + item.points, 0).toFixed(2));
  return {
    ok: true, url: origin, finalUrl: home.finalUrl, scannedAt: new Date().toISOString(),
    score, grade: grade(score), checks, topFixes: findFixes(checks),
    durationMs: Math.round(performance.now() - started)
  };
}

function resultKey(origin) {
  const url = new URL('report', CACHE_NAMESPACE);
  url.searchParams.set('origin', origin);
  return new Request(url.href, { method: 'GET' });
}

async function hashIp(ip) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hitRateLimit(cache, request) {
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip || !cache) return false;
  const ipHash = await hashIp(ip);
  const key = new Request(new URL(`rate/${ipHash}`, CACHE_NAMESPACE).href);
  const now = Date.now();
  const previous = await cache.match(key);
  let hits = [];
  if (previous) {
    try {
      const times = await previous.json();
      if (Array.isArray(times)) hits = times.filter((time) => Number.isFinite(time) && time > now - RATE_WINDOW_MS && time <= now);
    } catch (_) { /* Stary/uszkodzony wpis cache nie blokuje skanowania. */ }
  }
  if (hits.length >= RATE_MAX) return true;
  hits.push(now);
  // Best effort: caches.default jest per POP i operacje match/put nie są atomowe;
  // równoczesne zapytania mogą przekroczyć próg, a cache może zostać wyczyszczony.
  await cache.put(key, new Response(JSON.stringify(hits), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=60' }
  }));
  return false;
}

export async function onRequestPost({ request }) {
  const cache = typeof caches !== 'undefined' ? caches.default : null;
  try {
    // Rate limit obowiązuje również odpowiedzi zwracane z cache wyników.
    try { if (await hitRateLimit(cache, request)) return jsonResponse({ ok: false, error: 'rate_limited' }, 429); }
    catch (_) { /* Cache może być niedostępny w lokalnym podglądzie. */ }

    let input;
    try {
      const declared = Number(request.headers.get('Content-Length'));
      if (declared > 4096) throw new ScanIssue('invalid_url');
      input = JSON.parse(await readLimitedStream(request.body, 4096));
    } catch (_) { return jsonResponse({ ok: false, error: 'invalid_url' }, 400); }
    let origin;
    try { origin = normalizeInput(input?.url); }
    catch (_) { return jsonResponse({ ok: false, error: 'invalid_url' }, 400); }

    const cacheKey = resultKey(origin);
    if (cache) {
      try {
        const hit = await cache.match(cacheKey);
        if (hit) {
          const cached = await hit.json();
          if (cached?.ok && Array.isArray(cached.checks)) return jsonResponse(cached);
        }
      } catch (_) { /* Awaria cache nie uniemożliwia skanowania. */ }
    }

    let report;
    try { report = await scan(origin); }
    catch (error) {
      // 422 = błąd pobrania strony; 500 = nieoczekiwany błąd naszej logiki.
      const unreachable = error instanceof ScanIssue;
      return jsonResponse({ ok: false, error: unreachable ? 'unreachable' : 'server_error' }, unreachable ? 422 : 500);
    }

    if (cache) {
      try {
        // W cache trzymamy osobną kopię z max-age=3600; do klienta idzie no-store.
        await cache.put(cacheKey, new Response(JSON.stringify(report), {
          headers: { 'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': `public, max-age=${CACHE_TTL_SECONDS}` }
        }));
      } catch (_) { /* Nie blokujemy działającego skanu przez cache. */ }
    }
    return jsonResponse(report);
  } catch (_) {
    return jsonResponse({ ok: false, error: 'server_error' }, 500);
  }
}

export function onRequestOptions() {
  return new Response(null, { status: 204, headers: HEADERS });
}

// W Pages Functions onRequest obsługuje tylko metody bez osobnego onRequestVerb.
export function onRequest() {
  return jsonResponse({ ok: false, error: 'method_not_allowed' }, 405, { Allow: 'POST, OPTIONS' });
}
