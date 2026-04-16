# Design System — Referência para Tailwind Config

## Tailwind extend colors
```js
colors: {
  navy: {
    900: '#070E18',
    800: '#0C1829',
    700: '#12253D',
    600: '#1B3558',
    500: '#2A4F7A',
  },
  teal: {
    600: '#007A5A',
    500: '#009B72',
    400: '#00B886',
    300: '#2BD9A5',
    200: '#83EDD0',
    100: '#D5FAF0',
  },
  amber: {
    600: '#A06400',
    500: '#C77E00',
    400: '#E99B13',
    300: '#F5B740',
    200: '#FCD680',
    100: '#FFF2D6',
  },
  sand: '#F4F1EC',
  site: {
    white: '#FDFCFA',
    text: '#0B1422',
    'text-mid': '#3D4F62',
    'text-light': '#7A8DA0',
  },
}
```

## Tailwind extend fontFamily
```js
fontFamily: {
  display: ['"Fraunces"', 'serif'],
  body: ['"DM Sans"', 'sans-serif'],
}
```

## Tailwind extend borderRadius
```js
borderRadius: {
  card: '16px',
  btn: '9px',
  pill: '100px',
}
```

## Componentes utilitários CSS customizados

### Máscaras de bleeding (adicionar como utilities plugin)
```css
.mask-fade-left {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 20%, black 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 20%, black 100%);
}
.mask-fade-right {
  -webkit-mask-image: linear-gradient(to left, transparent 0%, black 20%, black 100%);
  mask-image: linear-gradient(to left, transparent 0%, black 20%, black 100%);
}
.mask-fade-edges {
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
.mask-fade-vertical {
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%);
  mask-image: linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%);
}
.mask-hero {
  -webkit-mask-image: 
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
    linear-gradient(to top, black 70%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: 
    linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%),
    linear-gradient(to top, black 70%, transparent 100%);
  mask-composite: intersect;
}
.mask-curriculum {
  -webkit-mask-image: 
    linear-gradient(to right, black 60%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 6%, black 92%, transparent 100%);
  -webkit-mask-composite: source-in;
  mask-image: 
    linear-gradient(to right, black 60%, transparent 100%),
    linear-gradient(to bottom, transparent 0%, black 6%, black 92%, transparent 100%);
  mask-composite: intersect;
}
```

## Breakpoints recomendados
- Mobile: < 768px (stack vertical, ilustrações acima do texto, sem bleed lateral)
- Tablet: 768-1024px (grid 2col reduzido, bleed menor)
- Desktop: > 1024px (layout completo conforme mockup, max-width 1200px)

## Espaçamento padrão do site
- Padding lateral do site: 44px (desktop), 24px (mobile)
- Padding vertical de seção: 64px (desktop), 40px (mobile)
- Gap entre cards: 14px
- Gap entre year cards: 10px
