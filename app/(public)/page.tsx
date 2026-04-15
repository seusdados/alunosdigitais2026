import Link from "next/link";

export default function HomePage() {
  return (
    <section className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Alunos Digitais
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-6xl">
          Cidadania digital para escolas, educadores e famílias.
        </h1>
        <p className="mt-6 text-pretty text-lg text-muted-foreground">
          Este é o esqueleto do novo site e CMS do Alunos Digitais. O conteúdo real, as páginas
          institucionais e o editor administrativo serão entregues nas próximas fases do projeto.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/agende-uma-conversa"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Agende uma conversa
          </Link>
          <Link
            href="/programa"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Conheça o programa
          </Link>
        </div>
      </div>
    </section>
  );
}
