# Especificação de componentes — Blocos do site

## Princípio de design: Ilustrações "estouradas"
Todas as ilustrações no site usam tratamento de sangria (bleed):
- Imagens excedem o container (width: 125-135%)
- CSS `mask-image` com `linear-gradient` dissolve as bordas
- Margem negativa faz a imagem sangrar além do padding do site
- Nenhuma ilustração aparece enquadrada num retângulo rígido

---

## 1. NavBar
```
Componente: NavBar
Background: navy-800
Altura: 62px
Padding: 0 44px
Layout: flex, space-between, align-center
Sticky: top 0, z-index 100

Elementos:
- Logo: SVG (36x36) + "Alunos Digitais" (Fraunces 700 17px white) + "PROGRAMA EDUCACIONAL" (DM Sans 500 9px white/30%)
- Links: DM Sans 400 13px white/50%, padding 8px 14px, border-radius 7px, hover: white + bg white/7%
- CTA: DM Sans 500 13px white, bg teal-500, padding 10px 22px, border-radius 8px
```

## 2. HeroBlock
```
Componente: HeroBlock
Background: navy-800
Min-height: 580px
Layout: flex, align-center, padding 0 44px
Overflow: hidden (para ilustração sangrar)

Conteúdo (z-index 2, max-width 500px):
- Pill: border 1px teal/28%, bg teal/8%, border-radius 100px
  - Dot verde (7px) + texto DM Sans 500 11.5px teal-300
- H1: Fraunces 700 46px white, letter-spacing -0.04em
  - <em>: Fraunces italic 400, cor teal-300
- Subtexto: DM Sans 300 15.5px white/48%, max-width 410px
- Botões: btn-p (teal-500) + btn-s (border white/13%)
- Métricas: 4 colunas, border-top 1px white/7%
  - Número: Fraunces 700 32px white
  - Label: DM Sans 400 11px white/30%

Ilustração (position absolute, z-index 1):
- right: -40px, bottom: -20px, width: 62%
- mask-image: fade horizontal (transparent 0% → black 15% → black 85% → transparent 100%)
  + fade vertical (black 70% → transparent 100%)
- mask-composite: intersect
- opacity: 0.92
```

## 3. RegulatoryBar
```
Componente: RegulatoryBar
Background: navy-900
Padding: 14px 44px
Layout: flex, wrap, gap 16px

Elementos:
- Label: DM Sans 500 9.5px white/25%, uppercase, letter-spacing 0.14em
- Tags: cada um com dot colorido (5px) + texto DM Sans 500 11px white/50%
  - Border: 1px white/8%, border-radius 100px, padding 5px 13px
```

## 4. SplitBleedBlock
```
Componente: SplitBleedBlock
Props: { eyebrow, title, paragraphs[], imageUrl, imageAlt, direction: 'left'|'right', bgColor: 'white'|'sand' }
Padding: 64px 44px
Overflow: hidden

Layout: grid 2 colunas, gap 0
- Coluna texto: padding-right 40px (ou padding-left se direction=right)
  - Eyebrow: DM Sans 500 10.5px teal-500, uppercase, letter-spacing 0.15em
  - H2: Fraunces 700 32px text-primary, letter-spacing -0.03em
  - Parágrafos: DM Sans 400 15px text-mid, max-width 480px, margin-top 14px

- Coluna imagem:
  - img width: 125-130%, margin lateral negativo para sangrar
  - margin-right: -44px (se direction=left, imagem na direita)
  - margin-left: -44px (se direction=right, imagem na esquerda)
  - mask-image:
    - Se imagem na DIREITA: fade-left (transparent 0% → black 20% → black 100%)
    - Se imagem na ESQUERDA: fade-right (transparent 0% → black 20% → black 100%)
```

## 5. CardsGridBlock
```
Componente: CardsGridBlock
Props: { eyebrow, title, subtitle, cards[] }
Grid: 4 colunas, gap 14px

Card:
- Background: white
- Border: 1px gray-100, border-radius 16px
- Padding: 28px 22px
- Hover: border gray-200, translateY(-2px)
- Ícone: 46x46px, border-radius 12px, bg teal-100 ou amber-100
- Título: Fraunces 600 15px text-primary
- Texto: DM Sans 400 13px text-light
```

## 6. PillarBannerBlock
```
Componente: PillarBannerBlock
Props: { imageUrl, imageAlt }
Margin: 32px -44px 0 (full-bleed, sangra o padding do site)
Overflow: hidden

Imagem: width 100%
mask-image: fade vertical (transparent 0% → black 8% → black 88% → transparent 100%)
```

## 7. CurriculumSectionBlock
```
Componente: CurriculumSectionBlock
Layout: grid [auto 1fr], gap 0

Coluna esquerda (ilustração vertical):
- width: 320px, margin-left: -44px (sangra pela borda esquerda)
- mask-image: fade direita (black 60% → transparent 100%) + fade vertical
- mask-composite: intersect

Coluna direita (cards):
- padding-left: 20px
- Label do segmento: Fraunces 600 13px text-mid
- Grid F1: 3 colunas (antes era 5, adaptado para caber ao lado da illo)
- Grid F2: 3 colunas

YearCard:
- Background: white, border 1px gray-100, border-radius 10px, padding 18px 16px
- Hover: border teal-400 + box-shadow 3px teal/6%
- Número: Fraunces 800 24px navy-700, sub 13px/500 text-light
- Tema: DM Sans 500 12px teal-500
- Tópicos: DM Sans 400 11px text-light

YearCard.f2:
- border-left: 3px solid navy-500, border-radius: 0
- Número e tema em navy-500
```

## 8. FlowStepsBlock
```
Componente: FlowStepsBlock
Props: { eyebrow, title, subtitle, steps[] }
Container: border 1px gray-100, border-radius 16px, bg white
Grid: 4 colunas

Step:
- Padding: 30px 24px, border-right 1px gray-100
- Número: DM Sans 700 10px teal-500, letter-spacing 0.12em
- Título: Fraunces 600 14.5px text-primary
- Texto: DM Sans 400 12.5px text-light
```

## 9. CTABarBlock
```
Componente: CTABarBlock
Props: { title, subtitle, primaryLabel, secondaryLabel }
Background: navy-700
Padding: 52px 44px
Layout: flex, space-between, align-center

Título: Fraunces 700 28px white, max-width 440px
Subtexto: DM Sans 300 14px white/45%
Botão primário: DM Sans 600 14px navy-700, bg white, padding 14px 28px, radius 9px
Botão secundário: DM Sans 400 14px white/70%, border 1px white/20%
```

## 10. ContactFormBlock
```
Componente: ContactFormBlock
Props: { eyebrow, title, subtitle }
Container form: bg sand, border-radius 20px, padding 36px
Grid: 2 colunas, gap 18px

Campo:
- Label: DM Sans 500 12.5px text-mid
- Input: border 1px gray-100, border-radius 9px, bg white, padding 11px 14px
- Focus: border teal-400 + box-shadow 3px teal/8%
- Campo "mensagem": grid-column span 2

Botão submit: btn-p alinhado à direita
```

## 11. FooterBlock
```
Componente: FooterBlock
Background: navy-800
Padding: 40px 44px 32px
Grid: 4 colunas, gap 28px

Coluna:
- Título: Fraunces 600 13px white/80%
- Links: DM Sans 400 12.5px white/40%, margin-bottom 10px

Footer bottom:
- Background: navy-900
- Padding: 16px 44px
- Texto: DM Sans 400 11.5px white/25%
```

## Mapa de ilustrações por componente

| Componente | Ilustração | Arquivo | Tratamento |
|---|---|---|---|
| HeroBlock | ILLO-01 | `illo1vf.jpg` | Absolute, fade horizontal+vertical, opacity 92% |
| SplitBleed "O desafio" | ILLO-02 | `illo2vf.jpg` | Bleed right, fade-left |
| PillarBanner | ILLO-03 | `illo3-vf.jpg` | Full-bleed, fade top+bottom |
| SplitBleed "Formação" | ILLO-04 | `illo4vf.jpg` | Bleed left, fade-right |
| SplitBleed "Família" | ILLO-05 | `illo5vf.jpg` | Bleed right, fade-left |
| CurriculumSection | ILLO-06 | `illo6vf.jpg` | Bleed left vertical, fade-right |
| SplitBleed "Escolas" | ILLO-07 | `illo_07.jpg` | Bleed right, fade-left |
| SplitBleed "Materiais" | ILLO-08 | `illo_08.jpg` | Bleed left, fade-right |
| SplitBleed "Conformidade" | ILLO-09 | `illo_09.jpg` | Bleed right, fade-left |
| SplitBleed "Sobre" | ILLO-10 | `illo_10.jpg` | Bleed left, fade-right |
