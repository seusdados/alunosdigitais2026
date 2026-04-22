"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; exact?: boolean; group?: string };

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/conteudos", label: "Conteúdos", group: "Conteúdo" },
  { href: "/admin/midia", label: "Mídia", group: "Conteúdo" },
  { href: "/admin/taxonomias", label: "Taxonomias", group: "Conteúdo" },
  { href: "/admin/menus", label: "Menus", group: "Conteúdo" },
  { href: "/admin/formularios", label: "Formulários", group: "Captação" },
  { href: "/admin/leads", label: "Leads", group: "Captação" },
  { href: "/admin/seo", label: "SEO", group: "Operação" },
  { href: "/admin/redirects", label: "Redirects", group: "Operação" },
  { href: "/admin/configuracoes", label: "Configurações", group: "Operação" },
  { href: "/admin/usuarios", label: "Usuários", group: "Operação" },
];

export function AdminNav() {
  const pathname = usePathname();

  const groups = items.reduce<Record<string, NavItem[]>>((acc, item) => {
    const key = item.group ?? "";
    acc[key] = acc[key] ?? [];
    acc[key].push(item);
    return acc;
  }, {});

  const renderLink = (item: NavItem) => {
    const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          "block rounded px-3 py-2 text-sm transition-colors",
          active
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <nav className="mt-8 space-y-5">
      {Object.entries(groups).map(([group, list]) => (
        <div key={group || "root"} className="space-y-1">
          {group && (
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70">
              {group}
            </p>
          )}
          {list.map(renderLink)}
        </div>
      ))}
    </nav>
  );
}
