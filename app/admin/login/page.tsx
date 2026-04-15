import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCurrentUser, getRolesForUser } from "@/lib/auth/session";

import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar — Admin",
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<{ error?: string }>;

export default async function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  const user = await getCurrentUser();
  if (user) {
    const roles = await getRolesForUser(user.id);
    if (roles.length > 0) {
      redirect("/admin");
    }
  }

  const { error } = await searchParams;
  const notAuthorized = error === "not_authorized";

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-lg border bg-card p-8 shadow-sm">
        <header className="mb-6 space-y-1">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground"
          >
            Alunos Digitais
          </Link>
          <h1 className="text-xl font-semibold tracking-tight">Entrar no painel</h1>
          <p className="text-sm text-muted-foreground">
            Acesso restrito a administradores e editores.
          </p>
        </header>

        <LoginForm notAuthorized={notAuthorized} />
      </div>
    </div>
  );
}
