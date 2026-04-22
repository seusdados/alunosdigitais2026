import type { NavLink } from "@/types/content";

/**
 * Navegação principal do site público (desktop + mobile).
 * Shape estável — quando CMS dinâmico entrar, a mesma estrutura será
 * retornada por query e consumida sem alteração nos componentes.
 */
export const primaryNav: NavLink[] = [
  { label: "Programa", href: "/o-programa" },
  { label: "Método", href: "/como-funciona" },
  { label: "Currículo", href: "/curriculo" },
  { label: "Docentes", href: "/formacao-docente" },
  { label: "Escolas", href: "/para-escolas" },
  { label: "Conformidade", href: "/conformidade-e-curriculo" },
  { label: "Conteúdos", href: "/conteudos" },
  { label: "Sobre", href: "/sobre" },
];

export const headerCta: NavLink = {
  label: "Fale com um especialista",
  href: "/fale-com-um-especialista",
  cta: true,
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export const footerColumns: FooterColumn[] = [
  {
    title: "Programa",
    links: [
      { label: "O Programa", href: "/o-programa" },
      { label: "Como Funciona", href: "/como-funciona" },
      { label: "Currículo", href: "/curriculo" },
      { label: "Formação Docente", href: "/formacao-docente" },
      { label: "Plataforma e Materiais", href: "/plataforma-e-materiais" },
    ],
  },
  {
    title: "Para",
    links: [
      { label: "Escolas", href: "/para-escolas" },
      { label: "Redes e Secretarias", href: "/para-redes-e-secretarias" },
      { label: "Famílias", href: "/familia-e-engajamento" },
      { label: "Educadores", href: "/formacao-docente" },
    ],
  },
  {
    title: "Conteúdo",
    links: [
      { label: "Conteúdos", href: "/conteudos" },
      { label: "FAQ", href: "/faq" },
      { label: "Conformidade e Currículo", href: "/conformidade-e-curriculo" },
      { label: "Sobre", href: "/sobre" },
    ],
  },
  {
    title: "Contato",
    links: [
      { label: "Fale com um especialista", href: "/fale-com-um-especialista" },
      { label: "Política de privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de uso", href: "/termos-de-uso" },
      { label: "Cookies", href: "/cookies" },
      { label: "Acessibilidade", href: "/acessibilidade" },
    ],
  },
];
