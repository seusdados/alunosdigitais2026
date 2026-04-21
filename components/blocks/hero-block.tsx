import Image from "next/image";

import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal — layout 2 colunas sobre navy-800.
 *
 * Desktop (≥ lg): grid 2 cols, min-h 560, items-center. Texto à esquerda,
 * ilustração à direita preenchendo toda a coluna com `fill + object-cover`.
 * Máscara horizontal fade 15%/85% nas duas bordas da imagem dissolve no
 * navy do fundo.
 *
 * Mobile (< lg): texto em cima, ilustração embaixo.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section style={{ background: "#0C1829", overflow: "hidden" }}>
      <div className="grid grid-cols-1 items-center lg:min-h-[560px] lg:grid-cols-2">
        {/* TEXTO */}
        <div style={{ padding: "72px 48px 72px 48px" }}>
          {/* Pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "5px 14px 5px 10px",
              borderRadius: 100,
              border: "1px solid rgba(0, 155, 114, 0.28)",
              background: "rgba(0, 155, 114, 0.08)",
              marginBottom: 26,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 7,
                height: 7,
                borderRadius: 100,
                background: "#2BD9A5",
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: 12,
                color: "#2BD9A5",
                letterSpacing: "0.01em",
              }}
            >
              {pill}
            </span>
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-display), "Fraunces", serif',
              fontWeight: 700,
              fontSize: 50,
              lineHeight: 1.06,
              letterSpacing: "-0.035em",
              color: "#fff",
              marginBottom: 20,
            }}
          >
            {title}{" "}
            {titleAccent ? (
              <em
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "#2BD9A5",
                }}
              >
                {titleAccent}
              </em>
            ) : null}
          </h1>

          {/* Subtexto */}
          <p
            style={{
              fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.78,
              color: "rgba(255, 255, 255, 0.55)",
              maxWidth: 460,
              marginBottom: 32,
            }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    color: "#fff",
                    background: "#009B72",
                    padding: "13px 24px",
                    borderRadius: 9,
                    textDecoration: "none",
                  }}
                >
                  {ctaPrimary.label}
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
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                    fontSize: 14,
                    color: "rgba(255, 255, 255, 0.72)",
                    border: "1px solid rgba(255, 255, 255, 0.14)",
                    padding: "13px 24px",
                    borderRadius: 9,
                    textDecoration: "none",
                    background: "transparent",
                  }}
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}

          {/* Métricas */}
          {metrics && metrics.length > 0 && (
            <dl
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 48,
                marginTop: 48,
                paddingTop: 32,
                borderTop: "1px solid rgba(255, 255, 255, 0.07)",
              }}
            >
              {metrics.map((m) => (
                <div key={m.label} style={{ display: "flex", flexDirection: "column" }}>
                  <dt
                    style={{
                      fontFamily: 'var(--font-display), "Fraunces", serif',
                      fontWeight: 700,
                      fontSize: 36,
                      letterSpacing: "-0.035em",
                      color: "#fff",
                    }}
                  >
                    {m.value}
                  </dt>
                  <dd
                    style={{
                      fontFamily: 'var(--font-sans), "DM Sans", sans-serif',
                      fontSize: 12,
                      color: "rgba(255, 255, 255, 0.3)",
                      marginTop: 6,
                    }}
                  >
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* ILUSTRAÇÃO */}
        <div
          style={{
            position: "relative",
            minHeight: 400,
          }}
          className="lg:min-h-[560px]"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="mask-fade-hero"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>
      </div>
    </section>
  );
}
