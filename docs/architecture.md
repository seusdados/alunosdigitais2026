# Arquitetura — Alunos Digitais 2026

Resumo executivo da arquitetura. A referência canônica e exaustiva continua
sendo `alunosdigitais_claude_master_spec.md` na raiz do repositório — este
documento é o mapa rápido para quem está começando.

## Visão geral

- Aplicação web **única** (Next.js App Router) com duas superfícies:
  - **Site público** em rotas abertas (`/`, `/programa`, `/blog`, etc.)
  - **CMS administrativo** em `/admin/*`, nunca indexado.
- **Supabase** como plataforma de dados: Postgres (SQL-first), Auth, Storage.
- **Vercel** como deploy e preview por PR.
- **GitHub** como fonte única do código.
- **Claude Code** é o executor principal do desenvolvimento — as regras estão
  em `CLAUDE.md` na raiz.

## Stack

| Camada          | Ferramenta                                       |
| --------------- | ------------------------------------------------ |
| Framework       | Next.js 15 (App Router) + React 19               |
| Linguagem       | TypeScript (strict)                              |
| UI              | Tailwind CSS 3.4 + shadcn/ui + lucide-react      |
| Forms           | React Hook Form + Zod                            |
| Editor (Fase 3) | Tiptap                                           |
| Dados           | Supabase (Postgres + Auth + Storage) — SQL-first |
| Deploy          | Vercel + GitHub Actions                          |
| Testes          | Playwright (E2E) + typecheck + lint no CI        |

## Modelo de pastas

```
app/           → rotas (público + admin + API)
components/    → UI (ui/, site/, cms/, blocks/)
lib/           → clients, utils, validation, seo, analytics, storage
supabase/      → migrations, seeds, config, edge functions
docs/          → este diretório
tests/         → e2e/, integration/
```

Detalhamento por diretório está na §8 da master spec.

## Separação Supabase client / server / admin

Três clients diferentes em `lib/db/`:

- **`client.ts`** — browser, anon key. Usado em Client Components.
- **`server.ts`** — server, anon key + cookies da sessão. Usado em Server
  Components, Route Handlers e Server Actions.
- **`admin.ts`** — server-only, `SUPABASE_SERVICE_ROLE_KEY`. Ignora RLS.
  Começa com `import "server-only"` para impedir bundle em client. Só para
  operações privilegiadas.

## SEO e segurança do admin

Defesa em camadas para garantir que `/admin/*` nunca apareça em buscadores
(master spec §6.1):

1. `app/robots.ts` declara `Disallow: /admin` e `/api/*`.
2. `middleware.ts` adiciona `X-Robots-Tag: noindex, nofollow` em qualquer
   request em `/admin/*`.
3. `app/admin/layout.tsx` define `metadata.robots = { index: false, follow: false }`.
4. `app/sitemap.ts` só emite rotas públicas; nunca enumera `/admin`.

## Modelo de dados (visão rápida)

Entidades-núcleo (detalhes completos na master spec §13):

- `profiles` + `role_assignments` — usuários e papéis
  (`super_admin | admin | editor | reviewer | analyst`).
- `content_items` + `content_revisions` — conteúdo canônico + histórico.
  Guardar JSON de origem do editor **e** HTML renderizado.
- `media_assets` + buckets `site-public | documents | og-images | cms-private`.
- `taxonomies` + `terms` — tema, persona, formato, etapa de funil.
- `program_tracks` + `grade_levels` + `program_phases` + `program_themes` +
  `curriculum_units` — estrutura pedagógica do programa.
- `forms` + `form_fields` + `form_submissions` + `leads` — captação.
- `menus`, `menu_items`, `redirects`, `site_settings` — operação do site.
- `consent_records`, `privacy_requests`, `audit_logs` — governança.

Todas as tabelas sensíveis têm RLS habilitada e políticas explícitas no
arquivo `supabase/migrations/20260414120000_initial_schema.sql`.

## Fases do projeto

1. **Fase 1 — Bootstrap** ← **este PR**
2. **Fase 2 — Dados e auth** (schema inicial já empacotado nesta entrega)
3. **Fase 3 — CMS core** (login admin, CRUD, editor Tiptap, publish flow)
4. **Fase 4 — Site público** (páginas institucionais, blog, biblioteca, SEO)
5. **Fase 5 — Formulários e leads** (forms configuráveis, pipeline, analytics)
6. **Fase 6 — Hardening** (E2E, redirects, performance, acessibilidade, migração)

Cada fase abre um PR próprio e é revisada separadamente.
