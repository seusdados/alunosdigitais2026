import type { ReactNode } from "react";

/**
 * Itens da seção "O que o programa entrega" (home).
 *
 * Cada item traz título, descrição curta, um ícone SVG próprio (não genérico,
 * representando visualmente o que entrega) e uma cor de acento. Shape já
 * compatível com futura modelagem dinâmica (CMS) — o campo `icon` poderia
 * virar um slug que mapeia para o SVG aqui.
 */
export type EntregaAccentColor = "teal" | "amber" | "navy";

export type EntregaItem = {
  title: string;
  description: string;
  icon: ReactNode;
  accentColor: EntregaAccentColor;
};

export const entregas: EntregaItem[] = [
  {
    title: "Material didático completo",
    description:
      "Livro do professor, livro do aluno, planos de aula e recursos digitais organizados por ano e fase.",
    accentColor: "teal",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          x="4"
          y="6"
          width="24"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
        <path
          d="M16 6v20"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeDasharray="2 2"
          opacity=".4"
        />
        <rect x="7" y="10" width="6" height="1.5" rx=".75" fill="currentColor" opacity=".5" />
        <rect x="7" y="13.5" width="5" height="1.5" rx=".75" fill="currentColor" opacity=".35" />
        <rect x="7" y="17" width="4" height="1.5" rx=".75" fill="currentColor" opacity=".25" />
        <rect x="19" y="10" width="6" height="1.5" rx=".75" fill="currentColor" opacity=".5" />
        <rect x="19" y="13.5" width="5" height="1.5" rx=".75" fill="currentColor" opacity=".35" />
        <rect x="19" y="17" width="4" height="1.5" rx=".75" fill="currentColor" opacity=".25" />
        <path
          d="M7 21h6M19 21h6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity=".2"
        />
      </svg>
    ),
  },
  {
    title: "Plataforma digital permanente",
    description:
      "Ambiente online com recursos para professores, alunos e famílias, disponível durante todo o ano letivo.",
    accentColor: "navy",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          x="4"
          y="5"
          width="24"
          height="17"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
        <path
          d="M10 25h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".5"
        />
        <path
          d="M14 22v3M18 22v3"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".4"
        />
        <circle cx="16" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
        <path
          d="M14.5 13l1 1 2-2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".8"
        />
      </svg>
    ),
  },
  {
    title: "Formação docente contínua",
    description:
      "Workshop inicial, formação ao longo do ano, helpdesk pedagógico e acompanhamento da implementação.",
    accentColor: "amber",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" opacity=".9" />
        <path
          d="M8 27c0-4.418 3.582-8 8-8s8 3.582 8 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity=".5"
        />
        <path
          d="M20.5 7.5l2-2M23 10l2.5-.5M21 13l2 1.5"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".35"
        />
        <circle cx="16" cy="11" r="2" fill="currentColor" opacity=".15" />
      </svg>
    ),
  },
  {
    title: "Planos de aula estruturados",
    description:
      "Roteiros detalhados por fase, com objetivos, dinâmicas, situações-problema e orientações para o professor.",
    accentColor: "teal",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          x="6"
          y="4"
          width="20"
          height="24"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity=".9"
        />
        <path
          d="M10 10h12M10 14h10M10 18h8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".4"
        />
        <rect x="10" y="22" width="5" height="2.5" rx="1" fill="currentColor" opacity=".2" />
        <path
          d="M22 9l-1.5 1.5-3-3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".6"
        />
        <path
          d="M22 13l-1.5 1.5-3-3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".4"
        />
        <path
          d="M22 17l-1.5 1.5-3-3"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".25"
        />
      </svg>
    ),
  },
  {
    title: "Help desk e suporte pedagógico",
    description:
      "Canal de apoio para dúvidas, orientações e sustentação da implementação ao longo do ano.",
    accentColor: "teal",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M6 16c0-5.523 4.477-10 10-10s10 4.477 10 10v2c0 1.105-.895 2-2 2h-1c-.552 0-1-.448-1-1v-4c0-.552.448-1 1-1h1.5C24 9.5 20.4 7 16 7S8 9.5 7.5 14H9c.552 0 1 .448 1 1v4c0 .552-.448 1-1 1H8c-1.105 0-2-.895-2-2v-2z"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity=".8"
        />
        <circle cx="16" cy="24" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity=".4" />
        <path
          d="M18.5 24c1.5 0 3.5-.5 3.5-2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".35"
        />
      </svg>
    ),
  },
  {
    title: "Engajamento familiar planejado",
    description:
      "Conteúdos, orientações e ações para pais e responsáveis participarem da formação ao longo do ano.",
    accentColor: "amber",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <circle cx="12" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.4" opacity=".8" />
        <circle cx="22" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.2" opacity=".5" />
        <path
          d="M5 24c0-3.866 3.134-7 7-7s7 3.134 7 7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity=".5"
        />
        <path
          d="M19 23c0-2.5 1.5-4.5 3.5-4.5S26 20.5 26 23"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".35"
        />
        <path
          d="M9 13.5c-.8.5-1.5 1.2-1.5 2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity=".25"
        />
        <circle cx="8.5" cy="19" r="1.5" stroke="currentColor" strokeWidth="1" opacity=".25" />
      </svg>
    ),
  },
  {
    title: "Avaliação diagnóstica e indicadores",
    description:
      "Diagnóstico do perfil dos estudantes e indicadores para orientar decisões pedagógicas e gestão.",
    accentColor: "navy",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          x="4"
          y="4"
          width="24"
          height="24"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity=".3"
        />
        <rect x="8" y="18" width="4" height="6" rx="1" fill="currentColor" opacity=".25" />
        <rect x="14" y="14" width="4" height="10" rx="1" fill="currentColor" opacity=".4" />
        <rect x="20" y="10" width="4" height="14" rx="1" fill="currentColor" opacity=".6" />
        <path
          d="M8 15l4-3 4 2 6-5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".7"
        />
        <circle cx="24" cy="9" r="1.5" fill="currentColor" opacity=".7" />
      </svg>
    ),
  },
  {
    title: "Gamificação para aprendizagem",
    description:
      "Jogo Guardião da Cidadania e recursos lúdicos que tornam o aprendizado engajante para alunos e famílias.",
    accentColor: "amber",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
        <path
          d="M16 4l3 6.5 7 1-5 5 1.2 7L16 20.5 9.8 23.5l1.2-7-5-5 7-1z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          opacity=".8"
        />
        <path
          d="M16 4l3 6.5 7 1-5 5 1.2 7L16 20.5 9.8 23.5l1.2-7-5-5 7-1z"
          fill="currentColor"
          opacity=".08"
        />
        <circle cx="16" cy="14" r="3" stroke="currentColor" strokeWidth="1.1" opacity=".35" />
        <path
          d="M14.5 14l1 1 2-2"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity=".5"
        />
        <path
          d="M11 26h10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".25"
        />
        <path
          d="M13 28h6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity=".15"
        />
      </svg>
    ),
  },
];
