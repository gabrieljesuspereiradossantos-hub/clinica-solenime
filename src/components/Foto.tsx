import type { FonteFoto } from "../data/fotos";
import { useRevela } from "../hooks/useRevela";

/**
 * Foto real da clínica, em <picture> com AVIF, WebP e JPEG (ver src/data/fotos.ts).
 * `sizes` deve dizer a largura que a IMAGEM ocupa, não a do quadro: num recorte vertical de uma foto 16:9
 * a imagem fica bem mais larga que o quadro (ex.: quadro 4:5 → a imagem tem ~2,2× a largura dele).
 * `revelar`: abre de baixo para cima ao entrar na tela (.wipe em index.css). `prioridade`: foto da primeira tela.
 */
export function Foto({
  foto,
  alt,
  className = "",
  posicao,
  revelar = false,
  prioridade = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  arredondada = true,
}: {
  foto: FonteFoto;
  /** substitui o texto alternativo padrão (quando o recorte mostra só um detalhe) */
  alt?: string;
  className?: string;
  posicao?: string;
  revelar?: boolean;
  prioridade?: boolean;
  sizes?: string;
  arredondada?: boolean;
}) {
  const ref = useRevela<HTMLDivElement>(0.2);
  const raio = arredondada ? "rounded-[4px]" : "";

  const picture = (
    <picture className="block h-full w-full">
      <source type="image/avif" srcSet={foto.avif} sizes={sizes} />
      <source type="image/webp" srcSet={foto.webp} sizes={sizes} />
      <img
        src={foto.src}
        srcSet={foto.jpg}
        sizes={sizes}
        alt={alt ?? foto.alt}
        width={1600}
        height={900}
        loading={prioridade ? "eager" : "lazy"}
        decoding={prioridade ? "sync" : "async"}
        // React 18 só repassa o atributo em minúsculas
        {...(prioridade ? { fetchpriority: "high" } : {})}
        className="h-full w-full object-cover"
        // sem `posicao`, o enquadramento pode vir do CSS (ex.: .hero-foto muda o recorte por largura de tela)
        style={posicao ? { objectPosition: posicao } : undefined}
      />
    </picture>
  );

  if (revelar) {
    return (
      <div ref={ref} className={`wipe ${className}`}>
        <div className={`wipe-quadro h-full w-full overflow-hidden bg-areia-200 ${raio}`}>{picture}</div>
      </div>
    );
  }

  return <div className={`overflow-hidden bg-areia-200 ${raio} ${className}`}>{picture}</div>;
}
