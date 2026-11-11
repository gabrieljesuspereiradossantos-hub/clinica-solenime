import type { FonteFoto } from "./fotos";

/**
 * Antes e depois enviados pela equipe em 10/11/2026 (montagens com a marca @clinicasolenime).
 *
 * As fotos ficam em src/assets/resultados, pasta FORA do git (.gitignore): o repositório é público e são
 * imagens de saúde de pacientes. Sem a pasta (ex.: no build da Vercel) a lista fica vazia e nada é publicado.
 *
 * A seção só aparece no site quando RESULTADOS_LIBERADOS for true. Antes de ligar, a clínica precisa confirmar:
 *  1. termo de autorização de uso de imagem assinado por CADA paciente (foto de rosto é dado de saúde na LGPD);
 *  2. que as regras de publicidade do conselho da profissional que fez os procedimentos permitem antes e depois no site;
 *  3. o nome do procedimento de cada caso (campo `procedimento`), sem nada inventado aqui.
 * Para publicar: ligar a chave E tirar src/assets/resultados do .gitignore.
 * Em desenvolvimento, ?preview-resultados mostra a seção mesmo desligada (nunca em produção).
 */
export const RESULTADOS_LIBERADOS = false;

export interface Resultado {
  foto: FonteFoto;
  /** "lado": antes à esquerda, depois à direita. "empilhado": antes em cima, depois embaixo. */
  montagem: "lado" | "empilhado";
  /** PENDENTE: nome do procedimento, confirmado pela clínica. Só aparece quando preenchido. */
  procedimento?: string;
}

// Em produção, com a chave desligada, o glob nem é avaliado: as fotos não entram no build.
const arquivos: Record<string, string> =
  RESULTADOS_LIBERADOS || import.meta.env.DEV
    ? (import.meta.glob("../assets/resultados/*.{avif,webp,jpg}", { eager: true, import: "default" }) as Record<string, string>)
    : {};

function fonte(n: number, alt: string): FonteFoto | null {
  const url = (largura: number, ext: string) => arquivos[`../assets/resultados/resultado-${n}-${largura}.${ext}`];
  if (!url(1600, "jpg")) return null;
  const set = (ext: string) => `${url(800, ext)} 800w, ${url(1600, ext)} 1600w`;
  return { avif: set("avif"), webp: set("webp"), jpg: set("jpg"), src: url(1600, "jpg"), alt };
}

const FRENTE = "Antes e depois de uma paciente, rosto de frente: antes à esquerda, depois à direita";
const PERFIL = "Antes e depois de uma paciente, rosto de perfil: antes à esquerda, depois à direita";

const CASOS: [number, string, Resultado["montagem"]][] = [
  [8, FRENTE, "lado"],
  [2, FRENTE, "lado"],
  [3, FRENTE, "lado"],
  [5, FRENTE, "lado"],
  [1, PERFIL, "lado"],
  [7, PERFIL, "lado"],
  [4, PERFIL, "lado"],
  [6, "Antes e depois do contorno do rosto e do queixo de uma paciente: antes em cima, depois embaixo", "empilhado"],
];

export const RESULTADOS: Resultado[] = CASOS.flatMap(([n, alt, montagem]) => {
  const foto = fonte(n, alt);
  return foto ? [{ foto, montagem }] : [];
});
