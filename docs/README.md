# Documentação do Site — Alunos Digitais

## Como usar este diretório

Este diretório contém toda a documentação necessária para implementar o site público institucional do programa Alunos Digitais. O Claude Code deve ler estes arquivos antes de escrever código.

## Ordem de leitura recomendada

### 1. Comece aqui
- `implementation/PROMPT-CLAUDE-CODE.md` — **Prompt principal de execução.** Leia primeiro. Contém as 6 fases de implementação em ordem.

### 2. Referência visual
- `implementation/mockup-referencia.html` — **Abra no browser.** Este é o mockup aprovado com todas as ilustrações integradas e tratamento de sangria. É a referência visual definitiva.

### 3. Design system
- `brand/paleta.md` — Cores com hex codes e regras de uso
- `brand/tipografia.md` — Fontes, escala tipográfica, pesos
- `implementation/design-system-tailwind.md` — Tokens prontos para `tailwind.config.ts`
- `implementation/componentes.md` — Specs detalhadas de cada componente/bloco

### 4. Conteúdo
- `brief/roteiro-completo.md` — **Roteiro mestre.** Contém o texto de todas as 26 páginas do site, incluindo H1, copy, CTAs, FAQs e SEO metadata.

### 5. Arquitetura do CMS (futuro)
- `implementation/cms-map.md` — Mapa de coleções, campos, blocos e requisitos do CMS
- `implementation/instrucao-norteadora.md` — Instrução mestra para o agente (visão unificada site + LMS)

### 6. Assets visuais
- `brand/ilustracoes/` — 10 ilustrações aprovadas em JPG (alta resolução)
  - `illo-01-hero.jpg` — Hero principal (escola + estudantes)
  - `illo-02-problema.jpg` — Encruzilhada riscos × oportunidades
  - `illo-03-pilares.jpg` — Mural panorâmico dos 8 pilares
  - `illo-04-formacao.jpg` — Professora em sala de aula
  - `illo-05-familia.jpg` — Família conversando em casa
  - `illo-06-progressao.jpg` — Jornada vertical 1º ao 9º ano
  - `illo-07-escolas.jpg` — Escola isométrica em corte
  - `illo-08-materiais.jpg` — Mesa do professor com materiais
  - `illo-09-conformidade.jpg` — Árvore regulatória
  - `illo-10-sobre.jpg` — Equipe multidisciplinar

## Notas

- **Ilustrações pesadas (>2MB):** As ilustrações em `brand/ilustracoes/` são originais em alta resolução. No build de produção, devem ser otimizadas via `next/image` com formatos WebP/AVIF.
- **Conteúdo estruturado:** O roteiro completo está em um único arquivo markdown. Na implementação, o conteúdo será extraído para arquivos TypeScript em `/data/` conforme o prompt de execução.
- **CMS virá depois:** A fase atual é site estático com dados em arquivos. A migração para CMS/Supabase é fase posterior.
