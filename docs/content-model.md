# Modelo de conteúdo

Recorte operacional do modelo de dados que suporta o CMS. Referência completa
nas seções §12–14 de `alunosdigitais_claude_master_spec.md`.

## Princípio central

Modelo **híbrido**, não EAV:

- Uma tabela principal (`content_items`) com os campos editoriais comuns.
- Uma tabela de revisões (`content_revisions`) que guarda cada versão.
- JSONB para o corpo do editor (origem), HTML renderizado para publicação e
  texto extraído para busca.
- Taxonomias relacionais (`taxonomies` + `terms` + mapas).

## Tipos de conteúdo

Enum `content_type`:

- `page` — páginas institucionais.
- `landing_page` — páginas de campanha e conversão.
- `article` — posts do blog.
- `resource` — materiais da biblioteca / downloads.
- `case_study` — casos de sucesso.
- `faq` — itens de FAQ.
- `legal_page` — privacidade, termos, cookies, acessibilidade.
- `curriculum_unit` — unidades curriculares do programa.

## Status editorial

Enum `content_status`:

`draft → in_review → scheduled → published → archived`

Só `published` entra no sitemap e é lido pela view `published_content`.

## Taxonomias iniciais (seedadas na migration)

- **Tema** — privacidade, cyberbullying, fake news, navegação segura, etc.
- **Persona** — escolas privadas, redes públicas, gestores, educadores,
  famílias, alunos.
- **Formato** — artigo, vídeo, infográfico, PDF, curso, aula.
- **Etapa do funil** — topo, meio, fundo.

## Estrutura do programa

- `program_tracks` — fundamental_1, fundamental_2, famílias, educadores.
- `grade_levels` — ano_1 a ano_9.
- `program_phases` — fase_1 a fase_6.
- `program_themes` — 10 temas seedados (privacidade, cidadão digital,
  navegação segura, imagem/reputação, fake news, jogos, cyberbullying,
  educação financeira, tempo de tela, ECA digital).
- `curriculum_units` — cruzamento de track × ano × fase × tema, com conteúdo
  próprio ou link para LMS externo.

## Campos editoriais obrigatórios

Ao publicar qualquer `content_item`, o editor deve preencher:

- Título + slug
- Excerpt / resumo
- SEO title + SEO description
- OG image (ao menos herdada de um default)
- Canonical (calculado por padrão, mas sobrescrevível)
- Persona + tema (pelo menos uma taxonomia)
- CTA principal quando aplicável

Regra do CLAUDE.md: **não publicar páginas sem campos de SEO.**
