import type { CurriculumYear } from "@/types/content";

/**
 * Currículo 1º ao 9º ano — extraído de docs/brief/roteiro-completo.md
 * (Páginas 7 a 15).
 *
 * Cada ano tem tema, tópicos curtos (YearCard), 6 fases pedagógicas
 * (perguntas-chave), hero text e descritivos. Shape desenhado para ser
 * alimentado dinamicamente pelo CMS em fase posterior.
 */
export const curriculumYears: CurriculumYear[] = [
  {
    year: 1,
    slug: "1-ano",
    stage: "fundamental-1",
    theme: "Identidade e convivência",
    topics: [
      "Identidade e individualidade",
      "Papéis e regras de convivência",
      "Conflitos e mediação",
      "Primeiro contato com dispositivos",
    ],
    heroText:
      "No 1º ano, a criança começa a construir noções de indivíduo, convivência, papéis, regras e resolução de conflitos, formando a base para sua entrada consciente no mundo digital.",
    phases: [
      {
        number: "01",
        title: 'Você sabe o significado da palavra "indivíduo"?',
        description: "Construção de identidade e reconhecimento de si.",
      },
      {
        number: "02",
        title: "Qual a importância das relações humanas?",
        description: "Convivência, diferença e interdependência.",
      },
      {
        number: "03",
        title: "Qual é o papel de cada um de nós?",
        description: "Responsabilidades no grupo e na comunidade.",
      },
      {
        number: "04",
        title: "Qual a importância das regras?",
        description: "Normas morais e sociais que organizam a vida em grupo.",
      },
      {
        number: "05",
        title: "No seu dia a dia acontecem muitos conflitos?",
        description: "Identificação de situações de conflito cotidianas.",
      },
      {
        number: "06",
        title: "Como podemos resolver os conflitos?",
        description: "Mediação, diálogo e primeiros acordos.",
      },
    ],
    developmentItems: [
      "Identidade e individualidade",
      "Diversidade e convivência",
      "Regras morais e sociais",
      "Compreensão inicial de conflitos",
      "Mediação e diálogo",
      "Primeiro contato com dispositivos e imagens",
    ],
    pedagogicalDescription:
      "Linguagem acessível, atividades lúdicas, dinâmicas de grupo, interpretação de situações cotidianas e construção de repertório para convivência ética, inclusive em interações mediadas por tecnologia.",
  },
  {
    year: 2,
    slug: "2-ano",
    stage: "fundamental-1",
    theme: "Liberdade, ética e empatia",
    topics: [
      "Liberdade e responsabilidade",
      "Respeito, solidariedade, ética",
      "Empatia e cooperação",
      "Noções iniciais de dados pessoais",
    ],
    heroText:
      "No 2º ano, o estudante aprofunda temas ligados à liberdade, respeito, solidariedade, ética, empatia e cooperação, fortalecendo atitudes essenciais para a convivência social e digital.",
    phases: [
      {
        number: "01",
        title: "O que é a liberdade?",
        description: "Liberdade e limites na vida em grupo.",
      },
      {
        number: "02",
        title: "Por que é importante respeitar as pessoas?",
        description: "Respeito à diferença e à alteridade.",
      },
      {
        number: "03",
        title: "O que nos faz solidários?",
        description: "Solidariedade como prática cotidiana.",
      },
      { number: "04", title: "O que é ética?", description: "Noções iniciais de ética e conduta." },
      {
        number: "05",
        title: "O que significa agir com empatia?",
        description: "Empatia no cotidiano escolar e familiar.",
      },
      {
        number: "06",
        title: "Qual é a importância da cooperação?",
        description: "Cooperação como base do trabalho coletivo.",
      },
    ],
    developmentItems: [
      "Liberdade e responsabilidade",
      "Respeito ao outro",
      "Solidariedade",
      "Ética",
      "Empatia",
      "Cooperação",
      "Noções iniciais de proteção de dados pessoais",
    ],
  },
  {
    year: 3,
    slug: "3-ano",
    stage: "fundamental-1",
    theme: "Informação, conhecimento e senso crítico",
    topics: [
      "Valores e postura",
      "Informação vs. conhecimento",
      "Curiosidade e senso crítico",
      "Introdução às fake news",
    ],
    heroText:
      "No 3º ano, a formação avança para valores, acesso à informação, diferença entre informação e conhecimento, curiosidade, inteligência e senso crítico.",
    phases: [
      {
        number: "01",
        title: 'Qual a importância de "ser"?',
        description: "Postura, valores e caráter no mundo real e virtual.",
      },
      {
        number: "02",
        title: 'Qual a diferença entre "ser" e "ter"?',
        description: "Consumo, identidade e essência.",
      },
      {
        number: "03",
        title: "Você sabe o que é informação?",
        description: "O que é informação e como identificá-la.",
      },
      {
        number: "04",
        title: "Qual a diferença entre informação e conhecimento?",
        description: "Construção de conhecimento a partir de informações.",
      },
      {
        number: "05",
        title: "Qual a importância da curiosidade e da inteligência?",
        description: "Aprendizagem ativa e investigação.",
      },
      {
        number: "06",
        title: "Você sabe o que é senso crítico?",
        description: "Avaliar fontes e afirmações com critério.",
      },
    ],
    developmentItems: [
      "Valores e postura no mundo real e virtual",
      "Inclusão e acesso à informação",
      "Identificação de fontes confiáveis",
      "Introdução às fake news",
      "Senso crítico",
      "Exploração inicial de ferramentas digitais criativas",
    ],
  },
  {
    year: 4,
    slug: "4-ano",
    stage: "fundamental-1",
    theme: "Privacidade, imagem e fake news",
    topics: [
      "Privacidade e proteção",
      "Imagem e reputação na rede",
      "Verdade vs. mentira",
      "Prevenção de fake news",
    ],
    heroText:
      "No 4º ano, o estudante entra em temas centrais da cultura digital: privacidade, proteção de dados, imagem, reputação, verdade e mentira, fake news e perigos da exposição.",
    phases: [
      {
        number: "01",
        title: "O que é a privacidade?",
        description: "Conceito de privacidade na vida digital e offline.",
      },
      {
        number: "02",
        title: "Qual é a importância da imagem?",
        description: "Imagem pessoal e como é percebida por outros.",
      },
      {
        number: "03",
        title: "Qual é a sua reputação na rede?",
        description: "Reputação digital e rastros online.",
      },
      {
        number: "04",
        title: "Como o uso da internet se relaciona com a exposição da privacidade?",
        description: "Exposição indevida e suas consequências.",
      },
      {
        number: "05",
        title: "Você sabe diferenciar a verdade da mentira?",
        description: "Critérios para avaliar informações.",
      },
      {
        number: "06",
        title: "Fake news, quem está livre delas?",
        description: "Como fake news se espalham e como contê-las.",
      },
    ],
    developmentItems: [
      "Compreensão do conceito de privacidade",
      "Estratégias de proteção",
      "Leitura crítica da exposição online",
      "Responsabilidade sobre imagem e reputação",
      "Capacidade de questionar informações falsas",
      "Atitudes preventivas em ambientes digitais",
    ],
    pedagogicalDescription:
      "Aprofunda o conceito de privacidade, a necessidade de protegê-la, direitos ligados à proteção de dados, práticas preventivas de navegação segura, imagem e reputação na rede, além da diferenciação entre verdade e mentira e prevenção de fake news e cyberbullying.",
  },
  {
    year: 5,
    slug: "5-ano",
    stage: "fundamental-1",
    theme: "Internet, autoria e cyberbullying",
    topics: [
      "Regras da internet",
      "Autoria e direitos",
      "Bullying e cyberbullying",
      "Navegação segura",
    ],
    heroText:
      "No 5º ano, o estudante amplia o olhar para internet, autoria, direitos, bullying, cyberbullying, consumo infantil e navegação segura.",
    phases: [
      {
        number: "01",
        title: "O mundo mudou?",
        description: "Transformações da sociedade conectada.",
      },
      {
        number: "02",
        title: "Você conhece as regras da internet?",
        description: "Autoria, direitos, netiqueta.",
      },
      {
        number: "03",
        title: "O que é bullying?",
        description: "Violência escolar e suas dinâmicas.",
      },
      {
        number: "04",
        title: "Você está livre do cyberbullying?",
        description: "Bullying em ambientes digitais.",
      },
      {
        number: "05",
        title: "Qual a influência da internet no consumo infantil?",
        description: "Publicidade, redes e consumo.",
      },
      {
        number: "06",
        title: "Como garantir uma navegação segura?",
        description: "Hábitos de navegação segura.",
      },
    ],
    developmentItems: [
      "Leitura crítica do ambiente conectado",
      "Respeito a autoria e regras de uso de conteúdo",
      "Reconhecimento e prevenção de bullying e cyberbullying",
      "Reflexão sobre consumo e publicidade infantil",
      "Construção de hábitos de navegação segura",
    ],
  },
  {
    year: 6,
    slug: "6-ano",
    stage: "fundamental-2",
    theme: "Tecnologia, internet e prevenção",
    topics: [
      "Tecnologia e computador",
      "História da internet",
      "Impactos da conectividade",
      "Golpes e engenharia social",
    ],
    heroText:
      "No 6º ano, o estudante aprofunda conhecimentos sobre tecnologia, computador, internet, impactos da conectividade e riscos como golpes e engenharia social.",
    phases: [
      {
        number: "01",
        title: "O que é tecnologia?",
        description: "Conceito amplo de tecnologia e suas formas.",
      },
      {
        number: "02",
        title: "Quais são as partes do computador?",
        description: "Funcionamento básico do computador.",
      },
      {
        number: "03",
        title: "Quando surgiu a internet?",
        description: "História da internet e transformações.",
      },
      {
        number: "04",
        title: "Qual é o impacto da internet na vida das crianças e dos adolescentes?",
        description: "Hábitos digitais, telas e rotinas.",
      },
      {
        number: "05",
        title: "Quais os aspectos positivos e negativos do uso da internet?",
        description: "Ponderação crítica sobre uso da rede.",
      },
      {
        number: "06",
        title: "Como se proteger dos riscos na internet?",
        description: "Phishing, golpes e engenharia social.",
      },
    ],
    developmentItems: [
      "Compreensão histórica da tecnologia e da internet",
      "Leitura do funcionamento básico do computador",
      "Reflexão sobre impactos da conectividade",
      "Questionamento sobre uso de telas e hábitos digitais",
      "Noções sobre golpes, phishing, engenharia social e prevenção",
    ],
  },
  {
    year: 7,
    slug: "7-ano",
    stage: "fundamental-2",
    theme: "Redes, saúde mental e stalking",
    topics: [
      "Redes sociais e WhatsApp",
      "Dependência e saúde mental",
      "Bullying e cyberbullying como crime",
      "Stalking",
    ],
    heroText:
      "No 7º ano, o foco se volta para redes sociais, comunicação digital, dependência da internet, bullying, cyberbullying, saúde mental e stalking.",
    phases: [
      {
        number: "01",
        title: "Qual é a importância do uso das redes sociais para as conexões da sociedade?",
        description: "Redes sociais como vetor de conexão.",
      },
      {
        number: "02",
        title: "Você sabia que o WhatsApp é uma importante ferramenta de comunicação?",
        description: "Comunicação digital e responsabilidades.",
      },
      {
        number: "03",
        title: "Por que a dependência da internet é um problema crescente?",
        description: "Dependência tecnológica e seus sinais.",
      },
      {
        number: "04",
        title: "Você sabia que bullying e cyberbullying são crimes?",
        description: "Aspectos legais e éticos.",
      },
      {
        number: "05",
        title: "Quais os cuidados básicos para uma boa saúde mental?",
        description: "Saúde mental na era digital.",
      },
      {
        number: "06",
        title: "Você sabe o que é stalking?",
        description: "Stalking, limites e proteção.",
      },
    ],
    developmentItems: [
      "Análise crítica do papel das redes sociais",
      "Uso responsável de aplicativos de mensagem",
      "Percepção de dependência e seus efeitos",
      "Relação entre violência online e consequências",
      "Cuidado com saúde mental",
      "Compreensão do stalking como comportamento e crime",
    ],
  },
  {
    year: 8,
    slug: "8-ano",
    stage: "fundamental-2",
    theme: "Crimes digitais e segurança",
    topics: [
      "Segurança na internet",
      "Crimes cibernéticos",
      "Lei Carolina Dieckmann",
      "Compras online e desafios de risco",
    ],
    heroText:
      "No 8º ano, a jornada se concentra em segurança digital, crimes cibernéticos, Lei Carolina Dieckmann, compras online, invasões virtuais, sequestro de dados e desafios de risco.",
    phases: [
      {
        number: "01",
        title: "A segurança na internet",
        description: "Princípios de segurança digital.",
      },
      {
        number: "02",
        title: "Crimes cibernéticos: quais são as ameaças presentes nas redes?",
        description: "Tipologia de crimes e golpes.",
      },
      {
        number: "03",
        title: "O que define a Lei Carolina Dieckmann?",
        description: "Marco legal sobre invasão de dispositivos.",
      },
      {
        number: "04",
        title: "Quais são os riscos das compras on-line?",
        description: "Riscos e prevenção em e-commerce.",
      },
      {
        number: "05",
        title: "Você sabe o que são as invasões virtuais e os sequestros de dados?",
        description: "Ransomware, phishing avançado e exfiltração.",
      },
      {
        number: "06",
        title: "Você conhece desafios da internet que atingem negativamente os jovens?",
        description: "Desafios virais de risco e prevenção.",
      },
    ],
    developmentItems: [
      "Compreensão de riscos digitais concretos",
      "Reconhecimento de crimes e fraudes",
      "Leitura crítica de compras online",
      "Noção de sequestro de dados e prevenção",
      "Capacidade de analisar desafios virais e condutas de risco",
    ],
  },
  {
    year: 9,
    slug: "9-ano",
    stage: "fundamental-2",
    theme: "IA, autoria e protagonismo",
    topics: [
      "Inteligência artificial",
      "Autoria e direitos autorais",
      "Jogos online e privacidade ampliada",
      "Projeto de vida no digital",
    ],
    heroText:
      "No 9º ano, o estudante aprofunda inteligência artificial, autoria, jogos online, privacidade ampliada, desafios digitais e impactos futuros da tecnologia em sua vida.",
    phases: [
      {
        number: "01",
        title: "O que é inteligência artificial?",
        description: "Fundamentos, usos e limites da IA.",
      },
      {
        number: "02",
        title: "Quem é o autor?",
        description: "Autoria, direitos autorais e IA generativa.",
      },
      {
        number: "03",
        title: "Quais são os riscos dos jogos on-line?",
        description: "Jogos, apostas e gatilhos comportamentais.",
      },
      {
        number: "04",
        title: "Eu preservo a minha privacidade?",
        description: "Privacidade ampliada e dados sensíveis.",
      },
      {
        number: "05",
        title: "Quais são os riscos dos desafios da internet?",
        description: "Sexting, sextorsão, grooming e desafios perigosos.",
      },
      {
        number: "06",
        title: "Como a tecnologia ainda vai impactar minha vida?",
        description: "Projeto de vida, trabalho e tecnologia.",
      },
    ],
    developmentItems: [
      "Compreensão crítica da IA",
      "Reflexão sobre autoria e direitos autorais",
      "Leitura de riscos em jogos e apostas",
      "Ampliação do conceito de privacidade",
      "Discussão sobre sexting, sextorsão, grooming e desafios perigosos",
      "Conexão entre tecnologia, escola, trabalho e projeto de vida",
    ],
  },
];

export function getYearBySlug(slug: string): CurriculumYear | undefined {
  return curriculumYears.find((y) => y.slug === slug);
}

export const curriculumSlugs = curriculumYears.map((y) => y.slug);
