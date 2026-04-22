import type { Json } from "@/lib/db/types";

/**
 * Walks a Tiptap JSON document and concatenates all `text` nodes into a plain
 * string. Used to populate `content_revisions.plain_text` for search.
 */
export function extractPlainText(node: Json | null | undefined): string {
  if (!node) return "";
  const parts: string[] = [];
  const visit = (n: Json): void => {
    if (!n || typeof n !== "object" || Array.isArray(n)) {
      if (Array.isArray(n)) n.forEach(visit);
      return;
    }
    const obj = n as { [key: string]: Json | undefined };
    if (typeof obj.text === "string") parts.push(obj.text);
    const content = obj.content;
    if (Array.isArray(content)) content.forEach(visit);
  };
  visit(node);
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
