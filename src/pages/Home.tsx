import type { CSSProperties } from "react";
import { ButtonExternal, ButtonLink } from "../components/Button";
import { SecaoAvaliacoes } from "../components/SecaoAvaliacoes";
import { SecaoResultados } from "../components/SecaoResultados";
import { AVALIACOES, PERFIL_GOOGLE } from "../data/avaliacoes";
import { AVALIACOES_PREVIEW } from "../data/avaliacoes.preview";
import { Capitulos } from "../components/Capitulos";
import { Foto } from "../components/Foto";
import { GaleriaFaixas } from "../components/GaleriaFaixas";
import { VideoFundo } from "../components/VideoFundo";
import { FOTOS } from "../data/fotos";
import { TituloSobe } from "../components/TituloSobe";
import { Visita } from "../components/Visita";
import { WordHighlight } from "../components/WordHighlight";
import { CLINICA } from "../config";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import { procedimentosConfirmados } from "../data/procedimentos";

/** índice da cascata de entrada do hero (60ms por passo) */
const d = (i: number) => ({ "--i": i }) as CSSProperties;

const DESTAQUES: [string, string][] = [
  ["Individual", "Cada consulta é só sua"],
  ["Natural", "Sem exageros"],
  ["Protocolo Sole", "Método próprio da clínica"],
];

const ETAPAS = [
  {
    titulo: "Conversa inicial",
    texto: "Entendemos seu histórico, suas expectativas e o que você gostaria de mudar.",
    foto: FOTOS.salaDeEspera,
    posicao: "50% 60%",
  },
  {
    titulo: "Avaliação individual",
    texto: "Analisamos as características do seu rosto com calma e sem pressa.",
    foto: FOTOS.atendimento,
    posicao: "55% 45%",
  },
  {
    titulo: "Plano personalizado",
    texto: "Você recebe uma orientação feita para o seu caso, com clareza sobre cada etapa.",
    foto: FOTOS.retrato,
    posicao: "40% 35%",
  },
];

export function Home() {
  useDocumentMeta({
    title: "Clínica Solenime | Protocolo Sole em Santo André/SP",
    description:
      "Protocolo Sole na Clínica Solenime, em Santo André/SP. Consulta individual para mulheres de 40 a 60 anos que querem rejuvenescer com naturalidade.",
  });

  const confirmados = procedimentosConfirmados();
  // Em desenvolvimento, ?preview-avaliacoes mostra o layout com textos de exemplo (nunca em produção).
  const avaliacoes =
    AVALIACOES.length > 0
      ? AVALIACOES
      : import.meta.env.DEV && new URLSearchParams(window.location.search).has("preview-avaliacoes")
        ? AVALIACOES_PREVIEW
        : [];

  return (
    <>
      {/* HERO: a recepção em tela cheia, texto sobre a parede de madeira (desktop) ou na base (celular).
          O letreiro fica à direita, fora do véu escuro. Recorte por largura em .hero-foto (index.css). */}
      <section className="relative isolate flex min-h-[calc(100svh-72px)] flex-col overflow-hidden lg:justify-end bg-cacau-800 text-areia-50 lg:min-h-[calc(100svh-88px)]">
        <div className="hero-foto enter-photo relative -z-10 h-[clamp(220px,44svh,400px)] w-full shrink-0 lg:absolute lg:inset-0 lg:h-auto">
          <Foto foto={FOTOS.recepcao} prioridade arredondada={false} sizes="(min-width: 1024px) 100vw, 260vw" className="h-full w-full" />
          {/* vídeo da recepção (enviado pela equipe em 10/11/2026) por cima da foto, que fica como pôster */}
          <VideoFundo webm="/video/recepcao.webm" mp4="/video/recepcao.mp4" />
          {/* véu: no celular a foto ocupa o alto da tela e funde no cacau, onde fica o texto;
              no desktop o véu vem da esquerda, sobre a parede de madeira */}
          <div className="hero-veu absolute inset-x-0 -bottom-px top-0" aria-hidden="true" />
        </div>

        <div className="mx-auto -mt-14 w-full max-w-page px-6 pb-10 lg:mt-0 lg:px-20 lg:pb-16 lg:pt-28">
          <div className="max-w-[40rem]">
            <p className="eyebrow eyebrow-dark enter" style={d(0)}>
              Rejuvenescimento facial · {CLINICA.cidade}
            </p>
            <h1 className="enter mt-5 text-areia-50 lg:mt-7" style={d(1)}>
              {/* três linhas fixas: em janelas mais estreitas "reconhecer" subia para a 1ª linha e caía sobre o letreiro */}
              <span className="block">Voltar a se</span>
              <em className="block italic text-champagne-400">reconhecer</em>
              <span className="block">no espelho.</span>
            </h1>
            <p className="enter mt-6 max-w-[34rem] text-lg leading-relaxed text-areia-100 lg:mt-8 lg:text-xl" style={d(2)}>
              O Protocolo Sole é uma consulta individual para mulheres de 40 a 60 anos que querem rejuvenescer sem exageros e sem
              perder a identidade.
            </p>
            <div className="enter mt-8 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-7 lg:mt-10" style={d(3)}>
              <ButtonExternal href={CLINICA.quizUrl} variant="inverse" className="w-full sm:w-auto">
                Responder o quiz
              </ButtonExternal>
              <ButtonLink to="/protocolo-sole" variant="linkInverse">
                Como funciona a consulta
              </ButtonLink>
            </div>
          </div>

          <dl className="enter mt-12 hidden max-w-[44rem] grid-cols-3 gap-10 border-t border-areia-50/25 pt-5 lg:grid" style={d(4)}>
            {DESTAQUES.map(([valor, rotulo]) => (
              <div key={valor}>
                <dt className="font-serif text-[1.375rem] italic leading-tight text-areia-50">{valor}</dt>
                <dd className="mt-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-areia-200">{rotulo}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* no celular os destaques vêm logo abaixo da foto, para o CTA caber na primeira tela */}
      <dl className="mx-auto grid max-w-page gap-3.5 px-6 py-8 lg:hidden">
        {DESTAQUES.map(([valor, rotulo]) => (
          <div key={valor} className="flex items-center justify-between gap-3 border-b border-areia-300 pb-3.5 last:border-0 last:pb-0">
            <dt className="font-serif text-[1.375rem] italic leading-tight text-cacau-800">{valor}</dt>
            <dd className="text-xs font-semibold uppercase tracking-[0.1em] text-cacau-600">{rotulo}</dd>
          </div>
        ))}
      </dl>

      {/* MOMENTO 1: word-highlight */}
      <section className="bg-areia-100">
        <div className="mx-auto flex max-w-page flex-col justify-center gap-7 px-6 py-24 lg:min-h-[100svh] lg:gap-12 lg:px-20 lg:py-32">
          <p className="eyebrow">Nossa abordagem</p>
          <WordHighlight
            className="statement"
            text="Cada rosto tem uma história. O nosso trabalho começa por ela: com calma, escuta e um plano pensado para você."
          />
          {/* números reais: nota e total do perfil no Google (PERFIL_GOOGLE) e duração da consulta (CLINICA) */}
          <dl className="grid max-w-[56rem] grid-cols-3 border-t border-areia-300 pt-8 lg:mt-4">
            {[
              [PERFIL_GOOGLE.nota !== null ? PERFIL_GOOGLE.nota.toFixed(1).replace(".", ",") : "", "nota no Google"],
              [PERFIL_GOOGLE.total !== null ? String(PERFIL_GOOGLE.total) : "", "avaliações de pacientes"],
              ["2 h", "de consulta, só sua"],
            ]
              .filter(([v]) => v)
              .map(([valor, rotulo], i) => (
                <div key={rotulo} className={i ? "border-l border-areia-300 pl-5 sm:pl-8" : "pr-5 sm:pr-8"}>
                  <dt className="font-serif text-[2.5rem] leading-none text-cacau-800 sm:text-[3.5rem]">{valor}</dt>
                  <dd className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-cacau-600 sm:text-sm sm:normal-case sm:tracking-normal sm:font-normal">{rotulo}</dd>
                </div>
              ))}
          </dl>
        </div>
      </section>

      {/* MOMENTO 2: Protocolo Sole em capítulos com lateral fixa */}
      <section className="mx-auto max-w-page px-6 py-24 lg:px-20 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="eyebrow">Protocolo Sole</p>
            <h2 className="mt-6">Uma consulta de {CLINICA.duracaoConsulta}, em três etapas.</h2>
            <p className="mt-6 text-lg leading-relaxed text-cacau-700">
              Você sai com uma orientação feita para o seu caso, com clareza sobre cada etapa.
            </p>
            <div className="mt-10 hidden lg:block">
              <ButtonExternal href={CLINICA.quizUrl}>Responder o quiz</ButtonExternal>
            </div>
          </div>
          <Capitulos itens={ETAPAS} />
        </div>
      </section>

      {/* RESULTADOS: antes e depois, logo depois do método. Desligada até RESULTADOS_LIBERADOS (src/data/resultados.ts) */}
      <SecaoResultados />

      {/* A CLÍNICA: texto e visita em cima, galeria em faixas embaixo (adaptada do "Luxury Real Estate", motionsites) */}
      <section className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow">A clínica</p>
            <h2 className="mt-6 max-w-[16ch]">Um ambiente claro, de madeira e tons neutros.</h2>
            <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-cacau-700">
              Pensado para a conversa sem pressa que abre cada atendimento, em {CLINICA.cidade}.
            </p>
            <div className="mt-4">
              <ButtonLink to="/sobre" variant="link">
                Conhecer a clínica
              </ButtonLink>
            </div>
          </div>
          <Visita />
        </div>
        <div className="mt-12 lg:mt-16">
          <GaleriaFaixas
            rotulo="Fotos da Clínica Solenime"
            itens={[
              { foto: FOTOS.recepcaoNoite, posicao: "40% 50%" },
              { foto: FOTOS.salaDeEspera, posicao: "55% 60%" },
              { foto: FOTOS.atendimento, posicao: "60% 45%" },
              { foto: FOTOS.retrato, posicao: "40% 35%" },
            ]}
          />
        </div>
      </section>

      {/* AVALIAÇÕES DO GOOGLE: manuais > Google Places ao vivo > nota estática (ver SecaoAvaliacoes) */}
      <SecaoAvaliacoes manuais={avaliacoes} perfil={PERFIL_GOOGLE} />

      {/* PROCEDIMENTOS: só aparece quando houver itens confirmados */}
      {confirmados.length > 0 && (
        <section className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
          <h2>Procedimentos</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[4px] bg-areia-300 sm:grid-cols-2 lg:grid-cols-3">
            {confirmados.map((p) => (
              <li key={p.slug} className="bg-areia-50 p-8">
                <h3>{p.nome}</h3>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <ButtonLink to="/procedimentos" variant="link">
              Ver todos os procedimentos
            </ButtonLink>
          </div>
        </section>
      )}

      {/* FECHAMENTO: tipo grande na faixa de marca */}
      <section className="bg-cacau-800 text-areia-50">
        <div className="mx-auto flex max-w-page flex-col justify-center gap-7 px-6 py-28 lg:min-h-[100svh] lg:gap-10 lg:px-20">
          <p className="eyebrow eyebrow-dark">O primeiro passo</p>
          <TituloSobe
            className="close-type"
            palavras={[
              "Comece",
              "pelo",
              <>
                <em className="italic text-champagne-400">quiz</em>.
              </>,
            ]}
          />
          <p className="max-w-[38rem] text-lg leading-relaxed text-areia-200 lg:text-xl">
            Cinco perguntas rápidas para saber se o Protocolo Sole é para você.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonExternal href={CLINICA.quizUrl} variant="inverse">
              Responder o quiz
            </ButtonExternal>
            <ButtonLink to="/contato" variant="outlineInverse">
              Falar com a clínica
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
