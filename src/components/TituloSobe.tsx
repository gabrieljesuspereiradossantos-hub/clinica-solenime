import type { CSSProperties, ReactNode } from "react";
import { useRevela } from "../hooks/useRevela";

/**
 * Título que sobe palavra a palavra de dentro de uma máscara, uma vez, quando 35% dele entra na tela.
 * Só transform. O texto continua no DOM como texto normal (leitores de tela leem a frase inteira).
 */
export function TituloSobe({ palavras, className = "" }: { palavras: ReactNode[]; className?: string }) {
  const ref = useRevela<HTMLHeadingElement>(0.35);
  return (
    <h2 ref={ref} className={`sobe ${className}`}>
      {palavras.map((p, i) => (
        <span key={i}>
          <span className="sobe-mask">
            <span className="sobe-palavra" style={{ "--i": i } as CSSProperties}>
              {p}
            </span>
          </span>
          {i < palavras.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
