import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">404</p>
      <h1 className="text-xl font-semibold tracking-tight">Registro não encontrado</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        O item que você tentou abrir não existe mais ou você não tem permissão para acessá-lo.
      </p>
      <Button asChild variant="outline">
        <Link href="/admin">Voltar ao dashboard</Link>
      </Button>
    </div>
  );
}
