import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/site/container";
import { companyInfo, contactInfo, footerColumns, legalLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white">
      <Container className="grid gap-12 py-14 md:grid-cols-2 md:gap-10 md:py-[56px] lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] lg:gap-9">
        {/* Coluna 1 — Logo + dados institucionais */}
        <div className="space-y-5">
          <Link href="/" aria-label="Alunos Digitais — página inicial" className="inline-flex">
            <Image
              src="/brand/logo/logo-horizontal-dark.png"
              alt="Alunos Digitais"
              width={1411}
              height={211}
              className="h-10 w-auto"
            />
          </Link>
          <div className="space-y-2 font-body text-[12.5px] leading-[1.6] text-white/45">
            <p className="font-medium text-white/70">{companyInfo.legalName}</p>
            <p>CNPJ: {companyInfo.cnpj}</p>
            <p>{companyInfo.address}</p>
            <p>{companyInfo.phone}</p>
          </div>
        </div>

        {/* Coluna 2 — Contato */}
        <nav aria-label="Contato">
          <p className="mb-[18px] font-display text-[14px] font-semibold text-white/80">Contato</p>
          <ul className="space-y-3">
            <li>
              <a
                href={contactInfo.phone.href}
                className="font-body text-[13.5px] text-white/55 transition-colors hover:text-white"
              >
                {contactInfo.phone.label}
              </a>
            </li>
            <li>
              <a
                href={contactInfo.email.href}
                className="break-all font-body text-[13.5px] text-white/55 transition-colors hover:text-white"
              >
                {contactInfo.email.label}
              </a>
            </li>
          </ul>
        </nav>

        {/* Colunas 3-5 — Programa / Para / Conteúdo */}
        {footerColumns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <p className="mb-[18px] font-display text-[14px] font-semibold text-white/80">
              {col.title}
            </p>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-[13.5px] text-white/45 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>

      {/* Bottom bar — copyright + links legais */}
      <div className="border-t border-white/5 bg-navy-900">
        <Container className="flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between md:py-[18px]">
          <p className="font-body text-[12px] text-white/30">
            © {new Date().getFullYear()} Alunos Digitais — Uma iniciativa SeusDados. Todos os
            direitos reservados.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-[12px] text-white/40 transition-colors hover:text-white/80"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  );
}
