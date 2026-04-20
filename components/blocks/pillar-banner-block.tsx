import Image from "next/image";

import { Container } from "@/components/site/container";
import type { PillarBannerData } from "@/types/content";

/**
 * PillarBanner — faixa full-bleed panorâmica dos pilares.
 *
 * Caption (texto) fica dentro do Container — alinhado com o resto do site.
 * Ilustração ocupa toda a viewport horizontal (sangra para ambas as bordas)
 * com fade vertical suave para integrar com os blocos vizinhos.
 */
export function PillarBannerBlock({ data }: { data: PillarBannerData }) {
  return (
    <section className="overflow-hidden bg-sand">
      <Container className="pt-10 md:pt-[64px]">
        {data.caption ? (
          <p className="mb-8 max-w-[640px] font-body text-[14px] font-light leading-[1.65] text-site-text-mid md:mb-10">
            {data.caption}
          </p>
        ) : null}
      </Container>
      <div className="pad-container-l pad-container-r pb-10 md:px-0 md:pb-[64px]">
        <div className="overflow-hidden rounded-card md:rounded-none">
          <Image
            src={data.image.src}
            alt={data.image.alt}
            width={2400}
            height={900}
            sizes="100vw"
            className="md:mask-fade-vertical h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
