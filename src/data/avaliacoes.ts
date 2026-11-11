/**
 * Avaliações do Google da Clínica Solenime.
 *
 * REGRAS (ver PENDENCIAS.md):
 * - Só avaliações REAIS, copiadas do perfil da clínica no Google, sem editar o texto.
 * - Só publicar com o aval da clínica (e, se ela preferir, da paciente).
 * - Nunca inventar, resumir ou "melhorar" uma avaliação.
 *
 * Enquanto a lista estiver vazia, a seção mostra só a nota do perfil e o link para ler no Google.
 */

import { CLINICA } from "../config";

export interface Avaliacao {
  /** Nome como aparece no Google (pode ser só o primeiro nome + inicial). */
  autor: string;
  /** Perfil da autora no Google (vem da API; obrigatório exibir quando existir). */
  autorUrl?: string;
  nota: 1 | 2 | 3 | 4 | 5;
  /** Texto exato da avaliação. */
  texto: string;
  /** Como o Google mostra a data, ex.: "há 2 meses". */
  quando: string;
}

/**
 * Resumo do perfil "Clinica Solenime Estética" no Google.
 * Conferido em 2026-11-10: 4,9 com 600 avaliações. Atualize de tempos em tempos (ou ligue a API do Google Places).
 */
export const PERFIL_GOOGLE = {
  nota: 4.9 as number | null,
  total: 600 as number | null,
  url: CLINICA.mapsUrl,
};

export const AVALIACOES: Avaliacao[] = [];
