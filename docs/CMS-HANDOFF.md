# CMS — Handoff para continuidade autônoma

> Documento de transferência para uma nova sessão do Claude Code dar
> continuidade ao CMS do Alunos Digitais com autonomia, sem depender do
> histórico de conversa.

## Como dar kickoff numa sessão nova

Cole o bloco abaixo como **primeira mensagem** numa sessão nova do Claude Code
aberta na raiz deste repositório:

```
Leia CLAUDE.md e docs/CMS-HANDOFF.md completos antes de fazer qualquer coisa.
Depois execute a Fase 1 do CMS descrita em docs/CMS-HANDOFF.md#roteiro-de-execução.
Regras invioláveis da CLAUDE.md — especialmente a convergência com o LMS
(docs/analise-convergencia-lms.md) — se aplicam. Não toque no site público
(app/(public)/*). Commits pequenos e focados. Pergunte se bloquear.
```

O agente novo vai ler, planejar e executar a partir daí.

---

## Onde o CMS está hoje

### Já pronto (não mexer, só estender)

| Camada                   | Localização                                               | Status                                                                                                  |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Supabase clients         | `lib/db/client.ts`, `lib/db/server.ts`, `lib/db/admin.ts` | ✅ Browser (anon), Server (cookies), Admin (service_role com `server-only`)                             |
| Tipos do schema          | `lib/db/types.ts`                                         | ✅ Handwritten para `profiles`, `role_assignments`. Expandir sob demanda.                               |
| Auth/session             | `lib/auth/session.ts`                                     | ✅ `getCurrentUser()`, `getRolesForUser()`, `requireAdmin()`                                            |
| Middleware               | `middleware.ts`                                           | ✅ `X-Robots-Tag: noindex, nofollow` em `/admin/*` + refresh sessão + redirect anônimo → `/admin/login` |
| Login                    | `app/admin/login/`                                        | ✅ Page + form (`useActionState`) + Server Action (Zod) + role check                                    |
| Logout                   | `app/admin/logout/route.ts`                               | ✅ POST + GET defensivo                                                                                 |
| Layout protegido         | `app/admin/(protected)/layout.tsx`                        | ✅ `requireAdmin()` + sidebar + e-mail + roles + botão Sair                                             |
| Dashboard placeholder    | `app/admin/(protected)/page.tsx`                          | 🟡 4 cards com `—`. Vira real na Fase 2.                                                                |
| Sidebar nav              | `app/admin/(protected)/_components/admin-nav.tsx`         | ✅ Lista 5 entradas. Adicionar novas quando implementar.                                                |
| Schema SQL               | `supabase/migrations/20260414120000_initial_schema.sql`   | ✅ 27 tabelas, RLS habilitada, seeds de taxonomias/trilhas/anos/fases                                   |
| Função `is_admin_user()` | mesma migration                                           | ✅ Usada nas RLS policies                                                                               |

### Falta implementar (escopo do handoff)

Rotas listadas na sidebar **mas sem página** — dão 404:

- `/admin/conteudos` ← **prioridade máxima**
- `/admin/midia`
- `/admin/taxonomias`
- `/admin/formularios`
- `/admin/leads`

Rotas previstas na CLAUDE.md **nem na sidebar estão**:

- `/admin/menus`
- `/admin/seo`
- `/admin/configuracoes`
- `/admin/usuarios`

---

## Tabelas Supabase que o CMS precisa manipular

Do `supabase/migrations/20260414120000_initial_schema.sql`:

### Conteúdo

- `content_items` — entidade principal (post/artigo/página)
- `content_revisions` — histórico de versões (JSONB body + HTML renderizado)
- `content_term_map` — M:N conteúdo × termo
- `content_audience_map` — M:N conteúdo × audiência
- `content_relations` — relacionamentos internos

### Taxonomia

- `taxonomies` — categorias/tags/coleções (tipo)
- `terms` — valores dentro de cada taxonomia
- `audience_segments` — escola/família/docente etc.

### Mídia

- `media_assets` — metadata de arquivos no Supabase Storage

### Programa (já com seeds)

- `program_tracks` / `grade_levels` / `program_phases` / `program_themes` / `curriculum_units`

### Navegação

- `menus` / `menu_items` — menus editáveis pelo CMS

### Formulários e leads

- `forms` / `form_fields` — formulário configurável
- `leads` — lead extraído da submissão
- `form_submissions` — submissão bruta

### Governança

- `consent_records` / `privacy_requests` — LGPD
- `audit_logs` — trilha de auditoria
- `redirects` — 301/302 editáveis
- `site_settings` — chave/valor global

### Pessoas

- `profiles` / `role_assignments`

---

## Stack obrigatória (da CLAUDE.md)

- **Next.js App Router** + **React 19** + **TypeScript strict**
- **Supabase** (Postgres + Auth + Storage)
- **Tailwind CSS** + **shadcn/ui** (Button e Input já instalados; adicionar mais conforme a necessidade via `npx shadcn@latest add <component>`)
- **Tiptap** para editor rico — **ainda não instalado**, precisa ser adicionado na Fase 2
- **Zod** + **react-hook-form** já instalados
- **lucide-react** para ícones
- `@supabase/ssr` para o fluxo server-side

Proibido no CMS:

- `service_role` no client (só em `lib/db/admin.ts` com `server-only`)
- Remover RLS de tabelas sensíveis
- Armazenar só o HTML do editor — precisa persistir JSONB de origem **e** HTML renderizado
- Quebrar auth/admin existente
- Criar tabelas genéricas demais

---

## Convergência com o LMS (obrigatório)

A CLAUDE.md e `docs/analise-convergencia-lms.md` deixam claro:

> **Bloqueio:** nenhuma decisão estrutural profunda (CMS dinâmico com
> persistência real substituindo `/data/`, expansão do schema, unificação de
> auth, tracking unificado) pode ser consolidada antes do relatório técnico
> de compatibilização com o LMS (`seusdados/alunos-digitais-2026-new`).

### O que o CMS **pode** fazer agora sem bloqueio

- Painel admin conectado ao schema Supabase **que já existe** (não expandir schema)
- CRUD sobre as 27 tabelas já criadas
- Upload de mídia pro Supabase Storage (buckets já previstos)
- Editor Tiptap salvando em `content_revisions`
- Moderação de leads/submissions

### O que o CMS **não** pode fazer sem o relatório LMS

- Criar novas tabelas no schema `public.*`
- Redefinir papéis além de `role_assignments.role` atual
- Substituir `/data/` estático por query dinâmica no **site público**
- Unificar auth com LMS
- Emitir eventos pro tracking compartilhado

Traduzindo: **construa a UI do CMS dentro do schema atual**. Persistência
real no site público (ler do Supabase em vez de `/data/`) fica pausada.

---

## Roteiro de execução

Executar em ordem. Cada fase é um PR separado.

### Fase 1 — Dashboard real + base de CRUD (1 PR)

1. Substituir dashboard placeholder por métricas reais via queries server-side:
   - Contagem de `content_items` por status (draft/in_review/published)
   - Leads dos últimos 30 dias (`leads` ORDER BY `created_at` DESC LIMIT 5)
   - Últimos 5 `content_items` editados
2. Criar helpers em `lib/db/queries/` (um arquivo por entidade, ex.: `content.ts`, `leads.ts`, `dashboard.ts`).
3. Componente `StatusBadge` reutilizável em `app/admin/(protected)/_components/`.
4. Utilitários de data/contagem em `lib/format.ts` (pt-BR).
5. Expandir `lib/db/types.ts` para incluir `content_items`, `leads`, `redirects` sob demanda.

**Referência histórica:** PR #3 fechado-sem-merge teve essa implementação
quase completa. Verificar `git log --all --oneline` → branch
`claude/phase-3-dashboard-metricas`. **Não dar merge cego** — revalidar.

### Fase 2 — `/admin/conteudos` CRUD completo (2-3 PRs)

1. Instalar Tiptap: `pnpm add @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link @tiptap/extension-placeholder`.
2. Listagem (`/admin/conteudos/page.tsx`):
   - Server component com queries por status
   - Tabela (shadcn `@tanstack/react-table`) com colunas: título, tipo, status, autor, atualizado_em, ações
   - Filtros: status, tipo, busca por título
3. Criar (`/admin/conteudos/novo/page.tsx`):
   - Form com title/slug/type/body (Tiptap) + metadata SEO (title, description, og_image) + publicação (status, published_at)
   - Server Action que grava em `content_items` + cria primeira revisão em `content_revisions` (JSONB body + HTML renderizado)
   - Upload de imagem inline no Tiptap → `media_assets` + Storage
4. Editar (`/admin/conteudos/[id]/page.tsx`):
   - Mesmo form com pré-preenchimento
   - Nova revisão a cada save
   - Autosave a cada 10s (opcional nesta fase)
5. Fluxo `draft → in_review → scheduled → published` via Server Actions
6. Adicionar link `Conteúdos` na sidebar se ainda não estiver ativo

### Fase 3 — `/admin/midia` (1 PR)

1. Grid de `media_assets` com preview
2. Upload drag-and-drop → Supabase Storage (bucket `cms-content`)
3. Modal de detalhes + rename/delete
4. Server Actions usando `lib/db/admin.ts`

### Fase 4 — `/admin/taxonomias` + `/admin/menus` (1 PR)

1. CRUD de `taxonomies` e `terms` em árvore
2. CRUD de `menus` e `menu_items` com ordenação (drag-and-drop ou input numérico)

### Fase 5 — `/admin/formularios` + `/admin/leads` (1 PR)

1. `/admin/formularios`: lista de `forms`, editor de `form_fields` (tipo, label, validação, ordem)
2. `/admin/leads`: lista de `leads` com filtro por form_id e status, detalhe com `form_submissions.payload`
3. Ação "Marcar como contatado" / "Arquivar"

### Fase 6 — `/admin/seo`, `/admin/configuracoes`, `/admin/usuarios`, `/admin/redirects` (1 PR)

1. `/admin/seo`: edição de `site_settings` (global meta, OG default, robots, sitemap overrides)
2. `/admin/configuracoes`: outras chaves de `site_settings`
3. `/admin/usuarios`: listar `profiles` + `role_assignments`, convidar usuário, alterar role
4. `/admin/redirects`: CRUD de `redirects` (301/302)

### Fase 7 — Auditoria, notificações, polish (1 PR)

1. Audit log automático (trigger SQL ou Server Action wrapper) em `audit_logs`
2. Toast notifications (sonner ou similar)
3. Página de erro customizada `/admin/error.tsx`
4. E2E Playwright básico do fluxo CRUD

---

## Padrões técnicos

### Estrutura de arquivos

```
app/admin/(protected)/
  conteudos/
    page.tsx                      # listagem
    novo/page.tsx                 # criar
    [id]/page.tsx                 # editar
    _components/
      content-editor.tsx          # Tiptap wrapper (client)
      content-form.tsx            # form shell
      content-table.tsx           # tabela listagem
    actions.ts                    # Server Actions
  midia/
    ...
  _components/
    admin-nav.tsx                 # já existe
    status-badge.tsx              # a criar

lib/
  db/
    queries/
      content.ts                  # queries server-side por entidade
      leads.ts
      dashboard.ts
  editor/
    tiptap-config.ts              # extensions, toolbar config
    serialize.ts                  # JSON → HTML

components/ui/                    # shadcn — adicionar conforme precisar
```

### Padrão de Server Action

```ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/session";
import { getServerClient } from "@/lib/db/server";

const schema = z.object({
  /* ... */
});

export async function createContentItem(_: State, formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: parsed.error.flatten().fieldErrors };

  const supabase = await getServerClient();
  const { data, error } = await supabase
    .from("content_items")
    .insert(parsed.data)
    .select()
    .single();
  if (error) return { status: "error", error: error.message };

  redirect(`/admin/conteudos/${data.id}`);
}
```

### Tiptap — persistência

Em `content_revisions`:

- `body_json` (jsonb) — conteúdo do editor (source of truth)
- `body_html` (text) — HTML renderizado no save (para consumo pelo site público)

A função de renderização fica em `lib/editor/serialize.ts` e pode ser chamada
server-side.

---

## Convenções de commit

Mesmo padrão do que já está no histórico desta branch:

```
feat(admin): <descrição>     # nova funcionalidade
fix(admin): <descrição>      # correção
refactor(admin): ...         # refatoração
chore(admin): ...            # manutenção
```

Cada PR fecha uma fase do roteiro.

---

## Smoke test após cada PR

```bash
pnpm install
pnpm format:check
pnpm lint
pnpm typecheck
pnpm build
```

Tudo precisa passar verde antes de push.

No Supabase:

- Criar ao menos 1 usuário em Authentication → Users (com Auto Confirm)
- Inserir `role_assignments (user_id, role='super_admin')` via SQL Editor
- Logar em `/admin/login` e validar que o fluxo CRUD funciona

---

## O que NÃO fazer

- Não tocar em `app/(public)/*` (site público já em produção)
- Não expandir o schema Supabase (nova tabela/coluna) sem relatório LMS
- Não alterar `middleware.ts` de forma que afete o noindex do /admin
- Não importar `lib/db/admin.ts` em client component
- Não usar `any` no TypeScript
- Não criar componentes-monstro — dividir em peças < 200 linhas
- Não commitar `.env*`

---

## Blocos do relatório LMS (referência)

Quando/se o acesso ao LMS for liberado (allowlist MCP ou snapshot em
`docs/legacy-lms/`), o `docs/analise-convergencia-lms.md` precisa ser
preenchido antes de tocar no schema. Seções 2, 4-8, 13 estão aguardando.
