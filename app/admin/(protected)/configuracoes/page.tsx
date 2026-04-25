import { listSiteSettings } from "@/lib/db/queries/settings";

import { SettingsEditor } from "../_components/settings-editor";

const SUGGESTIONS = [
  { key: "site.title", hint: "Nome institucional" },
  { key: "site.contact_email", hint: "E-mail público de contato" },
  { key: "site.phone", hint: "Telefone institucional" },
  { key: "site.address", hint: "Endereço exibido no footer" },
  { key: "site.social.instagram", hint: "URL do Instagram" },
  { key: "site.social.linkedin", hint: "URL do LinkedIn" },
  { key: "site.social.youtube", hint: "URL do YouTube" },
  { key: "site.analytics.ga_id", hint: "Google Analytics measurement ID" },
];

export default async function ConfiguracoesPage() {
  const settings = await listSiteSettings();
  // Don't show SEO-specific keys here — those have their own page.
  const filtered = settings.filter((s) => !s.key.startsWith("seo."));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Chaves globais armazenadas em <span className="font-mono">site_settings</span>. Use para
          dados institucionais, integrações e flags.
        </p>
      </header>

      <SettingsEditor settings={filtered} defaultKeys={SUGGESTIONS} />
    </div>
  );
}
