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

export type ContentType =
  | "page"
  | "landing_page"
  | "blog_post"
  | "theme"
  | "curriculum_unit"
  | "library_item"
  | "testimonial"
  | "faq"
  | "team_member"
  | "partner"
  | "event";

export type LeadStatus = "new" | "qualified" | "contacted" | "won" | "lost" | "spam";

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

type ContentItemsRow = {
  id: string;
  type: ContentType;
  locale: string;
  slug: string;
  path: string;
  title: string;
  subtitle: string | null;
  excerpt: string | null;
  status: ContentStatus;
  template_key: string;
  hero_media_id: string | null;
  author_user_id: string | null;
  owner_user_id: string | null;
  seo_title: string | null;
  seo_description: string | null;
  canonical_url: string | null;
  og_media_id: string | null;
  noindex: boolean;
  nofollow: boolean;
  schema_json: Json;
  settings_json: Json;
  search_text: string | null;
  current_version_number: number;
  published_version_number: number | null;
  published_at: string | null;
  first_published_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

type LeadsRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  organization_name: string | null;
  job_title: string | null;
  city: string | null;
  state: string | null;
  interest_area: string | null;
  message: string | null;
  status: LeadStatus;
  source: string | null;
  campaign: string | null;
  notes: string | null;
  first_submission_at: string | null;
  last_submission_at: string | null;
  created_at: string;
  updated_at: string;
};

type RedirectsRow = {
  id: string;
  source_path: string;
  target_path: string;
  redirect_type: 301 | 302 | 307 | 308;
  is_active: boolean;
  notes: string | null;
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
      content_items: {
        Row: ContentItemsRow;
        Insert: Pick<ContentItemsRow, "type" | "slug" | "path" | "title"> &
          Partial<ContentItemsRow>;
        Update: Partial<ContentItemsRow>;
        Relationships: [];
      };
      leads: {
        Row: LeadsRow;
        Insert: Partial<LeadsRow>;
        Update: Partial<LeadsRow>;
        Relationships: [];
      };
      redirects: {
        Row: RedirectsRow;
        Insert: Pick<RedirectsRow, "source_path" | "target_path" | "redirect_type"> &
          Partial<RedirectsRow>;
        Update: Partial<RedirectsRow>;
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
      content_type: ContentType;
      lead_status: LeadStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
