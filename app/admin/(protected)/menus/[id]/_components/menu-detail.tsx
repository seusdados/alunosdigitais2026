"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MenuItemsRow, MenusRow } from "@/lib/db/types";

import { deleteMenu, deleteMenuItem, saveMenu, saveMenuItem } from "../../actions";

type Props = {
  menu: MenusRow;
  items: MenuItemsRow[];
};

export function MenuDetail({ menu, items }: Props) {
  return (
    <div className="space-y-6">
      <MenuHeader menu={menu} />
      <MenuItemsTable menuId={menu.id} items={items} />
      <NewItemForm menuId={menu.id} />
    </div>
  );
}

function MenuHeader({ menu }: { menu: MenusRow }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveMenu(form);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este menu? Todos os itens serão apagados.")) return;
    startTransition(async () => {
      await deleteMenu(menu.id);
    });
  };

  if (editing) {
    return (
      <form
        onSubmit={onSubmit}
        className="grid gap-3 rounded-md border bg-card p-4 sm:grid-cols-[1fr_1fr_1fr_auto]"
      >
        <input type="hidden" name="id" value={menu.id} />
        <Input name="label" defaultValue={menu.label} required />
        <Input name="code" defaultValue={menu.code} required />
        <Input name="location" defaultValue={menu.location} required />
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
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-accent"
      >
        Editar menu
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={pending}
        className="rounded-md border border-destructive/40 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 disabled:opacity-50"
      >
        Remover menu
      </button>
    </div>
  );
}

function MenuItemsTable({ menuId, items }: { menuId: string; items: MenuItemsRow[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <table className="min-w-full divide-y text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Rótulo</th>
            <th className="px-4 py-2 font-medium">Tipo</th>
            <th className="px-4 py-2 font-medium">Destino</th>
            <th className="px-4 py-2 font-medium">Ordem</th>
            <th className="px-4 py-2 font-medium">Visível</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                Nenhum item.
              </td>
            </tr>
          ) : (
            items.map((it) => <ItemRow key={it.id} item={it} menuId={menuId} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

function ItemRow({ item, menuId }: { item: MenuItemsRow; menuId: string }) {
  const [editing, setEditing] = useState(false);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    startTransition(async () => {
      await saveMenuItem(form);
      setEditing(false);
    });
  };

  const onDelete = () => {
    if (!window.confirm("Remover este item?")) return;
    startTransition(async () => {
      await deleteMenuItem(item.id, menuId);
    });
  };

  if (editing) {
    return (
      <tr>
        <td colSpan={6} className="px-4 py-3">
          <form
            onSubmit={onSubmit}
            className="grid gap-2 sm:grid-cols-[1.2fr_100px_1.5fr_80px_auto_auto]"
          >
            <input type="hidden" name="id" value={item.id} />
            <input type="hidden" name="menu_id" value={menuId} />
            <Input name="label" defaultValue={item.label} required />
            <select
              name="item_type"
              defaultValue={item.item_type}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="internal">Interno</option>
              <option value="external">Externo</option>
              <option value="content">Conteúdo</option>
            </select>
            <Input name="href" defaultValue={item.href ?? ""} placeholder="/caminho ou URL" />
            <Input name="sort_order" type="number" defaultValue={item.sort_order} />
            <label className="inline-flex items-center gap-2 text-xs">
              <input type="checkbox" name="is_visible" defaultChecked={item.is_visible} /> visível
            </label>
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
      <td className="px-4 py-3 font-medium">{item.label}</td>
      <td className="px-4 py-3 text-muted-foreground">{item.item_type}</td>
      <td className="px-4 py-3 text-muted-foreground">{item.href ?? "—"}</td>
      <td className="px-4 py-3 text-muted-foreground">{item.sort_order}</td>
      <td className="px-4 py-3 text-muted-foreground">{item.is_visible ? "sim" : "não"}</td>
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

function NewItemForm({ menuId }: { menuId: string }) {
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const el = e.currentTarget;
    startTransition(async () => {
      await saveMenuItem(form);
      el.reset();
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-2 rounded-md border bg-card p-4 sm:grid-cols-[1.2fr_100px_1.5fr_80px_auto]"
    >
      <input type="hidden" name="menu_id" value={menuId} />
      <Input name="label" placeholder="Novo item — rótulo" required />
      <select
        name="item_type"
        defaultValue="internal"
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
      >
        <option value="internal">Interno</option>
        <option value="external">Externo</option>
        <option value="content">Conteúdo</option>
      </select>
      <Input name="href" placeholder="/caminho ou URL" />
      <Input name="sort_order" type="number" min={0} defaultValue={0} />
      <Button type="submit" size="sm" disabled={pending}>
        {pending ? "…" : "Adicionar"}
      </Button>
    </form>
  );
}
