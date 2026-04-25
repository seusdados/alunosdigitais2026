"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { uploadMedia, type MediaUploadState } from "../actions";

const initialState: MediaUploadState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Enviando…" : "Enviar"}
    </Button>
  );
}

export function MediaUploadForm() {
  const [state, formAction] = useActionState(uploadMedia, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3 rounded-md border bg-card p-4">
      <h2 className="text-sm font-semibold">Novo upload</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-xs font-medium">Arquivo</span>
          <Input type="file" name="file" required />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium">Bucket</span>
          <select
            name="bucket"
            defaultValue="site-public"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="site-public">site-public</option>
            <option value="og-images">og-images</option>
            <option value="documents">documents</option>
            <option value="cms-private">cms-private</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium">Título (opcional)</span>
          <Input name="title" maxLength={200} />
        </label>
        <label className="space-y-1">
          <span className="text-xs font-medium">Texto alternativo</span>
          <Input name="alt_text" maxLength={240} />
        </label>
      </div>

      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </p>
      )}
      {state.status === "success" && (
        <p
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          Arquivo enviado.
        </p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
