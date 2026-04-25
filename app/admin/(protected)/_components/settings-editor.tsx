"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SiteSettingsRow } from "@/lib/db/types";
import { formatDateTime } from "@/lib/format";

import { deleteSetting, saveSetting } from "../_lib/settings-actions";

type Props = {
  settings: SiteSettingsRow[];
  defaultKeys?: Array<{ key: string; hint?: string; isPublic?: boolean }>;
};

function formatValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

export function SettingsEditor({ settings, defaultKeys = [] }: Props) {
  const existingKeys = new Set(settings.map((s) => s.key));
  const missing = defaultKeys.filter((d) => !existingKeys.has(d.key));

  return (
    <div className="space-y-6">
      <NewSettingForm defaultKeys={defaultKeys} />

      {missing.length > 0 && (
        <div className="rounded-md border border-dashed bg-muted/20 p-4 text-xs text-muted-foreground">
          <p className="mb-2 font-medium text-foreground">Chaves sugeridas não preenchidas</p>
          <ul className="space-y-1">
            {missing.map((m) => (
              <li key={m.key}>
                <span className="font-mono">{m.key}</span>
                {m.hint && ` — ${m.hint}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      {settings.length === 0 ? (
        <p className="rounded-md border bg-card p-6 text-center text-sm text-muted-foreground">
          Nenhuma chave configurada ainda.
        </p>
      ) : (
        <ul className="space-y-3">
          {settings.map((s) => (
            <SettingItem key={s.key} setting={s} />
          ))}
        </ul>
      )}
    </div>
  );
}

function SettingItem({ setting }: { setting: SiteSettingsRow }) {
  const [value, setValue] = useState(formatValue(setting.value_json));
  const [isPublic, setIsPublic] = useState(setting.is_public);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveSetting(form);
    });
  };

  const onDelete = () => {
    if (!window.confirm(`Remover a chave ${setting.key}?`)) return;
    startTransition(async () => {
      await deleteSetting(setting.key);
    });
  };

  return (
    <li className="rounded-md border bg-card p-4">
      <form onSubmit={onSubmit} className="space-y-3">
        <header className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate font-mono text-sm font-medium">{setting.key}</p>
            <p className="text-xs text-muted-foreground">
              atualizado {formatDateTime(setting.updated_at)}
            </p>
          </div>
          <label className="inline-flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              name="is_public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />{" "}
            exposição pública
          </label>
        </header>
        <input type="hidden" name="key" value={setting.key} />
        <textarea
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={Math.min(10, Math.max(3, value.split("\n").length))}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
        />
        <p className="text-[11px] text-muted-foreground">
          Aceita JSON válido (objeto, array, número, booleano, string). Conteúdos puros sem aspas
          são persistidos como string.
        </p>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onDelete}
            disabled={pending}
            className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
          >
            Remover
          </button>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "Salvando…" : "Salvar"}
          </Button>
        </div>
      </form>
    </li>
  );
}

function NewSettingForm({
  defaultKeys,
}: {
  defaultKeys: Array<{ key: string; hint?: string; isPublic?: boolean }>;
}) {
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    startTransition(async () => {
      await saveSetting(form);
      el.reset();
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3 rounded-md border bg-card p-4">
      <h2 className="text-sm font-semibold">Nova chave</h2>
      <div className="grid gap-3 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)_auto]">
        <div className="space-y-1">
          <Input name="key" placeholder="ex.: site.title" required list="setting-suggestions" />
          {defaultKeys.length > 0 && (
            <datalist id="setting-suggestions">
              {defaultKeys.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.hint}
                </option>
              ))}
            </datalist>
          )}
        </div>
        <textarea
          name="value"
          rows={3}
          placeholder='valor em JSON ou string. Ex.: "Alunos Digitais" ou {"title":"..."}'
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-xs"
        />
        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-xs">
            <input type="checkbox" name="is_public" /> pública
          </label>
          <Button type="submit" size="sm" disabled={pending}>
            {pending ? "…" : "Salvar"}
          </Button>
        </div>
      </div>
    </form>
  );
}
