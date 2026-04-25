"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[admin] unhandled error", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 text-center">
      <div className="max-w-md space-y-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Algo deu errado
        </p>
        <h1 className="text-xl font-semibold tracking-tight">Não conseguimos exibir esta página</h1>
        <p className="text-sm text-muted-foreground">
          {error.message || "Erro inesperado no painel administrativo."}
          {error.digest && (
            <span className="ml-2 font-mono text-xs text-muted-foreground/70">
              (ref: {error.digest})
            </span>
          )}
        </p>
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" asChild>
          <Link href="/admin">Voltar ao dashboard</Link>
        </Button>
        <Button type="button" onClick={() => reset()}>
          Tentar novamente
        </Button>
      </div>
    </div>
  );
}
