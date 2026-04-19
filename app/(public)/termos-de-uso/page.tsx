import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";

export const metadata: Metadata = {
  title: "Termos de Uso | Alunos Digitais",
  description:
    "Condições de uso do site e da plataforma Alunos Digitais, incluindo direitos e responsabilidades de usuários.",
  robots: { index: true, follow: true },
};

export default function TermosUsoPage() {
  return (
    <>
      <PageHero
        eyebrow="Jurídico"
        title="Termos de Uso"
        subtitle="Condições que regem o acesso ao site e à plataforma do Alunos Digitais, bem como direitos e responsabilidades de usuários, escolas e parceiros."
      />

      <LegalContent lastUpdated="19 de abril de 2026">
        <p>
          Ao acessar e utilizar o site e a plataforma do <strong>Alunos Digitais</strong>, você
          concorda com os termos e condições descritos abaixo. Leia com atenção antes de prosseguir.
        </p>

        <h2>1. Objeto</h2>
        <p>
          O Alunos Digitais é um programa contínuo de educação digital e cidadania digital para o
          Ensino Fundamental, disponibilizado para escolas, redes de ensino, professores, estudantes
          e famílias, mediante contratação ou acesso autorizado.
        </p>

        <h2>2. Uso autorizado</h2>
        <ul>
          <li>
            O acesso à plataforma é pessoal e intransferível. Credenciais não devem ser
            compartilhadas.
          </li>
          <li>O uso dos conteúdos é restrito às finalidades pedagógicas do programa.</li>
          <li>
            A reprodução, modificação ou distribuição dos materiais sem autorização prévia é
            proibida.
          </li>
        </ul>

        <h2>3. Propriedade intelectual</h2>
        <p>
          Todos os textos, imagens, ilustrações, vídeos, áudios, marca, logotipos, arquitetura do
          programa, metodologia e recursos gamificados são protegidos por direitos autorais. Nada
          nestes Termos implica transferência de titularidade.
        </p>

        <h2>4. Conta de acesso</h2>
        <p>
          Algumas áreas exigem autenticação (login). Você é responsável pela confidencialidade das
          credenciais e por toda atividade realizada sob sua conta. Notifique-nos imediatamente em
          caso de acesso não autorizado.
        </p>

        <h2>5. Conduta do usuário</h2>
        <p>Você concorda em não:</p>
        <ul>
          <li>Usar o serviço para fins ilegais ou lesivos a terceiros</li>
          <li>Publicar conteúdo ofensivo, discriminatório, difamatório ou que viole direitos</li>
          <li>Tentar acesso indevido a sistemas, dados ou contas; realizar engenharia reversa</li>
          <li>Inserir vírus, malwares ou qualquer código hostil</li>
          <li>Coletar dados de outros usuários sem autorização</li>
        </ul>

        <h2>6. Suspensão e encerramento</h2>
        <p>
          Poderemos suspender ou encerrar o acesso em caso de violação destes Termos, sem prejuízo
          de outras medidas cabíveis. Em caso de encerramento por sua iniciativa, os direitos
          concedidos cessam imediatamente.
        </p>

        <h2>7. Limitação de responsabilidade</h2>
        <p>
          Empregamos medidas razoáveis para manter o serviço disponível e seguro. Não nos
          responsabilizamos, nos limites da lei aplicável, por indisponibilidades temporárias,
          falhas externas, uso indevido pelos usuários ou eventos fora de nosso controle.
        </p>

        <h2>8. Links e serviços de terceiros</h2>
        <p>
          O site pode conter links para serviços de terceiros. O acesso é por sua conta e risco, e
          esses terceiros têm suas próprias políticas e termos.
        </p>

        <h2>9. Atualizações</h2>
        <p>
          Estes Termos podem ser atualizados. A continuidade no uso após a publicação das alterações
          implica aceitação das novas condições.
        </p>

        <h2>10. Lei aplicável e foro</h2>
        <p>
          Este Termo é regido pelas leis brasileiras. Fica eleito o foro da comarca da sede do
          Alunos Digitais para dirimir quaisquer controvérsias, com renúncia a qualquer outro, por
          mais privilegiado que seja.
        </p>

        <h2>11. Contato</h2>
        <p>
          Dúvidas sobre estes Termos:{" "}
          <a href="/fale-com-um-especialista">Fale com um especialista</a>.
        </p>
      </LegalContent>
    </>
  );
}
