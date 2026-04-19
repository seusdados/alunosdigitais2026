import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";

export const metadata: Metadata = {
  title: "Política de Privacidade | Alunos Digitais",
  description:
    "Como o Alunos Digitais coleta, trata e protege dados pessoais em conformidade com a LGPD.",
  robots: { index: true, follow: true },
};

export default function PoliticaPrivacidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Jurídico"
        title="Política de Privacidade"
        subtitle="Como tratamos e protegemos seus dados, em consonância com a Lei Geral de Proteção de Dados (LGPD — Lei 13.709/2018)."
      />

      <LegalContent lastUpdated="19 de abril de 2026">
        <p>
          O <strong>Alunos Digitais</strong> (doravante &ldquo;nós&rdquo;) respeita sua privacidade
          e se compromete a proteger os dados pessoais que você compartilha conosco. Esta Política
          descreve como coletamos, usamos, armazenamos e protegemos informações pessoais em todos os
          pontos de contato com o programa.
        </p>

        <h2>1. Quem somos</h2>
        <p>
          Somos a operação do programa Alunos Digitais, iniciativa de educação digital e cidadania
          digital para o Ensino Fundamental. Atuamos como <strong>controlador</strong> dos dados
          pessoais coletados em nosso site e plataforma.
        </p>

        <h2>2. Dados que coletamos</h2>
        <h3>2.1 Fornecidos por você</h3>
        <ul>
          <li>Nome completo e e-mail, quando preenche o formulário de contato</li>
          <li>Telefone e organização/escola, quando informados voluntariamente</li>
          <li>Cargo e localização (cidade/UF), para contextualização comercial</li>
          <li>Mensagens enviadas por meio dos canais de atendimento</li>
        </ul>

        <h3>2.2 Coletados automaticamente</h3>
        <ul>
          <li>Endereço IP, tipo de navegador e dispositivo</li>
          <li>Páginas visitadas e tempo de permanência (análise de uso)</li>
          <li>Cookies técnicos necessários ao funcionamento do site</li>
        </ul>

        <h2>3. Finalidades do tratamento</h2>
        <ul>
          <li>Responder a solicitações comerciais e apresentar o programa</li>
          <li>Enviar comunicações sobre novidades do programa (mediante consentimento)</li>
          <li>Analisar uso do site para melhorar usabilidade e conteúdo</li>
          <li>Cumprir obrigações legais e regulatórias</li>
        </ul>

        <h2>4. Bases legais (art. 7º da LGPD)</h2>
        <ul>
          <li>
            <strong>Consentimento</strong>: quando você preenche formulários ou assina newsletters
          </li>
          <li>
            <strong>Execução de contrato</strong>: para a prestação de serviços contratados por
            escolas e redes
          </li>
          <li>
            <strong>Legítimo interesse</strong>: análise técnica do site e prevenção de fraude
          </li>
          <li>
            <strong>Cumprimento de obrigação legal</strong>: guarda de registros exigidos por lei
          </li>
        </ul>

        <h2>5. Compartilhamento</h2>
        <p>Seus dados podem ser compartilhados com:</p>
        <ul>
          <li>
            Prestadores de serviços de infraestrutura (hospedagem, banco de dados, analytics), sob
            contrato de proteção de dados
          </li>
          <li>Autoridades, quando exigido por lei, decisão judicial ou regulamento</li>
        </ul>
        <p>
          <strong>
            Nunca vendemos dados pessoais nem os compartilhamos com terceiros para fins de marketing
            externo.
          </strong>
        </p>

        <h2>6. Direitos do titular (art. 18 da LGPD)</h2>
        <p>Você pode, a qualquer momento:</p>
        <ul>
          <li>Confirmar a existência de tratamento</li>
          <li>Acessar, corrigir ou atualizar seus dados</li>
          <li>Solicitar anonimização, bloqueio ou eliminação</li>
          <li>Solicitar portabilidade</li>
          <li>Revogar consentimento</li>
          <li>Apresentar reclamação à ANPD</li>
        </ul>
        <p>
          Para exercer esses direitos, entre em contato pela página{" "}
          <a href="/fale-com-um-especialista">Fale com um especialista</a>.
        </p>

        <h2>7. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acesso
          não autorizado, perda, alteração ou destruição. Nenhum sistema é 100% seguro; se
          identificarmos incidente relevante, notificaremos você e a ANPD conforme exigido pela
          LGPD.
        </p>

        <h2>8. Retenção</h2>
        <p>
          Mantemos dados pessoais apenas pelo tempo necessário ao cumprimento das finalidades
          informadas ou de obrigações legais aplicáveis. Após esse prazo, eliminamos ou anonimizamos
          os dados.
        </p>

        <h2>9. Alterações nesta política</h2>
        <p>
          Podemos atualizar esta Política a qualquer momento. Quando houver mudança material,
          daremos aviso prévio pelos canais usuais.
        </p>

        <h2>10. Encarregado (DPO)</h2>
        <p>
          Para dúvidas sobre tratamento de dados pessoais, fale com nosso Encarregado pela página{" "}
          <a href="/fale-com-um-especialista">Fale com um especialista</a> indicando
          &ldquo;Privacidade&rdquo; como assunto.
        </p>
      </LegalContent>
    </>
  );
}
