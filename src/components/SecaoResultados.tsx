import { useCallback, useEffect, useRef, useState } from "react";
import { RESULTADOS, RESULTADOS_LIBERADOS, type Resultado } from "../data/resultados";
import { Foto } from "./Foto";

/** Selo "Antes"/"Depois" sobre a montagem (as fotos não trazem o rótulo escrito). */
function Selo({ children, className }: { children: string; className: string }) {
  return (
    <span
      className={`absolute rounded-[3px] bg-areia-50/90 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cacau-800 backdrop-blur ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function Seta({ dir }: { dir: 1 | -1 }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === 1 ? "M5 12h14M13 6l6 6-6 6" : "M19 12H5M11 6l-6 6 6 6"} />
    </svg>
  );
}

function Item({ r }: { r: Resultado }) {
  const empilhado = r.montagem === "empilhado";
  return (
    <figure>
      <div className="relative">
        <Foto foto={r.foto} sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 86vw" className="aspect-square w-full" />
        <Selo className="left-3 top-3">Antes</Selo>
        <Selo className={empilhado ? "left-3 top-[calc(50%+0.75rem)]" : "left-[calc(50%+0.75rem)] top-3"}>Depois</Selo>
      </div>
      {r.procedimento && <figcaption className="mt-4 text-[0.95rem] font-semibold text-cacau-800">{r.procedimento}</figcaption>}
    </figure>
  );
}

/**
 * Resultados (antes e depois): mesmo carrossel das avaliações — scroll-snap nativo, setas no desktop,
 * barra de progresso, sem autoplay. Só aparece com RESULTADOS_LIBERADOS (ver src/data/resultados.ts).
 */
export function SecaoResultados() {
  const preview = import.meta.env.DEV && new URLSearchParams(window.location.search).has("preview-resultados");
  const trilho = useRef<HTMLUListElement>(null);
  const [estado, setEstado] = useState({ inicio: true, fim: false, visivel: 1, progresso: 0 });

  const medir = useCallback(() => {
    const el = trilho.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEstado({
      inicio: el.scrollLeft <= 4,
      fim: el.scrollLeft >= max - 4,
      visivel: el.scrollWidth ? el.clientWidth / el.scrollWidth : 1,
      progresso: max > 0 ? el.scrollLeft / max : 0,
    });
  }, []);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    window.addEventListener("resize", medir);
    return () => {
      el.removeEventListener("scroll", medir);
      window.removeEventListener("resize", medir);
    };
  }, [medir]);

  if ((!RESULTADOS_LIBERADOS && !preview) || RESULTADOS.length === 0) return null;

  const mover = (dir: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.querySelector("li");
    const passo = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * passo, behavior: reduz ? "auto" : "smooth" });
  };
  const rolavel = estado.visivel < 0.999;

  return (
    <section aria-labelledby="resultados-titulo" className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Resultados</p>
          <h2 id="resultados-titulo" className="mt-6 max-w-[18ch]">
            Mudanças sutis, a mesma mulher no espelho.
          </h2>
        </div>
        {rolavel && (
          <div className="hidden gap-2 lg:flex">
            {([-1, 1] as const).map((dir) => (
              <button
                key={dir}
                type="button"
                onClick={() => mover(dir)}
                disabled={dir === -1 ? estado.inicio : estado.fim}
                aria-controls="resultados-trilho"
                aria-label={dir === -1 ? "Resultados anteriores" : "Próximos resultados"}
                className="btn inline-flex h-12 w-12 items-center justify-center rounded-[4px] border border-cacau-800/30 text-cacau-800 hover:border-cacau-800 hover:bg-areia-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30"
              >
                <Seta dir={dir} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div role="region" aria-roledescription="carrossel" aria-label="Antes e depois de pacientes da clínica" className="mt-12">
        <ul
          id="resultados-trilho"
          ref={trilho}
          tabIndex={0}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {RESULTADOS.map((r, i) => (
            <li
              key={i}
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]"
              aria-roledescription="resultado"
              aria-label={`${i + 1} de ${RESULTADOS.length}`}
            >
              <Item r={r} />
            </li>
          ))}
        </ul>

        {rolavel && (
          <div className="mt-8 h-px bg-areia-300" aria-hidden="true">
            <span
              className="block h-px bg-cacau-800"
              style={{
                width: `${estado.visivel * 100}%`,
                transform: `translateX(${(estado.progresso * (1 - estado.visivel) * 100) / estado.visivel}%)`,
              }}
            />
          </div>
        )}
        <p className="mt-6 max-w-[44rem] text-sm leading-relaxed text-cacau-600">
          Imagens de pacientes da Clínica Solenime, publicadas com autorização. Os resultados variam de pessoa para pessoa e
          dependem da avaliação individual; não há garantia de resultado.
        </p>
      </div>
    </section>
  );
}
