import Link from "next/link";
import { notFound } from "next/navigation";

import { getForm, listFormFields } from "@/lib/db/queries/forms";

import { FormDetail } from "./_components/form-detail";

export default async function FormDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const form = await getForm(id);
  if (!form) notFound();
  const fields = await listFormFields(id);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{form.name}</h1>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">{form.code}</span> · {form.is_active ? "ativo" : "inativo"}
          </p>
        </div>
        <Link
          href="/admin/formularios"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar
        </Link>
      </header>

      <FormDetail form={form} fields={fields} />
    </div>
  );
}
