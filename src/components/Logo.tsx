/**
 * Wordmark provisório em texto.
 * PENDENTE: substituir pelo logotipo oficial em SVG quando a clínica enviar o arquivo.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col leading-none text-cacau-800 ${className}`} aria-label="Clínica Solenime">
      <span className="font-serif text-[0.75rem] uppercase tracking-[0.35em] text-cacau-600">clínica</span>
      <span className="font-serif text-[2.1rem] italic font-medium -mt-1.5">Solenime</span>
    </span>
  );
}
