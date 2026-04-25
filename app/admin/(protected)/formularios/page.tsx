import Link from "next/link";

import { Button } from "@/components/ui/button";
import { listForms } from "@/lib/db/queries/forms";

import { NewFormDialog } from "./_components/new-form-dialog";

export default async function FormulariosPage() {
  const forms = await listForms();
  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Formulários</h1>
          <p className="text-sm text-muted-foreground">
            Crie e configure formulários de captação. Submissões geram leads automaticamente.
          </p>
        </div>
      </header>

      <NewFormDialog />

      <div className="overflow-hidden rounded-md border bg-card">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Nome</th>
              <th className="px-4 py-2 font-medium">Código</th>
              <th className="px-4 py-2 font-medium">Destino</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {forms.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum formulário.
                </td>
              </tr>
            ) : (
              forms.map((f) => (
                <tr key={f.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{f.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{f.destination_email ?? "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {f.is_active ? "Ativo" : "Inativo"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/formularios/${f.id}`}>Abrir →</Link>
                    </Button>
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
