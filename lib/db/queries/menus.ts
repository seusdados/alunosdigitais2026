import "server-only";

import { createClient } from "@/lib/db/server";
import type { MenuItemsRow, MenusRow } from "@/lib/db/types";

export async function listMenus(): Promise<MenusRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .order("code", { ascending: true })
    .returns<MenusRow[]>();
  if (error) {
    console.error("[menus] list", error);
    return [];
  }
  return data ?? [];
}

export async function getMenu(id: string): Promise<MenusRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("id", id)
    .maybeSingle<MenusRow>();
  if (error) {
    console.error("[menus] get", error);
    return null;
  }
  return data ?? null;
}

export async function listMenuItems(menuId: string): Promise<MenuItemsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("menu_id", menuId)
    .order("sort_order", { ascending: true })
    .returns<MenuItemsRow[]>();
  if (error) {
    console.error("[menu_items] list", error);
    return [];
  }
  return data ?? [];
}
