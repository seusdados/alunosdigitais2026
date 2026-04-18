import type { MetadataRoute } from "next";

import { articleSlugs } from "@/data/articles";
import { curriculumSlugs } from "@/data/curriculo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/**
 * Rotas institucionais estáticas + rotas curriculares dinâmicas (1º ao 9º).
 *
 * Quando o CMS dinâmico entrar (fase posterior, após relatório de
 * convergência LMS), o hub `/conteudos` passa a gerar rotas reais aqui.
 */
const staticRoutes = [
  "/",
  "/o-programa",
  "/como-funciona",
  "/curriculo",
  "/formacao-docente",
  "/familia-e-engajamento",
  "/plataforma-e-materiais",
  "/conformidade-e-curriculo",
  "/para-escolas",
  "/para-redes-e-secretarias",
  "/conteudos",
  "/faq",
  "/fale-com-um-especialista",
  "/sobre",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const base: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const curriculum: MetadataRoute.Sitemap = curriculumSlugs.map((slug) => ({
    url: `${siteUrl}/curriculo/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const editorial: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${siteUrl}/conteudos/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...curriculum, ...editorial];
}
