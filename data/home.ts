import type {
  CardsGridData,
  CTABarData,
  ContactFormData,
  FAQAccordionData,
  FlowStepsData,
  HeroBlockData,
  PillarBannerData,
  SplitBleedData,
} from "@/types/content";

/**
 * Conteúdo da home (/) extraído de docs/brief/roteiro-completo.md — Página 1.
 *
 * Shape pensado para migrar ao Supabase sem retrabalho: quando o CMS
 * dinâmico entrar, queries devem retornar objetos exatamente deste formato.
 */

export const heroData: HeroBlockData = {
  pill: "Programa educacional · 1º ao 9º ano",
  title: "Educação digital e cidadania digital para todo o",
  titleAccent: "Ensino Fundamental",
  subtitle:
    "Uma estrutura curricular contínua para escolas e redes que precisam implementar educação digital e midiática, com material, formação docente, plataforma, gamificação, suporte pedagógico e engajamento familiar.",
  ctaPrimary: { label: "Solicitar apresentação", href: "/fale-com-um-especialista" },
  ctaSecondary: { label: "Ver currículo do 1º ao 9º ano", href: "/curriculo" },
  metrics: [
    { value: "9", label: "anos do Fundamental" },
    { value: "36", label: "aulas anuais" },
    { value: "6", label: "fases pedagógicas" },
    { value: "8", label: "pilares curriculares" },
  ],
  image: {
    src: "/brand/ilustracoes/illo-01-hero.jpg",
    alt: "Estudantes e educadores em ambiente escolar trabalhando cidadania digital",
  },
};

export const challengeData: SplitBleedData = {
  eyebrow: "O desafio",
  title: "O desafio já não é acesso. É formação.",
  paragraphs: [
    "Crianças e adolescentes já vivem conectados. O problema que a escola enfrenta não é mais a simples presença da tecnologia, mas a necessidade de formar estudantes para usar o digital com ética, segurança, senso crítico, responsabilidade e propósito.",
    "O Alunos Digitais nasce para enfrentar esse cenário com continuidade pedagógica, e não com ações esparsas.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-02-problema.jpg",
    alt: "Encruzilhada entre riscos e oportunidades do mundo digital na escola",
  },
  direction: "right",
  bgColor: "white",
};

export const whatItDeliversData: CardsGridData = {
  eyebrow: "O que o programa entrega",
  title: "Uma solução completa para implementar, ensinar e acompanhar",
  subtitle:
    "Não é curso isolado nem conteúdo solto. É uma arquitetura completa de implementação pedagógica.",
  cards: [
    { title: "Material didático físico e digital", icon: "teal" },
    { title: "Plataforma com conteúdos e recursos complementares", icon: "teal" },
    { title: "Formação inicial e contínua para professores", icon: "amber" },
    { title: "Planos de aula estruturados", icon: "teal" },
    { title: "Help desk e suporte pedagógico", icon: "amber" },
    { title: "Ações de engajamento familiar", icon: "amber" },
    { title: "Avaliação diagnóstica e indicadores", icon: "teal" },
    { title: "Gamificação para aprendizagem e participação", icon: "amber" },
  ],
  bgColor: "sand",
};

export const pillarsBanner: PillarBannerData = {
  image: {
    src: "/brand/ilustracoes/illo-03-pilares.jpg",
    alt: "Mural panorâmico dos oito pilares do programa Alunos Digitais",
  },
  caption:
    "Oito pilares percorrem toda a jornada — da construção de identidade e convivência nos anos iniciais ao protagonismo digital e inteligência artificial nos anos finais.",
};

export const teacherSupportData: SplitBleedData = {
  eyebrow: "Professor apoiado",
  title: "O professor não é deixado sozinho",
  paragraphs: [
    "O programa oferece formação inicial, formação contínua, e-book do professor, planos de aula, apoio por plataforma e help desk pedagógico.",
    "A proposta é transformar o professor em protagonista da implementação, com segurança técnica e pedagógica para trabalhar os temas em sala de aula.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-04-formacao.jpg",
    alt: "Professora conduzindo aula sobre cidadania digital",
  },
  direction: "left",
  bgColor: "white",
  cta: { label: "Conhecer a formação docente", href: "/formacao-docente" },
};

export const familyData: SplitBleedData = {
  eyebrow: "Família e engajamento",
  title: "Cidadania digital também se constrói em casa",
  paragraphs: [
    "A aprendizagem não termina na sala de aula. O programa inclui conteúdos, orientações e ações pensadas para pais e responsáveis, fortalecendo a continuidade da formação no ambiente familiar.",
    "Da sala de aula para a rotina familiar: linguagem comum, corresponsabilidade formativa e ampliação da cultura digital para além do espaço escolar.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-05-familia.jpg",
    alt: "Família conversando em casa sobre uso consciente da tecnologia",
  },
  direction: "right",
  bgColor: "sand",
  cta: { label: "Ver plano de engajamento familiar", href: "/familia-e-engajamento" },
};

export const howItWorksData: FlowStepsData = {
  eyebrow: "Como funciona",
  title: "Implementação possível na prática",
  subtitle:
    "O programa pode ser adotado em formato digital ou híbrido. A escola recebe uma solução desenhada para facilitar a operação e dar previsibilidade à gestão pedagógica.",
  steps: [
    {
      number: "01",
      title: "Preparação da escola",
      description: "Alinhamento pedagógico, modelo de implementação e cronograma anual.",
    },
    {
      number: "02",
      title: "Formação inicial",
      description: "Workshops para apresentar a proposta e preparar a equipe docente.",
    },
    {
      number: "03",
      title: "Entrega dos recursos",
      description: "Livros do professor e do aluno, plataforma, vídeos e recursos de gamificação.",
    },
    {
      number: "04",
      title: "Aplicação contínua",
      description: "Acompanhamento das aulas, formação contínua e help desk pedagógico.",
    },
  ],
  bgColor: "white",
};

export const schoolsData: SplitBleedData = {
  eyebrow: "Para escolas",
  title: "Uma arquitetura pedagógica que cabe na sua realidade",
  paragraphs: [
    "Modelos flexíveis de adoção — digital, impresso ou híbrido — para que a escola implemente a educação digital conforme sua infraestrutura e seu calendário.",
    "Previsibilidade para a gestão, segurança técnica para o professor, engajamento para o estudante e continuidade para a família.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-07-escolas.png",
    alt: "Escola isométrica em corte com salas integradas ao programa",
  },
  direction: "right",
  bgColor: "white",
  cta: { label: "Ver proposta para escolas", href: "/para-escolas" },
};

export const materialsData: SplitBleedData = {
  eyebrow: "Plataforma e materiais",
  title: "Material completo para ensinar, aprender e acompanhar",
  paragraphs: [
    "Livros do professor e do aluno, plataforma digital com conteúdos permanentes, vídeos formativos, gamificação, informativos e kits por público.",
    "Os materiais estruturam a aula, organizam a progressão e ampliam a experiência — sem virar apenas apoio visual.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-08-materiais.jpg",
    alt: "Mesa do professor com livros, tablet e materiais do programa",
  },
  direction: "left",
  bgColor: "sand",
  cta: { label: "Ver plataforma e materiais", href: "/plataforma-e-materiais" },
};

export const complianceData: SplitBleedData = {
  eyebrow: "Conformidade curricular",
  title: "Uma resposta pedagógica ao novo contexto regulatório",
  paragraphs: [
    "O programa foi concebido para apoiar a implementação curricular e a prática pedagógica em consonância com os marcos vigentes: BNCC Competência 5, Resolução CNE/CEB 1/2022, PNED (Lei 14.533/2023), CNE/CEB 2/2025 e ECA Digital.",
    "Aderência comprovada pela arquitetura curricular, não por declaração de marketing.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-09-conformidade.jpg",
    alt: "Árvore regulatória conectando marcos normativos à prática escolar",
  },
  direction: "right",
  bgColor: "white",
  cta: {
    label: "Entender a aderência curricular e regulatória",
    href: "/conformidade-e-curriculo",
  },
};

export const aboutData: SplitBleedData = {
  eyebrow: "Sobre",
  title: "Uma equipe multidisciplinar a serviço da educação digital",
  paragraphs: [
    "Educadores, juristas especialistas em proteção de dados, designers instrucionais, desenvolvedores e articuladores institucionais trabalhando em conjunto.",
    "O Alunos Digitais é uma iniciativa que conecta expertise pedagógica e rigor regulatório para atender escolas e redes.",
  ],
  image: {
    src: "/brand/ilustracoes/illo-10-sobre.jpg",
    alt: "Equipe multidisciplinar reunida discutindo o programa",
  },
  direction: "left",
  bgColor: "sand",
  cta: { label: "Conhecer quem está por trás", href: "/sobre" },
};

export const ctaBarData: CTABarData = {
  eyebrow: "Próximo passo",
  title: "Formar cidadãos digitais conscientes é formar para a vida",
  subtitle:
    "O mundo digital já faz parte da experiência escolar, familiar e social dos estudantes. A diferença está entre reagir ao problema ou construir uma resposta pedagógica contínua.",
  primary: { label: "Agendar conversa", href: "/fale-com-um-especialista" },
  secondary: { label: "Receber apresentação institucional", href: "/fale-com-um-especialista" },
};

export const contactData: ContactFormData = {
  eyebrow: "Fale com um especialista",
  title: "Converse com nosso time pedagógico",
  subtitle:
    "Preencha os dados e um especialista retorna em até 2 dias úteis para apresentar o programa à sua escola ou rede.",
  submitLabel: "Solicitar apresentação",
};

export const homeFaq: FAQAccordionData = {
  eyebrow: "FAQ",
  title: "Perguntas frequentes",
  entries: [
    {
      question: "O Alunos Digitais é um curso ou um programa curricular?",
      answer:
        "É um programa curricular contínuo — não um curso isolado. Organiza aulas, fases pedagógicas, materiais, formação docente, engajamento familiar e suporte em uma estrutura anual.",
    },
    {
      question: "O programa atende do 1º ao 9º ano?",
      answer:
        "Sim. São 9 anos de jornada, 36 aulas anuais e 6 fases pedagógicas por ano, com progressão pensada para cada faixa etária.",
    },
    {
      question: "O material existe em formato físico e digital?",
      answer:
        "Sim. A escola escolhe entre formato digital (plataforma + recursos online) ou híbrido (material impresso + plataforma + recursos digitais).",
    },
    {
      question: "Como funciona a formação dos professores?",
      answer:
        "Formação inicial no começo do ano (workshops), formação contínua ao longo do ano pela plataforma, e-book do professor, planos de aula estruturados e help desk pedagógico.",
    },
    {
      question: "A família participa do programa?",
      answer:
        "Sim. Conteúdos para pais e responsáveis, lives, webinários, orientações e ações de culminância — a cidadania digital se constrói também em casa.",
    },
    {
      question: "O programa pode ser adotado por escolas privadas e redes públicas?",
      answer:
        "Sim. Temos modelos de implementação adaptados à realidade de mantenedoras privadas e de secretarias/redes públicas.",
    },
    {
      question: "O conteúdo se conecta aos marcos curriculares e regulatórios?",
      answer:
        "Sim. O programa apoia a implementação em consonância com BNCC (Competência 5), Resolução CNE/CEB 1/2022, PNED (Lei 14.533/2023), CNE/CEB 2/2025 e ECA Digital.",
    },
    {
      question: "Existe suporte pedagógico durante a implementação?",
      answer:
        "Sim. Help desk pedagógico, consultoria de implementação, atualização contínua da plataforma e acompanhamento ao longo do ano.",
    },
  ],
};
