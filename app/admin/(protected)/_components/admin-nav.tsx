"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string; exact?: boolean };

const items: NavItem[] = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/conteudos", label: "Conteúdos" },
  { href: "/admin/midia", label: "Mídia" },
  { href: "/admin/taxonomias", label: "Taxonomias" },
  { href: "/admin/formularios", label: "Formulários" },
  { href: "/admin/leads", label: "Leads" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="mt-8 space-y-1 text-sm">
      {items.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded px-3 py-2 transition-colors",
              active
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
