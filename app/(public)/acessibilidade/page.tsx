import type { Metadata } from "next";

import { LegalContent } from "@/components/blocks/legal-content";
import { PageHero } from "@/components/blocks/page-hero";

export const metadata: Metadata = {
  title: "Acessibilidade | Alunos Digitais",
  description:
    "Nosso compromisso com a acessibilidade digital: padrões adotados, práticas e canais para reportar barreiras.",
  robots: { index: true, follow: true },
};

export default function AcessibilidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Compromissos"
        title="Acessibilidade"
        subtitle="Buscamos construir experiências digitais acessíveis a todas as pessoas, independentemente de condições de visão, audição, movimento ou cognição."
      />

      <LegalContent lastUpdated="19 de abril de 2026">
        <p>
          O <strong>Alunos Digitais</strong> assume o compromisso de oferecer conteúdos e interfaces
          acessíveis, alinhadas ao <strong>WCAG 2.1 nível AA</strong> e à legislação brasileira
          aplicável (Lei Brasileira de Inclusão — Lei 13.146/2015).
        </p>

        <h2>1. Princípios que nos orientam</h2>
        <ul>
          <li>
            <strong>Perceptível</strong>: texto alternativo em imagens, contraste adequado,
            estrutura semântica
          </li>
          <li>
            <strong>Operável</strong>: navegação por teclado, áreas de toque adequadas, sem
            dependência exclusiva de mouse
          </li>
          <li>
            <strong>Compreensível</strong>: linguagem clara, feedback consistente, hierarquia de
            títulos
          </li>
          <li>
            <strong>Robusto</strong>: compatibilidade com leitores de tela e tecnologias assistivas
          </li>
        </ul>

        <h2>2. Práticas aplicadas no site</h2>
        <ul>
          <li>HTML semântico (landmarks, headings hierárquicos, listas)</li>
          <li>
            Atributos <code>alt</code> em todas as ilustrações decorativas e informativas
          </li>
          <li>Estados de foco visíveis em elementos interativos</li>
          <li>
            Formulários com rótulos (<code>label</code>) e mensagens de erro associadas
          </li>
          <li>Contraste de texto que atende WCAG AA nas cores brand</li>
          <li>
            Navegação funcional por teclado (<kbd>Tab</kbd>, <kbd>Shift+Tab</kbd>, <kbd>Enter</kbd>)
          </li>
          <li>
            Conteúdo responsivo e adaptável a diferentes tamanhos de tela, inclusive aumentos de
            zoom até 200%
          </li>
        </ul>

        <h2>3. Limitações conhecidas</h2>
        <p>
          A acessibilidade digital é um processo contínuo. Estamos cientes de que há sempre
          melhorias a fazer e monitoramos o site periodicamente. Se você encontrar uma barreira, por
          favor reporte (ver seção 5).
        </p>

        <h2>4. Recursos e materiais pedagógicos</h2>
        <p>
          Materiais didáticos do programa — livros, vídeos, plataforma e atividades — estão sendo
          revisados continuamente para atender critérios de acessibilidade. Escolas e redes podem
          solicitar adequações específicas por meio do canal de contato.
        </p>

        <h2>5. Como reportar uma barreira</h2>
        <p>
          Se você encontrou algo difícil de usar ou inacessível, entre em contato pela página{" "}
          <a href="/fale-com-um-especialista">Fale com um especialista</a> com o assunto
          &ldquo;Acessibilidade&rdquo;. Inclua se possível:
        </p>
        <ul>
          <li>URL da página onde ocorreu</li>
          <li>Dispositivo, navegador e tecnologia assistiva utilizada</li>
          <li>Descrição breve da barreira</li>
        </ul>
        <p>
          Comprometemo-nos a retornar em até <strong>5 dias úteis</strong> e buscar solução
          adequada.
        </p>

        <h2>6. Avaliação e evolução</h2>
        <p>
          Realizamos revisões internas e auditorias externas periódicas. Esta política é atualizada
          sempre que alterações relevantes são implementadas.
        </p>
      </LegalContent>
    </>
  );
}
