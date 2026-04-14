/**
 * Placeholder for generated Supabase types.
 *
 * In Fase 2 we will run:
 *   supabase gen types typescript --project-id <ref> --schema public > lib/db/types.ts
 *
 * For now we export a minimal `Database` shape so that the Supabase clients
 * compile without errors. Replace the whole contents of this file with the
 * generated output once the CLI is wired up.
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: Record<string, never>;
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
