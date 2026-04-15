# Alunos Digitais 2026

Novo site institucional e CMS do programa **Alunos Digitais** — cidadania
digital, privacidade, segurança online e educação midiática para escolas,
educadores e famílias.

> **Status**: Fase 1 (Bootstrap) concluída. CMS funcional, páginas
> institucionais e formulários entram nas próximas fases. Veja
> [`docs/architecture.md`](docs/architecture.md) para o roadmap.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** — Postgres (SQL-first), Auth, Storage
- **Vercel** para deploy e preview por PR
- **pnpm** como package manager

## Setup local

Pré-requisitos:

- **Node.js ≥ 20** (recomendado: 22 LTS)
- **pnpm ≥ 10** (`npm install -g pnpm` se ainda não tiver)

Passos:

```bash
# 1. Clonar
git clone https://github.com/seusdados/alunosdigitais2026.git
cd alunosdigitais2026

# 2. Instalar dependências
pnpm install

# 3. Configurar variáveis de ambiente
cp .env.example .env.local
# Preencha .env.local com as credenciais do seu projeto Supabase.
# Para achar cada valor:
#   Supabase Dashboard → seu projeto → Project Settings → API
#   - Project URL               → NEXT_PUBLIC_SUPABASE_URL
#   - Project API keys: anon    → NEXT_PUBLIC_SUPABASE_ANON_KEY
#   - Project API keys: service → SUPABASE_SERVICE_ROLE_KEY  (⚠️ secreta)

# 4. Rodar o dev server
pnpm dev
# → http://localhost:3000
```

## Comandos úteis

| Comando             | O que faz                                       |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Sobe o Next.js em dev mode                      |
| `pnpm build`        | Compila o bundle de produção                    |
| `pnpm start`        | Roda o bundle de produção localmente            |
| `pnpm lint`         | ESLint (next/core-web-vitals + next/typescript) |
| `pnpm typecheck`    | `tsc --noEmit` (TypeScript strict)              |
| `pnpm format`       | Prettier em todo o repositório                  |
| `pnpm format:check` | Prettier em modo check, sem escrever arquivos   |

## Banco de dados (Supabase)

O schema inicial vive em
[`supabase/migrations/20260414120000_initial_schema.sql`](supabase/migrations/20260414120000_initial_schema.sql).
Cobre tabelas, tipos, funções, triggers, RLS e seeds de taxonomias, trilhas,
anos, fases e temas pedagógicos.

Para aplicar em um projeto Supabase (via CLI):

```bash
# Uma vez:
pnpm dlx supabase login
pnpm dlx supabase link --project-ref <seu-ref>

# A cada push de migration:
pnpm dlx supabase db push
```

> Se preferir aplicar manualmente, copie o conteúdo do SQL e cole no
> **SQL Editor** do painel Supabase. As políticas usam `IF NOT EXISTS` /
> `DROP POLICY IF EXISTS`, então é seguro rodar de novo.

## Estrutura de pastas

Resumo; detalhes em [`docs/architecture.md`](docs/architecture.md).

```
app/            → App Router (site público + /admin + API)
components/     → UI reutilizável (ui/, site/, cms/, blocks/)
lib/            → clients Supabase, utils, validation, seo, analytics
supabase/       → migrations SQL, seeds, config.toml, edge functions
docs/           → arquitetura, modelo de conteúdo, guias
tests/          → e2e (Playwright) + integration
```

## Documentação

- [`CLAUDE.md`](CLAUDE.md) — regras do repositório para Claude Code
- [`docs/architecture.md`](docs/architecture.md) — visão geral da arquitetura
- [`docs/content-model.md`](docs/content-model.md) — modelo de conteúdo do CMS
- [`alunosdigitais_claude_master_spec.md`](alunosdigitais_claude_master_spec.md)
  — especificação canônica completa (28 seções)

## Deploy

O deploy é feito automaticamente pela Vercel em cada push:

- Push em `main` → produção
- PR aberta → preview deployment próprio

Variáveis de ambiente precisam ser configuradas no painel Vercel
(**Project Settings → Environment Variables**) com os mesmos valores do
`.env.local`. A `SUPABASE_SERVICE_ROLE_KEY` deve ser marcada apenas para
**Production** e **Preview**, **nunca** para Development se isso implicar
expô-la no browser.

## Licença

Uso interno do projeto Alunos Digitais.
