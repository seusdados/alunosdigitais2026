"use client";

import { useTransition } from "react";

import type { AdminUser } from "@/lib/db/queries/users";
import type { AppRole } from "@/lib/db/types";
import { formatDateTime } from "@/lib/format";

import { setActive, toggleRole } from "../actions";

const ROLES: AppRole[] = ["super_admin", "admin", "editor", "reviewer", "analyst"];

export function UsersTable({ users }: { users: AdminUser[] }) {
  return (
    <div className="overflow-hidden rounded-md border bg-card">
      <table className="min-w-full divide-y text-sm">
        <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-2 font-medium">Usuário</th>
            <th className="px-4 py-2 font-medium">Papéis</th>
            <th className="px-4 py-2 font-medium">Ativo</th>
            <th className="px-4 py-2 font-medium">Desde</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                Nenhum usuário ainda.
              </td>
            </tr>
          ) : (
            users.map((u) => <UserRow key={u.user_id} user={u} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

function UserRow({ user }: { user: AdminUser }) {
  const [pending, startTransition] = useTransition();
  const hasRole = (role: AppRole) => user.roles.includes(role);

  const onToggleRole = (role: AppRole) => {
    startTransition(async () => {
      await toggleRole(user.user_id, role);
    });
  };

  const onToggleActive = () => {
    startTransition(async () => {
      await setActive(user.user_id, !user.is_active);
    });
  };

  return (
    <tr className="hover:bg-muted/30">
      <td className="px-4 py-3">
        <p className="font-medium">{user.full_name ?? user.email ?? "—"}</p>
        <p className="text-xs text-muted-foreground">
          {user.email ?? user.user_id}
          {user.job_title && ` · ${user.job_title}`}
        </p>
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onToggleRole(r)}
              disabled={pending}
              className={`rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset transition-colors disabled:opacity-50 ${
                hasRole(r)
                  ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
                  : "bg-muted/40 text-muted-foreground ring-border hover:bg-accent"
              }`}
              aria-pressed={hasRole(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={onToggleActive}
          disabled={pending}
          className={`rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
            user.is_active
              ? "bg-emerald-100 text-emerald-700 ring-emerald-200"
              : "bg-zinc-100 text-zinc-600 ring-zinc-200"
          }`}
        >
          {user.is_active ? "ativo" : "inativo"}
        </button>
      </td>
      <td className="px-4 py-3 text-xs text-muted-foreground">
        {formatDateTime(user.created_at)}
      </td>
    </tr>
  );
}
