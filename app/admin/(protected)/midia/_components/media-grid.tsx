"use client";

import Image from "next/image";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateTime } from "@/lib/format";

import { deleteMediaAsset, updateMediaAsset } from "../actions";

type MediaItem = {
  id: string;
  bucket: string;
  path: string;
  file_name: string;
  title: string | null;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  created_at: string;
  publicUrl: string | null;
};

function isImage(mime: string | null): boolean {
  return !!mime && mime.startsWith("image/");
}

function humanSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function MediaGrid({ items }: { items: MediaItem[] }) {
  const [active, setActive] = useState<MediaItem | null>(null);

  if (items.length === 0) {
    return (
      <div className="rounded-md border bg-card p-10 text-center text-sm text-muted-foreground">
        Nenhuma mídia ainda.
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="group overflow-hidden rounded-md border bg-card shadow-sm"
          >
            <button
              type="button"
              onClick={() => setActive(item)}
              className="block aspect-square w-full overflow-hidden bg-muted"
            >
              {isImage(item.mime_type) && item.publicUrl ? (
                <Image
                  src={item.publicUrl}
                  alt={item.alt_text ?? item.title ?? item.file_name}
                  width={item.width ?? 400}
                  height={item.height ?? 400}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                  {item.mime_type ?? "arquivo"}
                </div>
              )}
            </button>
            <div className="space-y-0.5 p-2 text-xs">
              <p className="truncate font-medium">{item.title ?? item.file_name}</p>
              <p className="truncate text-muted-foreground">{item.bucket}</p>
            </div>
          </li>
        ))}
      </ul>

      {active && (
        <MediaDetailModal
          item={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}

function MediaDetailModal({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const [pendingDelete, startDelete] = useTransition();
  const [pendingSave, startSave] = useTransition();
  const [title, setTitle] = useState(item.title ?? "");
  const [alt, setAlt] = useState(item.alt_text ?? "");

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.set("id", item.id);
    form.set("title", title);
    form.set("alt_text", alt);
    startSave(async () => {
      await updateMediaAsset(form);
      onClose();
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este arquivo? Esta ação é permanente.")) return;
    startDelete(async () => {
      await deleteMediaAsset(item.id);
      onClose();
    });
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-full w-full max-w-2xl overflow-auto rounded-lg bg-card shadow-xl">
        <header className="flex items-center justify-between border-b p-4">
          <h3 className="text-sm font-semibold">Detalhes do arquivo</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded px-2 py-1 text-sm text-muted-foreground hover:bg-accent"
          >
            Fechar
          </button>
        </header>
        <div className="grid gap-4 p-4 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-md border bg-muted">
            {isImage(item.mime_type) && item.publicUrl ? (
              <Image
                src={item.publicUrl}
                alt={item.alt_text ?? item.title ?? item.file_name}
                width={item.width ?? 800}
                height={item.height ?? 800}
                className="h-auto w-full"
                unoptimized
              />
            ) : (
              <div className="flex aspect-square items-center justify-center text-xs text-muted-foreground">
                {item.mime_type ?? "arquivo"}
              </div>
            )}
          </div>
          <form className="space-y-3" onSubmit={onSave}>
            <dl className="space-y-1 text-xs text-muted-foreground">
              <div className="flex justify-between gap-4">
                <dt>Arquivo</dt>
                <dd className="truncate text-right">{item.file_name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Bucket/path</dt>
                <dd className="truncate text-right">{`${item.bucket}/${item.path}`}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Tamanho</dt>
                <dd>{humanSize(item.size_bytes)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Enviado em</dt>
                <dd>{formatDateTime(item.created_at)}</dd>
              </div>
              {item.publicUrl && (
                <div className="flex justify-between gap-4">
                  <dt>URL pública</dt>
                  <dd className="truncate text-right">
                    <a
                      href={item.publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline"
                    >
                      abrir
                    </a>
                  </dd>
                </div>
              )}
            </dl>

            <label className="block space-y-1 text-sm">
              <span className="text-xs font-medium">Título</span>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>
            <label className="block space-y-1 text-sm">
              <span className="text-xs font-medium">Texto alternativo</span>
              <Input value={alt} onChange={(e) => setAlt(e.target.value)} />
            </label>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={onDelete}
                disabled={pendingDelete}
                className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
              >
                {pendingDelete ? "Removendo…" : "Remover"}
              </button>
              <Button type="submit" disabled={pendingSave}>
                {pendingSave ? "Salvando…" : "Salvar"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
