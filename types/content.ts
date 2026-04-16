/**
 * Tipos de conteúdo dos blocos e páginas do site público.
 *
 * Estes tipos definem o shape que os arquivos em `/data/` devem entregar.
 * Nascem intencionalmente desacoplados do Supabase: quando o CMS dinâmico
 * entrar no lugar de `/data/` (fase posterior, após compatibilização com
 * o LMS legado — ver docs/analise-convergencia-lms.md), as queries devem
 * retornar objetos neste mesmo formato. Os componentes permanecem
 * inalterados.
 */

// ─── Primitivas reutilizáveis ────────────────────────────────────────────

export type CTA = {
  label: string;
  href: string;
};

export type IllustrationRef = {
  src: string;
  alt: string;
};

export type BleedDirection = "left" | "right" | "full" | "hero" | "curriculum";

export type SectionBackground = "white" | "sand";

// ─── Regulatory / marcos normativos ──────────────────────────────────────

export type RegulatoryTag = {
  key: "bncc" | "cne1" | "pned" | "cne2" | "eca" | "lei15100";
  label: string;
  short?: string;
};

// ─── Blocos ──────────────────────────────────────────────────────────────

export type HeroBlockData = {
  pill: string;
  title: string;
  titleAccent?: string; // trecho em itálico + teal-300
  subtitle: string;
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
  metrics?: { value: string; label: string }[];
  image: IllustrationRef;
};

export type SplitBleedData = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image: IllustrationRef;
  direction: "left" | "right";
  bgColor?: SectionBackground;
  cta?: CTA;
};

export type CardItem = {
  title: string;
  text?: string;
  icon?: "teal" | "amber"; // define bg do ícone
};

export type CardsGridData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cards: CardItem[];
  bgColor?: SectionBackground;
};

export type PillarBannerData = {
  image: IllustrationRef;
  caption?: string;
};

export type FlowStep = {
  number: string; // "01", "02", …
  title: string;
  description: string;
};

export type FlowStepsData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  steps: FlowStep[];
  bgColor?: SectionBackground;
};

export type CTABarData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: CTA;
  secondary?: CTA;
};

export type ContactFormData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  submitLabel?: string;
};

export type FAQEntry = {
  question: string;
  answer: string;
};

export type FAQAccordionData = {
  eyebrow?: string;
  title: string;
  entries: FAQEntry[];
};

// ─── Currículo ────────────────────────────────────────────────────────────

export type CurriculumStage = "fundamental-1" | "fundamental-2";

export type CurriculumYear = {
  year: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  slug: string; // '1-ano' | '2-ano' | …
  stage: CurriculumStage;
  theme: string; // curta, aparece no YearCard
  topics: string[]; // 3-6 bullets curtos para o YearCard
  heroText: string;
  phases: FlowStep[]; // 6 fases pedagógicas (as perguntas do ano)
  developmentItems: string[];
  pedagogicalDescription?: string;
};

// ─── Navegação ────────────────────────────────────────────────────────────

export type NavLink = {
  label: string;
  href: string;
  cta?: boolean;
};

// ─── SEO ──────────────────────────────────────────────────────────────────

export type PageSeo = {
  title: string;
  description: string;
  h1: string;
  ogImage?: string;
};
