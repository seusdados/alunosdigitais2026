/**
 * Supabase schema types.
 *
 * These are handwritten while we cannot run `supabase gen types typescript`
 * from the sandbox (the proxy blocks api.supabase.com). Generated types will
 * replace this file once the CMS has its own tooling task and we can run the
 * CLI locally. Until then, expand this file as new tables are queried from
 * TypeScript code.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "super_admin" | "admin" | "editor" | "reviewer" | "analyst";

export type ContentStatus = "draft" | "in_review" | "scheduled" | "published" | "archived";

type RoleAssignmentsRow = {
  user_id: string;
  role: AppRole;
  created_at: string;
};

type ProfilesRow = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      role_assignments: {
        Row: RoleAssignmentsRow;
        Insert: Pick<RoleAssignmentsRow, "user_id" | "role"> &
          Partial<Pick<RoleAssignmentsRow, "created_at">>;
        Update: Partial<RoleAssignmentsRow>;
        Relationships: [];
      };
      profiles: {
        Row: ProfilesRow;
        Insert: Pick<ProfilesRow, "user_id"> & Partial<ProfilesRow>;
        Update: Partial<ProfilesRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin_user: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      has_role: {
        Args: { _role: AppRole };
        Returns: boolean;
      };
    };
    Enums: {
      app_role: AppRole;
      content_status: ContentStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
