import type { PageSeo } from "@/types/content";

/**
 * Artigos editoriais extraídos de docs/brief/roteiro-completo.md §6
 * (Hub editorial — temas iniciais prioritários).
 *
 * Shape pronto para migração ao CMS: quando `content_items` de tipo
 * `article` for usado, esses objetos serão retornados pela query e os
 * componentes não mudam.
 */

export type ArticlePillar =
  | "educacao-digital"
  | "bncc-curriculo"
  | "seguranca-cidadania"
  | "familia-desenvolvimento"
  | "formacao-docente";

export type Article = {
  slug: string;
  pillar: ArticlePillar;
  pillarLabel: string;
  title: string;
  excerpt: string;
  body: string[];
  seo: PageSeo;
  publishedAt: string;
};

const PILLAR_LABELS: Record<ArticlePillar, string> = {
  "educacao-digital": "Educação digital e midiática",
  "bncc-curriculo": "BNCC, currículo e regulação",
  "seguranca-cidadania": "Segurança e cidadania digital",
  "familia-desenvolvimento": "Família e desenvolvimento",
  "formacao-docente": "Formação docente",
};

function article(
  slug: string,
  pillar: ArticlePillar,
  title: string,
  excerpt: string,
  body: string[],
  seoTitle?: string,
): Article {
  return {
    slug,
    pillar,
    pillarLabel: PILLAR_LABELS[pillar],
    title,
    excerpt,
    body,
    seo: {
      title: seoTitle ?? `${title} | Alunos Digitais`,
      description: excerpt,
      h1: title,
      ogImage: "/brand/ilustracoes/illo-01-hero.jpg",
    },
    publishedAt: "2026-04-18",
  };
}

export const articles: Article[] = [
  article(
    "o-que-e-educacao-digital-e-midiatica",
    "educacao-digital",
    "O que é educação digital e midiática na escola",
    "Entenda o conceito de educação digital e midiática, sua importância na formação de estudantes do Ensino Fundamental e como ela se diferencia de aulas de informática ou uso pontual de tecnologia.",
    [
      "Educação digital e midiática não é sinônimo de aula de informática. Enquanto a informática tradicional se concentra no domínio técnico de ferramentas, a educação digital e midiática trabalha a formação crítica, ética e cidadã do estudante diante do ambiente conectado em que vive.",
      "Na prática, trata-se de desenvolver competências que permitam ao estudante identificar riscos, proteger sua privacidade, respeitar o outro em interações online, avaliar a veracidade de informações, compreender seus direitos digitais e usar a tecnologia com propósito.",
      "Para escolas e redes de ensino, implementar educação digital e midiática de forma curricular significa sair da lógica de ações pontuais — como palestras sobre cyberbullying — e construir uma jornada pedagógica contínua, com progressão por faixa etária, material didático, formação docente e acompanhamento.",
      "O Alunos Digitais organiza essa jornada do 1º ao 9º ano do Ensino Fundamental, com 36 aulas anuais, 6 fases pedagógicas e uma arquitetura que conecta sala de aula, professor, família e gestão escolar.",
    ],
  ),
  article(
    "como-implementar-educacao-digital-no-curriculo",
    "educacao-digital",
    "Como implementar educação digital no currículo escolar",
    "Guia prático para escolas e redes que precisam integrar educação digital ao currículo, com orientações sobre transversalidade, componente específico e planejamento pedagógico.",
    [
      "A implementação da educação digital no currículo escolar pode seguir dois caminhos: como componente curricular específico ou de forma transversal, integrada a disciplinas existentes. Ambos são válidos segundo as diretrizes operacionais vigentes — a escolha depende da realidade da escola ou rede.",
      "O caminho do componente específico oferece maior previsibilidade: horário definido, professor responsável, material dedicado e avaliação própria. Já a transversalidade distribui os temas entre várias disciplinas, o que exige maior coordenação pedagógica e formação docente.",
      "Independentemente do modelo, três elementos são indispensáveis: formação docente consistente, material didático estruturado e progressão pedagógica adequada à faixa etária. Sem eles, a implementação tende a se tornar discurso institucional sem prática efetiva.",
      "A recomendação é começar com um diagnóstico da maturidade digital da escola, definir o modelo de implementação, capacitar a equipe docente e adotar uma solução que ofereça continuidade ao longo do ano letivo.",
    ],
  ),
  article(
    "bncc-computacao-o-que-escolas-precisam-saber",
    "bncc-curriculo",
    "BNCC Computação: o que escolas precisam saber",
    "Entenda as Normas sobre Computação na Educação Básica, seus três eixos (pensamento computacional, mundo digital e cultura digital) e como eles se conectam à prática escolar.",
    [
      "A Resolução CNE/CEB nº 1/2022 introduziu as Normas sobre Computação na Educação Básica como complemento à BNCC. Ela organiza o desenvolvimento dos estudantes em três eixos: pensamento computacional, mundo digital e cultura digital.",
      "O eixo de cultura digital é especialmente relevante para a educação sobre cidadania digital, pois aborda letramento digital, ética, segurança, direitos e responsabilidades no ambiente conectado. É nesse eixo que programas como o Alunos Digitais concentram sua contribuição curricular.",
      "Para escolas e redes, entender esses três eixos é fundamental para planejar a implementação. Não se trata apenas de ensinar programação — trata-se de formar estudantes para compreender, questionar e atuar no mundo digital de forma crítica e responsável.",
      "A BNCC Computação dialoga com outras normas mais recentes, como a PNED (Lei 14.533/2023) e a Resolução CNE/CEB nº 2/2025, criando um ecossistema regulatório que demanda resposta pedagógica concreta das instituições de ensino.",
    ],
  ),
  article(
    "resolucao-cne-ceb-2-2025-explicada",
    "bncc-curriculo",
    "Resolução CNE/CEB nº 2/2025 explicada",
    "O que muda com as Diretrizes Operacionais Nacionais sobre uso de dispositivos e integração curricular da educação digital e midiática, com implementação a partir de 2026.",
    [
      "A Resolução CNE/CEB nº 2/2025 estabelece diretrizes operacionais sobre o uso pedagógico de dispositivos digitais e a integração curricular da educação digital e midiática na Educação Básica. Sua implementação é prevista a partir de 2026.",
      "Entre os pontos centrais está a orientação para que escolas e redes revisem seus currículos integrando competências digitais e midiáticas, seja como componente curricular específico, seja de forma transversal. A resolução também aborda mediação pedagógica, saúde digital e convivência no ambiente escolar.",
      "Para gestores e coordenadores, a resolução representa tanto uma exigência quanto uma oportunidade: exigência de revisão curricular e oportunidade de estruturar a educação digital de forma organizada, com apoio regulatório claro.",
      "Escolas que já contam com programas estruturados de educação digital estão em posição favorável para atender às diretrizes sem improviso. A chave está na preparação antecipada: formação docente, material adequado e planejamento curricular.",
    ],
  ),
  article(
    "cyberbullying-como-prevenir-na-escola",
    "seguranca-cidadania",
    "Como prevenir cyberbullying na escola",
    "Estratégias pedagógicas para prevenir cyberbullying no Ensino Fundamental, incluindo abordagens curriculares, formação docente e envolvimento familiar.",
    [
      "O cyberbullying é uma das manifestações mais frequentes de violência digital entre crianças e adolescentes. Diferente do bullying presencial, ele opera sem fronteiras de tempo e espaço — pode alcançar a vítima a qualquer momento, em qualquer lugar.",
      "A prevenção mais efetiva não se limita a campanhas pontuais ou palestras isoladas. Passa pela construção de uma cultura escolar que valorize empatia, respeito, diversidade e convivência ética — online e offline. Isso exige continuidade pedagógica.",
      "No currículo do Alunos Digitais, o tema aparece desde os anos iniciais (com noções de convivência, conflitos e respeito) até os anos finais (com aprofundamento sobre tipificação legal, consequências e responsabilidade). A progressão é essencial porque as situações que uma criança de 7 anos enfrenta são muito diferentes das de um adolescente de 14.",
      "Além do trabalho em sala de aula, a escola precisa envolver a família. Pais e responsáveis que compreendem o que é cyberbullying, como identificar sinais e como agir são parte fundamental da estratégia de prevenção.",
    ],
  ),
  article(
    "fake-news-e-pensamento-critico-na-escola",
    "seguranca-cidadania",
    "Fake news e pensamento crítico no Ensino Fundamental",
    "Como trabalhar verificação de informações, leitura crítica de mídias e prevenção de desinformação com estudantes do 1º ao 9º ano.",
    [
      "A desinformação não é um problema apenas de adultos. Crianças e adolescentes estão expostos a conteúdos falsos, manipulados ou descontextualizados desde cedo — em redes sociais, aplicativos de mensagem, jogos e plataformas de vídeo.",
      "Trabalhar pensamento crítico no Ensino Fundamental significa desenvolver a capacidade de avaliar fontes, questionar afirmações, identificar intenções por trás de uma mensagem e compreender a diferença entre informação e opinião.",
      "A abordagem precisa ser progressiva. Nos anos iniciais, o foco está em diferenciar verdade de mentira, identificar fontes confiáveis e desenvolver curiosidade. Nos anos finais, o trabalho avança para leitura de mídias, identificação de vieses, contra-discurso e checagem de fatos.",
      "O Alunos Digitais inclui esse tema em múltiplas fases do currículo, com atividades práticas, situações-problema e materiais que ajudam o professor a conduzir discussões sobre desinformação sem simplificações nem alarmismo.",
    ],
  ),
  article(
    "privacidade-e-protecao-de-dados-de-criancas",
    "seguranca-cidadania",
    "Privacidade e proteção de dados de crianças e adolescentes",
    "O que escolas, famílias e gestores precisam saber sobre privacidade digital, proteção de dados pessoais e os direitos de crianças e adolescentes no ambiente online.",
    [
      "A privacidade de crianças e adolescentes no ambiente digital é um tema que mobiliza legislação, pedagogia e responsabilidade compartilhada entre escola, família e Estado. A LGPD (Lei Geral de Proteção de Dados) e o ECA Digital reforçam a necessidade de cuidado com dados pessoais de menores.",
      "Na escola, trabalhar privacidade significa ir além de regras de uso: envolve ajudar o estudante a compreender o que são dados pessoais, por que protegê-los, quais são seus direitos e como agir quando sua privacidade é violada.",
      "O currículo do Alunos Digitais aborda privacidade de forma progressiva: nos anos iniciais com noções de identidade e proteção, no 4º ano com aprofundamento sobre imagem e reputação digital, e nos anos finais com discussões sobre privacidade ampliada, dados sensíveis e legislação.",
      "Para gestores, a recomendação é clara: incluir privacidade e proteção de dados como tema curricular recorrente, formar professores para mediar essas discussões e orientar famílias sobre práticas seguras no dia a dia digital.",
    ],
  ),
  article(
    "engajamento-familiar-na-cidadania-digital",
    "familia-desenvolvimento",
    "Como engajar famílias na cidadania digital",
    "Estratégias práticas para incluir pais e responsáveis na formação digital dos estudantes, criando corresponsabilidade entre escola e casa.",
    [
      "A cidadania digital das crianças e adolescentes não se forma apenas na escola. Ela se constrói no cotidiano familiar — no uso de telas, nas conversas sobre redes sociais, nas regras de acesso a dispositivos e na mediação que pais e responsáveis oferecem.",
      "Para escolas, engajar famílias na cidadania digital significa criar canais de comunicação, oferecer conteúdos formativos acessíveis, propor atividades que estimulem o diálogo em casa e incluir pais em ações de culminância do programa.",
      "O desafio é real: muitos pais sentem-se inseguros para orientar seus filhos sobre temas digitais. Não por falta de interesse, mas por falta de repertório. A escola pode ser a ponte que oferece esse repertório de forma prática e acolhedora.",
      "No Alunos Digitais, o engajamento familiar é parte estrutural do programa: conteúdos na plataforma, lives educativas, orientações sobre riscos e prevenção, materiais de apoio e ações que promovem conversa intergeracional sobre tecnologia.",
    ],
  ),
  article(
    "saude-mental-e-uso-de-telas-na-adolescencia",
    "familia-desenvolvimento",
    "Saúde mental e uso de telas na adolescência",
    "A relação entre tempo de tela, redes sociais e saúde mental de adolescentes, com orientações para escolas e famílias.",
    [
      "A relação entre uso intensivo de telas e saúde mental na adolescência é uma das discussões mais relevantes da educação contemporânea. Ansiedade, depressão, distúrbios de sono, dependência tecnológica e isolamento social aparecem com frequência associados ao uso excessivo de dispositivos digitais.",
      "Não se trata de demonizar a tecnologia. Trata-se de ajudar adolescentes a construir uma relação mais consciente com as telas — o que envolve autoconhecimento, gestão de tempo, leitura crítica das emoções geradas pelas redes e capacidade de desconectar.",
      "Na escola, o tema pode ser trabalhado de forma integrada ao currículo de educação digital. No 7º ano do Alunos Digitais, por exemplo, saúde mental é abordada junto com dependência da internet, redes sociais e stalking — temas que fazem parte da realidade dos estudantes.",
      "Para famílias, a orientação é equilibrar presença e autonomia: acompanhar sem vigiar, dialogar sem proibir e construir regras que façam sentido para a realidade de cada contexto familiar.",
    ],
  ),
  article(
    "formacao-docente-em-educacao-digital",
    "formacao-docente",
    "Formação docente em educação digital: o que funciona",
    "O que professores precisam para conduzir educação digital com segurança pedagógica: formação inicial, continuada, materiais e suporte.",
    [
      "A formação docente é o elo mais crítico da implementação de educação digital na escola. Sem professores preparados, qualquer material didático — por melhor que seja — fica subutilizado ou mal aplicado.",
      "Formação efetiva em educação digital não se resume a workshops de abertura do ano letivo. Precisa incluir: apresentação da proposta pedagógica, apropriação dos materiais, discussão de casos reais, apoio contínuo ao longo do ano e canal de suporte para dúvidas.",
      "O professor de educação digital não precisa ser especialista em tecnologia. Precisa ser mediador pedagógico: alguém que consegue conduzir discussões sobre privacidade, cyberbullying, fake news e IA com base em material estruturado e com segurança para abordar temas sensíveis.",
      "No Alunos Digitais, a formação docente acontece em três frentes: formação inicial (workshops de preparação), formação contínua (plataforma + conteúdos ao longo do ano) e suporte operacional (help desk pedagógico para dúvidas e orientações).",
    ],
  ),
  article(
    "uso-pedagogico-de-celulares-nas-escolas",
    "educacao-digital",
    "Uso pedagógico de celulares nas escolas: o que a legislação orienta",
    "Entenda o que a Lei nº 15.100/2025 e as diretrizes do CNE dizem sobre uso de dispositivos digitais na escola e como conciliar proibição e mediação pedagógica.",
    [
      "A Lei nº 15.100/2025 trouxe orientações sobre o uso de dispositivos digitais pessoais no ambiente escolar, incluindo celulares. O debate que se seguiu oscilou entre proibição absoluta e liberação irrestrita — nenhum dos extremos reflete a complexidade da questão.",
      "As diretrizes operacionais (CNE/CEB nº 2/2025) orientam que a escola tenha política clara sobre uso de dispositivos, com foco pedagógico, convivência e saúde digital. O uso pedagógico de tecnologia é não apenas permitido, mas incentivado quando mediado por intencionalidade educativa.",
      "Para escolas e redes, a recomendação é construir uma política de uso que diferencie contextos: quando o dispositivo é ferramenta de aprendizagem e quando é distração. Essa política precisa ser comunicada a alunos, professores e famílias.",
      "A educação digital cumpre papel central nesse equilíbrio: forma o estudante para usar tecnologia com propósito, desenvolve autonomia e senso crítico, e dá ao professor repertório para mediar situações que envolvam dispositivos digitais em sala de aula.",
    ],
  ),
  article(
    "eca-digital-o-que-muda-para-escolas-e-familias",
    "bncc-curriculo",
    "ECA Digital: o que muda para escolas e famílias",
    "Entenda a Lei nº 15.211/2025 (ECA Digital), suas implicações para proteção de crianças no ambiente digital e o que escolas podem fazer.",
    [
      "O ECA Digital (Lei nº 15.211/2025) amplia o Estatuto da Criança e do Adolescente para contemplar a proteção no ambiente digital. Ele reforça a responsabilidade compartilhada entre Estado, família, escola e sociedade na formação e proteção de crianças e adolescentes conectados.",
      "Para escolas, o ECA Digital não cria uma obrigação curricular direta, mas amplia significativamente a relevância social da educação digital. Temas como proteção de dados, exposição indevida, exploração digital e segurança online ganham urgência institucional.",
      "Na prática, escolas que já trabalham educação digital de forma estruturada estão melhor preparadas para dialogar com as diretrizes do ECA Digital. A formação contínua dos estudantes em cidadania digital é, em si, uma resposta preventiva aos riscos que a legislação busca endereçar.",
      "Para famílias, o ECA Digital é um chamado à corresponsabilidade: acompanhar o uso de tecnologia pelos filhos, dialogar sobre riscos e buscar orientação quando necessário. Programas que conectam escola e família — como o Alunos Digitais — facilitam essa ponte.",
    ],
  ),
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articleSlugs = articles.map((a) => a.slug);

export function getArticlesByPillar(pillar: ArticlePillar): Article[] {
  return articles.filter((a) => a.pillar === pillar);
}

export const pillarList: { key: ArticlePillar; label: string }[] = Object.entries(
  PILLAR_LABELS,
).map(([key, label]) => ({ key: key as ArticlePillar, label }));
