import Image from "next/image";

import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — texto + ilustração em 2 colunas lado a lado.
 *
 * Layout:
 *   - Desktop (≥ lg): grid fixo 1fr 1fr, min-h 440, items-center.
 *   - Mobile (< lg): stack vertical (grid-cols-1), texto em cima.
 *   - A ordem texto/imagem no desktop é controlada por `direction`.
 *
 * Implementação:
 *   - Inline styles para tipografia e spacing (mais previsível visualmente
 *     entre ambientes dev/prod).
 *   - Tailwind apenas no wrapper responsivo do grid.
 *   - Máscara via classes utilitárias (globals.css): .mask-fade-right dissolve
 *     a borda ESQUERDA da imagem (quando ela está à direita), e .mask-fade-left
 *     dissolve a borda DIREITA (quando à esquerda).
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageRight = direction === "right";

  return (
    <section
      style={{
        background: bgColor === "sand" ? "#F4F1EC" : "#FDFCFA",
        overflow: "hidden",
      }}
    >
      <div className="grid grid-cols-1 items-center lg:min-h-[440px] lg:grid-cols-2">
        {/* TEXTO */}
        <div
          style={{
            padding: "72px 48px",
            paddingRight: imageRight ? 64 : 48,
            paddingLeft: imageRight ? 48 : 64,
          }}
          className={imageRight ? "lg:order-1" : "lg:order-2"}
        >
          {eyebrow ? (
            <p
              style={{
                color: "#009B72",
                fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              {eyebrow}
            </p>
          ) : null}

          <h2
            style={{
              fontFamily: 'var(--font-display), "Fraunces", serif',
              fontWeight: 700,
              fontSize: 38,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#0B1422",
              marginBottom: 20,
            }}
          >
            {title}
          </h2>

          {paragraphs.map((p, idx) => (
            <p
              key={idx}
              style={{
                fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                fontSize: 17,
                lineHeight: 1.8,
                color: "#3D4F62",
                marginTop: 16,
              }}
            >
              {p}
            </p>
          ))}

          {cta ? (
            <div style={{ marginTop: 28 }}>
              <a
                href={cta.href}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                  fontWeight: 500,
                  fontSize: 14,
                  color: "#fff",
                  background: "#009B72",
                  padding: "12px 24px",
                  borderRadius: 9,
                  textDecoration: "none",
                }}
              >
                {cta.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M3 7h8m-3.5-3.5L11 7l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ) : null}
        </div>

        {/* ILUSTRAÇÃO */}
        <div
          style={{
            position: "relative",
            minHeight: 440,
          }}
          className={imageRight ? "lg:order-2" : "lg:order-1"}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={imageRight ? "mask-fade-right" : "mask-fade-left"}
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    </section>
  );
}
