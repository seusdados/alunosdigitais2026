import Link from "next/link";
import { notFound } from "next/navigation";

import { getMenu, listMenuItems } from "@/lib/db/queries/menus";

import { MenuDetail } from "./_components/menu-detail";

export default async function MenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const menu = await getMenu(id);
  if (!menu) notFound();
  const items = await listMenuItems(id);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{menu.label}</h1>
          <p className="text-xs text-muted-foreground">
            <span className="font-mono">{menu.code}</span> · local: {menu.location}
          </p>
        </div>
        <Link
          href="/admin/menus"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar
        </Link>
      </header>

      <MenuDetail menu={menu} items={items} />
    </div>
  );
}
