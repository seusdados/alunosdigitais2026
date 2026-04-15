import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Static list of institutional routes (master spec §10.1).
 *
 * On Fase 4 this file will be extended to read from the `published_content`
 * view in Supabase and append dynamic routes (blog, biblioteca, temas, etc).
 * Only published content should ever be emitted here.
 */
const staticRoutes = [
  "/",
  "/programa",
  "/como-funciona",
  "/metodologia",
  "/para-escolas",
  "/para-educadores",
  "/para-familias",
  "/temas",
  "/biblioteca",
  "/blog",
  "/materiais",
  "/cases",
  "/sobre",
  "/contato",
  "/agende-uma-conversa",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/politica-de-cookies",
  "/acessibilidade",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
