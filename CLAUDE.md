
# CLAUDE.md — Regras do repositório Alunos Digitais

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
- /
- /programa
- /como-funciona
- /metodologia
- /para-escolas
- /para-educadores
- /para-familias
- /temas/[slug]
- /biblioteca
- /blog
- /contato
- /agende-uma-conversa

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

## Antes de encerrar qualquer tarefa
- garanta build coerente
- preserve padrões do projeto
- atualize docs quando a mudança alterar arquitetura ou fluxo
