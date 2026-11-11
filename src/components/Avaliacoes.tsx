import { useCallback, useEffect, useRef, useState } from "react";
import type { Avaliacao } from "../data/avaliacoes";

/** Logo oficial do Google (cores originais), só como atribuição da fonte das avaliações. */
function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 13 4 4 13 4 24s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-3.9z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z" />
    </svg>
  );
}

function Estrelas({ nota, size = 16 }: { nota: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Nota ${String(nota).replace(".", ",")} de 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.8l2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.1 6.4 20l1.1-6.2L2.9 9.4l6.3-.9L12 2.8z"
            className={i < Math.round(nota) ? "fill-champagne-500" : "fill-areia-300"}
          />
        </svg>
      ))}
    </span>
  );
}

function Seta({ dir }: { dir: 1 | -1 }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {dir === 1 ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M19 12H5M11 6l-6 6 6 6" />}
    </svg>
  );
}

/**
 * Carrossel de avaliações: scroll-snap nativo (arrastar/deslizar funciona sem JS),
 * setas para mouse, barra de progresso, sem autoplay.
 */
export function Avaliacoes({
  itens,
  perfil,
  aoVivo = false,
}: {
  itens: Avaliacao[];
  perfil: { nota: number | null; total: number | null; url: string };
  /** true quando os dados vêm da API do Google Places (exige a atribuição "Google Maps"). */
  aoVivo?: boolean;
}) {
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

  const mover = (dir: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const card = el.querySelector("li");
    const passo = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * passo, behavior: reduz ? "auto" : "smooth" });
  };

  const rolavel = estado.visivel < 0.999;

  // Sem textos cadastrados: mostra só a nota do perfil e leva para as avaliações no Google.
  if (itens.length === 0 && perfil.nota !== null) {
    return (
      <section aria-labelledby="avaliacoes-titulo" className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
        <div className="grid gap-10 rounded-[4px] bg-areia-100 px-6 py-14 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-20 lg:px-16 lg:py-20">
          <div>
            <p className="eyebrow">Avaliações no Google</p>
            <h2 id="avaliacoes-titulo" className="mt-6 max-w-[14ch]">
              O que dizem as pacientes.
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:items-end lg:text-right">
            <div className="flex items-end gap-5 lg:justify-end">
              <span className="font-serif text-[5.5rem] leading-[0.8] text-cacau-800 lg:text-[8rem]">
                {perfil.nota.toFixed(1).replace(".", ",")}
              </span>
              <span className="flex flex-col gap-2 pb-1 lg:items-end">
                <Estrelas nota={perfil.nota} size={20} />
                <span className="inline-flex items-center gap-2 text-sm text-cacau-700">
                  <GoogleG />
                  {perfil.total !== null ? `${perfil.total} avaliações no Google` : "no Google"}
                </span>
              </span>
            </div>
            {perfil.url && (
              <a
                href={perfil.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex min-h-[48px] items-center gap-3 self-start text-[0.95rem] font-semibold text-cacau-800 underline decoration-cacau-800/40 underline-offset-[6px] hover:decoration-cacau-800 lg:self-end"
              >
                Ler as avaliações no Google
                <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="avaliacoes-titulo" className="mx-auto max-w-page px-6 pb-24 lg:px-20 lg:pb-32">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Avaliações no Google</p>
          <h2 id="avaliacoes-titulo" className="mt-6">
            O que dizem as pacientes.
          </h2>
          {perfil.nota !== null && (
            <p className="mt-5 flex flex-wrap items-center gap-3 text-cacau-700">
              <GoogleG size={20} />
              <span className="font-serif text-3xl leading-none text-cacau-800">{perfil.nota.toFixed(1).replace(".", ",")}</span>
              <Estrelas nota={perfil.nota} size={18} />
              {perfil.total !== null && <span className="text-sm">{perfil.total} avaliações</span>}
            </p>
          )}
        </div>

        {rolavel && (
          <div className="hidden gap-2 lg:flex">
            {([-1, 1] as const).map((dir) => {
              const desativado = dir === -1 ? estado.inicio : estado.fim;
              return (
                <button
                  key={dir}
                  type="button"
                  onClick={() => mover(dir)}
                  disabled={desativado}
                  aria-controls="avaliacoes-trilho"
                  aria-label={dir === -1 ? "Avaliações anteriores" : "Próximas avaliações"}
                  className="btn inline-flex h-12 w-12 items-center justify-center rounded-[4px] border border-cacau-800/30 text-cacau-800 hover:border-cacau-800 hover:bg-areia-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30"
                >
                  <Seta dir={dir} />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div role="region" aria-roledescription="carrossel" aria-label="Avaliações de pacientes no Google" className="mt-12">
        <ul
          id="avaliacoes-trilho"
          ref={trilho}
          tabIndex={0}
          className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-1 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {itens.map((a, i) => (
            <li
              key={i}
              className="w-[86%] shrink-0 snap-start sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]"
              aria-roledescription="avaliação"
              aria-label={`${i + 1} de ${itens.length}`}
            >
              <figure className="flex h-full min-h-[340px] flex-col justify-between gap-10 rounded-[4px] bg-areia-100 p-8 lg:p-10">
                <div>
                  <Estrelas nota={a.nota} />
                  <blockquote className="mt-6 line-clamp-[7] font-serif text-[1.5rem] leading-[1.3] text-grafite lg:text-[1.625rem]">
                    “{a.texto}”
                  </blockquote>
                </div>
                <figcaption className="flex items-center justify-between gap-4 border-t border-areia-300 pt-5">
                  <span>
                    {a.autorUrl ? (
                      <a
                        href={a.autorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-[0.95rem] font-semibold text-cacau-800 underline decoration-cacau-800/0 underline-offset-4 transition-[text-decoration-color] hover:decoration-cacau-800/60"
                      >
                        {a.autor}
                      </a>
                    ) : (
                      <span className="block text-[0.95rem] font-semibold text-cacau-800">{a.autor}</span>
                    )}
                    <span className="block text-sm text-cacau-600">{a.quando}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-cacau-600">
                    <GoogleG />
                    Google
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {rolavel && (
          <div className="mt-8 flex items-center gap-6">
            <div className="relative h-px flex-1 bg-areia-300" aria-hidden="true">
              <span
                className="absolute inset-y-0 left-0 bg-cacau-800"
                style={{
                  width: `${estado.visivel * 100}%`,
                  transform: `translateX(${(estado.progresso * (1 - estado.visivel) * 100) / estado.visivel}%)`,
                }}
              />
            </div>
            {perfil.url && (
              <a
                href={perfil.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex min-h-[48px] items-center gap-2 text-[0.95rem] font-semibold text-cacau-800 underline decoration-cacau-800/40 underline-offset-[6px] hover:decoration-cacau-800"
              >
                Ver todas no Google
              </a>
            )}
          </div>
        )}
        {aoVivo && <p className="mt-4 text-xs text-cacau-600">Nota e avaliações fornecidas pelo Google Maps.</p>}
      </div>
    </section>
  );
}
