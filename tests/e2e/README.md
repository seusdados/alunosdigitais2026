# Testes E2E (Playwright)

Ambiente preparado para receber os testes end-to-end na **Fase 6** (hardening).

A dependência `@playwright/test` já está instalada. Para inicializar o
Playwright quando chegarmos lá:

```bash
pnpm dlx playwright install --with-deps
```

Os testes vão cobrir, no mínimo:

- Smoke tests das rotas públicas principais (`/`, `/programa`, `/blog`, ...).
- Fluxo de autenticação do admin (`/admin` → login → dashboard).
- Fluxo editorial completo: criar rascunho → enviar para revisão → publicar.
- Envio de formulário público → criação de submission + lead.
- SEO: `robots.txt`, `sitemap.xml`, headers `X-Robots-Tag` em `/admin`.
