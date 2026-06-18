import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://geolead.pl',

  // Statyczny output — pełny pre-rendered HTML.
  // Każda podstrona = surowy HTML czytelny dla GPTBot / ClaudeBot / PerplexityBot
  // ORAZ Googlebota bez kolejki renderowania JS.
  output: 'static',

  // i18n skonfigurowane pod przyszłe skalowanie (EN/DE/FR),
  // ale aktywne tylko dla PL. prefixDefaultLocale:false => PL bez prefixu /pl/.
  i18n: {
    defaultLocale: 'pl',
    locales: ['pl'], // docelowo: ['pl', 'en', 'de', 'fr']
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      // Strona główna (public/index.html) jest statyczna i niewidoczna dla
      // integracji sitemap — dodajemy ją jawnie, żeby trafiła do mapy.
      customPages: ['https://geolead.pl/'],
      // Wykluczamy strony techniczne z sitemap, jeśli powstaną w przyszłości
      filter: (page) => !page.includes('/draft/'),
      i18n: {
        defaultLocale: 'pl',
        locales: {
          pl: 'pl-PL',
          // en: 'en-US', de: 'de-DE', fr: 'fr-FR' — odkomentuj przy skalowaniu
        },
      },
    }),
  ],

  // Build output zgodny z Cloudflare Pages (katalog ./dist)
  build: {
    format: 'directory', // generuje /blog/czym-jest-geo/index.html => czyste URL-e
  },
});
