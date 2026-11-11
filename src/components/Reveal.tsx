import type { ReactNode } from "react";

/**
 * Antes fazia fade-in ao rolar. Desligado no conceito v2: fade-in seção a seção é anti-padrão
 * (taste-skill). O movimento fica na entrada do hero e nos dois momentos da home.
 * Mantido como wrapper simples para não mexer na estrutura das outras páginas.
 */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string; delay?: number }) {
  return <div className={className}>{children}</div>;
}
