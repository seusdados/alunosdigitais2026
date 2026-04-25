"use client";

import { useTransition } from "react";

import { deleteContentItem } from "../actions";

export function DeleteContentButton({ id }: { id: string }) {
  const [pending, startTransition] = useTransition();

  const onClick = () => {
    if (!window.confirm("Apagar este conteúdo? Todas as revisões serão removidas.")) return;
    startTransition(async () => {
      await deleteContentItem(id);
    });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={pending}
      className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
    >
      {pending ? "Apagando…" : "Apagar"}
    </button>
  );
}
