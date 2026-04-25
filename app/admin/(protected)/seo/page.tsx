import { listSiteSettings } from "@/lib/db/queries/settings";

import { SettingsEditor } from "../_components/settings-editor";

const SEO_KEYS = [
  { key: "seo.default_title", hint: "Título padrão para <title>", isPublic: true },
  { key: "seo.default_description", hint: "Meta description padrão", isPublic: true },
  { key: "seo.default_og_image", hint: "URL da imagem Open Graph", isPublic: true },
  { key: "seo.site_name", hint: "Nome do site exibido nos metas", isPublic: true },
  { key: "seo.twitter_handle", hint: "@handle do Twitter/X", isPublic: true },
  {
    key: "seo.robots_override",
    hint: 'Ex.: {"noindex": false, "nofollow": false}',
    isPublic: true,
  },
  { key: "seo.sitemap_overrides", hint: "Regras custom para sitemap.xml", isPublic: false },
];

const SEO_PREFIX = /^seo\./;

export default async function SEOPage() {
  const all = await listSiteSettings();
  const settings = all.filter((s) => SEO_PREFIX.test(s.key));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">SEO</h1>
        <p className="text-sm text-muted-foreground">
          Configurações globais de SEO. Chaves começam com <span className="font-mono">seo.</span> e
          são lidas pelo site público.
        </p>
      </header>

      <SettingsEditor settings={settings} defaultKeys={SEO_KEYS} />
    </div>
  );
}
