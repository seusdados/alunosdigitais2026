import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";

import { OrganizationSchema, WebSiteSchema } from "@/lib/seo/structured-data";

import "./globals.css";

// Fontes do brand (docs/brand/tipografia.md).
// DM Sans é usado como `--font-sans` também para que os componentes shadcn
// herdem a mesma fonte do corpo do site — evita divergência entre admin e
// site público.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  style: ["normal", "italic"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  style: ["normal", "italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Alunos Digitais",
    template: "%s | Alunos Digitais",
  },
  description:
    "Programa de cidadania digital, privacidade, segurança online e educação midiática para escolas, educadores e famílias.",
  applicationName: "Alunos Digitais",
  authors: [{ name: "Alunos Digitais" }],
  keywords: [
    "educação digital",
    "cidadania digital",
    "BNCC",
    "Ensino Fundamental",
    "formação docente",
    "PNED",
    "ECA Digital",
    "programa educacional",
  ],
  openGraph: {
    siteName: "Alunos Digitais",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/brand/ilustracoes/illo-01-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Alunos Digitais — programa de educação digital para o Ensino Fundamental",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alunos Digitais",
    description:
      "Programa contínuo de educação digital e cidadania digital para todo o Ensino Fundamental.",
    images: ["/brand/ilustracoes/illo-01-hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/logo/logo-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/logo/logo-icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
        <OrganizationSchema />
        <WebSiteSchema />
      </body>
    </html>
  );
}
