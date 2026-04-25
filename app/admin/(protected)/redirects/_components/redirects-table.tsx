"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { RedirectsRow } from "@/lib/db/types";

import { deleteRedirect, saveRedirect } from "../actions";

const TYPES = [
  { value: "301", label: "301 — Permanente" },
  { value: "302", label: "302 — Temporário" },
  { value: "307", label: "307 — Temporário (preserva método)" },
  { value: "308", label: "308 — Permanente (preserva método)" },
];

export function RedirectsTable({ redirects }: { redirects: RedirectsRow[] }) {
  return (
    <>
      <NewRedirectForm />
      <div className="overflow-hidden rounded-md border bg-card">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Origem</th>
              <th className="px-4 py-2 font-medium">Destino</th>
              <th className="px-4 py-2 font-medium">Tipo</th>
              <th className="px-4 py-2 font-medium">Ativo</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {redirects.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum redirect cadastrado.
                </td>
              </tr>
            ) : (
              redirects.map((r) => <Row key={r.id} redirect={r} />)
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Row({ redirect }: { redirect: RedirectsRow }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveRedirect(form);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este redirect?")) return;
    startTransition(async () => {
      await deleteRedirect(redirect.id);
    });
  };

  if (editing) {
    return (
      <tr>
        <td colSpan={5} className="px-4 py-3">
          <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-[1fr_1fr_170px_auto_auto]">
            <input type="hidden" name="id" value={redirect.id} />
            <Input name="source_path" defaultValue={redirect.source_path} required />
            <Input name="target_path" defaultValue={redirect.target_path} required />
            <select
              name="redirect_type"
              defaultValue={String(redirect.redirect_type)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              {TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <label className="inline-flex items-center gap-2 text-xs">
              <input type="checkbox" name="is_active" defaultChecked={redirect.is_active} /> ativo
            </label>
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
      <td className="px-4 py-3 font-medium">{redirect.source_path}</td>
      <td className="px-4 py-3 text-muted-foreground">{redirect.target_path}</td>
      <td className="px-4 py-3 text-muted-foreground">{redirect.redirect_type}</td>
      <td className="px-4 py-3 text-muted-foreground">{redirect.is_active ? "sim" : "não"}</td>
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

function NewRedirectForm() {
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    startTransition(async () => {
      await saveRedirect(form);
      el.reset();
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-2 rounded-md border bg-card p-4 sm:grid-cols-[1fr_1fr_170px_auto_auto]"
    >
      <Input name="source_path" placeholder="/rota-antiga" required />
      <Input name="target_path" placeholder="/nova-rota ou URL" required />
      <select
        name="redirect_type"
        defaultValue="301"
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      <label className="inline-flex items-center gap-2 text-xs">
        <input type="checkbox" name="is_active" defaultChecked /> ativo
      </label>
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "…" : "Adicionar"}
      </Button>
    </form>
  );
}
