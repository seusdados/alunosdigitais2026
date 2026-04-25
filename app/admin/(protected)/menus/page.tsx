import Link from "next/link";

import { Button } from "@/components/ui/button";
import { listMenus } from "@/lib/db/queries/menus";

import { NewMenuForm } from "./_components/new-menu-form";

export default async function MenusPage() {
  const menus = await listMenus();
  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Menus</h1>
          <p className="text-sm text-muted-foreground">
            Estruturas de navegação do site (header, footer, etc.) editáveis pelo CMS.
          </p>
        </div>
      </header>

      <NewMenuForm />

      <div className="overflow-hidden rounded-md border bg-card">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Menu</th>
              <th className="px-4 py-2 font-medium">Código</th>
              <th className="px-4 py-2 font-medium">Local</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {menus.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  Nenhum menu ainda.
                </td>
              </tr>
            ) : (
              menus.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{m.label}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.code}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.location}</td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/menus/${m.id}`}>Abrir →</Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
