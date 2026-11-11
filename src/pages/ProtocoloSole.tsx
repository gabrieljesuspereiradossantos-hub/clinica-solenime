import type { CSSProperties } from "react";
import { ButtonExternal } from "../components/Button";
import { FaixaQuiz } from "../components/FaixaQuiz";
import { Foto } from "../components/Foto";
import { WordHighlight } from "../components/WordHighlight";
import { CLINICA } from "../config";
import { FOTOS } from "../data/fotos";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

const faq = [
  {
    p: "Quanto tempo dura a consulta?",
    r: `A consulta tem duração de ${CLINICA.duracaoConsulta}, dedicada exclusivamente a você.`,
  },
  {
    p: "A consulta tem custo?",
    r: CLINICA.valorConsultaConfirmado
      ? `A consulta custa ${CLINICA.valorConsulta} e esse valor é abatido do protocolo contratado no dia.`
      : "Os valores são apresentados durante o atendimento e na conversa com a equipe.",
  },
  {
    p: "Existe garantia de resultado?",
    r: "Cada pessoa responde de uma forma. Não prometemos resultados garantidos; trabalhamos para entender o seu caso e indicar o que faz sentido para você.",
  },
  {
    p: "Como faço para agendar?",
    r: "Responda o quiz de qualificação. Depois, a equipe entra em contato para combinar o seu horário.",
  },
];

const COMO_FUNCIONA: [string, string][] = [
  ["Atendimento exclusivo", `Uma consulta de ${CLINICA.duracaoConsulta}, dedicada só a você.`],
  ["Conversa e avaliação", "Entendemos o seu histórico, o que você sente sobre o seu rosto e o que espera do processo."],
  ["Orientação clara", "Você sai sabendo o que é indicado para o seu caso, sem pressão para decidir na hora."],
];

export function ProtocoloSole() {
  useDocumentMeta({
    title: "Protocolo Sole | Clínica Solenime",
    description:
      "Conheça o Protocolo Sole, um atendimento personalizado da Clínica Solenime em Santo André/SP, pensado para mulheres de 40 a 60 anos.",
  });

  return (
    <>
      {/* 1. Identificação */}
      <section className="mx-auto grid max-w-page gap-10 px-6 pb-24 pt-10 lg:min-h-[calc(100svh-88px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,500px)] lg:items-center lg:gap-16 lg:px-20 lg:pb-16 lg:pt-8">
        <div>
          <p className="eyebrow enter" style={d(0)}>
            Protocolo Sole
          </p>
          <h1 className="h1-pagina enter mt-6" style={d(1)}>
            Para a mulher que quer continuar sendo ela, só que mais <em className="italic text-cacau-600">viva</em> no espelho.
          </h1>
          <p className="enter mt-8 max-w-[34rem] text-lg leading-relaxed text-cacau-700 lg:text-xl" style={d(2)}>
            Você vai ter o rosto que acompanha por fora a mulher que continua sendo por dentro. Sem exagero e sem perder a própria
            identidade.
          </p>
          <div className="enter mt-10" style={d(3)}>
            <ButtonExternal href={CLINICA.quizUrl}>Quero conhecer o Protocolo Sole</ButtonExternal>
          </div>
        </div>
        <Foto
          foto={FOTOS.atendimento}
          prioridade
          sizes="(min-width: 1024px) 70vw, 225vw"
          posicao="68% 45%"
          className="enter-photo aspect-[4/5] w-full lg:aspect-auto lg:h-[min(680px,calc(100svh-180px))]"
        />
      </section>

      {/* 2. Filosofia: o mesmo momento tipográfico da home */}
      <section className="bg-areia-100">
        <div className="mx-auto flex max-w-page flex-col gap-7 px-6 py-24 lg:gap-12 lg:px-20 lg:py-32">
          <p className="eyebrow">Filosofia</p>
          <WordHighlight
            className="statement"
            text="Naturalidade é a nossa referência. A beleza mais bonita é a que parece sua: cuidar com atenção do que você já tem."
          />
        </div>
      </section>

      {/* 3. Como funciona a consulta */}
      <section className="mx-auto max-w-page px-6 py-24 lg:px-20 lg:py-32">
        <p className="eyebrow">A consulta</p>
        <h2 className="mt-6 max-w-[20ch]">Como funciona a consulta</h2>
        <ol className="mt-14 grid gap-10 border-t border-areia-300 pt-10 md:grid-cols-3 md:gap-12">
          {COMO_FUNCIONA.map(([titulo, texto], i) => (
            <li key={titulo} className="flex gap-5 md:block">
              <span className="font-serif text-4xl italic leading-none text-champagne-700 lg:text-[2.75rem]" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="md:mt-6">
                <h3>{titulo}</h3>
                <p className="mt-3 text-cacau-700">{texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 4. Perguntas frequentes */}
      <section className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="eyebrow">Dúvidas</p>
            <h2 className="mt-6">Perguntas frequentes</h2>
          </div>
          <div className="divide-y divide-areia-300 border-y border-areia-300">
            {faq.map((item) => (
              <details key={item.p} className="faq group">
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-serif text-[1.5rem] leading-snug text-cacau-800 lg:text-[1.75rem] [&::-webkit-details-marker]:hidden">
                  {item.p}
                  <span className="faq-mais relative h-4 w-4 shrink-0 text-champagne-700" aria-hidden="true" />
                </summary>
                <p className="max-w-[40rem] pb-7 leading-relaxed text-cacau-700">{item.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <FaixaQuiz titulo={<>Reserve o seu horário para conhecer o Protocolo <em className="italic text-champagne-400">Sole</em>.</>} />
    </>
  );
}
