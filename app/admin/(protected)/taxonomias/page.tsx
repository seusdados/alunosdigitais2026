import { listTaxonomies, listTerms } from "@/lib/db/queries/taxonomies";
import type { TermsRow } from "@/lib/db/types";

import { TaxonomyEditor } from "./_components/taxonomy-editor";

export default async function TaxonomiasPage() {
  const taxonomies = await listTaxonomies();
  const termsEntries = await Promise.all(
    taxonomies.map(async (tax) => [tax.id, await listTerms(tax.id)] as const),
  );
  const termsByTaxonomy: Record<string, TermsRow[]> = Object.fromEntries(termsEntries);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Taxonomias</h1>
        <p className="text-sm text-muted-foreground">
          Categorias, temas, personas e demais agrupamentos que classificam os conteúdos.
        </p>
      </header>

      <TaxonomyEditor taxonomies={taxonomies} termsByTaxonomy={termsByTaxonomy} />
    </div>
  );
}
