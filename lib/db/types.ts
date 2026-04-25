/**
 * Supabase schema types.
 *
 * Handwritten types mirroring supabase/migrations/20260414120000_initial_schema.sql.
 * These drive the CMS code paths. When `supabase gen types typescript` can be
 * run from this sandbox, this file can be replaced by the generated output,
 * but the exported aliases below (Database, ContentItemsRow, etc.) are what
 * the application code imports — keep them stable.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "super_admin" | "admin" | "editor" | "reviewer" | "analyst";

export type ContentStatus = "draft" | "in_review" | "scheduled" | "published" | "archived";

export type ContentType =
  | "page"
  | "landing_page"
  | "article"
  | "resource"
  | "case_study"
  | "faq"
  | "legal_page"
  | "curriculum_unit";

export type LeadStatus = "new" | "qualified" | "contacted" | "won" | "lost" | "spam";

export type AssetVisibility = "public" | "private" | "signed";

type Timestamps = { created_at: string; updated_at: string };

export type RoleAssignmentsRow = {
  user_id: string;
  role: AppRole;
  created_at: string;
};

export type ProfilesRow = {
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  job_title: string | null;
  is_active: boolean;
} & Timestamps;

export type MediaAssetsRow = {
  id: string;
  bucket: "site-public" | "documents" | "og-images" | "cms-private";
  path: string;
  file_name: string;
  title: string | null;
  alt_text: string | null;
  mime_type: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  visibility: AssetVisibility;
  metadata: Json;
  uploaded_by: string | null;
} & Timestamps;

export type TaxonomiesRow = {
  id: string;
  code: string;
  label: string;
  description: string | null;
  sort_order: number;
} & Timestamps;

export type TermsRow = {
  id: string;
  taxonomy_id: string;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
} & Timestamps;

export type AudienceSegmentsRow = {
  id: string;
  code: string;
  label: string;
  description: string | null;
} & Timestamps;

export type ContentItemsRow = {
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
} & Timestamps;

export type ContentRevisionsRow = {
  id: string;
  content_item_id: string;
  version_number: number;
  editor_json: Json;
  render_html: string | null;
  plain_text: string | null;
  summary: string | null;
  change_note: string | null;
  created_by: string | null;
  created_at: string;
};

export type ContentTermMapRow = {
  content_item_id: string;
  term_id: string;
};

export type ContentAudienceMapRow = {
  content_item_id: string;
  audience_segment_id: string;
};

export type ContentRelationsRow = {
  source_content_id: string;
  target_content_id: string;
  relation_type: string;
  sort_order: number;
};

export type MenusRow = {
  id: string;
  code: string;
  label: string;
  location: string;
} & Timestamps;

export type MenuItemsRow = {
  id: string;
  menu_id: string;
  parent_id: string | null;
  label: string;
  item_type: "internal" | "external" | "content";
  href: string | null;
  content_item_id: string | null;
  target: string | null;
  sort_order: number;
  is_visible: boolean;
} & Timestamps;

export type FormsRow = {
  id: string;
  code: string;
  name: string;
  description: string | null;
  success_message: string | null;
  destination_email: string | null;
  is_active: boolean;
  settings_json: Json;
} & Timestamps;

export type FormFieldsRow = {
  id: string;
  form_id: string;
  field_key: string;
  label: string;
  field_type: string;
  placeholder: string | null;
  help_text: string | null;
  is_required: boolean;
  sort_order: number;
  validation_json: Json;
  options_json: Json;
} & Timestamps;

export type LeadsRow = {
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
} & Timestamps;

export type FormSubmissionsRow = {
  id: string;
  form_id: string;
  lead_id: string | null;
  payload: Json;
  consent_json: Json;
  utm_json: Json;
  source_url: string | null;
  status: string;
  submitted_at: string;
};

export type RedirectsRow = {
  id: string;
  source_path: string;
  target_path: string;
  redirect_type: 301 | 302 | 307 | 308;
  is_active: boolean;
  notes: string | null;
} & Timestamps;

export type SiteSettingsRow = {
  key: string;
  value_json: Json;
  is_public: boolean;
  updated_by: string | null;
  updated_at: string;
};

export type AuditLogsRow = {
  id: string;
  actor_user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Json;
  created_at: string;
};

type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

type Table<Row extends Record<string, unknown>> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: GenericRelationship[];
};

export type Database = {
  public: {
    Tables: {
      role_assignments: Table<RoleAssignmentsRow>;
      profiles: Table<ProfilesRow>;
      media_assets: Table<MediaAssetsRow>;
      taxonomies: Table<TaxonomiesRow>;
      terms: Table<TermsRow>;
      audience_segments: Table<AudienceSegmentsRow>;
      content_items: Table<ContentItemsRow>;
      content_revisions: Table<ContentRevisionsRow>;
      content_term_map: Table<ContentTermMapRow>;
      content_audience_map: Table<ContentAudienceMapRow>;
      content_relations: Table<ContentRelationsRow>;
      menus: Table<MenusRow>;
      menu_items: Table<MenuItemsRow>;
      forms: Table<FormsRow>;
      form_fields: Table<FormFieldsRow>;
      leads: Table<LeadsRow>;
      form_submissions: Table<FormSubmissionsRow>;
      redirects: Table<RedirectsRow>;
      site_settings: Table<SiteSettingsRow>;
      audit_logs: Table<AuditLogsRow>;
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
      asset_visibility: AssetVisibility;
    };
    CompositeTypes: Record<string, never>;
  };
};
