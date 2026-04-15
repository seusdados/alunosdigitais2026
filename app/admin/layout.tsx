import type { Metadata } from "next";
import Link from "next/link";

// Belt-and-suspenders: block indexing of every admin page via metadata AND
// via X-Robots-Tag header set by middleware.ts.
export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 shrink-0 border-r bg-muted/40 p-6 md:block">
        <Link href="/admin" className="block text-lg font-semibold">
          Alunos Digitais
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Painel administrativo</p>
        <nav className="mt-8 space-y-1 text-sm">
          {/* Navegação real chega na Fase 3 (CMS). */}
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Dashboard
          </span>
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Conteúdos
          </span>
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Mídia
          </span>
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Taxonomias
          </span>
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Formulários
          </span>
          <span className="block rounded px-3 py-2 text-muted-foreground">
            Leads
          </span>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
