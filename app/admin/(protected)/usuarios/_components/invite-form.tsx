"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { inviteUser, type InviteState } from "../actions";

const initial: InviteState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Enviando…" : "Enviar convite"}
    </Button>
  );
}

export function InviteForm() {
  const [state, action] = useActionState(inviteUser, initial);

  return (
    <form
      action={action}
      className="grid gap-3 rounded-md border bg-card p-4 md:grid-cols-[1fr_1fr_160px_auto]"
    >
      <Input name="email" type="email" placeholder="colaborador@exemplo.com" required />
      <Input name="full_name" placeholder="Nome completo (opcional)" />
      <select
        name="role"
        defaultValue="editor"
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="super_admin">super_admin</option>
        <option value="admin">admin</option>
        <option value="editor">editor</option>
        <option value="reviewer">reviewer</option>
        <option value="analyst">analyst</option>
      </select>
      <SubmitButton />

      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive md:col-span-4"
        >
          {state.error}
        </p>
      )}
      {state.status === "success" && (
        <p
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800 md:col-span-4"
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
