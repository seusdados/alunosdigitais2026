const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const numberFormatter = new Intl.NumberFormat("pt-BR");

export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormatter.format(date);
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return dateTimeFormatter.format(date);
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return numberFormatter.format(value);
}

const relativeFormatter = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

export function formatRelativeTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";

  const diffMs = date.getTime() - Date.now();
  const diffSeconds = Math.round(diffMs / 1000);
  const absSeconds = Math.abs(diffSeconds);

  if (absSeconds < 60) return relativeFormatter.format(diffSeconds, "second");
  if (absSeconds < 3600) return relativeFormatter.format(Math.round(diffSeconds / 60), "minute");
  if (absSeconds < 86400) return relativeFormatter.format(Math.round(diffSeconds / 3600), "hour");
  if (absSeconds < 2592000) return relativeFormatter.format(Math.round(diffSeconds / 86400), "day");
  if (absSeconds < 31536000)
    return relativeFormatter.format(Math.round(diffSeconds / 2592000), "month");
  return relativeFormatter.format(Math.round(diffSeconds / 31536000), "year");
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function truncate(input: string | null | undefined, max = 80): string {
  if (!input) return "";
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1)}…`;
}
