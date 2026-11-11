/**
 * Informações centrais da clínica.
 * Só preencha um campo quando a informação estiver CONFIRMADA pela clínica.
 * Veja PENDENCIAS.md para o que falta.
 */

export const CLINICA = {
  nome: "Clínica Solenime",
  cidade: "Santo André/SP",
  instagram: "https://www.instagram.com/clinicasolenime/",
  instagramHandle: "@clinicasolenime",
  /** Link oficial do quiz de qualificação (encontrado na bio do Instagram). */
  quizUrl: "https://harmoniza.typeform.com/to/hRM7MjcT",
  /** WhatsApp comercial, informado pela equipe em 2026-11-10 (formato internacional, só dígitos). */
  whatsappNumero: "5511955039318" as string,
  /** O mesmo número, como aparece para a pessoa. */
  whatsappExibicao: "(11) 95503-9318",
  /** Endereço do perfil da clínica no Google Maps (conferido em 2026-11-10). */
  endereco: "R. Caminho do Pilar, 828 – Vila Gilda, Santo André – SP, 09190-000" as string,
  /** O mesmo endereço em duas linhas, para o rodapé e o bloco de visita. */
  enderecoLinhas: ["R. Caminho do Pilar, 828", "Vila Gilda · Santo André – SP", "CEP 09190-000"],
  /** Perfil "Clinica Solenime Estética" no Google Maps, enviado pela equipe em 2026-11-10. */
  mapsUrl:
    "https://www.google.com/maps/place/Clinica+Solenime+Est%C3%A9tica/@-23.6694626,-46.5409728,17z/data=!3m1!4b1!4m6!3m5!1s0x94ce43571ffba269:0xf3cb486a4f1380f0!8m2!3d-23.6694626!4d-46.5383979!16s%2Fg%2F11g1llg3vn" as string,
  /** PENDENTE: horários confirmados. */
  horarios: "" as string,
  /** Valor da consulta. Só exibir após confirmação (ver PENDENCIAS.md). */
  valorConsulta: "R$160,00",
  valorConsultaConfirmado: false,
  /** Duração informada no fluxo atual, sujeita à confirmação. */
  duracaoConsulta: "cerca de duas horas",
};

/** Retorna o link do WhatsApp quando houver número confirmado; caso contrário, null. */
export function whatsappLink(mensagem = "Olá! Quero agendar a consulta do Protocolo Sole."): string | null {
  if (!CLINICA.whatsappNumero) return null;
  return `https://wa.me/${CLINICA.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}
