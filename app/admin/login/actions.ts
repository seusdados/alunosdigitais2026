"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/db/server";

const signInSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres."),
});

export type SignInState = {
  error?: string;
  fieldErrors?: Partial<Record<"email" | "password", string>>;
};

export async function signInAction(
  _prevState: SignInState,
  formData: FormData,
): Promise<SignInState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors: SignInState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "email" || key === "password") {
        fieldErrors[key] = issue.message;
      }
    }
    return { fieldErrors };
  }

  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error || !data.user) {
    return { error: "E-mail ou senha incorretos." };
  }

  // Verifica se o usuário tem alguma role no admin antes de manter a sessão.
  const { data: roles, error: rolesError } = await supabase
    .from("role_assignments")
    .select("role")
    .eq("user_id", data.user.id)
    .returns<{ role: string }[]>();

  if (rolesError) {
    await supabase.auth.signOut();
    return { error: "Falha ao verificar permissões. Tente novamente." };
  }

  if (!roles || roles.length === 0) {
    await supabase.auth.signOut();
    return {
      error: "Sua conta não tem acesso ao painel administrativo. Fale com um administrador.",
    };
  }

  redirect("/admin");
}
