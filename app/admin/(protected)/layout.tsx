import Link from "next/link";
import { Toaster } from "sonner";

import { requireAdmin } from "@/lib/auth/session";

import { AdminNav } from "./_components/admin-nav";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ctx = await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 flex-col border-r bg-muted/40 p-6 md:flex">
        <Link href="/admin" className="block text-lg font-semibold">
          Alunos Digitais
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Painel administrativo</p>

        <AdminNav />

        <div className="mt-auto space-y-3 pt-6">
          <div className="rounded-md border bg-card px-3 py-2 text-xs">
            <p className="truncate font-medium">{ctx.user.email}</p>
            <p className="mt-0.5 truncate text-muted-foreground">{ctx.roles.join(", ")}</p>
          </div>
          <form action="/admin/logout" method="post">
            <button
              type="submit"
              className="w-full rounded-md border px-3 py-2 text-xs font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}
