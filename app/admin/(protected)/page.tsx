import { requireAdmin } from "@/lib/auth/session";
import {
  getDashboardMetrics,
  getRecentContentItems,
  getRecentLeads,
} from "@/lib/db/queries/dashboard";
import { formatCount, formatDateTime } from "@/lib/format";

import { ContentStatusBadge, LeadStatusBadge } from "./_components/status-badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const ctx = await requireAdmin();

  const [metrics, recentContent, recentLeads] = await Promise.all([
    getDashboardMetrics(),
    getRecentContentItems(5),
    getRecentLeads(5),
  ]);

  const cards = [
    { label: "Conteúdos publicados", value: metrics.published },
    { label: "Rascunhos + em revisão", value: metrics.pendingDrafts },
    { label: "Leads (últimos 7 dias)", value: metrics.recentLeads },
    { label: "Redirects ativos", value: metrics.activeRedirects },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo, {ctx.user.email}. Visão geral do estado do site.
        </p>
      </header>

      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading" className="sr-only">
          Métricas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {card.label}
              </p>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{formatCount(card.value)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="recent-content-heading"
          className="rounded-lg border bg-card shadow-sm"
        >
          <header className="border-b px-5 py-3">
            <h2 id="recent-content-heading" className="text-sm font-semibold tracking-tight">
              Conteúdos recentes
            </h2>
            <p className="text-xs text-muted-foreground">
              Últimas 5 alterações, em qualquer status.
            </p>
          </header>

          {recentContent.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">Nenhum conteúdo criado ainda.</p>
          ) : (
            <ul className="divide-y">
              {recentContent.map((item) => (
                <li key={item.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {item.type} · /{item.slug}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <ContentStatusBadge status={item.status} />
                    <time
                      dateTime={item.updated_at}
                      className="whitespace-nowrap text-xs text-muted-foreground"
                    >
                      {formatDateTime(item.updated_at)}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          aria-labelledby="recent-leads-heading"
          className="rounded-lg border bg-card shadow-sm"
        >
          <header className="border-b px-5 py-3">
            <h2 id="recent-leads-heading" className="text-sm font-semibold tracking-tight">
              Leads recentes
            </h2>
            <p className="text-xs text-muted-foreground">Últimos 5 cadastros.</p>
          </header>

          {recentLeads.length === 0 ? (
            <p className="px-5 py-8 text-sm text-muted-foreground">Nenhum lead recebido ainda.</p>
          ) : (
            <ul className="divide-y">
              {recentLeads.map((lead) => (
                <li key={lead.id} className="flex items-center justify-between gap-4 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{lead.full_name ?? "(sem nome)"}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {lead.email ?? "(sem e-mail)"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <LeadStatusBadge status={lead.status} />
                    <time
                      dateTime={lead.created_at}
                      className="whitespace-nowrap text-xs text-muted-foreground"
                    >
                      {formatDateTime(lead.created_at)}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
