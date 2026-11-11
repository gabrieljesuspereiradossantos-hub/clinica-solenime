import type { CSSProperties } from "react";
import { FaixaQuiz } from "../components/FaixaQuiz";
import { Foto } from "../components/Foto";
import { Visita } from "../components/Visita";
import { CLINICA } from "../config";
import { FOTOS } from "../data/fotos";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export function Sobre() {
  useDocumentMeta({
    title: "A clínica | Clínica Solenime",
    description: "Conheça a Clínica Solenime em Santo André/SP: o espaço, a filosofia de atendimento personalizado e como chegar.",
  });

  return (
    <>
      {/* Abertura: texto e a sala de espera larga */}
      <section className="mx-auto max-w-page px-6 pb-24 pt-10 lg:px-20 lg:pb-32 lg:pt-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] lg:items-end lg:gap-16">
          <div>
            <p className="eyebrow enter" style={d(0)}>
              A clínica
            </p>
            <h1 className="h1-pagina enter mt-6" style={d(1)}>
              Um espaço para cuidar de você com <em className="italic text-cacau-600">calma</em> e atenção.
            </h1>
          </div>
          <p className="enter text-lg leading-relaxed text-cacau-700" style={d(2)}>
            A Clínica Solenime atende em {CLINICA.cidade} com foco em estética personalizada. Cada pessoa chega com uma história,
            um histórico e expectativas diferentes, e é a partir disso que construímos o atendimento.
          </p>
        </div>
        <Foto
          foto={FOTOS.salaDeEspera}
          prioridade
          sizes="(min-width: 1024px) 90vw, 180vw"
          posicao="50% 60%"
          className="enter-photo mt-12 aspect-[4/5] w-full sm:aspect-[16/9] lg:mt-16 lg:aspect-[21/9]"
        />
      </section>

      {/* O espaço: duas fotos e o texto */}
      <section className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="grid gap-12 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24">
          <div className="lg:sticky lg:top-[120px] lg:self-start">
            <p className="eyebrow">O espaço</p>
            <h2 className="mt-6">Da recepção à sala de atendimento, sem pressa.</h2>
            <p className="mt-6 text-lg leading-relaxed text-cacau-700">
              Madeira, luz baixa e tons neutros. Um lugar claro e reservado para a conversa que abre cada atendimento.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Foto foto={FOTOS.recepcaoNoite} revelar sizes="(min-width: 1024px) 30vw, 230vw" posicao="55% 50%" className="aspect-[4/5] w-full" />
            <Foto foto={FOTOS.atendimento} revelar sizes="(min-width: 1024px) 30vw, 230vw" posicao="66% 45%" className="aspect-[4/5] w-full sm:mt-24" />
          </div>
        </div>
      </section>

      {/* Como chegar */}
      <section className="bg-areia-100">
        <div className="mx-auto grid max-w-page gap-12 px-6 py-24 lg:grid-cols-[440px_minmax(0,1fr)] lg:gap-24 lg:px-20 lg:py-32">
          <div>
            <p className="eyebrow">Como chegar</p>
            <h2 className="mt-6">Na Vila Gilda, em Santo André.</h2>
          </div>
          <Visita className="lg:pt-3" />
        </div>
      </section>

      <FaixaQuiz titulo={<>Venha conhecer a clínica pelo <em className="italic text-champagne-400">quiz</em>.</>} />
    </>
  );
}
