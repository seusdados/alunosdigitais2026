# Alunos Digitais — Especificação de Arquitetura para Claude Code

## 1) Objetivo do projeto

Construir um novo site institucional para **Alunos Digitais**, moderno, responsivo, performático, SEO-first e operável por um **CMS interno robusto**, capaz de explicar o programa com profundidade, captar demanda qualificada e servir de base para evolução futura do ecossistema digital.

Este documento foi estruturado para **Claude Code** executar o desenvolvimento ponta a ponta, com foco em:

- site público de alta performance
- CMS interno com edição visual rica
- arquitetura de dados em **PostgreSQL / Supabase**
- autenticação, storage e permissões no Supabase
- deploy automatizado via **GitHub + Vercel**
- separação clara entre **site institucional/captura** e **área interna/LMS**

---

## 2) Premissas e classificações

### VERIFICADO

- O programa público de Alunos Digitais trabalha cidadania digital, segurança online, proteção de dados, engajamento familiar e temas como privacidade, direitos do cidadão, navegação segura, cyberbullying e fake news.
- O material público descreve o programa como aplicável a escolas públicas e privadas.
- O programa é descrito publicamente como estruturado em fases e com apoio de gamificação.
- A superfície pública atual expõe páginas do app/LMS e até páginas administrativas na busca, o que reforça a necessidade de separar indexação pública de ambiente interno.

### INFERIDO

- O modelo comercial principal é **geração de leads consultiva/institucional** para adesão ao programa por escolas, redes, gestores e mantenedores.
- A região prioritária inicial é **Brasil**.
- O stack atual do app parece ter traços de LMS legado, possivelmente algo próximo de Moodle, mas isso não é base obrigatória para a nova implementação.

### RECOMENDADO

- Não reconstruir o LMS no mesmo ciclo do novo site.
- Criar um **novo site institucional + CMS** em código moderno, mantendo eventual LMS como sistema separado ou integrado depois.
- Usar **Next.js + TypeScript + Supabase + Vercel**.
- Tratar **PostgreSQL/SQL** como camada central de modelagem, regras, constraints, views, índices e políticas.
- Usar editor visual avançado baseado em **Tiptap**.

---

## 3) Escopo do MVP recomendado

### Dentro do escopo

1. Site institucional público
2. CMS interno completo
3. Modelagem de páginas, blog, biblioteca, materiais e programa
4. Captação de leads e formulários
5. SEO técnico e editorial
6. Gestão de mídia
7. Gestão de navegação, redirects e metadados
8. Fluxo editorial com rascunho, revisão e publicação
9. Integração com GA4/GTM/Meta de forma preparada
10. Infra com GitHub, Vercel e Supabase

### Fora do escopo do primeiro ciclo

1. Reescrever o LMS inteiro
2. Reproduzir todas as funcionalidades pedagógicas do app legado
3. Checkout complexo
4. Marketplace
5. Multi-tenant white-label completo
6. App mobile nativo

---

## 4) Decisão arquitetural principal

### Decisão

O projeto deve ser construído como **uma aplicação web única**, com:

- **site público** em rotas abertas
- **admin/CMS** em rotas protegidas
- **Supabase** como banco, auth, storage e políticas
- **Vercel** como hospedagem/deploy
- **GitHub** como origem única do código
- **Claude Code** como executor principal do desenvolvimento

### Motivo

Essa abordagem reduz atrito operacional, facilita preview por PR, mantém o backend enxuto e concentra a governança de dados no Postgres com RLS.

### Interpretação da exigência “a linguagem deve ser postgres”

Postgres não é linguagem de aplicação. Para honrar essa diretriz, o desenho abaixo usa:

- **SQL/PostgreSQL** como linguagem central de dados e regras
- **TypeScript** como linguagem da aplicação web
- **Next.js** como runtime web e de rotas
- **Supabase** como plataforma operacional do Postgres

---

## 5) Stack recomendada

## Aplicação

- Next.js (App Router)
- TypeScript
- React
- Tailwind CSS
- shadcn/ui para base de interface
- Zod para validação
- React Hook Form para formulários

## Dados / backend

- Supabase Postgres
- Supabase Auth
- Supabase Storage
- Supabase CLI para migrations
- SQL-first model
- tipos gerados do banco para TypeScript

## CMS / edição

- Tiptap
- upload de arquivos/imagens para Supabase Storage
- autosave
- versionamento por revisão
- componentes/blocos customizados

## Deploy / fluxo

- GitHub
- Vercel
- GitHub Actions
- preview deployments por branch/PR
- branches do Supabase para homologação quando fizer sentido

## Qualidade

- ESLint
- Prettier
- Playwright
- testes de integração
- validação de build no CI

---

## 6) Princípios não negociáveis

1. **SEO-first**
   - somente conteúdo público e publicado entra em sitemap
   - admin e rotas internas sempre fora de indexação
   - URLs limpas, estáveis e versionamento editorial sem gerar duplicação

2. **Separação de domínios lógicos**
   - novo site institucional não pode repetir o erro atual de indexar rotas internas/LMS/admin
   - o ambiente pedagógico, caso exista, fica desacoplado do marketing site

3. **CMS realmente utilizável**
   - editor rico com drag, reorder, resize e blocos reutilizáveis
   - mídia administrável
   - revisão/publicação simples

4. **Segurança e governança**
   - RLS em todas as tabelas sensíveis
   - service_role apenas no servidor
   - logs de ação administrativa

5. **Performance**
   - páginas públicas rápidas
   - imagens otimizadas
   - renderização adequada para conteúdo

6. **Evolutividade**
   - dados modelados para crescimento futuro
   - base pronta para integração com LMS, CRM, automação e biblioteca mais profunda

---

## 7) Arquitetura de alto nível

```mermaid
flowchart LR
  A[Visitante] --> B[Next.js na Vercel]
  E[Equipe interna] --> F[/admin CMS]
  F --> B
  B --> C[Supabase Auth]
  B --> D[Supabase Postgres]
  B --> G[Supabase Storage]
  B --> H[GA4 / GTM / Meta]
  B --> I[Search Console / sitemap / robots]
  J[GitHub] --> K[Vercel Preview Deployments]
  J --> L[CI / testes]
  M[Claude Code] --> J
```

### Estratégia recomendada de rotas

- `www.alunosdigitais.com/*` → site público
- `www.alunosdigitais.com/admin/*` → CMS interno protegido
- `app.alunosdigitais.com/*` → manter como ambiente pedagógico/LMS separado, sem indexação pública
- `ecadigital.com.br/*` → tratado como hub satélite ou ativo relacionado, mas não misturado ao CMS público principal neste ciclo

---

## 8) Estrutura de repositório recomendada

```text
/
├─ app/
│  ├─ (public)/
│  ├─ admin/
│  ├─ api/
│  ├─ sitemap.ts
│  ├─ robots.ts
│  └─ layout.tsx
├─ components/
│  ├─ ui/
│  ├─ site/
│  ├─ cms/
│  └─ blocks/
├─ lib/
│  ├─ auth/
│  ├─ cms/
│  ├─ db/
│  ├─ seo/
│  ├─ analytics/
│  ├─ storage/
│  └─ validation/
├─ public/
├─ styles/
├─ supabase/
│  ├─ migrations/
│  ├─ seed.sql
│  ├─ config.toml
│  └─ functions/
├─ tests/
│  ├─ e2e/
│  └─ integration/
├─ docs/
│  ├─ architecture.md
│  ├─ content-model.md
│  ├─ migration-plan.md
│  └─ cms-guide.md
├─ .github/
│  └─ workflows/
├─ CLAUDE.md
├─ package.json
└─ .env.example
```

---

## 9) Módulos do sistema

## 9.1 Site público

- homepage
- páginas institucionais
- páginas por público
- páginas por tema
- blog
- biblioteca / materiais
- cases / depoimentos
- FAQ
- formulários
- páginas legais

## 9.2 CMS interno

- dashboard
- conteúdos
- mídia
- taxonomias
- navegação
- formulários
- leads
- redirects
- SEO
- usuários e permissões
- configurações
- revisões e publicação

## 9.3 Camada de dados

- conteúdo
- taxonomias
- mídia
- programa/currículo
- formulários e leads
- consentimentos e privacidade
- navegação e SEO técnico
- auditoria

---

## 10) Mapa de páginas públicas

## 10.1 Essenciais

- `/`
- `/programa`
- `/como-funciona`
- `/metodologia`
- `/para-escolas`
- `/para-educadores`
- `/para-familias`
- `/temas`
- `/biblioteca`
- `/blog`
- `/materiais`
- `/cases`
- `/sobre`
- `/contato`
- `/agende-uma-conversa`
- `/politica-de-privacidade`
- `/termos-de-uso`
- `/politica-de-cookies`
- `/acessibilidade`

## 10.2 Páginas temáticas recomendadas

- `/temas/privacidade-de-dados`
- `/temas/direitos-do-cidadao-digital`
- `/temas/navegacao-segura`
- `/temas/imagem-e-reputacao-nas-redes`
- `/temas/fake-news-e-educacao-midiatica`
- `/temas/cyberbullying`
- `/temas/jogos-online`
- `/temas/educacao-financeira-digital`
- `/temas/tempo-de-tela`
- `/temas/eca-digital`

## 10.3 Biblioteca / blog

- `/biblioteca/[slug]`
- `/blog/[slug]`
- `/materiais/[slug]`
- `/cases/[slug]`

## 10.4 Páginas por persona

- `/para-escolas-privadas`
- `/para-redes-publicas`
- `/para-gestores`
- `/para-professores`
- `/para-pais-e-responsaveis`

---

## 11) Estrutura do CMS interno

## 11.1 Dashboard

- cards de conteúdos publicados
- rascunhos pendentes
- leads recentes
- páginas com SEO pendente
- redirects ativos
- mídia recente

## 11.2 Conteúdos

- lista filtrável por tipo, status, autor, data, termo, persona
- criação de:
  - página
  - landing page
  - artigo
  - material
  - case
  - FAQ
  - unidade curricular

## 11.3 Editor

### Requisitos obrigatórios

- drag and drop
- reordenação de blocos
- redimensionamento de imagem
- upload direto ao storage
- blocos reutilizáveis
- preview desktop/tablet/mobile
- autosave
- histórico de revisões
- publicação agendada
- blocos customizados

### Blocos iniciais

- hero
- rich text
- cards
- CTA
- FAQ accordion
- depoimentos
- estatísticas
- logos
- imagem
- vídeo embed
- tabela
- timeline
- callout
- download box
- grid 2 colunas
- grid 3 colunas
- comparação
- sessão de professores
- sessão de famílias
- sessão de temas

## 11.4 Mídia

- biblioteca por pasta lógica
- upload múltiplo
- alt text obrigatório em imagens públicas
- crop/resize leve
- tagueamento
- seleção de imagem OG

## 11.5 SEO

- title
- meta description
- canonical
- OG title
- OG description
- OG image
- noindex
- structured data JSON-LD
- preview do snippet

## 11.6 Formulários / leads

- cadastro de formulários
- campos configuráveis
- notificações
- exportação CSV
- pipeline simples de lead

## 11.7 Segurança / governança

- perfis:
  - super_admin
  - admin
  - editor
  - reviewer
  - analyst
- log de ação
- senha forte / magic link / MFA conforme viabilidade

---

## 12) Modelo de conteúdo recomendado

## 12.1 Estratégia

Usar um **modelo híbrido**:

- tabela principal de conteúdo
- tabela de revisões
- taxonomias relacionais
- JSONB para corpo do editor
- HTML renderizado e texto extraído para publicação e busca

### Por que esse modelo?

- evita EAV excessivo
- mantém flexibilidade
- facilita preview, publish e busca
- suporta editor avançado sem congelar a evolução do schema

## 12.2 Tipos principais de conteúdo

- page
- landing_page
- article
- resource
- case_study
- faq
- legal_page
- curriculum_unit

## 12.3 Taxonomias

- tema
- persona
- formato
- etapa_funil
- segmento
- ano_escolar
- fase_programa

---

## 13) Modelo de dados lógico

## 13.1 Entidades centrais

1. `profiles`
2. `role_assignments`
3. `media_assets`
4. `content_items`
5. `content_revisions`
6. `taxonomies`
7. `terms`
8. `content_term_map`
9. `content_relations`
10. `menus`
11. `menu_items`
12. `forms`
13. `form_fields`
14. `form_submissions`
15. `leads`
16. `site_settings`
17. `redirects`
18. `audience_segments`
19. `program_tracks`
20. `grade_levels`
21. `program_phases`
22. `program_themes`
23. `curriculum_units`
24. `consent_records`
25. `privacy_requests`
26. `audit_logs`

## 13.2 Relações principais

- `auth.users 1:1 profiles`
- `profiles N:N roles`
- `content_items 1:N content_revisions`
- `content_items N:N terms`
- `content_items N:N content_items` via `content_relations`
- `menus 1:N menu_items`
- `forms 1:N form_fields`
- `forms 1:N form_submissions`
- `form_submissions N:1 leads`
- `curriculum_units N:1 grade_levels`
- `curriculum_units N:1 program_phases`
- `curriculum_units N:1 program_themes`
- `curriculum_units N:1 program_tracks`
- `content_items N:N audience_segments`

---

## 14) Modelagem do programa Alunos Digitais

O site não deve ser só institucional. Ele precisa conseguir **explicar o programa em profundidade**, inclusive em estrutura curricular.

## 14.1 Eixos do programa a refletir no banco

- público-alvo
- ano escolar
- fase
- tema
- objetivo pedagógico
- material de apoio
- CTA comercial
- relação com biblioteca/blog

## 14.2 Estrutura recomendada

### `program_tracks`

Exemplos:

- fundamental_1
- fundamental_2
- familias
- educadores

### `grade_levels`

Exemplos:

- ano_1
- ano_2
- ...
- ano_9

### `program_phases`

Exemplos:

- fase_1
- fase_2
- fase_3
- fase_4
- fase_5
- fase_6

### `program_themes`

Exemplos:

- privacidade_de_dados
- direitos_do_cidadao
- navegacao_segura
- imagem_e_reputacao
- fake_news
- jogos_online
- cyberbullying
- educacao_financeira_digital
- tempo_de_tela
- eca_digital

### `curriculum_units`

Cada unidade pode conter:

- track
- ano
- fase
- tema
- título
- resumo
- objetivo
- duração
- links para materiais
- link opcional para LMS externo
- status de publicação
- conteúdo rico próprio

---

## 15) Buckets de storage recomendados

1. `site-public`
   - imagens públicas do site
   - logos
   - banners
   - thumbs

2. `documents`
   - PDFs públicos e privados
   - materiais ricos
   - downloads

3. `og-images`
   - imagens sociais
   - geradas ou uploadadas

4. `cms-private`
   - arquivos internos
   - drafts
   - anexos não públicos

### Regras

- tudo público deve ter metadado mínimo
- assets sensíveis não podem estar em bucket público
- usar URL assinada quando necessário
- mídia precisa de registro em tabela para governança

---

## 16) Autenticação e autorização

## 16.1 Auth

Usar Supabase Auth com:

- email + magic link
- email + senha para administradores
- recuperação de senha
- possibilidade de MFA futura

## 16.2 RLS

### Público

- leitura apenas de conteúdos publicados
- envio de formulários
- registro de consentimento
- abertura de solicitação de privacidade

### Editor/Admin

- acesso por role
- leitura e escrita conforme papel
- publicação apenas para reviewer/admin/super_admin
- assets privados protegidos

### Service role

- somente em server-side
- jamais exposto no cliente

---

## 17) Fluxo editorial recomendado

1. Editor cria conteúdo
2. Rascunho gera `content_item`
3. Cada salvamento importante gera `content_revision`
4. Preview privado disponível
5. Reviewer aprova ou devolve
6. Publish atualiza:
   - status
   - versão publicada
   - HTML renderizado
   - search text
   - SEO
   - revalidação de cache
   - sitemap

### Campos editoriais importantes

- título
- subtítulo
- resumo
- conteúdo
- SEO title
- SEO description
- OG image
- canonical
- persona
- tema
- CTA principal
- autor
- data de publicação

---

## 18) Requisitos SEO obrigatórios

- sitemap dinâmico apenas para conteúdo publicado
- robots com bloqueio de admin
- canonical por página
- metadados por tipo de conteúdo
- breadcrumbs
- schema JSON-LD por tipo:
  - Organization
  - WebSite
  - Article
  - FAQPage
  - BreadcrumbList
- slugs únicos por locale
- redirects 301 gerenciáveis
- noindex controlável por conteúdo
- campo de texto extraído para busca interna e futura busca semântica

---

## 19) Requisitos de analytics e captação

## Eventos essenciais

- `page_view`
- `view_program_page`
- `view_curriculum_unit`
- `click_cta_primary`
- `start_form`
- `submit_form`
- `generate_lead`
- `download_material`
- `search_internal`

## Conversões principais

- agendar conversa
- enviar formulário de interesse
- solicitar apresentação
- baixar material rico qualificado

## Observação

Não salvar analytics bruto em banco no primeiro ciclo. Use GA4/GTM para comportamento e banco para dados operacionais do CMS/leads.

---

## 20) Requisitos de UX e performance

- mobile-first
- acessibilidade mínima AA
- preview real de blocos
- imagens responsivas
- páginas de conteúdo com TOC quando aplicável
- busca interna
- paginação em biblioteca/blog
- leitura agradável
- componentes reutilizáveis
- tempo de carregamento baixo
- skeleton/loading states onde necessário

---

## 21) Regras de conteúdo e migração

## 21.1 Conteúdo a migrar/aproveitar

- essência do programa
- temas pedagógicos
- estrutura por ano/fase quando útil
- manuais e PDFs já existentes
- páginas legais
- FAQs
- provas institucionais e cases
- conteúdos correlatos do ecossistema ECA Digital quando houver alinhamento

## 21.2 Migração recomendada

- transformar PDFs estratégicos em páginas HTML indexáveis
- manter o PDF como download complementar
- mapear 301 redirects do legado
- não deixar app/admin ser indexado
- revisar títulos, descrições e headings no momento da publicação

---

## 22) GitHub + Vercel + Supabase + Claude Code

## 22.1 Fluxo de branch

- `main` = produção
- `develop` = integração opcional
- `feat/*` = features
- `fix/*` = correções

## 22.2 PR flow

1. branch abre PR
2. CI roda lint, typecheck, testes, build
3. Vercel gera preview
4. Supabase preview/staging aplica migrations em ambiente adequado
5. revisão
6. merge
7. produção

## 22.3 Claude Code

O repositório deve ter:

- `CLAUDE.md` na raiz
- docs de arquitetura
- comandos de setup
- comandos de teste
- restrições claras de stack e padrões

---

## 23) Roadmap técnico em fases

## Fase 1 — Bootstrap

- criar repo
- iniciar Next.js
- configurar Supabase
- configurar Vercel
- configurar lint/test/build
- criar `.env.example`
- escrever `CLAUDE.md`

## Fase 2 — Dados e auth

- criar migrations
- perfis e roles
- RLS base
- storage buckets
- utilitários server/client do Supabase

## Fase 3 — CMS core

- login admin
- dashboard
- CRUD de conteúdo
- editor Tiptap
- mídia
- taxonomias
- preview
- publish workflow

## Fase 4 — Site público

- homepage
- páginas institucionais
- tema/programa/personas
- blog/biblioteca
- navegação e footer
- SEO base

## Fase 5 — Formulários e leads

- forms
- submissões
- leads
- consentimento
- páginas de conversão
- eventos analíticos

## Fase 6 — Migração e hardening

- importar conteúdo prioritário
- redirects
- testes e2e
- auditoria mobile/SEO
- revisão final
- launch

---

## 24) Critérios de aceite

O projeto só é considerado pronto quando:

1. o admin entra com autenticação segura
2. um editor cria, edita, revisa e publica conteúdo
3. o site público renderiza conteúdo publicado corretamente
4. imagens e documentos sobem para o storage e ficam governados
5. existe controle de SEO por página
6. formulários viram submissões e leads
7. admin e rotas internas não entram no sitemap
8. preview por PR existe
9. migrations versionadas existem
10. build, lint e testes rodam no CI
11. há 301 redirects definidos para ativos legados prioritários
12. o site explica claramente o programa e suas frentes

---

## 25) Decisões que Claude Code deve respeitar

1. Não improvisar outro stack sem justificativa forte
2. Não misturar CMS público com LMS legado
3. Não expor service role ao cliente
4. Não salvar só HTML; manter JSON de origem do editor
5. Não usar schema excessivamente genérico ou impossível de manter
6. Não publicar admin/indexável
7. Não criar rotas públicas sem metadados e sem regra editorial
8. Não deixar formulários sem consentimento e validação
9. Não tratar PDF como única página de conteúdo estratégico
10. Não quebrar URLs publicadas depois do lançamento

---

## 26) Prompt operacional para Claude Code

Cole o prompt do arquivo `prompt_claude_code_alunosdigitais.txt`.

---

## 27) Entregáveis esperados de Claude Code

1. estrutura inicial do projeto
2. migrations SQL
3. auth + roles + policies
4. buckets de storage
5. componentes de layout
6. CMS funcional
7. páginas públicas principais
8. formulários/leads
9. SEO técnico
10. testes
11. CI
12. documentação

---

## 28) Checklist final de kickoff

- [ ] criar repositório GitHub
- [ ] conectar Vercel ao repo
- [ ] criar projeto Supabase
- [ ] adicionar envs em Vercel
- [ ] subir migrations iniciais
- [ ] registrar domínio principal
- [ ] definir domínios do admin/app se necessário
- [ ] colar `CLAUDE.md`
- [ ] entregar prompt ao Claude Code
- [ ] executar por fases
