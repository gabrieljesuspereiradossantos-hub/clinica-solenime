import { useEffect, useState, type RefObject } from "react";
import type { Avaliacao } from "../data/avaliacoes";
import { carregarGoogleMaps } from "../lib/googleMaps";

const CHAVE = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
const PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID as string | undefined;

/** A integração só liga quando as duas variáveis existem (.env.local). */
export const googlePlacesConfigurado = Boolean(CHAVE && PLACE_ID);

export interface DadosGoogle {
  nota: number | null;
  total: number | null;
  url: string;
  avaliacoes: Avaliacao[];
}

type Estado = { status: "ocioso" | "carregando" | "erro" } | { status: "ok"; dados: DadosGoogle };

/**
 * Busca nota, total e avaliações do perfil no Google, AO VIVO (os termos da Google Maps Platform
 * não permitem guardar avaliações). Só dispara quando o elemento observado chega perto da tela,
 * para não pesar o carregamento nem gastar cota de quem não rola até a seção.
 * O Google devolve no máximo 5 avaliações ("mais relevantes"); elas são exibidas como vêm, sem filtro.
 */
export function useAvaliacoesGoogle(alvo: RefObject<Element>): Estado {
  const [estado, setEstado] = useState<Estado>({ status: "ocioso" });

  useEffect(() => {
    if (!googlePlacesConfigurado || !alvo.current) return;
    let cancelado = false;

    const buscar = async () => {
      setEstado({ status: "carregando" });
      try {
        const google = await carregarGoogleMaps(CHAVE!);
        const { Place } = await google.maps.importLibrary("places");
        const place = new Place({ id: PLACE_ID, requestedLanguage: "pt-BR" });
        await place.fetchFields({ fields: ["rating", "userRatingCount", "reviews", "googleMapsURI"] });
        if (cancelado) return;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const avaliacoes: Avaliacao[] = (place.reviews ?? []).map((r: any) => ({
          autor: r.authorAttribution?.displayName ?? "Paciente",
          autorUrl: r.authorAttribution?.uri ?? undefined,
          nota: Math.max(1, Math.min(5, Math.round(r.rating ?? 5))) as Avaliacao["nota"],
          texto: r.text ?? r.originalText ?? "",
          quando: r.relativePublishTimeDescription ?? "",
        }));

        setEstado({
          status: "ok",
          dados: {
            nota: typeof place.rating === "number" ? place.rating : null,
            total: typeof place.userRatingCount === "number" ? place.userRatingCount : null,
            url: place.googleMapsURI ?? "",
            avaliacoes: avaliacoes.filter((a) => a.texto.trim().length > 0),
          },
        });
      } catch (e) {
        if (!cancelado) {
          console.warn("[avaliações] Google Places indisponível, usando o resumo estático.", e);
          setEstado({ status: "erro" });
        }
      }
    };

    if (!("IntersectionObserver" in window)) {
      buscar();
      return () => {
        cancelado = true;
      };
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          buscar();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(alvo.current);
    return () => {
      cancelado = true;
      io.disconnect();
    };
  }, [alvo]);

  return estado;
}
