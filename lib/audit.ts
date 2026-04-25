import "server-only";

import { createClient } from "@/lib/db/server";
import type { Json } from "@/lib/db/types";

export type AuditAction =
  | "content.create"
  | "content.update"
  | "content.delete"
  | "content.publish"
  | "media.upload"
  | "media.update"
  | "media.delete"
  | "taxonomy.save"
  | "taxonomy.delete"
  | "term.save"
  | "term.delete"
  | "menu.save"
  | "menu.delete"
  | "menu_item.save"
  | "menu_item.delete"
  | "form.save"
  | "form.delete"
  | "form_field.save"
  | "form_field.delete"
  | "lead.update"
  | "lead.delete"
  | "redirect.save"
  | "redirect.delete"
  | "setting.save"
  | "setting.delete"
  | "user.invite"
  | "user.role_toggle"
  | "user.set_active";

type LogOptions = {
  entityId?: string | null;
  metadata?: Record<string, Json>;
  actorUserId?: string | null;
};

/**
 * Records an admin action to `public.audit_logs`.
 *
 * Failures are swallowed and only logged to the server console — audit writes
 * must never break the caller's flow. If you need stronger guarantees later,
 * move this to a database trigger.
 */
export async function logAudit(
  action: AuditAction,
  entityType: string,
  opts: LogOptions = {},
): Promise<void> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("audit_logs").insert({
      action,
      entity_type: entityType,
      entity_id: opts.entityId ?? null,
      actor_user_id: opts.actorUserId ?? null,
      metadata: (opts.metadata ?? {}) as Json,
    });
    if (error) console.error("[audit] insert", error);
  } catch (err) {
    console.error("[audit] unexpected", err);
  }
}
