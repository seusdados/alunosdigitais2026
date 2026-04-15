import type { Metadata } from "next";

// Belt-and-suspenders: block indexing of every admin page via metadata AND
// via X-Robots-Tag header set by middleware.ts. This layout wraps both the
// unauthenticated routes (login) and the protected routes — the protected
// sidebar/shell lives in `(protected)/layout.tsx`.
export const metadata: Metadata = {
  title: {
    default: "Admin — Alunos Digitais",
    template: "%s — Alunos Digitais",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
