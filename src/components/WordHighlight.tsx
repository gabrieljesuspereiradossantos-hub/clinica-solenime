import { useEffect, useRef } from "react";

/**
 * Momento tipográfico: as palavras acendem (22% -> 100% de opacidade) conforme o texto passa pela tela.
 * Só opacity, um rAF por quadro. Sem JS ou com prefers-reduced-motion o texto fica todo visível.
 */
export function WordHighlight({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = Array.from(el.querySelectorAll<HTMLSpanElement>("[data-w]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // começa quando o topo do texto chega a 85% da tela e termina quando o fim passa de 45%
      const start = vh * 0.85;
      const end = vh * 0.45 - r.height;
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const lit = p * words.length;
      for (let i = 0; i < words.length; i++) {
        const o = Math.min(1, Math.max(0, lit - i));
        words[i].style.opacity = String(0.22 + 0.78 * o);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      words.forEach((w) => (w.style.opacity = ""));
    };
  }, [text]);

  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} data-w aria-hidden="true">
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
