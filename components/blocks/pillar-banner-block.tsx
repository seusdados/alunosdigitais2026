import Image from "next/image";

import type { PillarBannerData } from "@/types/content";

/**
 * PillarBanner — faixa panorâmica dos pilares, full-bleed de borda a borda.
 * A imagem cancela o padding lateral da section via `-mx-8 lg:-mx-12`,
 * ocupando 100% da viewport com mask-fade vertical pra integrar com os
 * blocos vizinhos.
 */
export function PillarBannerBlock({ data }: { data: PillarBannerData }) {
  return (
    <section className="border-t border-gray-200/60 bg-sand px-8 py-20 lg:px-12 lg:py-24">
      <div className="-mx-8 overflow-hidden lg:-mx-12">
        <Image
          src={data.image.src}
          alt={data.image.alt}
          width={2400}
          height={900}
          sizes="100vw"
          className="h-auto w-full"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 5%, black 92%, transparent 100%)",
          }}
        />
      </div>
    </section>
  );
}
