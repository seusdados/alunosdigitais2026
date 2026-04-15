import { requireAdmin } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const ctx = await requireAdmin();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Bem-vindo, {ctx.user.email}. As métricas reais chegam na Fase 3.2; por ora, esta página
          confirma que o fluxo de autenticação está operando.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Conteúdos publicados", value: "—" },
          { label: "Rascunhos pendentes", value: "—" },
          { label: "Leads recentes", value: "—" },
          { label: "Redirects ativos", value: "—" },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-lg border bg-card p-5 text-card-foreground shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {card.label}
            </p>
            <p className="mt-3 text-2xl font-semibold">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
