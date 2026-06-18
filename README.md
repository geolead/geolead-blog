# GeoLead — Monorepo (strona główna + blog + słownik)

Jeden projekt Astro serwujący **całość** z jednego origin `geolead.pl`:
- `/` — strona główna (statyczny `public/index.html`)
- `/blog/` + `/blog/{slug}/` — artykuły (Pillar + Cluster)
- `/slownik/` + `/slownik/{slug}/` — hasła słownika (entity pages)

Pełny pre-renderowany HTML, czytelny dla crawlerów AI (GPTBot, ClaudeBot,
PerplexityBot) **bez** renderowania JS. Maksymalna akumulacja autorytetu
domeny — wszystko fizycznie na jednym hoście, zero subdomen, zero proxy.

## Stack
- **Astro 5** (`output: static`)
- **@astrojs/sitemap** — auto sitemap (+ homepage przez `customPages`)
- i18n gotowe pod EN/DE/FR, aktywne tylko PL (`prefixDefaultLocale: false`)
- Zero frameworka JS — zero hydration, maksymalny Core Web Vitals
- Sticky ToC z scroll-spy w artykułach

## ⚠️ ZANIM ZDEPLOYUJESZ — dodaj binarne assety
Zobacz `public/ASSETY-DO-DODANIA.txt`. Musisz wgrać `logo.png` i
`og-image.jpg` z obecnej strony (są binarne, nie ma ich w repo).

## Lokalne uruchomienie
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> ./dist  (to deployuje Cloudflare)
npm run preview  # podgląd builda lokalnie
```

## Struktura
```
public/
├── index.html              ← STRONA GŁÓWNA (serwowana z /)
├── robots.txt              ← JEDEN plik dla całego hosta
├── logo.png                ← DODAJ RĘCZNIE (patrz ASSETY-DO-DODANIA.txt)
├── og-image.jpg            ← DODAJ RĘCZNIE
└── ASSETY-DO-DODANIA.txt   ← checklista (możesz usunąć po dodaniu)

src/
├── content/
│   ├── blog/         ← artykuły .md (Pillar + Cluster)
│   └── slownik/      ← hasła słownika .md (entity pages)
├── layouts/
│   ├── BaseLayout.astro     ← <head>: meta, OG, canonical, hreflang, slot JSON-LD
│   └── ArticleLayout.astro  ← JSON-LD Article + układ 2-kol. z ToC
├── components/
│   ├── Nav.astro
│   ├── Footer.astro
│   ├── Breadcrumbs.astro       ← + BreadcrumbList JSON-LD
│   └── TableOfContents.astro   ← sticky ToC + scroll-spy
├── pages/
│   ├── blog/         ← [slug].astro + index.astro
│   └── slownik/      ← [slug].astro + index.astro
└── styles/global.css ← design tokeny 1:1 z index.html
```

## Dodanie nowego artykułu
Wrzuć `.md` do `src/content/blog/`. Nazwa pliku = slug = URL.
ToC wygeneruje się automatycznie z nagłówków `##` (H2) i `###` (H3).
Wymagany frontmatter (patrz `src/content/config.ts`):
```yaml
---
title: "..."
description: "..."          # 150–160 znaków
pubDate: 2026-06-18
pillar: "edukacja"          # edukacja | branze | slownik
funnel: "tofu"             # tofu | mofu | bofu
keywords: ["...", "..."]
---
```

═══════════════════════════════════════════════════════════════
## DEPLOY NA CLOUDFLARE PAGES — krok po kroku
═══════════════════════════════════════════════════════════════

### Krok 0 — przygotowanie (jednorazowo)
1. Dodaj `logo.png` i `og-image.jpg` do `public/` (patrz ASSETY-DO-DODANIA.txt).
2. Wrzuć całe repo na GitHub (lub GitLab).
   ```bash
   git init && git add . && git commit -m "Monorepo: homepage + blog + slownik"
   git branch -M main
   git remote add origin git@github.com:TWOJ-LOGIN/geolead.git
   git push -u origin main
   ```

### Krok 1 — utwórz projekt Pages
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages**
   → **Connect to Git** → wybierz repo `geolead`.

### Krok 2 — build settings (DOKŁADNIE tak)
| Pole | Wartość |
|------|---------|
| Framework preset | **Astro** |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` (zostaw puste) |
| Node version | 18 lub wyżej (zmienna `NODE_VERSION=18` jeśli build się wywali) |

Kliknij **Save and Deploy**. Pierwszy build potrwa ~1–2 min.

### Krok 3 — podłącz domenę geolead.pl
⚠️ KLUCZOWE: to zastępuje obecny hosting strony głównej. Od tego momentu
CAŁY geolead.pl (łącznie z `/`) serwowany jest z tego projektu Pages.

1. W projekcie Pages → **Custom domains** → **Set up a custom domain**.
2. Wpisz `geolead.pl` → Cloudflare automatycznie zaktualizuje rekord DNS
   (jeśli domena jest już w Twoim koncie Cloudflare — a jest, skoro masz Pages).
3. Dodaj też `www.geolead.pl` i ustaw przekierowanie na apex (lub odwrotnie —
   trzymaj się tego, co masz teraz, by nie zepsuć canonical).

### Krok 4 — weryfikacja po deployu
Otwórz i sprawdź:
- `https://geolead.pl/`                    → strona główna (jak dotąd)
- `https://geolead.pl/blog/`               → hub bloga
- `https://geolead.pl/blog/czym-jest-geo/` → pillar page z ToC
- `https://geolead.pl/slownik/`            → hub słownika
- `https://geolead.pl/robots.txt`          → jeden plik, Sitemap: .../sitemap-index.xml
- `https://geolead.pl/sitemap-index.xml`   → indeks sitemap
- `https://geolead.pl/sitemap-0.xml`       → 5 URL-i (homepage + blog + slownik)

### Krok 5 — Google Search Console (zaraz po deployu)
1. GSC → Sitemaps → dodaj `https://geolead.pl/sitemap-index.xml`.
2. URL Inspection na `/blog/czym-jest-geo/` → **Request indexing**.
3. To samo dla `/slownik/entity-salience/`.

═══════════════════════════════════════════════════════════════
## ROBOTS.TXT + SITEMAP — jak uniknięto kolizji
═══════════════════════════════════════════════════════════════

W monorepo NIE MA kolizji, bo jest jeden host i jeden build:

- **robots.txt** — jeden plik (`public/robots.txt`) serwowany z `/robots.txt`.
  Zastępuje obecny robots.txt strony głównej. Wpuszcza wszystkie crawlery AI
  i wskazuje na `https://geolead.pl/sitemap-index.xml`.

- **sitemap** — generowana automatycznie przez `@astrojs/sitemap` przy buildzie.
  Zawiera homepage (dodaną przez `customPages` w astro.config.mjs) + wszystkie
  artykuły i hasła słownika. Twój stary, ręczny `sitemap.xml` przestaje być
  potrzebny — ten generuje się sam i aktualizuje przy każdym nowym artykule.

  ⚠️ Jeśli w GSC masz zgłoszony stary `sitemap.xml`, usuń go i zgłoś nowy
  `sitemap-index.xml`. Trzymanie obu = mylące sygnały dla Google.

## Skalowanie na EN/DE/FR (później)
1. `astro.config.mjs` → dodaj locales do `i18n.locales` i `sitemap.i18n.locales`.
2. `BaseLayout.astro` → odkomentuj bloki hreflang.
3. Twórz treści w `src/content/blog/` z prefiksem języka wg struktury i18n.

## Backlog content (wg zatwierdzonej mapy topic cluster)
- 12 pozostałych clusterów (Pillar 1 + Pillar 2)
- 4 pozostałe hasła słownika: RAG, Knowledge Graph, Vector Embedding, Halucynacje AI
