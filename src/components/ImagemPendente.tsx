import { useRevela } from "../hooks/useRevela";

/**
 * Quadro para fotos que a clínica ainda precisa enviar (ver PENDENCIAS.md).
 * Não substitua por fotos de banco ou imagens geradas por IA apresentadas como da clínica.
 * Conceito v2: cor chapada, sem legenda visível (o que falta fica só no aria-label e no código).
 *
 * `revelar`: o quadro abre de baixo para cima (clip-path) quando entra na tela, o mesmo gesto da foto do hero.
 * O invólucro externo (sem recorte) é o que o IntersectionObserver observa: um alvo 100% recortado
 * nunca conta como visível no Chrome. Quando a foto real chegar, ponha o <img> dentro de .wipe-quadro;
 * ela assenta de 1.12 para 1 enquanto a cortina abre (ver .wipe em index.css).
 */
export function ImagemPendente({
  descricao,
  className = "",
  tom = "areia-200",
  revelar = false,
}: {
  descricao: string;
  className?: string;
  tom?: "areia-200" | "areia-300";
  revelar?: boolean;
}) {
  const ref = useRevela<HTMLDivElement>(0.2);
  const fundo = tom === "areia-300" ? "bg-areia-300" : "bg-areia-200";

  if (revelar) {
    return (
      <div ref={ref} role="img" aria-label={`Imagem pendente: ${descricao}`} data-pendente={descricao} className={`wipe ${className}`}>
        <div className={`wipe-quadro h-full w-full overflow-hidden rounded-[4px] ${fundo}`} />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Imagem pendente: ${descricao}`}
      data-pendente={descricao}
      className={`rounded-[4px] ${fundo} ${className}`}
    />
  );
}
