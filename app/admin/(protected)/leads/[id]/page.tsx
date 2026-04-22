import Link from "next/link";
import { notFound } from "next/navigation";

import { getLead, listLeadSubmissions } from "@/lib/db/queries/leads";
import { formatDateTime } from "@/lib/format";

import { StatusBadge } from "../../_components/status-badge";
import { LeadActions } from "./_components/lead-actions";
import { NotesForm } from "./_components/notes-form";

export default async function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = await getLead(id);
  if (!lead) notFound();
  const submissions = await listLeadSubmissions(id);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">
              {lead.full_name ?? lead.email ?? "Lead"}
            </h1>
            <StatusBadge kind="lead" status={lead.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            Recebido em {formatDateTime(lead.created_at)}
          </p>
        </div>
        <Link href="/admin/leads" className="text-sm text-muted-foreground hover:text-foreground">
          ← Voltar
        </Link>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-md border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Dados de contato</h2>
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <Info label="E-mail" value={lead.email} />
              <Info label="Telefone" value={lead.phone} />
              <Info label="Organização" value={lead.organization_name} />
              <Info label="Cargo" value={lead.job_title} />
              <Info label="Cidade/UF" value={[lead.city, lead.state].filter(Boolean).join("/")} />
              <Info label="Área de interesse" value={lead.interest_area} />
              <Info label="Origem" value={lead.source} />
              <Info label="Campanha" value={lead.campaign} />
            </dl>
            {lead.message && (
              <div className="mt-4 rounded-md border bg-muted/40 p-3 text-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Mensagem
                </p>
                <p className="mt-1 whitespace-pre-wrap">{lead.message}</p>
              </div>
            )}
          </section>

          <section className="rounded-md border bg-card p-4">
            <h2 className="mb-3 text-sm font-semibold">Submissões ({submissions.length})</h2>
            <ul className="space-y-3 text-sm">
              {submissions.length === 0 && (
                <li className="text-muted-foreground">Nenhuma submissão registrada.</li>
              )}
              {submissions.map((sub) => (
                <li key={sub.id} className="rounded-md border bg-muted/30 p-3">
                  <header className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatDateTime(sub.submitted_at)}</span>
                    <span className="font-mono">{sub.status}</span>
                  </header>
                  <pre className="mt-2 overflow-auto text-xs">
                    {JSON.stringify(sub.payload, null, 2)}
                  </pre>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <LeadActions id={lead.id} status={lead.status} />
          <NotesForm id={lead.id} defaultValue={lead.notes ?? ""} />
        </aside>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-0.5">{value && value.length > 0 ? value : "—"}</dd>
    </div>
  );
}
