import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";

export const metadata: Metadata = {
  title: "Política de Cookies | Alunos Digitais",
  description:
    "Como o Alunos Digitais utiliza cookies e tecnologias semelhantes, e como você pode gerenciar preferências.",
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Jurídico"
        title="Política de Cookies"
        subtitle="Entenda quais cookies utilizamos, com que finalidade, e como você pode controlar as preferências."
      />

      <LegalContent lastUpdated="19 de abril de 2026">
        <p>
          Esta política explica o uso de cookies e tecnologias semelhantes no site e plataforma do{" "}
          <strong>Alunos Digitais</strong>, em complemento à nossa{" "}
          <a href="/politica-de-privacidade">Política de Privacidade</a>.
        </p>

        <h2>1. O que são cookies</h2>
        <p>
          Cookies são pequenos arquivos de texto armazenados no seu navegador quando você visita um
          site. Servem para reconhecer o dispositivo, lembrar preferências e coletar informações
          estatísticas de uso.
        </p>

        <h2>2. Categorias que utilizamos</h2>
        <h3>2.1 Cookies estritamente necessários</h3>
        <p>
          Essenciais ao funcionamento do site (por exemplo, sessão de login no painel
          administrativo, preferências de idioma). Não podem ser desativados pelo usuário.
        </p>

        <h3>2.2 Cookies de desempenho e análise</h3>
        <p>
          Ajudam-nos a entender como o site é usado, páginas mais acessadas e tempo de permanência.
          Todos os dados são agregados e anonimizados sempre que possível.
        </p>

        <h3>2.3 Cookies funcionais</h3>
        <p>
          Permitem personalizar a experiência (por exemplo, lembrar escolhas de visualização). Podem
          ser desativados nas preferências do navegador.
        </p>

        <h3>2.4 Cookies de marketing</h3>
        <p>
          <strong>Não utilizamos</strong> cookies de publicidade comportamental nem compartilhamos
          dados com redes de anúncios de terceiros para esse fim.
        </p>

        <h2>3. Cookies próprios e de terceiros</h2>
        <p>
          Alguns cookies são definidos por nós (próprios). Outros são definidos por serviços de
          infraestrutura que utilizamos — por exemplo, provedores de hospedagem e análise. Eventuais
          terceiros aparecem na relação abaixo e seguem as respectivas políticas.
        </p>

        <h2>4. Como gerenciar</h2>
        <p>
          Você pode controlar e/ou excluir cookies pelas configurações do seu navegador. A
          desativação pode impactar funcionalidades essenciais do site. Links de ajuda:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noreferrer"
            >
              Google Chrome
            </a>
          </li>
          <li>
            <a
              href="https://support.mozilla.org/kb/ative-e-desative-os-cookies-sites-acompan"
              target="_blank"
              rel="noreferrer"
            >
              Mozilla Firefox
            </a>
          </li>
          <li>
            <a
              href="https://support.apple.com/guide/safari/gerenciar-cookies-sfri11471"
              target="_blank"
              rel="noreferrer"
            >
              Apple Safari
            </a>
          </li>
          <li>
            <a href="https://support.microsoft.com/microsoft-edge" target="_blank" rel="noreferrer">
              Microsoft Edge
            </a>
          </li>
        </ul>

        <h2>5. Atualizações</h2>
        <p>
          Podemos atualizar esta Política quando novos cookies forem adicionados. A data no topo
          indica a versão em vigor.
        </p>

        <h2>6. Contato</h2>
        <p>
          Dúvidas sobre cookies: <a href="/fale-com-um-especialista">Fale com um especialista</a>.
        </p>
      </LegalContent>
    </>
  );
}
