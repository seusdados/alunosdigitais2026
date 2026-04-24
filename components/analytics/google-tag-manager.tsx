import Script from "next/script";

/** Container ID padrão do Alunos Digitais (fonte: dashboard GTM). */
const DEFAULT_GTM_ID = "GTM-5J2XKDJZ";

/**
 * Google Tag Manager — instalação padrão em 2 partes.
 *
 * 1. `<Script>` com `strategy="afterInteractive"` injeta o gtm.js depois
 *    da hidratação (não bloqueia LCP/FCP).
 * 2. `<noscript>` com iframe de fallback pra visitantes sem JS.
 *
 * Usado APENAS no site público (`app/(public)/layout.tsx`). O admin
 * fica sem tracking, por privacidade e para não poluir métricas
 * com ações internas de gestão.
 *
 * Container ID: usa `NEXT_PUBLIC_GTM_ID` quando setada, senão fallback
 * para o ID padrão `GTM-5J2XKDJZ`. Esse ID é público — aparece no HTML
 * da página para qualquer visitante — então não é secret.
 */
export function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID ?? DEFAULT_GTM_ID;
  if (!gtmId) return null;

  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
