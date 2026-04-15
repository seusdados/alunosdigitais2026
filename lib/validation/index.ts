import { z } from "zod";

/**
 * Shared Zod schemas used across server actions, route handlers and forms.
 * Keep them small and composable — domain-specific schemas should live close
 * to their feature (e.g. `lib/cms/schemas.ts` in Fase 3).
 */
export const emailSchema = z.string().trim().email({ message: "E-mail inválido." });

export const phoneSchema = z
  .string()
  .trim()
  .min(8, { message: "Telefone muito curto." })
  .max(20, { message: "Telefone muito longo." });

export const nonEmptyString = z.string().trim().min(1, { message: "Campo obrigatório." });
