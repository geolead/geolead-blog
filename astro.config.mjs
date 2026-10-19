import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://geolead.pl',

  // Statyczny output — pełny pre-rendered HTML.
  // Każda podstrona = surowy HTML czytelny dla GPTBot / ClaudeBot / PerplexityBot
  // ORAZ Googlebota bez kolejki renderowania JS.
  output: 'static',

  // i18n: PL bez prefiksu (/), EN/DE/FR pod /en/, /de/, /fr/.
  // Wersje językowe ma na razie tylko strona główna (src/pages/{en,de,fr}/index.astro);
  // blog, słownik i strony z public/ są wyłącznie po polsku.
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl', 'en', 'de', 'fr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Strona główna jest teraz stroną Astro (/, /en/, /de/, /fr/) — sitemap widzi ją sama.
      // W customPages zostają tylko statyczne pliki z public/.
      // GL-212: polityka prywatności to też statyczny plik w public/.
      // GL-217: generator promptów, GL-224: skaner gotowości AI (statyczne pliki w public/narzedzia/).
      // GL-233: strona badania /badania/gotowosc-ai-2026/ (statyczny plik w public/badania/).
      customPages: ['https://geolead.pl/polityka-prywatnosci/', 'https://geolead.pl/narzedzia/pytania-zakupowe/', 'https://geolead.pl/narzedzia/skaner-ai/', 'https://geolead.pl/metodologia/', 'https://geolead.pl/badania/gotowosc-ai-2026/'],
      // Wykluczamy strony techniczne z sitemap, jeśli powstaną w przyszłości
      filter: (page) => !page.includes('/draft/'),
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl',
          en: 'en',
          de: 'de',
          fr: 'fr',
        },
      },
    }),
  ],

  // Build output zgodny z Cloudflare Pages (katalog ./dist)
  build: {
    format: 'directory', // generuje /blog/czym-jest-geo/index.html => czyste URL-e
  },
});
