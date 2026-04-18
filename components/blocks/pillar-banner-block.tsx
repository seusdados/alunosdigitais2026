import { BleedImage } from "@/components/site/bleed-image";
import { Container } from "@/components/site/container";
import type { PillarBannerData } from "@/types/content";

/**
 * PillarBanner — faixa full-bleed com ilustração panorâmica dos pilares.
 * Desktop: imagem estourada cobrindo o padding lateral. Mobile: enquadrada.
 */
export function PillarBannerBlock({ data }: { data: PillarBannerData }) {
  return (
    <section className="overflow-hidden bg-site-white">
      <Container className="py-10 md:py-[64px]">
        {data.caption ? (
          <p className="mb-8 max-w-[640px] font-body text-[14px] font-light leading-[1.65] text-site-text-mid md:mb-10">
            {data.caption}
          </p>
        ) : null}
        <BleedImage src={data.image.src} alt={data.image.alt} direction="full" />
      </Container>
    </section>
  );
}
