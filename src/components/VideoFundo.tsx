import { useEffect, useRef, useState } from "react";

/**
 * Vídeo de fundo do hero (a recepção ganhando luz), por cima da foto, que continua sendo o pôster e o plano B.
 * - Não carrega com "reduzir movimento" ligado nem com economia de dados: fica só a foto.
 * - Aparece com fade quando já pode tocar (nada de quadro preto) e pausa quando o hero sai da tela.
 * - Loop de ida e volta (scripts: ffmpeg reverse), então não há salto no fim.
 */
export function VideoFundo({ webm, mp4, className = "" }: { webm: string; mp4: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [usar, setUsar] = useState(false);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const reduz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const economia = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (!reduz && !economia) setUsar(true);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [usar]);

  if (!usar) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={() => setPronto(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${pronto ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
