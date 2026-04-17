"use server";

import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2, "Informe seu nome."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().optional(),
  organizationName: z.string().optional(),
  jobTitle: z.string().optional(),
  city: z.string().optional(),
  message: z.string().optional(),
});

export type ContactFormState =
  | { status: "idle" }
  | {
      status: "error";
      error?: string;
      fieldErrors?: Partial<Record<keyof z.infer<typeof schema>, string>>;
    }
  | { status: "success" };

/**
 * Envio de interesse de contato / lead qualificado.
 *
 * Fase atual (site público inicial): apenas valida + loga no servidor.
 * Persistência em `public.leads` fica condicionada à conclusão do relatório
 * de compatibilização com o LMS (ver docs/analise-convergencia-lms.md
 * seção 12). Quando desbloquear, troca-se só o corpo desta função — o
 * schema e o contrato com o client não mudam.
 */
export async function submitContactLead(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = schema.safeParse({
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    phone: formData.get("phone") ?? "",
    organizationName: formData.get("organizationName") ?? "",
    jobTitle: formData.get("jobTitle") ?? "",
    city: formData.get("city") ?? "",
    message: formData.get("message") ?? "",
  });

  if (!parsed.success) {
    const fieldErrors: NonNullable<Extract<ContactFormState, { status: "error" }>["fieldErrors"]> =
      {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") {
        fieldErrors[key as keyof typeof fieldErrors] = issue.message;
      }
    }
    return { status: "error", fieldErrors };
  }

  // TODO (após desbloqueio do relatório LMS): persistir em public.leads
  // via createAdminClient() em lib/db/admin.ts.
  console.info("[contact] new lead (not persisted yet)", {
    email: parsed.data.email,
    organization: parsed.data.organizationName,
  });

  return { status: "success" };
}
