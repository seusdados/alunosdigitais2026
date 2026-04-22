import { listRedirects } from "@/lib/db/queries/redirects";

import { RedirectsTable } from "./_components/redirects-table";

export default async function RedirectsPage() {
  const redirects = await listRedirects();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Redirects</h1>
        <p className="text-sm text-muted-foreground">
          Redirecionamentos 301/302/307/308 editáveis pelo CMS para cobrir mudanças de URL.
        </p>
      </header>

      <RedirectsTable redirects={redirects} />
    </div>
  );
}
