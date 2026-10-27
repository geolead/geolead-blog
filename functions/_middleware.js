// GL-243: jeden host kanoniczny dla encji GeoLead.
// Każdy adres *.pages.dev (alias produkcyjny geolead-blog.pages.dev oraz adresy
// konkretnych deploymentów, np. 61a0352a.geolead-blog.pages.dev) dostaje 301 na geolead.pl.
// Powód: lustrzana kopia serwisu z "index,follow" rozmywa Entity Salience w crawlerach AI
// (RAG często ignoruje rel=canonical) i zaśmieca GA4 obcym hostem.
const CANONICAL_ORIGIN = 'https://geolead.pl';

export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname.endsWith('.pages.dev')) {
    return Response.redirect(CANONICAL_ORIGIN + url.pathname + url.search, 301);
  }
  return next();
}
