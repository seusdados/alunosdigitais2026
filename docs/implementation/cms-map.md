# Alunos Digitais — Mapa de CMS, blocos editáveis e instruções de implementação

## 1. Objetivo deste documento

Este documento traduz o roteiro estratégico do novo site do **Alunos Digitais** em especificação operacional para implementação no frontend, backend e CMS. O foco é permitir que o agente de IA desenvolvedor estruture um site institucional moderno, responsivo, orientado à conversão, com forte governança editorial e preparado para SEO, mensuração e expansão de conteúdo.

O novo site não deve ser tratado como um folheto digital. Ele deve funcionar como:

1. ativo comercial e institucional;
2. biblioteca curricular navegável por segmento e ano;
3. central de prova regulatória e pedagógica;
4. estrutura editorial gerenciável por CMS interno;
5. base de captação de leads e demonstrações.

## 2. Princípios obrigatórios de arquitetura de conteúdo

1. O site deve apresentar o Alunos Digitais como **programa contínuo**, não como palestra, campanha ou ação pontual.
2. O conteúdo institucional deve deixar clara a natureza **curricular**, com cobertura do **1º ao 9º ano**, **36 aulas anuais**, **6 fases pedagógicas por ano**, material didático, formação docente, engajamento familiar, gamificação e indicadores.
3. O frontend público deve ser separado conceitualmente da área autenticada da plataforma/app, evitando indexação indevida de áreas internas.
4. Todo bloco visual relevante deve ser editável por CMS sem necessidade de deploy.
5. O CMS deve permitir criação de páginas com blocos reutilizáveis, versionamento de conteúdo, agendamento de publicação, SEO por página, FAQs, CTAs e mídia rica.
6. A modelagem deve permitir coexistência de páginas institucionais, páginas curriculares, artigos, FAQs, landing pages e páginas de prova regulatória.

## 3. Arquitetura de informação do novo site

### 3.1 Navegação principal pública

- Início
- O Programa
- Como Funciona
- Currículo
  - Visão Geral
  - Fundamental I
  - Fundamental II
  - 1º ano
  - 2º ano
  - 3º ano
  - 4º ano
  - 5º ano
  - 6º ano
  - 7º ano
  - 8º ano
  - 9º ano
- Formação Docente
- Família e Engajamento
- Plataforma e Materiais
- Conformidade e Currículo
- Para Escolas
- Para Redes e Secretarias
- Conteúdos
- FAQ
- Contato / Solicitar apresentação

### 3.2 Navegação utilitária

- Entrar na plataforma
- Política de privacidade
- Termos de uso
- Cookies
- Acessibilidade
- Mapa do site

### 3.3 Tipos de páginas no CMS

1. Página institucional
2. Página de segmento/persona
3. Página curricular por ano
4. Página hub curricular
5. Página regulatória/compliance
6. Landing page de conversão
7. Artigo / conteúdo editorial
8. FAQ hub
9. Página de contato
10. Página legal

## 4. Estrutura do CMS

## 4.1 Coleções principais

### A. pages

Páginas genéricas compostas por blocos.

Campos mínimos:

- id
- title_internal
- slug
- page_type
- status
- locale
- parent_id
- menu_label
- show_in_menu
- page_template
- hero_variant
- seo_title
- seo_description
- seo_robots
- canonical_url
- og_title
- og_description
- og_image
- schema_type
- lead_cta_variant
- published_at
- updated_at

### B. page_sections

Blocos renderizados dentro de cada página.

Campos mínimos:

- id
- page_id
- section_type
- sort_order
- is_enabled
- anchor_id
- theme_variant
- payload_json

### C. curriculum_years

Estrutura curricular por ano.

Campos mínimos:

- id
- school_stage (fundamental_1 / fundamental_2)
- school_year_number (1 a 9)
- title_public
- subtitle_public
- summary
- hero_text
- progression_text
- seo_title
- seo_description
- slug
- published_at

### D. curriculum_phases

Fases de cada ano.

Campos mínimos:

- id
- curriculum_year_id
- phase_number
- title
- short_description
- learning_goal
- pedagogical_focus
- practical_activity_examples
- family_connection
- risk_or_theme_tags (array)
- sort_order

### E. regulatory_items

Base regulatória e marcos.

Campos mínimos:

- id
- title
- short_name
- norm_type
- jurisdiction
- year
- official_reference
- summary
- relevance_to_program
- audience_notes
- display_order
- link_url

### F. faqs

Perguntas e respostas reutilizáveis.

Campos mínimos:

- id
- question
- answer_richtext
- faq_category
- audience
- related_page_id
- display_order
- is_featured

### G. posts

Conteúdo editorial / artigos.

Campos mínimos:

- id
- title
- slug
- excerpt
- cover_image
- body_richtext
- category_id
- author_id
- seo_title
- seo_description
- status
- published_at
- updated_at

### H. categories

Categorias editoriais.

Sugestão inicial:

- cidadania digital
- currículo e escola
- formação docente
- famílias e responsáveis
- proteção digital
- regulação educacional
- bullying e convivência
- inteligência artificial e escola

### I. media_assets

Mídias e documentos.

Campos mínimos:

- id
- file_path
- file_type
- title
- alt_text
- caption
- copyright_info
- focal_point
- width
- height
- tags

### J. testimonials_or_proofs

Provas sociais e institucionais.

Campos mínimos:

- id
- proof_type
- title
- description
- source_name
- metric_value
- metric_label
- methodology_note
- is_public
- display_order

### K. ctas

Chamadas para ação reutilizáveis.

Campos mínimos:

- id
- name
- label
- destination_type
- destination_url
- form_id
- tracking_event_name
- tracking_payload_json

### L. forms

Estrutura de formulários.

Campos mínimos:

- id
- name
- form_type
- headline
- description
- fields_json
- success_message
- destination_email
- crm_webhook_url
- tracking_event_name

## 4.2 Perfis e permissões do CMS

- super_admin
- admin_editorial
- editor
- redator
- revisao_juridico_pedagogica
- analista_comercial
- analista_seo
- analista_midia
- visualizador

Permissões mínimas:

- publicar/despublicar
- editar SEO
- editar blocos
- gerenciar mídia
- editar currículo
- editar FAQs
- editar menus
- editar CTAs
- ver leads
- exportar leads
- aprovar conteúdo

## 5. Biblioteca de blocos editáveis

Cada bloco abaixo deve existir como componente independente no frontend e como `section_type` no CMS.

## 5.1 Blocos institucionais e comerciais

1. `hero_primary`
   - título
   - subtítulo
   - texto de apoio
   - CTA primária
   - CTA secundária
   - imagem / ilustração / vídeo
   - badges de prova

2. `logo_strip`
   - lista de logos ou selos

3. `problem_context`
   - título
   - texto introdutório
   - cards de problemas
   - frase de fechamento

4. `value_proposition_grid`
   - título
   - cards de diferenciais

5. `program_explainer_steps`
   - título
   - passos numerados

6. `audience_cards`
   - escolas
   - professores
   - famílias
   - gestores
   - redes/secretarias

7. `metrics_highlights`
   - indicadores destacados
   - nota metodológica opcional

8. `cta_banner`
   - título
   - subtítulo
   - botão
   - tema visual

9. `testimonial_cards`
   - citação
   - cargo
   - instituição

10. `comparison_table`

- antes/depois
- projeto pontual x programa contínuo
- conteúdo esparso x estrutura curricular

## 5.2 Blocos curriculares

11. `curriculum_overview`

- segmento
- anos cobertos
- quantidade de aulas
- quantidade de fases
- pilares

12. `year_cards_grid`

- cards do 1º ao 9º ano

13. `phase_timeline`

- 6 fases do ano
- título por fase
- descrição breve
- CTA “ver detalhes”

14. `learning_outcomes`

- o estudante desenvolve
- competências
- habilidades

15. `pedagogical_method`

- metodologia integrada
- dedutivo
- indutivo
- dinâmicas práticas
- estudos de caso
- gamificação

16. `family_engagement_flow`

- escola
- aluno
- família
- circulação do aprendizado

17. `teacher_support_stack`

- workshop inicial
- formação contínua
- vídeos
- plano de aula
- helpdesk pedagógico

18. `materials_showcase`

- livro do professor
- livro do aluno
- vídeos
- plataforma
- recursos gamificados

19. `regulatory_alignment_grid`

- BNCC
- Computação complementar à BNCC
- PNED
- Resolução CNE/CEB 2/2025
- proteção digital / dados / cidadania digital

20. `faq_accordion`

- pergunta
- resposta

## 5.3 Blocos editoriais e SEO

21. `article_body_rich`
22. `related_content`
23. `download_or_resource_card`
24. `breadcrumb`
25. `table_of_contents`
26. `author_box`
27. `schema_faq_block`
28. `local_or_segment_cta`

## 5.4 Requisitos do editor de blocos

- duplicar bloco
- arrastar e reordenar
- ativar/desativar sem excluir
- editar em painel lateral
- preview desktop/tablet/mobile
- histórico de versão
- campo de instrução editorial por bloco
- validação de campos obrigatórios
- suporte a rich text, imagens, ícones, listas, tabela simples, vídeo e FAQ

## 6. Mapa de implementação por página

## 6.1 Home

### Objetivo

Apresentar a proposta de valor completa, mostrar por que o programa existe, para quem serve, como funciona e conduzir para demonstração/contato.

### Template

`page_template = home_modular`

### Blocos obrigatórios

1. hero_primary
2. logo_strip ou selos institucionais
3. problem_context
4. value_proposition_grid
5. regulatory_alignment_grid
6. curriculum_overview
7. teacher_support_stack
8. family_engagement_flow
9. materials_showcase
10. metrics_highlights
11. faq_accordion resumido
12. cta_banner final

### CTA principal

- Solicitar apresentação

### CTA secundária

- Ver currículo do 1º ao 9º ano

## 6.2 Página “O Programa”

### Objetivo

Explicar a essência do Alunos Digitais.

### Blocos obrigatórios

1. hero_primary
2. program_explainer_steps
3. comparison_table (programa contínuo x ação pontual)
4. value_proposition_grid
5. pedagogical_method
6. materials_showcase
7. cta_banner

## 6.3 Página “Como Funciona”

### Objetivo

Explicar implantação e operação ao longo do ano.

### Blocos obrigatórios

1. hero_primary
2. program_explainer_steps com jornada anual
3. teacher_support_stack
4. family_engagement_flow
5. metrics_highlights ou indicadores
6. CTA

### Jornada sugerida em 6 passos

- diagnóstico inicial
- formação de abertura
- aplicação das fases em sala
- apoio contínuo na plataforma
- engajamento familiar recorrente
- indicadores e acompanhamento

## 6.4 Hub “Currículo”

### Objetivo

Apresentar a estrutura curricular completa e distribuir navegação por segmento e ano.

### Blocos obrigatórios

1. hero_primary
2. curriculum_overview
3. year_cards_grid Fundamental I
4. year_cards_grid Fundamental II
5. pedagogical_method
6. regulatory_alignment_grid
7. CTA

## 6.5 Página “Fundamental I”

### Objetivo

Apresentar a progressão do 1º ao 5º ano.

### Blocos obrigatórios

1. hero_primary
2. year_cards_grid (1 a 5)
3. learning_outcomes
4. pedagogical_method
5. materials_showcase
6. CTA

## 6.6 Página “Fundamental II”

### Objetivo

Apresentar a progressão do 6º ao 9º ano.

### Blocos obrigatórios

1. hero_primary
2. year_cards_grid (6 a 9)
3. learning_outcomes
4. pedagogical_method
5. teacher_support_stack
6. CTA

## 6.7 Páginas por ano escolar

### Template

`page_template = curriculum_year`

### Estrutura padrão para cada ano

1. hero_primary
2. year summary card
3. phase_timeline com 6 fases
4. learning_outcomes
5. pedagogical_method
6. family_engagement_flow
7. teacher_support_stack
8. CTA

### Conteúdo base por ano

#### 1º ano

- indivíduo
- relações humanas
- papel de cada um
- importância das regras
- conflitos do dia a dia
- resolução de conflitos

#### 2º ano

- liberdade
- respeito
- solidariedade
- ética
- empatia
- cooperação

#### 3º ano

- importância de ser
- diferença entre ser e ter
- informação
- informação x conhecimento
- curiosidade e inteligência
- senso crítico

#### 4º ano

- privacidade
- importância da imagem
- reputação na rede
- exposição da privacidade na internet
- verdade e mentira
- fake news e cyberbullying

#### 5º ano

- o mundo mudou
- regras da internet
- bullying
- cyberbullying
- influência da internet no consumo infantil
- navegação segura

#### 6º ano

- tecnologia
- partes do computador
- surgimento da internet
- impacto da internet na vida de crianças e adolescentes
- aspectos positivos e negativos do uso
- proteção contra riscos da internet

#### 7º ano

- redes sociais e conexões da sociedade
- WhatsApp e comunicação
- dependência da internet
- bullying e cyberbullying
- saúde mental
- stalking

#### 8º ano

- segurança na internet
- crimes cibernéticos
- Lei Carolina Dieckmann
- riscos das compras online
- invasões virtuais e sequestro de dados
- desafios da internet que afetam jovens

#### 9º ano

- inteligência artificial
- autoria
- riscos dos jogos online
- privacidade ampliada
- desafios da internet
- impactos futuros da tecnologia na vida e no trabalho

## 6.8 Página “Formação Docente”

### Objetivo

Mostrar que o professor não fica sozinho e que o programa vem com estrutura de aplicação.

### Blocos obrigatórios

1. hero_primary
2. teacher_support_stack
3. program_explainer_steps da formação
4. materials_showcase focado em professor
5. faq_accordion
6. CTA

### Provas narrativas que devem aparecer

- material do professor com plano de aula
- workshop inicial presencial e/ou online
- formação contínua ao longo do ano
- vídeos formativos
- helpdesk pedagógico com SLA

## 6.9 Página “Família e Engajamento”

### Objetivo

Explicar o modelo de engajamento familiar.

### Blocos obrigatórios

1. hero_primary
2. family_engagement_flow
3. value_proposition_grid para pais e responsáveis
4. materials_showcase focado em família
5. FAQ
6. CTA

## 6.10 Página “Plataforma e Materiais”

### Objetivo

Apresentar os ativos didáticos e digitais.

### Blocos obrigatórios

1. hero_primary
2. materials_showcase
3. teacher_support_stack
4. gamification showcase
5. CTA

### Itens obrigatórios em copy

- livro do professor
- livro do aluno
- plataforma/app
- vídeos formativos
- recursos complementares
- aplicação física, digital ou híbrida

## 6.11 Página “Conformidade e Currículo”

### Objetivo

Ancorar o programa em marcos pedagógicos e regulatórios sem juridiquês excessivo.

### Blocos obrigatórios

1. hero_primary
2. regulatory_alignment_grid
3. rich_text explicando aderência curricular
4. comparison_table: conteúdo esparso x estrutura curricular
5. faq_accordion regulatório
6. CTA

### Itens que devem aparecer

- BNCC e competências gerais mobilizadas
- PNED
- diretrizes curriculares mais recentes aplicáveis
- cultura digital, cidadania digital e educação midiática
- relação entre formação escolar, uso ético, seguro e responsável das tecnologias

## 6.12 Página “Para Escolas”

### Objetivo

Falar com direção, coordenação e mantenedores.

### Blocos obrigatórios

1. hero_primary
2. problem_context institucional
3. value_proposition_grid
4. implementation roadmap
5. metrics_highlights
6. CTA forte

## 6.13 Página “Para Redes e Secretarias”

### Objetivo

Falar com poder público e redes privadas maiores.

### Blocos obrigatórios

1. hero_primary
2. regulatory_alignment_grid
3. program_explainer_steps em escala
4. indicators and governance
5. CTA

## 6.14 Página “Conteúdos”

### Objetivo

Hub editorial para SEO e autoridade.

### Blocos obrigatórios

1. hero_primary
2. categories grid
3. featured posts
4. related themes
5. CTA para apresentação

## 6.15 Página “FAQ”

### Objetivo

Responder objeções comerciais e pedagógicas.

### Categorias sugeridas

- sobre o programa
- currículo e aplicação
- professores
- famílias
- materiais
- plataforma
- implantação
- conformidade

## 6.16 Página “Contato / Solicitar apresentação”

### Objetivo

Converter.

### Blocos obrigatórios

1. hero_primary com proposta curta
2. formulário
3. bloco de confiança
4. FAQ curta
5. dados de contato institucionais

### Campos mínimos do formulário

- nome
- instituição
- cargo
- e-mail
- telefone/WhatsApp
- cidade/estado
- tipo de instituição
- quantidade aproximada de alunos
- mensagem

## 7. Requisitos de SEO por tipo de página

## 7.1 Campos editáveis no CMS por página

- seo_title
- seo_description
- canonical_url
- slug
- og_title
- og_description
- og_image
- schema_type
- noindex toggle
- breadcrumb label

## 7.2 Boas práticas obrigatórias

- H1 único por página
- title e H1 alinhados, não idênticos quando houver ganho semântico
- URLs curtas e estáveis
- FAQ schema onde aplicável
- breadcrumb schema
- Organization schema global
- Article schema para posts
- FAQPage schema apenas quando o conteúdo estiver visível na página

## 7.3 Taxonomia recomendada de URLs

- `/`
- `/programa`
- `/como-funciona`
- `/curriculo`
- `/curriculo/fundamental-1`
- `/curriculo/fundamental-2`
- `/curriculo/1-ano`
- `/curriculo/2-ano`
- ...
- `/formacao-docente`
- `/familia-e-engajamento`
- `/plataforma-e-materiais`
- `/conformidade-e-curriculo`
- `/para-escolas`
- `/para-redes-e-secretarias`
- `/conteudos`
- `/conteudos/[slug]`
- `/faq`
- `/contato`

## 8. Requisitos de mensuração e tracking

## 8.1 Eventos mínimos

- `page_view`
- `scroll_90`
- `click_cta_primary`
- `click_cta_secondary`
- `generate_lead`
- `start_form`
- `submit_form`
- `click_whatsapp`
- `click_email`
- `view_curriculum_year`
- `expand_faq`
- `download_material`

## 8.2 Parâmetros recomendados

- `page_type`
- `page_slug`
- `section_type`
- `cta_label`
- `cta_position`
- `audience`
- `school_stage`
- `school_year`
- `content_category`

## 8.3 Regras de implementação

- os componentes CTA devem aceitar configuração de tracking por CMS
- o formulário deve disparar `start_form` no primeiro foco
- envio validado deve disparar `generate_lead`
- expansão de FAQ importante deve ser rastreável
- cards de anos escolares devem disparar evento ao clique

## 9. Requisitos de frontend para o Claude Code

1. Stack recomendada: Next.js App Router + TypeScript + Tailwind + shadcn/ui.
2. Consumo dos blocos a partir de API do Supabase ou camada server-side.
3. Renderização por blocos com registry de componentes, por exemplo `sectionRendererMap`.
4. Páginas curriculares geradas dinamicamente por slug.
5. Preview de rascunho para CMS.
6. Sitemap dinâmico.
7. Robots configurável por ambiente.
8. Metadata API do Next para SEO.
9. Lazy loading de mídia.
10. Imagens otimizadas.
11. Separação clara entre site público e área autenticada.

## 10. Requisitos de UX editorial do CMS

1. Editor em blocos, não apenas página monolítica.
2. Rich text com Tiptap ou equivalente, com:
   - headings
   - listas
   - callout
   - tabela simples
   - imagens com legenda
   - embeds
   - arrastar e reordenar
   - redimensionar mídia
3. Biblioteca de mídia central.
4. Duplicação de páginas.
5. Duplicação de blocos.
6. Histórico de versões.
7. Rascunho, revisão, publicado, arquivado.
8. Preview antes de publicar.
9. Campo interno “observações editoriais”.
10. Campos SEO e social por página.

## 11. Conteúdo inicial mínimo a ser migrado/estruturado no lançamento

### Páginas institucionais mínimas

- Home
- O Programa
- Como Funciona
- Currículo
- Formação Docente
- Família e Engajamento
- Plataforma e Materiais
- Conformidade e Currículo
- Para Escolas
- Para Redes e Secretarias
- FAQ
- Contato

### Páginas curriculares mínimas

- Fundamental I
- Fundamental II
- 1º ao 9º ano

### Conteúdos editoriais mínimos

- O que é cidadania digital na escola
- O que muda com a educação digital no currículo escolar
- Como escolas podem estruturar um programa contínuo de cidadania digital
- Formação docente para cultura digital: por que não basta entregar material
- Como envolver famílias no uso seguro e responsável da tecnologia

## 12. Regras de linguagem do site

1. Linguagem clara, forte, institucional e pedagógica.
2. Sem juridiquês desnecessário.
3. Sem promessas categóricas não comprovadas.
4. Evitar afirmar “único do Brasil” sem benchmark formal publicado.
5. Quando houver dados percentuais, exigir campo de metodologia/fonte.
6. O texto deve reforçar: estrutura curricular, continuidade, suporte, aplicabilidade, engajamento e formação.

## 13. Checklist final para o Claude Code executar

1. Criar arquitetura de rotas públicas.
2. Criar schema SQL e RLS compatíveis com CMS + conteúdo.
3. Criar painel CMS com autenticação e papéis.
4. Criar biblioteca de blocos reutilizáveis.
5. Criar renderer dinâmico de páginas por blocos.
6. Criar templates de páginas institucionais e curriculares.
7. Inserir seed inicial com estrutura de navegação e páginas base.
8. Implementar SEO técnico mínimo.
9. Implementar tracking mínimo.
10. Preparar ambiente para migração do conteúdo aprovado.
