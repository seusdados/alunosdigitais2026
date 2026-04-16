# Análise técnica de convergência — Site + CMS + LMS

> **Status: ⛔ bloqueado aguardando acesso ao repositório LMS legado.**
>
> Este documento é o relatório técnico obrigatório de compatibilização entre
> o site público em construção neste repositório e o LMS parcialmente
> desenvolvido em `seusdados/alunos-digitais-2026-new`. Conforme a instrução
> consolidada de 16/04/2026, **nenhuma decisão estrutural de modelagem,
> auth, integração, CMS dinâmico ou LMS pode ser consolidada** antes deste
> relatório estar completo e aprovado.
>
> O esqueleto abaixo está pré-populado para facilitar a sequência de
> preenchimento assim que o acesso for liberado.

## Bloqueio de acesso

O Claude Code em uso nesta sessão tem permissão MCP restrita ao repositório
`seusdados/alunosdigitais2026`. Tentativa de acesso a
`seusdados/alunos-digitais-2026-new` retorna:

```
Access denied: repository "seusdados/alunos-digitais-2026-new" is not
configured for this session. Allowed repositories: seusdados/alunosdigitais2026
```

**Duas formas de desbloquear** (o usuário escolhe):

1. **Liberar o repo LMS no escopo MCP** — adicionar
   `seusdados/alunos-digitais-2026-new` ao allowlist da configuração da
   sessão Claude Code.
2. **Subir um snapshot do LMS no repo atual** — criar `docs/legacy-lms/`
   com os arquivos relevantes do LMS (schemas SQL, edge functions, diretório
   `src/`, package.json, README, etc.) para análise offline.

O caminho 1 é mais limpo (não inflar este repo com código de outro produto)
e permite análise viva. O caminho 2 é rápido e funciona em qualquer
configuração, mas precisa ser atualizado manualmente quando o LMS evoluir.

## 1. Resumo executivo

_a preencher após análise._

## 2. Visão geral do LMS existente

_a preencher após análise do repositório `seusdados/alunos-digitais-2026-new`._

Perguntas a responder:

- Stack de frontend do LMS
- Stack de backend / banco
- Modo de autenticação
- Estado de maturidade (em produção? staging? POC?)
- Tamanho do código
- Principais domínios de negócio implementados

## 3. Visão geral do site/CMS em construção

Este repositório (`seusdados/alunosdigitais2026`), estado atual:

### Stack

- Next.js 15 App Router + TypeScript
- Supabase (Postgres + Auth + Storage) — schema inicial aplicado
- Tailwind CSS + shadcn/ui (admin) + design system próprio (site público)
- Fraunces (display) + DM Sans (body)
- Vercel deploy

### O que já existe

- Auth admin completo (`/admin/login`, `/admin/logout`, `requireAdmin`)
- Middleware com refresh de sessão + noindex em `/admin/*`
- Schema SQL inicial aplicado: `profiles`, `role_assignments`, `content_items`,
  `content_revisions`, `leads`, `forms`, `form_submissions`, `redirects`,
  `site_settings`, `media_assets`, `taxonomies`, `terms`, `curriculum_units`,
  `audit_logs`, etc. — com RLS e índices
- Design tokens brand (navy/teal/amber + tipografia + masks)

### O que está em construção

- Site público institucional (trilha PR A → F)
- Camada `/data/` transitória
- Componentes de bloco reutilizáveis

### O que ainda NÃO está feito

- CRUD do CMS (editor Tiptap, upload de mídia, renderização pública)
- Integração com LMS
- Auth unificado entre áreas
- Analytics / tracking compartilhado

## 4. Conflitos identificados

_a preencher._ Exemplos de perguntas:

- O LMS usa a mesma instância Supabase? Ou tem banco separado?
- Os papéis de usuário do LMS colidem com `role_assignments.role` do site?
- O LMS tem entidade equivalente a `content_items`? Nomenclatura diferente?
- Fluxo de auth do LMS é compatível com Supabase Auth?

## 5. Dependências

_a preencher._ Mapear o que o site pode assumir / precisa integrar:

- Auth: SSO? Token partilhado?
- Usuário: fonte única de verdade?
- Progresso: quem registra?
- Turmas/escolas: onde moram?
- Pagamento/assinatura: camada separada?

## 6. Sobreposições e duplicidades

_a preencher._ Tabela recomendada:

| Entidade no site   | Equivalente no LMS | Decisão |
| ------------------ | ------------------ | ------- |
| `content_items`    | ?                  | ?       |
| `media_assets`     | ?                  | ?       |
| `leads`            | ?                  | ?       |
| `profiles`         | ?                  | ?       |
| `role_assignments` | ?                  | ?       |
| `curriculum_units` | ?                  | ?       |

## 7. Oportunidades de reaproveitamento

_a preencher._ Classificar cada parte relevante em:

1. **Reaproveitar integralmente**
2. **Reaproveitar com adaptação**
3. **Reescrever na stack padrão atual**
4. **Descartar**
5. **Manter apenas como referência conceitual**

## 8. Riscos de divergência arquitetural

_a preencher._ Levantar cenários de risco:

- Rotação de user_id entre LMS e site
- Divergência de timezone / locale
- Inconsistência de taxonomia
- Dependências técnicas conflitantes (versões de Postgres, Supabase,
  Node, etc.)

## 9. Proposta de arquitetura-alvo unificada

_a preencher._ Proposta inicial (a validar):

- **Supabase único** compartilhado entre site, CMS e LMS
- **Schema por domínio** com prefixos: `public.*` (site/CMS),
  `lms.*` (LMS), `shared.*` (usuários, roles, taxonomias)
- **Auth único** via Supabase Auth, com `role_assignments` cobrindo papéis
  dos três produtos
- **Storage único** com buckets segregados (`public-site`, `cms-content`,
  `lms-submissions`)
- **Analytics único** com eventos tipados

## 10. Proposta de convergência por fases

_a preencher._ Esboço:

- **Fase A**: site público com `/data/` (em andamento)
- **Fase B**: CMS dinâmico (site lê Supabase em vez de `/data/`)
- **Fase C**: unificar auth site + LMS
- **Fase D**: migração de entidades compartilhadas do LMS para schema
  unificado
- **Fase E**: integração de navegação e tracking

## 11. Recomendação do que pode seguir imediatamente

**Pode seguir sem análise do LMS:**

- Fundação visual (tokens, fontes, masks) — **PR A**
- Componentes de bloco reutilizáveis — **PR B**
- Tipos + `/data/` transitório — **PR C** (com ressalva: shape deve
  ser compatível com possível modelagem futura)
- Home + demais páginas públicas — **PR D, E**
- Responsividade — **PR F**
- SEO e sitemap

## 12. Recomendação do que deve ser pausado até compatibilização

- Integração do site com Supabase em produção (substituir `/data/` por
  queries dinâmicas)
- Expansão do schema (novas tabelas em `public.*`)
- CMS dinâmico (editor, upload, publicação)
- Unificação de auth
- Definição de papéis/permissões definitivos
- Tracking/analytics compartilhado
- Migração de entidades entre site/CMS/LMS

## 13. Mapa "reaproveitar / adaptar / reescrever / descartar"

_a preencher após análise._

| Item do LMS | Categoria | Justificativa |
| ----------- | --------- | ------------- |
|             |           |               |

## 14. Camadas mínimas de integração a observar

Conforme a instrução:

### 14.1 Identidade e autenticação

- login unificado
- perfis e hierarquia
- acesso cruzado entre áreas pública / admin / pedagógica

### 14.2 Dados e entidades compartilhadas

- anos, fases, trilhas
- conteúdos e materiais
- usuários, escolas, turmas
- atividades e progresso
- taxonomias, comunicação, métricas

### 14.3 Experiência e navegação

- jornada pública → conversão → acesso autenticado
- transição site → CMS → LMS
- continuidade de UX

### 14.4 Mensuração e eventos

- analytics compartilhado
- eventos de conversão, pedagógicos, administrativos
- governança de dados

---

## Próximos passos operacionais

1. Usuário libera acesso ao LMS (caminho 1 ou 2 acima)
2. Execução da análise (preenchimento das seções 2, 4–8, 13)
3. Proposta de arquitetura-alvo validada (seção 9)
4. Proposta de convergência por fases validada (seção 10)
5. Desbloqueio das decisões estruturais profundas (seção 12)
