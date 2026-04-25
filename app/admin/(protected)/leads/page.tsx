import Link from "next/link";

import { Input } from "@/components/ui/input";
import { listLeads } from "@/lib/db/queries/leads";
import type { LeadStatus } from "@/lib/db/types";
import { formatDateTime } from "@/lib/format";

import { StatusBadge } from "../_components/status-badge";

const STATUSES: readonly LeadStatus[] = ["new", "qualified", "contacted", "won", "lost", "spam"];

type Search = Promise<{ q?: string; status?: string }>;

function normalizeStatus(v: string | undefined): LeadStatus | undefined {
  return STATUSES.find((s) => s === v);
}

export default async function LeadsPage({ searchParams }: { searchParams: Search }) {
  const { q, status } = await searchParams;
  const leads = await listLeads({
    search: q,
    status: normalizeStatus(status),
    limit: 200,
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
        <p className="text-sm text-muted-foreground">
          Captações do site. Filtre, acompanhe status e veja o payload completo da submissão.
        </p>
      </header>

      <form className="flex flex-wrap items-center gap-3">
        <Input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome, e-mail ou organização…"
          className="max-w-sm"
        />
        <select
          name="status"
          defaultValue={status ?? ""}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todos os status</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
        >
          Filtrar
        </button>
      </form>

      <div className="overflow-hidden rounded-md border bg-card">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Lead</th>
              <th className="px-4 py-2 font-medium">Contato</th>
              <th className="px-4 py-2 font-medium">Origem</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Recebido</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum lead encontrado.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:underline">
                      {lead.full_name ?? lead.email ?? "—"}
                    </Link>
                    {lead.organization_name && (
                      <p className="text-xs text-muted-foreground">{lead.organization_name}</p>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {lead.email ?? "—"}
                    {lead.phone && <span className="block">{lead.phone}</span>}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{lead.source ?? "—"}</td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="lead" status={lead.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDateTime(lead.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Abrir →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
