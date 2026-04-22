"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { TaxonomiesRow, TermsRow } from "@/lib/db/types";
import { slugify } from "@/lib/format";

import { deleteTaxonomy, deleteTerm, saveTaxonomy, saveTerm } from "../actions";

type Props = {
  taxonomies: TaxonomiesRow[];
  termsByTaxonomy: Record<string, TermsRow[]>;
};

export function TaxonomyEditor({ taxonomies, termsByTaxonomy }: Props) {
  const [selected, setSelected] = useState<string | null>(taxonomies[0]?.id ?? null);
  const activeTax = taxonomies.find((t) => t.id === selected) ?? null;
  const activeTerms = selected ? (termsByTaxonomy[selected] ?? []) : [];

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
      <TaxonomiesPanel taxonomies={taxonomies} selected={selected} onSelect={setSelected} />
      <div className="space-y-6">
        {activeTax ? (
          <TermsPanel taxonomy={activeTax} terms={activeTerms} />
        ) : (
          <p className="rounded-md border bg-card p-8 text-center text-sm text-muted-foreground">
            Selecione ou crie uma taxonomia para gerenciar os termos.
          </p>
        )}
      </div>
    </div>
  );
}

function TaxonomiesPanel({
  taxonomies,
  selected,
  onSelect,
}: {
  taxonomies: TaxonomiesRow[];
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveTaxonomy(form);
      setCreating(false);
    });
  };

  return (
    <aside className="space-y-3 rounded-md border bg-card p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Taxonomias</h2>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          {creating ? "Cancelar" : "+ Nova"}
        </button>
      </header>

      {creating && (
        <form onSubmit={onSubmit} className="space-y-2 rounded-md border p-3">
          <Input name="label" placeholder="Rótulo (ex.: Tema)" required />
          <Input name="code" placeholder="Código (slug)" required />
          <Input name="sort_order" type="number" min={0} defaultValue={0} />
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Salvando…" : "Criar"}
          </Button>
        </form>
      )}

      <ul className="space-y-1">
        {taxonomies.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              onClick={() => onSelect(t.id)}
              className={`block w-full rounded px-3 py-2 text-left text-sm transition-colors ${
                selected === t.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <span className="font-medium text-foreground">{t.label}</span>
              <span className="ml-2 text-xs text-muted-foreground">{t.code}</span>
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function TermsPanel({ taxonomy, terms }: { taxonomy: TaxonomiesRow; terms: TermsRow[] }) {
  return (
    <>
      <TaxonomyHeader taxonomy={taxonomy} />
      <TermsTable taxonomyId={taxonomy.id} terms={terms} />
      <NewTermForm taxonomyId={taxonomy.id} />
    </>
  );
}

function TaxonomyHeader({ taxonomy }: { taxonomy: TaxonomiesRow }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveTaxonomy(form);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover esta taxonomia? Todos os termos serão apagados.")) return;
    startTransition(async () => {
      await deleteTaxonomy(taxonomy.id);
    });
  };

  if (editing) {
    return (
      <form onSubmit={onSubmit} className="space-y-3 rounded-md border bg-card p-4">
        <input type="hidden" name="id" value={taxonomy.id} />
        <div className="grid gap-3 sm:grid-cols-2">
          <Input name="label" defaultValue={taxonomy.label} required />
          <Input name="code" defaultValue={taxonomy.code} required />
          <Input name="sort_order" type="number" min={0} defaultValue={taxonomy.sort_order} />
        </div>
        <textarea
          name="description"
          defaultValue={taxonomy.description ?? ""}
          rows={2}
          placeholder="Descrição"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            Cancelar
          </button>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Salvando…" : "Salvar"}
          </Button>
        </div>
      </form>
    );
  }

  return (
    <header className="flex items-start justify-between gap-4 rounded-md border bg-card p-4">
      <div>
        <h2 className="text-xl font-semibold">{taxonomy.label}</h2>
        <p className="text-xs text-muted-foreground">
          <span className="font-mono">{taxonomy.code}</span>
          {taxonomy.description && ` · ${taxonomy.description}`}
        </p>
      </div>
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
    </header>
  );
}

function TermsTable({ taxonomyId, terms }: { taxonomyId: string; terms: TermsRow[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <table className="min-w-full divide-y text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Nome</th>
            <th className="px-4 py-2 font-medium">Slug</th>
            <th className="px-4 py-2 font-medium">Ordem</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {terms.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-6 text-center text-muted-foreground">
                Nenhum termo ainda.
              </td>
            </tr>
          ) : (
            terms.map((t) => <TermRow key={t.id} term={t} taxonomyId={taxonomyId} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

function TermRow({ term, taxonomyId }: { term: TermsRow; taxonomyId: string }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveTerm(form);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este termo?")) return;
    startTransition(async () => {
      await deleteTerm(term.id);
    });
  };

  if (editing) {
    return (
      <tr>
        <td colSpan={4} className="px-4 py-3">
          <form onSubmit={onSubmit} className="grid gap-2 sm:grid-cols-[1fr_1fr_100px_auto]">
            <input type="hidden" name="id" value={term.id} />
            <input type="hidden" name="taxonomy_id" value={taxonomyId} />
            <Input name="name" defaultValue={term.name} required />
            <Input name="slug" defaultValue={term.slug} required />
            <Input name="sort_order" type="number" defaultValue={term.sort_order} />
            <div className="flex items-center gap-2">
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
      <td className="px-4 py-3 font-medium">{term.name}</td>
      <td className="px-4 py-3 text-muted-foreground">{term.slug}</td>
      <td className="px-4 py-3 text-muted-foreground">{term.sort_order}</td>
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

function NewTermForm({ taxonomyId }: { taxonomyId: string }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const slugTouched = useTouched();
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveTerm(form);
      setName("");
      setSlug("");
      slugTouched.reset();
    });
  };

  return (
    <form onSubmit={onSubmit} className="rounded-md border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold">Novo termo</h3>
      <input type="hidden" name="taxonomy_id" value={taxonomyId} />
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_100px_auto]">
        <Input
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (!slugTouched.value) setSlug(slugify(e.target.value));
          }}
          placeholder="Nome"
          required
        />
        <Input
          name="slug"
          value={slug}
          onChange={(e) => {
            slugTouched.mark();
            setSlug(slugify(e.target.value));
          }}
          placeholder="slug"
          required
        />
        <Input name="sort_order" type="number" min={0} defaultValue={0} />
        <Button type="submit" size="sm" disabled={pending || !name}>
          {pending ? "…" : "Criar"}
        </Button>
      </div>
    </form>
  );
}

function useTouched() {
  const [touched, setTouched] = useState(false);
  return {
    value: touched,
    mark: () => setTouched(true),
    reset: () => setTouched(false),
  };
}
