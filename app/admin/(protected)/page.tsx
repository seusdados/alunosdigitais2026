import Link from "next/link";

import { requireAdmin } from "@/lib/auth/session";
import {
  getActiveRedirectsCount,
  getContentStatusCounts,
  getLeadsCountLast30Days,
  getRecentContentItems,
  getRecentLeads,
} from "@/lib/db/queries/dashboard";
import { formatNumber, formatRelativeTime } from "@/lib/format";

import { StatusBadge } from "./_components/status-badge";

export default async function AdminDashboardPage() {
  const ctx = await requireAdmin();
  const [counts, recentContent, recentLeads, leadsCount30d, activeRedirects] = await Promise.all([
    getContentStatusCounts(),
    getRecentContentItems(5),
    getRecentLeads(5),
    getLeadsCountLast30Days(),
    getActiveRedirectsCount(),
  ]);

  const cards = [
    { label: "Conteúdos publicados", value: counts.published },
    { label: "Rascunhos pendentes", value: counts.draft + counts.in_review },
    { label: "Leads (30 dias)", value: leadsCount30d },
    { label: "Redirects ativos", value: activeRedirects },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo, {ctx.user.email}. Visão rápida de produção editorial e captação.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold">{formatNumber(card.value)}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-card shadow-sm">
          <header className="flex items-center justify-between border-b p-4">
            <h2 className="text-sm font-semibold">Últimos conteúdos editados</h2>
            <Link
              href="/admin/conteudos"
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Ver todos
            </Link>
          </header>
          <ul className="divide-y text-sm">
            {recentContent.length === 0 ? (
              <li className="p-4 text-muted-foreground">Nenhum conteúdo ainda.</li>
            ) : (
              recentContent.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-3 p-4">
                  <Link
                    href={`/admin/conteudos/${item.id}`}
                    className="min-w-0 flex-1 truncate font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
                  <StatusBadge kind="content" status={item.status} />
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(item.updated_at)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border bg-card shadow-sm">
          <header className="flex items-center justify-between border-b p-4">
            <h2 className="text-sm font-semibold">Leads recentes</h2>
            <Link
              href="/admin/leads"
              className="text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              Ver todos
            </Link>
          </header>
          <ul className="divide-y text-sm">
            {recentLeads.length === 0 ? (
              <li className="p-4 text-muted-foreground">Nenhum lead nos últimos 30 dias.</li>
            ) : (
              recentLeads.map((lead) => (
                <li key={lead.id} className="flex items-center justify-between gap-3 p-4">
                  <Link
                    href={`/admin/leads/${lead.id}`}
                    className="min-w-0 flex-1 truncate hover:underline"
                  >
                    <span className="font-medium">{lead.full_name ?? lead.email ?? "—"}</span>
                    {lead.organization_name && (
                      <span className="ml-1 text-muted-foreground">· {lead.organization_name}</span>
                    )}
                  </Link>
                  <StatusBadge kind="lead" status={lead.status} />
                  <span className="whitespace-nowrap text-xs text-muted-foreground">
                    {formatRelativeTime(lead.created_at)}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
