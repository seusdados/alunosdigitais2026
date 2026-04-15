import Link from "next/link";

const primaryNav = [
  { href: "/programa", label: "Programa" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/para-escolas", label: "Para escolas" },
  { href: "/para-educadores", label: "Para educadores" },
  { href: "/para-familias", label: "Para famílias" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight">
          Alunos Digitais
        </Link>
        <nav className="hidden gap-6 text-sm md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/agende-uma-conversa"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Agendar conversa
        </Link>
      </div>
    </header>
  );
}
