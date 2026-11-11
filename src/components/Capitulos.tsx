import { useEffect, useRef, useState } from "react";
import type { FonteFoto } from "../data/fotos";
import { Foto } from "./Foto";

export interface Capitulo {
  titulo: string;
  texto: string;
  foto: FonteFoto;
  posicao?: string;
}

/**
 * Capítulos do Protocolo Sole: a coluna lateral fica fixa (sticky, na página) enquanto as etapas passam.
 * A etapa que cruza o meio da tela fica ativa e o número dela escurece.
 */
export function Capitulos({ itens }: { itens: Capitulo[] }) {
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setAtivo(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol className="flex flex-col gap-12 lg:gap-14">
      {itens.map((c, i) => (
        <li
          key={c.titulo}
          ref={(el) => (refs.current[i] = el)}
          data-i={i}
          aria-current={ativo === i ? "step" : undefined}
          className="flex flex-col gap-6"
        >
          <Foto
            foto={c.foto}
            posicao={c.posicao}
            revelar
            sizes="(min-width: 1024px) 55vw, 115vw"
            className="aspect-[3/2] w-full lg:aspect-[2/1]"
          />
          <div className="flex gap-5 lg:gap-7">
            <span
              className={`chapter-num font-serif text-4xl italic leading-none lg:text-[2.75rem] ${
                ativo === i ? "text-cacau-800" : "text-champagne-700"
              }`}
              aria-hidden="true"
            >
              0{i + 1}
            </span>
            <div>
              <h3>{c.titulo}</h3>
              <p className="mt-2 text-cacau-700 lg:text-[1.0625rem]">{c.texto}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
