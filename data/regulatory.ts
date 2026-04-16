import type { RegulatoryTag } from "@/types/content";

/**
 * Marcos regulatórios exibidos na RegulatoryBar (abaixo do hero).
 *
 * Hierarquia conforme docs/brief/roteiro-completo.md §1 (ajuste de
 * precisão regulatória).
 */
export const regulatoryTags: RegulatoryTag[] = [
  {
    key: "bncc",
    label: "BNCC Competência 5",
    short: "BNCC C5",
  },
  {
    key: "cne1",
    label: "Resolução CNE/CEB nº 1/2022",
    short: "CNE/CEB 1/2022",
  },
  {
    key: "pned",
    label: "Lei nº 14.533/2023 (PNED)",
    short: "PNED",
  },
  {
    key: "cne2",
    label: "Resolução CNE/CEB nº 2/2025",
    short: "CNE/CEB 2/2025",
  },
  {
    key: "eca",
    label: "Lei nº 15.211/2025 (ECA Digital)",
    short: "ECA Digital",
  },
];
