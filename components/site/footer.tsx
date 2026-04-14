import Link from "next/link";

const footerLinks = [
  { href: "/politica-de-privacidade", label: "Política de privacidade" },
  { href: "/termos-de-uso", label: "Termos de uso" },
  { href: "/politica-de-cookies", label: "Política de cookies" },
  { href: "/acessibilidade", label: "Acessibilidade" },
];

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <div className="container flex flex-col items-start justify-between gap-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p>© {year} Alunos Digitais. Todos os direitos reservados.</p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
