import { useState } from "react";
import type { FonteFoto } from "../data/fotos";
import { Foto } from "./Foto";

export interface Faixa {
  foto: FonteFoto;
  posicao?: string;
}

/**
 * Galeria em faixas (adaptada do "Luxury Real Estate" do motionsites): no desktop as fotos ficam lado a lado e a ativa
 * se abre enquanto as outras viram faixas estreitas. Abre por mouse (hover), teclado (foco) ou toque.
 * No celular vira um carrossel com scroll-snap, uma foto por vez.
 * A largura anima por flex-grow (é layout, não transform): aceitável aqui porque são só 4 itens e a troca é rara.
 */
export function GaleriaFaixas({ itens, rotulo }: { itens: Faixa[]; rotulo: string }) {
  const [ativa, setAtiva] = useState(0);

  return (
    <ul
      aria-label={rotulo}
      className="-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 [scrollbar-width:none] lg:scroll-px-0 lg:mx-0 lg:h-[clamp(420px,62svh,620px)] lg:gap-3 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
    >
      {itens.map((item, i) => (
        <li
          key={i}
          // no desktop cada faixa é focável (tab) e abre ao receber foco; no celular só rola
          tabIndex={0}
          onMouseEnter={() => setAtiva(i)}
          onFocus={() => setAtiva(i)}
          onClick={() => setAtiva(i)}
          data-ativa={ativa === i}
          className="faixa w-[86%] shrink-0 snap-start rounded-[4px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2 lg:w-auto lg:min-w-0 lg:shrink"
        >
          <Foto
            foto={item.foto}
            posicao={item.posicao}
            sizes="(min-width: 1024px) 60vw, 150vw"
            className="aspect-[4/5] h-full w-full lg:aspect-auto"
          />
        </li>
      ))}
    </ul>
  );
}
