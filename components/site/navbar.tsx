"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Container } from "@/components/site/container";
import { SiteButton } from "@/components/site/site-button";
import { primaryNav, headerCta } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-800/95 backdrop-blur supports-[backdrop-filter]:bg-navy-800/85">
      <Container as="nav" className="flex h-[62px] items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/brand/logo/logo-icon.svg"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[17px] font-bold tracking-tight text-white">
              Alunos Digitais
            </span>
            <span className="mt-0.5 font-body text-[9px] font-medium uppercase tracking-widest text-white/30">
              Programa educacional
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3.5 py-2 font-body text-[13px] transition-colors",
                    active
                      ? "bg-white/5 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <SiteButton href={headerCta.href} variant="primary" className="h-10 px-5 text-[13px]">
            {headerCta.label}
          </SiteButton>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </Container>

      {/* Mobile menu panel */}
      {open ? (
        <div className="lg:hidden">
          <Container className="flex flex-col gap-1 border-t border-white/5 bg-navy-800 py-4">
            {primaryNav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2.5 font-body text-[14px]",
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <SiteButton href={headerCta.href} variant="primary" className="mt-3 w-full">
              {headerCta.label}
            </SiteButton>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
