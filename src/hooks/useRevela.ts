import { useLayoutEffect, useRef } from "react";

/**
 * Marca o elemento com data-revela="espera" e troca para "sim" quando ele entra na tela (uma vez só).
 * O CSS decide o que acontece (ver .wipe e .sobe em index.css).
 * Sem IntersectionObserver ou com prefers-reduced-motion, o atributo nunca é posto e o conteúdo já aparece pronto.
 */
export function useRevela<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    el.dataset.revela = "espera";
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.revela = "sim";
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      delete el.dataset.revela;
    };
  }, [threshold]);

  return ref;
}
