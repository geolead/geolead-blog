import { defineCollection, z } from 'astro:content';

// ── BLOG (Pillar + Cluster articles) ──
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(), // meta description, 150–160 znaków
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('GeoLead'),
    // Hierarchia topic cluster:
    pillar: z.enum(['edukacja', 'branze', 'slownik']),
    isPillar: z.boolean().default(false),
    funnel: z.enum(['tofu', 'mofu', 'bofu']),
    // SEO / GEO:
    keywords: z.array(z.string()).default([]),
    image: z.string().default('/og-image.jpg'),
    imageAlt: z.string().default('GeoLead — Agencja GEO'),
    // Powiązania (internal linking mesh):
    relatedTerms: z.array(z.string()).default([]), // slug-i z /slownik/
    draft: z.boolean().default(false),
  }),
});

// ── SŁOWNIK (Entity pages — DefinedTermSet zamieniony w realne URL-e) ──
const slownik = defineCollection({
  type: 'content',
  schema: z.object({
    term: z.string(),
    alternateName: z.string().optional(),
    termCode: z.string(), // np. ENTITY_SALIENCE — spójne z JSON-LD na stronie głównej
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keywords: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, slownik };
