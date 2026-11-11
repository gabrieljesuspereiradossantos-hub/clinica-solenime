import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "inverse" | "outlineInverse" | "link" | "linkInverse";

const base =
  "btn inline-flex items-center justify-center gap-3 rounded-[4px] text-[0.95rem] font-semibold tracking-[0.01em] " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-500 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "min-h-[52px] px-7 bg-cacau-800 text-areia-50 hover:bg-cacau-700",
  secondary: "min-h-[52px] px-7 border border-cacau-800/30 text-cacau-800 hover:border-cacau-800 hover:bg-areia-100",
  // fundos escuros (faixa cacau)
  inverse: "min-h-[52px] px-7 bg-areia-50 text-cacau-800 hover:bg-areia-200",
  outlineInverse: "min-h-[52px] px-7 border border-areia-50/50 text-areia-50 hover:border-areia-50 hover:bg-cacau-700",
  // link de texto com seta (alvo de 48px)
  link: "min-h-[48px] px-0 text-cacau-800 underline underline-offset-[6px] decoration-cacau-800/40 hover:decoration-cacau-800",
  // o mesmo link sobre foto ou fundo escuro
  linkInverse: "min-h-[48px] px-0 text-areia-50 underline underline-offset-[6px] decoration-areia-50/50 hover:decoration-areia-50",
};

function Arrow() {
  return (
    <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}

/** CTA interno (rota do React Router). */
export function ButtonLink({ to, variant = "primary", children, className = "", arrow = true }: CommonProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

/** CTA externo (nova aba, com rel seguro). */
export function ButtonExternal({ href, variant = "primary", children, className = "", arrow = true }: CommonProps & { href: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {arrow && <Arrow />}
    </a>
  );
}
