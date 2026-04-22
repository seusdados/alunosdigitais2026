"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { saveForm } from "../actions";

export function NewFormDialog() {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveForm(form);
      setOpen(false);
    });
  };

  if (!open) {
    return (
      <div>
        <Button onClick={() => setOpen(true)}>Novo formulário</Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-3 rounded-md border bg-card p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
    >
      <Input name="name" placeholder="Nome" required />
      <Input name="code" placeholder="Código (slug)" required />
      <Input name="destination_email" type="email" placeholder="E-mail destino (opcional)" />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-muted-foreground"
        >
          Cancelar
        </button>
        <Button type="submit" size="sm" disabled={pending}>
          {pending ? "…" : "Criar"}
        </Button>
      </div>
    </form>
  );
}
