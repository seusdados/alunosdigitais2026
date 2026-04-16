# Prompt de Implementação — Site Público Alunos Digitais
## Para execução no Claude Code, fase a fase

---

## CONTEXTO

Você vai implementar o **site público institucional** do programa Alunos Digitais.
Toda a direção artística, design visual, conteúdo textual e especificações de componentes já estão aprovados e documentados neste repositório.

### Onde está cada coisa:
- **Mockup HTML de referência:** `docs/implementation/mockup-referencia.html` — abra no browser para ver o resultado visual esperado com todas as ilustrações integradas
- **Roteiro de conteúdo completo (26 páginas):** `docs/brief/roteiro-completo.md`
- **Paleta de cores:** `docs/brand/paleta.md`
- **Tipografia:** `docs/brand/tipografia.md`
- **Especificação de componentes:** `docs/implementation/componentes.md`
- **Design tokens para Tailwind:** `docs/implementation/design-system-tailwind.md`
- **Mapa completo do CMS:** `docs/implementation/cms-map.md`
- **Instrução norteadora do agente:** `docs/implementation/instrucao-norteadora.md`
- **Ilustrações aprovadas (10 peças):** `docs/brand/ilustracoes/illo-01-hero.jpg` a `illo-10-sobre.jpg`

### O que NÃO fazer agora:
- NÃO reescrever o LMS existente
- NÃO criar o CMS completo nesta fase — apenas a estrutura preparatória
- NÃO hardcodar conteúdo solto em JSX — usar dados estruturados

---

## STACK CONFIRMADA
- Next.js 14+ (App Router) + TypeScript
- Tailwind CSS
- Fraunces + DM Sans (Google Fonts)
- Supabase (banco, auth, storage) — para fase posterior do CMS
- Deploy: Vercel

---

## FASE 1 — Fundação (execute primeiro)

### 1.1 Inicializar projeto
```bash
npx create-next-app@latest alunos-digitais-site --typescript --tailwind --app --src-dir
```

### 1.2 Configurar Tailwind com design tokens
Leia `docs/implementation/design-system-tailwind.md` e configure:
- Cores customizadas (navy, teal, amber, sand, site)
- Fontes (display: Fraunces, body: DM Sans)
- BorderRadius customizados
- Utilities de mask (mask-fade-left, mask-fade-right, mask-hero, etc.)

### 1.3 Configurar fontes
No `app/layout.tsx`, importar Fraunces e DM Sans via `next/font/google`.

### 1.4 Globals.css
- Reset mínimo
- CSS custom properties como fallback
- Utilities de mask-image como classes CSS (Tailwind não tem nativo)

### 1.5 Estrutura de pastas
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    ← Home
│   ├── o-programa/page.tsx
│   ├── como-funciona/page.tsx
│   ├── curriculo/
│   │   ├── page.tsx                ← Hub currículo
│   │   ├── fundamental-1/page.tsx
│   │   ├── fundamental-2/page.tsx
│   │   └── [ano]/page.tsx          ← Páginas dinâmicas 1-ano a 9-ano
│   ├── formacao-docente/page.tsx
│   ├── familia-e-engajamento/page.tsx
│   ├── plataforma-e-materiais/page.tsx
│   ├── conformidade-e-curriculo/page.tsx
│   ├── para-escolas/page.tsx
│   ├── para-redes-e-secretarias/page.tsx
│   ├── faq/page.tsx
│   ├── fale-com-um-especialista/page.tsx
│   ├── sobre/page.tsx
│   └── conteudos/page.tsx          ← Hub editorial (futuro)
├── components/
│   ├── layout/
│   │   ├── NavBar.tsx
│   │   ├── Footer.tsx
│   │   └── RegulatoryBar.tsx
│   ├── blocks/
│   │   ├── HeroBlock.tsx
│   │   ├── SplitBleedBlock.tsx
│   │   ├── CardsGridBlock.tsx
│   │   ├── PillarBannerBlock.tsx
│   │   ├── CurriculumSectionBlock.tsx
│   │   ├── FlowStepsBlock.tsx
│   │   ├── CTABarBlock.tsx
│   │   ├── ContactFormBlock.tsx
│   │   ├── YearCard.tsx
│   │   ├── PillarCard.tsx
│   │   └── FAQAccordion.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── SectionEyebrow.tsx
│       ├── SectionHeading.tsx
│       └── BleedImage.tsx          ← Componente reutilizável de imagem estourada
├── data/
│   ├── home.ts                     ← Conteúdo da home
│   ├── curriculo.ts                ← Estrutura curricular 1-9 ano
│   ├── faq.ts                      ← Perguntas e respostas
│   ├── navigation.ts               ← Links do menu
│   └── regulatory.ts               ← Marcos regulatórios
├── lib/
│   └── utils.ts
└── types/
    └── content.ts                   ← Tipos TypeScript dos blocos
```

---

## FASE 2 — Componentes de bloco (execute segundo)

Leia `docs/implementation/componentes.md` para cada spec. Implemente nesta ordem:

### 2.1 Componentes base
- `Button` (variantes: primary, secondary, white, outline-white)
- `SectionEyebrow` (eyebrow text com estilo uppercase teal)
- `SectionHeading` (H2 com subtitle opcional)
- `BleedImage` — **componente central do design:**

```typescript
interface BleedImageProps {
  src: string;
  alt: string;
  direction: 'left' | 'right' | 'full' | 'hero' | 'curriculum';
  className?: string;
}
```

Deve aplicar automaticamente:
- `width: 125-135%` para exceder o container
- Margem negativa correspondente à direção
- CSS mask-image correto para a direção (fade-left, fade-right, etc.)
- Para `hero`: posição absolute com mask composta
- Para `curriculum`: mask vertical com fade-right
- Para `full`: margin negativa bilateral com fade vertical

### 2.2 Layout
- `NavBar` — sticky, conforme spec
- `Footer` — 4 colunas + bottom bar
- `RegulatoryBar` — badges dos marcos normativos

### 2.3 Blocos de conteúdo
Cada bloco recebe props tipadas e renderiza conforme a spec:
- `HeroBlock`
- `SplitBleedBlock` — o bloco mais usado, aceita `direction` para alternar lado da ilustração
- `CardsGridBlock`
- `PillarBannerBlock`
- `CurriculumSectionBlock`
- `FlowStepsBlock`
- `CTABarBlock`
- `ContactFormBlock`
- `FAQAccordion`
- `YearCard`
- `PillarCard`

---

## FASE 3 — Dados e conteúdo (execute terceiro)

### 3.1 Tipos TypeScript
Defina em `types/content.ts`:
```typescript
export interface HeroData {
  pill: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  metrics: { value: string; label: string }[];
  image: { src: string; alt: string };
}

export interface SplitBleedData {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  direction: 'left' | 'right';
  bgColor: 'white' | 'sand';
  cta?: { label: string; href: string };
}

export interface CurriculumYear {
  year: number;
  stage: 'fundamental-1' | 'fundamental-2';
  theme: string;
  topics: string[];
  phases: { number: number; title: string; description: string }[];
  heroText: string;
  developmentItems: string[];
}

// ... demais tipos conforme necessário
```

### 3.2 Dados da Home
Extraia todo o conteúdo do `docs/brief/roteiro-completo.md` (Página 1 — Início) e estruture em `data/home.ts`.

### 3.3 Dados curriculares
Monte `data/curriculo.ts` com os 9 anos, 6 fases cada, temas e descrições — tudo extraído do roteiro (Páginas 7 a 15).

### 3.4 FAQ
Monte `data/faq.ts` com as perguntas da Página 25 do roteiro.

---

## FASE 4 — Páginas (execute quarto)

### 4.1 Home (`app/page.tsx`)
Monte a home compondo os blocos na ordem do mockup:
1. HeroBlock (ILLO-01)
2. RegulatoryBar
3. SplitBleedBlock "O desafio" (ILLO-02, direction right)
4. CardsGridBlock "O que entrega" + PillarBannerBlock (ILLO-03)
5. SplitBleedBlock "Formação" (ILLO-04, direction left)
6. SplitBleedBlock "Família" (ILLO-05, direction right)
7. CurriculumSectionBlock (ILLO-06)
8. FlowStepsBlock
9. SplitBleedBlock "Escolas" (ILLO-07, direction right)
10. SplitBleedBlock "Materiais" (ILLO-08, direction left)
11. SplitBleedBlock "Conformidade" (ILLO-09, direction right)
12. SplitBleedBlock "Sobre" (ILLO-10, direction left)
13. CTABarBlock
14. ContactFormBlock

### 4.2 Demais páginas
Monte cada página usando os blocos reutilizáveis + conteúdo do roteiro:
- `/o-programa` — Página 2 do roteiro
- `/como-funciona` — Página 3
- `/curriculo` — Página 4 (hub com links para anos)
- `/curriculo/[ano]` — Páginas 7-15 (dinâmicas via generateStaticParams)
- `/formacao-docente` — Página 16
- `/familia-e-engajamento` — Página 17
- `/plataforma-e-materiais` — Página 18
- `/conformidade-e-curriculo` — Página 20
- `/para-escolas` — Página 21
- `/para-redes-e-secretarias` — Página 22
- `/faq` — Página 25
- `/fale-com-um-especialista` — Página 26
- `/sobre` — Página 24

---

## FASE 5 — SEO e metadata (execute quinto)

### 5.1 Metadata por página
Use a Metadata API do Next.js. Cada página deve ter:
- `title` — extrair do campo "SEO title" do roteiro
- `description` — extrair do campo "Meta description" do roteiro
- `openGraph` — title, description, image (usar ILLO-01 como default)

### 5.2 Sitemap
Gerar `app/sitemap.ts` dinâmico.

### 5.3 Robots
`app/robots.ts` — permitir tudo em produção, bloquear /admin.

### 5.4 Breadcrumbs
Componente simples para páginas internas.

---

## FASE 6 — Responsividade (execute sexto)

### Regras mobile:
- Padding lateral: 24px (em vez de 44px)
- Hero: stack vertical (conteúdo em cima, ilustração embaixo sem bleed)
- SplitBleedBlock: stack vertical, imagem depois do texto, sem margem negativa, sem mask
- CardsGrid: 2 colunas (mobile) em vez de 4
- CurriculumSection: stack vertical, ilustração acima dos cards
- FlowSteps: stack vertical (1 coluna)
- Tipografia hero: 32px (em vez de 46px)
- Nav: hamburger menu em mobile

---

## REGRAS INVIOLÁVEIS

1. **Ilustrações estouradas** — nenhuma imagem enquadrada num retângulo. Sempre com mask-image e overflow.
2. **Fraunces para display, DM Sans para corpo** — nunca usar Inter, Arial, ou system fonts.
3. **Paleta navy/teal/amber** — nunca usar cores fora do sistema.
4. **Conteúdo via dados estruturados** — não hardcodar textos em JSX. Usar arquivos em `/data/`.
5. **Alternância de fundos** — seções alternam entre `white` (#FDFCFA) e `sand` (#F4F1EC).
6. **Alternância de direção** — SplitBleedBlocks alternam imagem left/right para criar ritmo.
7. **O mockup HTML é a referência visual final** — em caso de dúvida, abra `docs/implementation/mockup-referencia.html` e replique.

---

## ENTREGÁVEL ESPERADO

Ao final das 6 fases:
- Site Next.js funcional com todas as páginas do roteiro
- Componentes reutilizáveis e tipados
- Ilustrações integradas com tratamento de sangria
- SEO configurado por página
- Responsivo
- Pronto para deploy na Vercel
- Preparado para futura integração com CMS/Supabase (dados em `/data/` serão migrados para banco)
