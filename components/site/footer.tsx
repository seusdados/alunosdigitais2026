import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { footerColumns } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <Container className="grid gap-10 py-12 md:grid-cols-4 md:gap-7 md:py-[40px]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/logo/logo-icon.svg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="font-display text-[17px] font-bold tracking-tight">
              Alunos Digitais
            </span>
          </div>
          <p className="max-w-[280px] font-body text-[13px] leading-[1.65] text-white/45">
            Programa contínuo de educação digital e cidadania digital para todo o Ensino
            Fundamental.
          </p>
        </div>

        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title} className="space-y-3">
            <p className="font-display text-[13px] font-semibold text-white/80">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[12.5px] text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-white/5 bg-navy-900">
        <Container className="flex flex-col gap-2 py-4 md:flex-row md:items-center md:justify-between md:py-[16px]">
          <p className="font-body text-[11.5px] text-white/25">
            © {new Date().getFullYear()} Alunos Digitais. Todos os direitos reservados.
          </p>
          <p className="font-body text-[11.5px] text-white/25">
            Uma iniciativa SeusDados · Conteúdo curricular em parceria com educadores
          </p>
        </Container>
      </div>
    </footer>
  );
}
