# CLAUDE.md — Regras do repositório Alunos Digitais

## Ecossistema e convergência

Este projeto **não é isolado**. Faz parte de um ecossistema composto por três
camadas que devem convergir para uma única plataforma:

1. **Site público institucional, comercial e editorial** — este repositório
2. **CMS** interno de gestão e publicação — entra em fase posterior
3. **LMS** operacional/pedagógico/autenticado — parcialmente desenvolvido em
   `seusdados/alunos-digitais-2026-new`

Nenhuma decisão de arquitetura, modelagem, auth, papéis, fluxos, tabelas,
storage, integrações, navegação, nomenclatura, taxonomia ou analytics pode
ser tomada como se o LMS não existisse. Não duplicar entidades, não criar
arquitetura concorrente. Desenvolver com visão de produto único.

Antes de consolidar camadas profundas (modelagem de dados, auth expandido,
CMS dinâmico, storage, edge functions, tracking compartilhado), é
**obrigatório** produzir um relatório técnico de compatibilização com o LMS
legado — vide `docs/analise-convergencia-lms.md`.

## Fase atual

Site público institucional (trilha de 6 PRs: A → F). Durante esta fase:

- `/data/` é camada transitória, **nunca fonte de verdade definitiva**
- o shape de `/data/` nasce compatível com futura modelagem Supabase
- componentes nascem preparados para alimentação dinâmica (CMS) futura
- auth + schema Supabase já existentes são **preservados** intactos
- `/admin/*` continua operante, com noindex

## Missão

Construir e evoluir o novo site institucional + CMS do Alunos Digitais com foco em:

- clareza da proposta de valor
- SEO técnico e editorial
- performance
- segurança
- governança de conteúdo
- geração de leads qualificados

## Stack obrigatória

- Next.js App Router
- TypeScript
- Supabase (Postgres, Auth, Storage)
- SQL-first migrations via Supabase CLI
- Tailwind CSS
- shadcn/ui
- Tiptap para editor rico
- Vercel para deploy
- GitHub para versionamento

## Restrições

- Não usar service role no client
- Não indexar `/admin`
- Não usar o LMS legado como base do site institucional
- Não armazenar apenas HTML do editor; manter JSONB de origem + HTML renderizado
- Não criar tabelas genéricas demais sem necessidade
- Não quebrar compatibilidade de rotas públicas existentes sem redirect
- Não publicar páginas sem campos de SEO
- Não remover RLS de tabelas sensíveis

## Diretrizes arquiteturais

- Preferir server components por padrão e client components apenas quando necessário
- Preferir Route Handlers / Server Actions ao invés de criar backend separado no primeiro ciclo
- Centralizar regras de dados em SQL, constraints, índices, views e policies
- Manter CMS e site público no mesmo código, mas com rotas protegidas e separação lógica
- Usar componentes reutilizáveis para blocos editoriais

## Modelo de conteúdo

- `content_items` é a entidade principal
- `content_revisions` guarda o histórico
- taxonomias relacionais
- `curriculum_units` modela a estrutura do programa
- `forms` + `form_submissions` + `leads` cobrem captação
- `redirects` e `site_settings` cobrem operação do site

## Fluxo de trabalho

1. Entenda a tarefa
2. Localize os arquivos impactados
3. Proponha plano curto
4. Faça mudanças pequenas e coerentes
5. Rode lint/tests relevantes
6. Explique o que mudou e como validar

## Qualidade obrigatória

- type safety
- validação de input
- tratamento de erro
- loading/error states
- acessibilidade básica
- comentários apenas quando agregarem contexto real
- código simples antes de código esperto

## Rotas públicas prioritárias

Revisadas conforme `docs/implementation/PROMPT-CLAUDE-CODE.md` e
`docs/brief/roteiro-completo.md`:

- `/` (home)
- `/o-programa`
- `/como-funciona`
- `/curriculo` (hub) + `/curriculo/[ano]` (dinâmico 1º ao 9º ano)
- `/formacao-docente`
- `/familia-e-engajamento`
- `/plataforma-e-materiais`
- `/conformidade-e-curriculo`
- `/para-escolas`
- `/para-redes-e-secretarias`
- `/faq`
- `/fale-com-um-especialista`
- `/sobre`
- `/conteudos` (hub editorial futuro)

As rotas antigas listadas em versões anteriores deste arquivo
(`/programa`, `/metodologia`, `/blog`, `/contato`, etc.) foram substituídas
pelos nomes acima, mais aderentes ao roteiro. Como nenhuma das rotas antigas
foi publicada ainda, não há necessidade de redirects.

## Design system

Tokens centralizados em `tailwind.config.ts` e utilitários de máscara em
`app/globals.css`. Referência: `docs/brand/` e
`docs/implementation/design-system-tailwind.md`.

- Paleta: `navy` (institucional), `teal` (ação), `amber` (atenção),
  `sand` (fundo alternado), `site.*` (texto)
- Tipografia: `font-display` (Fraunces), `font-sans` / `font-body` (DM Sans)
- Radii: `rounded-card` (16px), `rounded-btn` (9px), `rounded-pill` (100px)
- Máscaras: `.mask-fade-left/right/edges/vertical`, `.mask-hero`,
  `.mask-curriculum`

Nunca usar Inter, system fonts ou cores fora do sistema. Ilustrações sempre
com tratamento de sangria (mask-image + width >100% + margem negativa) —
nenhuma imagem enquadrada em retângulo rígido.

## Admin prioritário

- /admin
- /admin/conteudos
- /admin/midia
- /admin/taxonomias
- /admin/menus
- /admin/formularios
- /admin/leads
- /admin/seo
- /admin/configuracoes
- /admin/usuarios

## Branch strategy

Ordem de branches, **sem exceção**:

```
main (produção)  ←  develop (homologação)  ←  feature/<escopo> | fix/<escopo> | claude/<escopo>
```

- **`main`**: deploy de produção no Vercel. Só recebe merge via PR vindo de `develop`,
  após a homologação estar aprovada. Nunca commitar direto.
- **`develop`**: deploy de homologação no Vercel. Fonte de verdade do trabalho em
  andamento. Só recebe merge via PR vindo de branch de feature/fix, após validação do
  humano.
- **`feature/*` / `fix/*` / `claude/*`**: curtas, um escopo por branch, sempre partindo
  de `develop` **atualizada**.

### Antes de começar qualquer tarefa (obrigatório)

1. `git fetch origin`
2. Garantir que a branch de trabalho está em cima do último `origin/develop`.
   Se estiver atrás, fazer rebase/merge de `develop` **antes** de codar qualquer
   linha.
3. Se ainda não houver branch de trabalho, criar:
   `git checkout -b feature/<escopo-curto>` partindo de `develop` já atualizada.

### Ciclo de entrega

1. Desenvolver na branch de feature. Commits pequenos e descritivos.
2. Se `develop` avançar durante o trabalho, rebasear (`git rebase origin/develop`).
3. Rodar `pnpm format:check && pnpm lint && pnpm typecheck && pnpm build` antes de push.
4. Push e abrir PR com base = `develop`, **draft** até o CI passar.
5. Apresentar ao humano para validação. Não mergear sozinho.
6. Após aprovação explícita, merge em `develop` (squash ou merge commit; sem
   amendar/force-push a menos que o humano peça).
7. Promoção para produção: PR separado `develop → main`, abrido quando a
   homologação estiver estável, mergeado após validação final.

### Escopo por produto

Um fluxo `main`/`develop` por **repositório**, não por produto dentro do mesmo repo.
O repo `seusdados/alunosdigitais2026` cobre site público + CMS (mesma app Next.js).
O LMS (`seusdados/alunos-digitais-2026-new`) tem seu próprio `main`/`develop`. Novas
apps com deploy independente (ex.: `cms.alunosdigitais.com` no futuro) ganharão
repositório próprio, não branches próprias neste.

### O que não fazer

- Commitar direto em `main` ou `develop`.
- Abrir PR com base = `main` partindo de feature branch (passa primeiro por `develop`).
- Criar branches `prod-*`, `prod-cms`, `prod-lms` dentro deste repo.
- Merge sem aprovação humana explícita, mesmo com CI verde.

## Antes de encerrar qualquer tarefa

- garanta build coerente
- preserve padrões do projeto
- atualize docs quando a mudança alterar arquitetura ou fluxo
