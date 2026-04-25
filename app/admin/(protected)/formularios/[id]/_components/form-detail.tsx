"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormFieldsRow, FormsRow } from "@/lib/db/types";

import { deleteForm, deleteFormField, saveForm, saveFormField } from "../../actions";

const FIELD_TYPES = [
  "text",
  "email",
  "tel",
  "url",
  "number",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "date",
];

export function FormDetail({ form, fields }: { form: FormsRow; fields: FormFieldsRow[] }) {
  return (
    <div className="space-y-6">
      <FormSettings form={form} />
      <FieldsTable form={form} fields={fields} />
      <NewFieldForm formId={form.id} />
    </div>
  );
}

function FormSettings({ form }: { form: FormsRow }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveForm(data);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (
      !window.confirm(
        "Remover este formulário? Os campos e submissões vinculadas serão impactados.",
      )
    )
      return;
    startTransition(async () => {
      await deleteForm(form.id);
    });
  };

  if (!editing) {
    return (
      <div className="flex items-center justify-between gap-3 rounded-md border bg-card p-4">
        <dl className="grid gap-1 text-sm md:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">E-mail destino</dt>
            <dd>{form.destination_email ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Mensagem de sucesso</dt>
            <dd className="truncate">{form.success_message ?? "—"}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Descrição</dt>
            <dd className="truncate">{form.description ?? "—"}</dd>
          </div>
        </dl>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
          >
            Editar
          </button>
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
          >
            Remover
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-md border bg-card p-4">
      <input type="hidden" name="id" value={form.id} />
      <div className="grid gap-3 md:grid-cols-3">
        <Input name="name" defaultValue={form.name} required />
        <Input name="code" defaultValue={form.code} required />
        <Input name="destination_email" type="email" defaultValue={form.destination_email ?? ""} />
      </div>
      <textarea
        name="description"
        defaultValue={form.description ?? ""}
        placeholder="Descrição interna"
        rows={2}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      <Input
        name="success_message"
        defaultValue={form.success_message ?? ""}
        placeholder="Mensagem exibida ao visitante após envio"
      />
      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_active" defaultChecked={form.is_active} /> Ativo
      </label>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-xs text-muted-foreground"
        >
          Cancelar
        </button>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "…" : "Salvar"}
        </Button>
      </div>
    </form>
  );
}

function FieldsTable({ form, fields }: { form: FormsRow; fields: FormFieldsRow[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <table className="min-w-full divide-y text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Label</th>
            <th className="px-4 py-2 font-medium">Chave</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Obrigatório</th>
            <th className="px-4 py-2 font-medium">Ordem</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {fields.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                Nenhum campo ainda.
              </td>
            </tr>
          ) : (
            fields.map((f) => <FieldRow key={f.id} field={f} formId={form.id} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

function FieldRow({ field, formId }: { field: FormFieldsRow; formId: string }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveFormField(data);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este campo?")) return;
    startTransition(async () => {
      await deleteFormField(field.id, formId);
    });
  };

  if (editing) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-3">
          <form
            onSubmit={onSubmit}
            className="grid gap-2 sm:grid-cols-[1fr_1fr_120px_auto_80px_auto]"
          >
            <input type="hidden" name="id" value={field.id} />
            <input type="hidden" name="form_id" value={formId} />
            <Input name="label" defaultValue={field.label} required />
            <Input name="field_key" defaultValue={field.field_key} required />
            <select
              name="field_type"
              defaultValue={field.field_type}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {FIELD_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-2 text-xs">
              <input type="checkbox" name="is_required" defaultChecked={field.is_required} />{" "}
              obrigatório
            </label>
            <Input name="sort_order" type="number" defaultValue={field.sort_order} />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="text-xs text-muted-foreground"
              >
                Cancelar
              </button>
              <Button type="submit" size="sm" disabled={pending}>
                {pending ? "…" : "Salvar"}
              </Button>
            </div>
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="hover:bg-muted/30">
      <td className="px-4 py-3 font-medium">{field.label}</td>
      <td className="px-4 py-3 text-muted-foreground">{field.field_key}</td>
      <td className="px-4 py-3 text-muted-foreground">{field.field_type}</td>
      <td className="px-4 py-3 text-muted-foreground">{field.is_required ? "sim" : "não"}</td>
      <td className="px-4 py-3 text-muted-foreground">{field.sort_order}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="mr-3 text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          Editar
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={pending}
          className="text-xs font-medium text-destructive hover:underline"
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

function NewFieldForm({ formId }: { formId: string }) {
  const [pending, startTransition] = useTransition();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const el = e.currentTarget;
    startTransition(async () => {
      await saveFormField(data);
      el.reset();
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-2 rounded-md border bg-card p-4 sm:grid-cols-[1fr_1fr_120px_auto_80px_auto]"
    >
      <input type="hidden" name="form_id" value={formId} />
      <Input name="label" placeholder="Novo campo — label" required />
      <Input name="field_key" placeholder="chave (ex.: email)" required />
      <select
        name="field_type"
        defaultValue="text"
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        {FIELD_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" name="is_required" /> obrigatório
      </label>
      <Input name="sort_order" type="number" min={0} defaultValue={0} />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "…" : "Adicionar"}
      </Button>
    </form>
  );
}
