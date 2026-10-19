// Meta, hreflang i JSON-LD strony głównej per język.
// Encja: jeden @id Organization / Person we wszystkich wersjach językowych (bez rozszczepiania encji).
import base from './home-jsonld.pl.json';

const SITE = 'https://geolead.pl';
export const LANGS = ['pl', 'en', 'de', 'fr'];
export const X_DEFAULT = 'en';
export const urlFor = (l) => (l === 'pl' ? `${SITE}/` : `${SITE}/${l}/`);
export const OG_LOCALE = { pl: 'pl_PL', en: 'en_GB', de: 'de_DE', fr: 'fr_FR' };

export const META = {
  pl: {
    title: 'Agencja GEO w Polsce — pozycjonowanie w ChatGPT | GeoLead',
    description: 'GeoLead — agencja GEO dla B2B. Zwiększamy widoczność firm w ChatGPT, Perplexity, Claude, Gemini i Google AI Overviews. Bezpłatny audyt widoczności AI.',
    ogTitle: 'GeoLead – Bądź pierwszym wyborem, gdy klient pyta AI',
    ogDescription: 'Agencja GEO - Pozycjonowanie w AI. Zwiększamy widoczność firm w ChatGPT, Perplexity, Claude i Google AI — tam, gdzie klienci pytają AI o rekomendacje.',
    twDescription: 'Zwiększ widoczność swojej firmy w ChatGPT, Perplexity, Claude i Google AI. Sprawdź bezpłatny audyt AI Visibility.',
  },
  en: {
    title: 'GEO Agency — Get Recommended by ChatGPT and AI Search | GeoLead',
    description: 'GeoLead is a B2B GEO agency. We make ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews recommend your company by name. Free AI visibility audit.',
    ogTitle: 'GeoLead – Be the first choice when clients ask AI',
    ogDescription: 'GEO agency (Generative Engine Optimization). We increase your company’s visibility in ChatGPT, Perplexity, Claude and Google AI — where clients ask AI for recommendations.',
    twDescription: 'Increase your company’s visibility in ChatGPT, Perplexity, Claude and Google AI. Get a free AI visibility audit.',
  },
  de: {
    title: 'GEO-Agentur — Sichtbarkeit in ChatGPT und KI-Suche | GeoLead',
    description: 'GEO-Agentur für B2B: Wir sorgen dafür, dass ChatGPT, Perplexity, Claude, Gemini und Google AI Overviews Ihr Unternehmen empfehlen. Kostenloser KI-Sichtbarkeitscheck.',
    ogTitle: 'GeoLead – Seien Sie die erste Wahl, wenn Kunden KI fragen',
    ogDescription: 'GEO-Agentur (Generative Engine Optimization). Wir steigern die Sichtbarkeit Ihres Unternehmens in ChatGPT, Perplexity, Claude und Google AI — dort, wo Kunden die KI nach Empfehlungen fragen.',
    twDescription: 'Steigern Sie die Sichtbarkeit Ihres Unternehmens in ChatGPT, Perplexity, Claude und Google AI. Kostenloser KI-Sichtbarkeitscheck.',
  },
  fr: {
    title: 'Agence GEO — Visibilité dans ChatGPT et la recherche IA | GeoLead',
    description: 'Agence GEO pour le B2B : nous faisons en sorte que ChatGPT, Perplexity, Claude, Gemini et Google AI Overviews recommandent votre entreprise. Audit de visibilité IA gratuit.',
    ogTitle: 'GeoLead – Soyez le premier choix quand vos clients interrogent l’IA',
    ogDescription: 'Agence GEO (Generative Engine Optimization). Nous augmentons la visibilité de votre entreprise dans ChatGPT, Perplexity, Claude et Google AI — là où vos clients demandent des recommandations à l’IA.',
    twDescription: 'Augmentez la visibilité de votre entreprise dans ChatGPT, Perplexity, Claude et Google AI. Audit de visibilité IA gratuit.',
  },
};

// Tłumaczenia węzłów JSON-LD (PL = oryginał z home-jsonld.pl.json)
const LD = {
  en: {
    inLanguage: 'en',
    orgDescription: 'Boutique B2B technology agency specialising in Generative Engine Optimization (GEO). We increase the visibility of premium brands in the answers of language models: ChatGPT, Perplexity, Claude, Gemini and Google AI Overviews.',
    orgDisambiguating: 'The GEO in GeoLead stands for Generative Engine Optimization — optimising brand visibility in generative AI models. GeoLead is not a surveying company and does not provide surveying, cartography or geolocation services.',
    catalogName: 'GEO services',
    offers: [
      ['AI Entity Audit', 'Measurement of how language models describe the brand today: mention frequency, context, hallucinations and knowledge gaps.'],
      ['Optimisation of AI-cited sources (RAG)', 'Distribution of structured company information to the sources AI models cite.'],
      ['Share of Model monitoring', 'Recurring prompt tests in ChatGPT, Perplexity and Claude with reporting of the brand’s share of answers.'],
    ],
    jarekDescription: 'Co-founder of GeoLead, a GEO (Generative Engine Optimization) agency specialising in getting companies recommended in AI answers. 15+ years in finance and controlling at international manufacturing companies, previously audit and due diligence at Deloitte. Specialises in brand entity audits in language models, optimisation of the sources used by RAG systems and Share of Model measurement in ChatGPT, Perplexity, Claude, Gemini and Google AI Mode.',
    pawelJobTitle: 'Founder',
    pawelDescription: 'Founder and owner of GeoLead (sole proprietorship registered as geolead.pl Paweł Zagajewski).',
    serviceDescription: 'Optimising brand visibility in the answers of generative AI models: ChatGPT, Perplexity, Claude, Gemini, Microsoft Copilot and Google AI Overviews. Three layers: entity audit, optimisation of AI-cited sources (RAG) and recurring Share of Model measurement.',
    audience: 'B2B companies, aesthetic medicine clinics, law firms, software houses, SaaS companies, professional services',
  },
  de: {
    inLanguage: 'de',
    orgDescription: 'Boutique-B2B-Technologieagentur, spezialisiert auf Generative Engine Optimization (GEO). Wir steigern die Sichtbarkeit von Premiummarken in den Antworten von Sprachmodellen: ChatGPT, Perplexity, Claude, Gemini und Google AI Overviews.',
    orgDisambiguating: 'Das Kürzel GEO in GeoLead steht für Generative Engine Optimization — die Optimierung der Sichtbarkeit von Marken in generativen KI-Modellen. GeoLead ist kein Vermessungsunternehmen und erbringt keine Vermessungs-, Kartografie- oder Geolokalisierungsleistungen.',
    catalogName: 'GEO-Leistungen',
    offers: [
      ['KI-Entity-Audit', 'Messung, wie Sprachmodelle die Marke heute beschreiben: Nennungshäufigkeit, Kontext, Halluzinationen und Wissenslücken.'],
      ['Optimierung der von KI zitierten Quellen (RAG)', 'Verteilung strukturierter Unternehmensinformationen in die Quellen, die KI-Modelle zitieren.'],
      ['Share-of-Model-Monitoring', 'Regelmäßige Prompt-Tests in ChatGPT, Perplexity und Claude mit Reporting zum Anteil der Marke an den Antworten.'],
    ],
    jarekDescription: 'Mitgründer von GeoLead, einer GEO-Agentur (Generative Engine Optimization), die Unternehmen in KI-Antworten positioniert. Über 15 Jahre in Finanzen und Controlling internationaler Industrieunternehmen, zuvor Prüfung und Due Diligence bei Deloitte. Schwerpunkte: Entity-Audits von Marken in Sprachmodellen, Optimierung der von RAG-Systemen genutzten Quellen und Share-of-Model-Messung in ChatGPT, Perplexity, Claude, Gemini und Google AI Mode.',
    pawelJobTitle: 'Gründer',
    pawelDescription: 'Gründer und Inhaber von GeoLead (Einzelunternehmen, eingetragen als geolead.pl Paweł Zagajewski).',
    serviceDescription: 'Optimierung der Markensichtbarkeit in den Antworten generativer KI-Modelle: ChatGPT, Perplexity, Claude, Gemini, Microsoft Copilot und Google AI Overviews. Drei Ebenen: Entity-Audit, Optimierung der von KI zitierten Quellen (RAG) und zyklische Share-of-Model-Messung.',
    audience: 'B2B-Unternehmen, Kliniken für ästhetische Medizin, Anwaltskanzleien, Softwarehäuser, SaaS-Unternehmen, professionelle Dienstleister',
  },
  fr: {
    inLanguage: 'fr',
    orgDescription: 'Agence technologique B2B boutique spécialisée en Generative Engine Optimization (GEO). Nous augmentons la visibilité des marques premium dans les réponses des modèles de langage : ChatGPT, Perplexity, Claude, Gemini et Google AI Overviews.',
    orgDisambiguating: 'Le sigle GEO dans GeoLead signifie Generative Engine Optimization — l’optimisation de la visibilité des marques dans les modèles d’IA générative. GeoLead n’est pas un cabinet de géomètres et ne fournit aucun service de géodésie, de cartographie ou de géolocalisation.',
    catalogName: 'Services GEO',
    offers: [
      ['Audit d’entité IA', 'Mesure de la façon dont les modèles de langage décrivent la marque aujourd’hui : fréquence des mentions, contexte, hallucinations et lacunes de connaissance.'],
      ['Optimisation des sources citées par l’IA (RAG)', 'Diffusion d’informations structurées sur l’entreprise vers les sources citées par les modèles d’IA.'],
      ['Suivi du Share of Model', 'Tests de prompts récurrents dans ChatGPT, Perplexity et Claude avec reporting de la part de la marque dans les réponses.'],
    ],
    jarekDescription: 'Cofondateur de GeoLead, agence GEO (Generative Engine Optimization) spécialisée dans le positionnement des entreprises dans les réponses de l’IA. Plus de 15 ans en finance et contrôle de gestion dans des groupes industriels internationaux, auparavant audit et due diligence chez Deloitte. Spécialisé dans l’audit d’entité de marque dans les modèles de langage, l’optimisation des sources utilisées par les systèmes RAG et la mesure du Share of Model dans ChatGPT, Perplexity, Claude, Gemini et Google AI Mode.',
    pawelJobTitle: 'Fondateur',
    pawelDescription: 'Fondateur et propriétaire de GeoLead (entreprise individuelle enregistrée sous le nom geolead.pl Paweł Zagajewski).',
    serviceDescription: 'Optimisation de la visibilité des marques dans les réponses des modèles d’IA générative : ChatGPT, Perplexity, Claude, Gemini, Microsoft Copilot et Google AI Overviews. Trois niveaux : audit d’entité, optimisation des sources citées par l’IA (RAG) et mesure régulière du Share of Model.',
    audience: 'Entreprises B2B, cliniques de médecine esthétique, cabinets d’avocats, éditeurs de logiciels, sociétés SaaS, services professionnels',
  },
};

const stripHtml = (s) => String(s).replace(/<a\b[^>]*>.*?<\/a>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function buildJsonLd(lang, t) {
  const g = JSON.parse(JSON.stringify(base));
  const byId = (suffix) => g['@graph'].find((n) => n['@id'] === `${SITE}/${suffix}`);
  // WebSite obsługuje teraz 4 wersje językowe
  byId('#website').inLanguage = ['pl-PL', 'en', 'de', 'fr'];
  if (lang === 'pl') return g;

  const L = LD[lang];
  const url = urlFor(lang);
  const org = byId('#organization');
  org.description = L.orgDescription;
  org.disambiguatingDescription = L.orgDisambiguating;
  org.hasOfferCatalog.name = L.catalogName;
  org.hasOfferCatalog.itemListElement.forEach((o, i) => {
    o.itemOffered.name = L.offers[i][0];
    o.itemOffered.description = L.offers[i][1];
    o.url = url + o.url.slice(o.url.indexOf('#'));
  });
  const jarek = byId('#jaroslaw-zagajewski');
  jarek.description = L.jarekDescription;
  const pawel = byId('#pawel-zagajewski');
  pawel.jobTitle = L.pawelJobTitle;
  pawel.description = L.pawelDescription;

  const page = byId('#webpage');
  page['@id'] = `${url}#webpage`;
  page.url = url;
  page.name = META[lang].title;
  page.description = META[lang].description;
  page.inLanguage = L.inLanguage;

  const svc = byId('#service-geo');
  svc.description = L.serviceDescription;
  svc.audience.audienceType = L.audience;

  const faq = byId('#faqpage');
  faq['@id'] = `${url}#faqpage`;
  faq.isPartOf = { '@id': `${url}#webpage` };
  faq.inLanguage = L.inLanguage;
  faq.mainEntity = [1, 2, 3, 4, 5].map((i) => ({
    '@type': 'Question',
    name: stripHtml(t[`faq_q${i}`]),
    acceptedAnswer: { '@type': 'Answer', text: stripHtml(t[`faq_a${i}`]) },
  }));
  return g;
}
