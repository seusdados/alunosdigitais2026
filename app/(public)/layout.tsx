import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import { Footer } from "@/components/site/footer";
import { NavBar } from "@/components/site/navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-site-white text-site-text">
      <GoogleTagManager />
      <NavBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
