"use client";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import type { LeadStatus } from "@/lib/db/types";

import { deleteLead, updateLeadStatus } from "../../actions";

const OPTIONS: Array<{ value: LeadStatus; label: string }> = [
  { value: "new", label: "Novo" },
  { value: "qualified", label: "Qualificado" },
  { value: "contacted", label: "Contatado" },
  { value: "won", label: "Ganho" },
  { value: "lost", label: "Perdido" },
  { value: "spam", label: "Spam" },
];

export function LeadActions({ id, status }: { id: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();

  const onStatusChange = (next: LeadStatus) => {
    startTransition(async () => {
      await updateLeadStatus(id, next);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Apagar este lead permanentemente?")) return;
    startTransition(async () => {
      await deleteLead(id);
    });
  };

  return (
    <div className="space-y-3 rounded-md border bg-card p-4">
      <h3 className="text-sm font-semibold">Status</h3>
      <select
        value={status}
        disabled={pending}
        onChange={(e) => onStatusChange(e.target.value as LeadStatus)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending || status === "contacted"}
          onClick={() => onStatusChange("contacted")}
        >
          Marcar contatado
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={pending || status === "lost"}
          onClick={() => onStatusChange("lost")}
        >
          Arquivar
        </Button>
      </div>

      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="mt-2 w-full rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
      >
        Apagar
      </button>
    </div>
  );
}
