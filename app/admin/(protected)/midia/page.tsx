import { getPublicUrlFor, listMediaAssets } from "@/lib/db/queries/media";

import { MediaGrid } from "./_components/media-grid";
import { MediaUploadForm } from "./_components/upload-form";

export default async function MediaPage() {
  const items = await listMediaAssets(200);
  const withUrls = items.map((it) => ({
    ...it,
    publicUrl: getPublicUrlFor(it.bucket, it.path),
  }));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Mídia</h1>
        <p className="text-sm text-muted-foreground">
          Biblioteca de arquivos no Supabase Storage. Uploads passam por service-role em
          Server Actions protegidas.
        </p>
      </header>

      <MediaUploadForm />
      <MediaGrid items={withUrls} />
    </div>
  );
}
