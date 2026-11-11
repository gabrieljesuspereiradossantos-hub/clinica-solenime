import { useState, type CSSProperties } from "react";
import { ButtonExternal } from "../components/Button";
import { FaixaQuiz } from "../components/FaixaQuiz";
import { Foto } from "../components/Foto";
import { CLINICA } from "../config";
import { FOTOS } from "../data/fotos";
import { CATEGORIAS, procedimentosConfirmados, type Categoria } from "../data/procedimentos";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export function Procedimentos() {
  useDocumentMeta({
    title: "Procedimentos | Clínica Solenime",
    description: "Conheça os procedimentos da Clínica Solenime em Santo André/SP e solicite mais informações.",
  });

  const confirmados = procedimentosConfirmados();
  const categoriasComItens = (Object.keys(CATEGORIAS) as Categoria[]).filter((c) =>
    confirmados.some((p) => p.categoria === c),
  );
  const [filtro, setFiltro] = useState<Categoria | "todas">("todas");

  const lista = confirmados.filter((p) => filtro === "todas" || p.categoria === filtro);

  return (
    <>
      <section className="mx-auto max-w-page px-6 pb-24 pt-10 lg:px-20 lg:pb-32 lg:pt-16">
        <p className="eyebrow enter" style={d(0)}>
          Procedimentos
        </p>
        <h1 className="h1-pagina enter mt-6 max-w-[16ch]" style={d(1)}>
          Tratamentos pensados para a sua pele e para o seu <em className="italic text-cacau-600">momento</em>.
        </h1>

        {confirmados.length === 0 ? (
          // Catálogo vazio enquanto a clínica valida cada procedimento (ver src/data/procedimentos.ts)
          <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
            <Foto
              foto={FOTOS.recepcaoNoite}
              prioridade
              sizes="(min-width: 1024px) 60vw, 115vw"
              posicao="60% 50%"
              className="enter-photo aspect-[3/2] w-full lg:aspect-auto lg:h-full lg:min-h-[420px]"
            />
            <div className="flex flex-col justify-end border-t border-areia-300 pt-8 lg:border-0 lg:pt-0">
              <h2 className="text-[2.25rem] lg:text-[2.75rem]">Catálogo em preparação</h2>
              <p className="mt-5 text-lg leading-relaxed text-cacau-700">
                Estamos organizando as informações completas de cada procedimento. Enquanto isso, a equipe pode orientar você sobre o
                que faz sentido para o seu caso.
              </p>
              <div className="mt-8">
                <ButtonExternal href={CLINICA.quizUrl}>Conhecer o Protocolo Sole</ButtonExternal>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div role="tablist" aria-label="Filtrar por categoria" className="mt-14 flex flex-wrap gap-2">
              {(["todas", ...categoriasComItens] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filtro === c}
                  onClick={() => setFiltro(c)}
                  className={`btn min-h-[44px] rounded-[4px] border px-5 text-sm font-semibold ${
                    filtro === c ? "border-cacau-800 bg-cacau-800 text-areia-50" : "border-areia-300 text-cacau-700 hover:border-cacau-600"
                  }`}
                >
                  {c === "todas" ? "Todas" : CATEGORIAS[c]}
                </button>
              ))}
            </div>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-[4px] bg-areia-300 md:grid-cols-2">
              {lista.map((p) => (
                <li key={p.slug} className="flex flex-col bg-areia-50 p-8 lg:p-10">
                  <p className="eyebrow">{CATEGORIAS[p.categoria]}</p>
                  <h2 className="mt-4 text-[2rem]">{p.nome}</h2>
                  <p className="mt-4 text-cacau-700">{p.descricao}</p>
                  <p className="mt-3 text-sm text-cacau-600">{p.indicacao}</p>
                  <div className="mt-auto pt-6">
                    <ButtonExternal href={CLINICA.quizUrl} variant="link">
                      Solicitar informações
                    </ButtonExternal>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <FaixaQuiz titulo={<>Não sabe por onde começar? Comece pelo <em className="italic text-champagne-400">quiz</em>.</>} />
    </>
  );
}
