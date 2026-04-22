"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";

import { updateLeadNotes } from "../../actions";

export function NotesForm({ id, defaultValue }: { id: string; defaultValue: string }) {
  const [notes, setNotes] = useState(defaultValue);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await updateLeadNotes(id, form);
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-2 rounded-md border bg-card p-4">
      <label htmlFor="notes" className="text-sm font-semibold">
        Notas internas
      </label>
      <textarea
        id="notes"
        name="notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
      />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "Salvando…" : "Salvar notas"}
      </Button>
    </form>
  );
}
