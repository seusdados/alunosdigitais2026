# Bloco Currículo — Estrada Central
## Instruções para o Claude Code

### Contexto
Este bloco substitui a versão anterior do `CurriculumSectionBlock` (que tinha a ilustração vertical espremida ao lado dos cards). A nova versão usa a ilustração da estrada como coluna central protagonista, com cards laterais conectados.

### Arquivo de referência visual
Abra `docs/implementation/bloco_curriculo_final.html` no browser para ver o resultado esperado.

### Ilustração
O arquivo `public/images/illo-06-estrada-central.jpg` deve ser colocado na pasta public. Usar via `next/image` com priority loading.

---

## Arquivo 1: `src/components/blocks/CurriculumRoadBlock.tsx`

```tsx
'use client';

import Image from 'next/image';
import { curriculumYears } from '@/data/curriculo';

interface YearData {
  year: number;
  stage: 'f1' | 'f2';
  theme: string;
  topics: string;
}

function YearCard({ data, side }: { data: YearData; side: 'left' | 'right' }) {
  const isDark = data.stage === 'f2';

  return (
    <div
      className={`
        relative backdrop-blur-[10px] rounded-xl px-4 py-3.5 w-[195px]
        transition-all duration-200 hover:scale-[1.03] group
        ${isDark
          ? 'bg-navy-700/88 shadow-[0_4px_24px_rgba(0,0,0,.3),0_0_0_1px_rgba(42,79,122,.25)] hover:shadow-[0_6px_32px_rgba(0,0,0,.4),0_0_0_1px_rgba(42,79,122,.5)]'
          : 'bg-white/93 shadow-[0_4px_24px_rgba(0,0,0,.2),0_0_0_1px_rgba(255,255,255,.1)] hover:shadow-[0_6px_32px_rgba(0,0,0,.3),0_0_0_1px_rgba(0,184,134,.3)]'
        }
      `}
    >
      {/* Connector line */}
      <span
        className={`absolute top-1/2 w-4 h-[1.5px] ${
          side === 'left' ? '-right-4' : '-left-4'
        } ${
          isDark
            ? 'bg-gradient-to-r from-[rgba(42,79,122,.5)] to-[rgba(42,79,122,.15)]'
            : side === 'left'
              ? 'bg-gradient-to-r from-[rgba(0,184,134,.5)] to-[rgba(0,184,134,.15)]'
              : 'bg-gradient-to-l from-[rgba(0,184,134,.5)] to-[rgba(0,184,134,.15)]'
        }`}
      />
      {/* Connector dot */}
      <span
        className={`absolute top-1/2 -translate-y-1/2 w-[7px] h-[7px] rounded-full ${
          side === 'left' ? '-right-5' : '-left-5'
        } ${
          isDark
            ? 'bg-navy-500 shadow-[0_0_8px_rgba(42,79,122,.5)]'
            : 'bg-teal-400 shadow-[0_0_8px_rgba(0,184,134,.5)]'
        }`}
      />

      {/* Number badge */}
      <div
        className={`inline-flex items-center justify-center w-[30px] h-[30px] rounded-full font-display font-extrabold text-[13px] text-white mb-2 ${
          isDark
            ? 'bg-gradient-to-br from-navy-500 to-navy-700 shadow-[0_0_12px_rgba(42,79,122,.35)]'
            : 'bg-gradient-to-br from-teal-400 to-teal-500 shadow-[0_0_12px_rgba(0,184,134,.35)]'
        }`}
      >
        {data.year}
      </div>

      {/* Theme */}
      <div className={`font-display font-semibold text-[12.5px] leading-tight tracking-tight mb-1 ${
        isDark ? 'text-white/90' : 'text-site-text'
      }`}>
        {data.theme}
      </div>

      {/* Topics */}
      <div className={`font-body text-[10.5px] leading-[1.5] ${
        isDark ? 'text-white/40' : 'text-site-text-light'
      }`}>
        {data.topics}
      </div>
    </div>
  );
}

export default function CurriculumRoadBlock() {
  const leftYears = curriculumYears.filter((_, i) => i % 2 === 0); // 1,3,5,7,9
  const rightYears = curriculumYears.filter((_, i) => i % 2 === 1); // 2,4,6,8

  return (
    <section className="bg-navy-800 relative overflow-hidden">
      {/* Header */}
      <div className="pt-[60px] px-12 pb-3 text-center relative z-10">
        <div className="font-body font-medium text-[10.5px] tracking-[.16em] uppercase text-teal-300 mb-3.5">
          Currículo
        </div>
        <h2 className="font-display font-bold text-[34px] leading-[1.08] tracking-tight text-white mb-2.5">
          Do 1º ao 9º ano, com progressão pedagógica real
        </h2>
        <p className="font-body font-light text-[15px] leading-[1.72] text-white/40 max-w-[520px] mx-auto">
          Cada ano amplia o repertório do estudante. Uma jornada contínua de valores, ética, segurança, pensamento crítico e protagonismo digital.
        </p>
      </div>

      {/* Grid 3 colunas */}
      <div className="grid grid-cols-[1fr_380px_1fr] gap-0 px-7 pb-5 relative">

        {/* Segment labels */}
        <div className="absolute top-[18px] left-7 z-10 flex items-center gap-1.5">
          <span className="font-body font-semibold text-[8px] tracking-[.14em] uppercase px-2.5 py-1 rounded-full bg-teal-400/12 text-teal-300 border border-teal-400/20">
            Anos iniciais
          </span>
        </div>
        <div className="absolute top-[60%] left-7 z-10 flex items-center gap-1.5">
          <span className="font-body font-semibold text-[8px] tracking-[.14em] uppercase px-2.5 py-1 rounded-full bg-navy-500/20 text-white/50 border border-navy-500/30">
            Anos finais
          </span>
        </div>

        {/* LEFT: odd years (1,3,5,7,9) */}
        <div className="flex flex-col items-end pr-4 relative z-[3]">
          {leftYears.map((year, i) => (
            <div key={year.year} className="flex-1 flex items-center justify-end" style={{ minHeight: 0 }}>
              <YearCard data={year} side="left" />
            </div>
          )).reduce((acc: React.ReactNode[], card, i) => {
            if (i > 0) acc.push(<div key={`spacer-l-${i}`} className="flex-1" />);
            acc.push(card);
            return acc;
          }, [])}
        </div>

        {/* CENTER: the road illustration */}
        <div className="relative z-[1]">
          <Image
            src="/images/illo-06-estrada-central.jpg"
            alt="Jornada do 1º ao 9º ano — trilha de progressão curricular"
            width={692}
            height={1400}
            className="w-full block [mask-image:linear-gradient(to_bottom,transparent_0%,black_2%,black_97%,transparent_100%)]"
            priority
          />
        </div>

        {/* RIGHT: even years (2,4,6,8) */}
        <div className="flex flex-col items-start pl-4 relative z-[3]">
          {rightYears.map((year, i) => (
            <div key={year.year} className="flex-1 flex items-center justify-start" style={{ minHeight: 0 }}>
              <YearCard data={year} side="right" />
            </div>
          )).reduce((acc: React.ReactNode[], card, i) => {
            if (i > 0) acc.push(<div key={`spacer-r-${i}`} className="flex-1" />);
            // Add empty spacer at start and end for offset
            if (i === 0) acc.push(<div key="spacer-r-start" className="flex-1" />);
            acc.push(card);
            return acc;
          }, []).concat([<div key="spacer-r-end" className="flex-1" />])}
        </div>
      </div>

      {/* Footer */}
      <div className="px-12 pb-12 flex items-center justify-between relative z-10">
        <span className="font-display italic text-[13px] text-white/28">
          Identidade → Ética → Informação → Segurança → Protagonismo digital
        </span>
        <a
          href="/curriculo"
          className="font-body font-medium text-[13px] text-teal-300 border border-teal-400/30 px-5 py-2.5 rounded-lg bg-transparent hover:bg-teal-400/8 hover:border-teal-400/50 transition-all"
        >
          Explorar o currículo completo →
        </a>
      </div>
    </section>
  );
}
```

---

## Arquivo 2: `src/data/curriculo.ts`

```ts
export interface CurriculumYear {
  year: number;
  stage: 'f1' | 'f2';
  theme: string;
  topics: string;
  slug: string;
  heroText: string;
  phases: { number: number; title: string }[];
}

export const curriculumYears: CurriculumYear[] = [
  {
    year: 1,
    stage: 'f1',
    theme: 'Convivência e identidade',
    topics: 'Indivíduo · Relações humanas · Regras · Conflitos · Mediação',
    slug: '1-ano',
    heroText: 'No 1º ano, a criança começa a construir noções de indivíduo, convivência, papéis, regras e resolução de conflitos.',
    phases: [
      { number: 1, title: 'Você sabe o significado da palavra "indivíduo"?' },
      { number: 2, title: 'Qual a importância das relações humanas?' },
      { number: 3, title: 'Qual é o papel de cada um de nós?' },
      { number: 4, title: 'Qual a importância das regras?' },
      { number: 5, title: 'No seu dia a dia acontecem muitos conflitos?' },
      { number: 6, title: 'Como podemos resolver os conflitos?' },
    ],
  },
  {
    year: 2,
    stage: 'f1',
    theme: 'Valores e ética',
    topics: 'Liberdade · Respeito · Solidariedade · Ética · Empatia · Cooperação',
    slug: '2-ano',
    heroText: 'No 2º ano, o estudante aprofunda temas ligados à liberdade, respeito, solidariedade, ética, empatia e cooperação.',
    phases: [
      { number: 1, title: 'O que é a liberdade?' },
      { number: 2, title: 'Por que é importante respeitar as pessoas?' },
      { number: 3, title: 'O que nos faz solidários?' },
      { number: 4, title: 'O que é ética?' },
      { number: 5, title: 'O que significa agir com empatia?' },
      { number: 6, title: 'Qual é a importância da cooperação?' },
    ],
  },
  {
    year: 3,
    stage: 'f1',
    theme: 'Informação e senso crítico',
    topics: 'Ser e ter · Informação · Conhecimento · Curiosidade · Senso crítico',
    slug: '3-ano',
    heroText: 'No 3º ano, a formação avança para valores, acesso à informação, diferença entre informação e conhecimento, curiosidade e senso crítico.',
    phases: [
      { number: 1, title: 'Qual a importância de "ser"?' },
      { number: 2, title: 'Qual a diferença entre "ser" e "ter"?' },
      { number: 3, title: 'Você sabe o que é informação?' },
      { number: 4, title: 'Qual a diferença entre informação e conhecimento?' },
      { number: 5, title: 'Qual a importância da curiosidade e da inteligência?' },
      { number: 6, title: 'Você sabe o que é senso crítico?' },
    ],
  },
  {
    year: 4,
    stage: 'f1',
    theme: 'Privacidade e fake news',
    topics: 'Privacidade · Imagem · Reputação · Verdade e mentira · Fake news',
    slug: '4-ano',
    heroText: 'No 4º ano, o estudante entra em temas centrais da cultura digital: privacidade, proteção de dados, imagem, reputação, verdade e mentira.',
    phases: [
      { number: 1, title: 'O que é a privacidade?' },
      { number: 2, title: 'Qual é a importância da imagem?' },
      { number: 3, title: 'Qual é a sua reputação na rede?' },
      { number: 4, title: 'Como o uso da internet se relaciona com a exposição da privacidade?' },
      { number: 5, title: 'Você sabe diferenciar a verdade da mentira?' },
      { number: 6, title: 'Fake news, quem está livre delas?' },
    ],
  },
  {
    year: 5,
    stage: 'f1',
    theme: 'Internet e segurança',
    topics: 'Regras da internet · Bullying · Cyberbullying · Consumo · Navegação segura',
    slug: '5-ano',
    heroText: 'No 5º ano, o estudante amplia o olhar para internet, autoria, direitos, bullying, cyberbullying, consumo infantil e navegação segura.',
    phases: [
      { number: 1, title: 'O mundo mudou?' },
      { number: 2, title: 'Você conhece as regras da internet?' },
      { number: 3, title: 'O que é bullying?' },
      { number: 4, title: 'Você está livre do cyberbullying?' },
      { number: 5, title: 'Qual a influência da internet no consumo infantil?' },
      { number: 6, title: 'Como garantir uma navegação segura?' },
    ],
  },
  {
    year: 6,
    stage: 'f2',
    theme: 'Tecnologia e internet',
    topics: 'Computador · Internet · Engenharia social · Phishing · Proteção',
    slug: '6-ano',
    heroText: 'No 6º ano, o estudante aprofunda conhecimentos sobre tecnologia, computador, internet, impactos da conectividade e riscos como golpes e engenharia social.',
    phases: [
      { number: 1, title: 'O que é tecnologia?' },
      { number: 2, title: 'Quais são as partes do computador?' },
      { number: 3, title: 'Quando surgiu a internet?' },
      { number: 4, title: 'Qual é o impacto da internet na vida das crianças e dos adolescentes?' },
      { number: 5, title: 'Quais os aspectos positivos e negativos do uso da internet?' },
      { number: 6, title: 'Como se proteger dos riscos na internet?' },
    ],
  },
  {
    year: 7,
    stage: 'f2',
    theme: 'Redes e saúde mental',
    topics: 'Redes sociais · WhatsApp · Dependência · Saúde mental · Stalking',
    slug: '7-ano',
    heroText: 'No 7º ano, o foco se volta para redes sociais, comunicação digital, dependência da internet, bullying, cyberbullying, saúde mental e stalking.',
    phases: [
      { number: 1, title: 'Qual é a importância do uso das redes sociais para as conexões da sociedade?' },
      { number: 2, title: 'Você sabia que o WhatsApp é uma importante ferramenta de comunicação?' },
      { number: 3, title: 'Por que a dependência da internet é um problema crescente da sociedade?' },
      { number: 4, title: 'Você sabia que bullying e cyberbullying são crimes?' },
      { number: 5, title: 'Quais os cuidados básicos para uma boa saúde mental?' },
      { number: 6, title: 'Você sabe o que é stalking?' },
    ],
  },
  {
    year: 8,
    stage: 'f2',
    theme: 'Crimes cibernéticos',
    topics: 'Segurança · Fraudes · Lei Carolina Dieckmann · Ransomware · Desafios',
    slug: '8-ano',
    heroText: 'No 8º ano, a jornada se concentra em segurança digital, crimes cibernéticos, Lei Carolina Dieckmann, compras online, invasões virtuais e sequestro de dados.',
    phases: [
      { number: 1, title: 'A segurança na internet' },
      { number: 2, title: 'Crimes cibernéticos: quais são as ameaças presentes nas redes?' },
      { number: 3, title: 'O que define a Lei Carolina Dieckmann?' },
      { number: 4, title: 'Quais são os riscos das compras on-line?' },
      { number: 5, title: 'Você sabe o que são as invasões virtuais e os sequestros de dados?' },
      { number: 6, title: 'Você conhece desafios da internet que atingem negativamente os jovens?' },
    ],
  },
  {
    year: 9,
    stage: 'f2',
    theme: 'IA e protagonismo',
    topics: 'Inteligência artificial · Autoria · Jogos · Privacidade · Futuro',
    slug: '9-ano',
    heroText: 'No 9º ano, o estudante aprofunda inteligência artificial, autoria, jogos online, privacidade ampliada, desafios digitais e impactos futuros da tecnologia.',
    phases: [
      { number: 1, title: 'O que é inteligência artificial?' },
      { number: 2, title: 'Quem é o autor?' },
      { number: 3, title: 'Quais são os riscos dos jogos on-line?' },
      { number: 4, title: 'Eu preservo a minha privacidade?' },
      { number: 5, title: 'Quais são os riscos dos desafios da internet?' },
      { number: 6, title: 'Como a tecnologia ainda vai impactar minha vida?' },
    ],
  },
];
```

---

## Arquivo 3: Imagem

Copie o arquivo `illo-06-estrada-central.jpg` para `public/images/illo-06-estrada-central.jpg` no projeto Next.js.

---

## Como integrar na Home

No `app/page.tsx`, substitua o antigo `CurriculumSectionBlock` por:

```tsx
import CurriculumRoadBlock from '@/components/blocks/CurriculumRoadBlock';

// Na composição da home, onde estava o bloco de currículo:
<CurriculumRoadBlock />
```

---

## Responsividade (mobile)

Em telas < 768px, o layout deve colapsar:
- Grid muda para 1 coluna
- A ilustração aparece como faixa de fundo com opacity reduzida
- Cards empilham verticalmente em lista, sem connectors
- Cada card mantém o badge numérico e o estilo f1/f2

Sugestão de breakpoint no componente:
```tsx
// Desktop: grid-cols-[1fr_380px_1fr]
// Tablet: grid-cols-[1fr_280px_1fr] com cards menores
// Mobile: grid-cols-1 com ilustração como background
```
