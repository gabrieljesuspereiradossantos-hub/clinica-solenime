import { useRef } from "react";
import type { Avaliacao } from "../data/avaliacoes";
import { useAvaliacoesGoogle } from "../hooks/useAvaliacoesGoogle";
import { Avaliacoes } from "./Avaliacoes";

type Perfil = { nota: number | null; total: number | null; url: string };

/**
 * Decide o que a seção mostra, nesta ordem:
 * 1. avaliações cadastradas à mão (src/data/avaliacoes.ts), se houver;
 * 2. avaliações ao vivo do Google Places, se a chave e o Place ID estiverem no .env.local;
 * 3. só a nota estática do perfil, com link para ler no Google.
 * Se a API falhar ou não estiver configurada, fica no item 3 sem quebrar nada.
 */
export function SecaoAvaliacoes({ manuais, perfil }: { manuais: Avaliacao[]; perfil: Perfil }) {
  const ref = useRef<HTMLDivElement>(null);
  const google = useAvaliacoesGoogle(ref);

  let itens = manuais;
  let p = perfil;
  let aoVivo = false;

  if (manuais.length === 0 && google.status === "ok") {
    const d = google.dados;
    itens = d.avaliacoes;
    p = { nota: d.nota ?? perfil.nota, total: d.total ?? perfil.total, url: d.url || perfil.url };
    aoVivo = true;
  }

  return (
    <div ref={ref}>
      {(itens.length > 0 || p.nota !== null) && <Avaliacoes itens={itens} perfil={p} aoVivo={aoVivo} />}
    </div>
  );
}
