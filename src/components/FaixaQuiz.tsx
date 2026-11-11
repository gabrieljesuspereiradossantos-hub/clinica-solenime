import type { ReactNode } from "react";
import { CLINICA, whatsappLink } from "../config";
import { ButtonExternal } from "./Button";

/** Fechamento das páginas internas: a mesma faixa de marca (cacau) do fim da home, em tamanho de h2. */
export function FaixaQuiz({
  titulo,
  texto = "Cinco perguntas rápidas para saber se o Protocolo Sole é para você. Depois, a equipe entra em contato para combinar o horário.",
}: {
  titulo: ReactNode;
  texto?: string;
}) {
  const whats = whatsappLink();

  return (
    <section className="bg-cacau-800 text-areia-50">
      <div className="mx-auto flex max-w-page flex-col gap-7 px-6 py-24 lg:gap-9 lg:px-20 lg:py-32">
        <p className="eyebrow eyebrow-dark">O primeiro passo</p>
        <h2 className="max-w-[18ch] text-areia-50 lg:text-[4.5rem]">{titulo}</h2>
        <p className="max-w-[38rem] text-lg leading-relaxed text-areia-200">{texto}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonExternal href={CLINICA.quizUrl} variant="inverse">
            Responder o quiz
          </ButtonExternal>
          {whats && (
            <ButtonExternal href={whats} variant="outlineInverse">
              Falar no WhatsApp
            </ButtonExternal>
          )}
        </div>
      </div>
    </section>
  );
}
