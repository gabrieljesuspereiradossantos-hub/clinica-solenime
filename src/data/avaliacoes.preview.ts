import type { Avaliacao } from "./avaliacoes";

/**
 * SÓ PARA VER O LAYOUT EM DESENVOLVIMENTO (abra a home com ?preview-avaliacoes).
 * Não são avaliações: o texto se apresenta como exemplo e nunca vai para produção
 * (o uso fica atrás de import.meta.env.DEV).
 */
const curto = "Texto de exemplo. Aqui entra a avaliação real copiada do Google.";
const longo =
  "Texto de exemplo, mais longo, para testar o corte em várias linhas. Aqui entra a avaliação real copiada do perfil da clínica no Google, sem edição, exatamente como a paciente escreveu.";

export const AVALIACOES_PREVIEW: Avaliacao[] = [
  { autor: "Nome da paciente", nota: 5, texto: longo, quando: "há 1 semana" },
  { autor: "Nome da paciente", nota: 5, texto: curto, quando: "há 3 semanas" },
  { autor: "Nome da paciente", nota: 5, texto: longo, quando: "há 1 mês" },
  { autor: "Nome da paciente", nota: 4, texto: curto, quando: "há 2 meses" },
  { autor: "Nome da paciente", nota: 5, texto: longo, quando: "há 3 meses" },
];
