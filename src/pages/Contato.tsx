import type { CSSProperties } from "react";
import { ButtonExternal } from "../components/Button";
import { Foto } from "../components/Foto";
import { Visita } from "../components/Visita";
import { CLINICA, whatsappLink } from "../config";
import { FOTOS } from "../data/fotos";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

const d = (i: number) => ({ "--i": i }) as CSSProperties;

export function Contato() {
  useDocumentMeta({
    title: "Contato | Clínica Solenime",
    description: `Fale com a Clínica Solenime pelo WhatsApp ${CLINICA.whatsappExibicao} ou agende a sua consulta do Protocolo Sole pelo quiz.`,
  });

  const whats = whatsappLink();

  return (
    <>
      <section className="mx-auto max-w-page px-6 pb-24 pt-10 lg:px-20 lg:pb-32 lg:pt-16">
        <p className="eyebrow enter" style={d(0)}>
          Contato
        </p>
        <h1 className="h1-pagina enter mt-6 max-w-[18ch]" style={d(1)}>
          Vamos conversar sobre o seu <em className="italic text-cacau-600">momento</em>.
        </h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          {/* Canais: o quiz primeiro (é o caminho para agendar) */}
          <ul className="enter divide-y divide-areia-300 border-y border-areia-300" style={d(2)}>
            <li className="py-8">
              <p className="eyebrow">Agendar</p>
              <h2 className="mt-3 text-[2rem]">Pelo quiz</h2>
              <p className="mt-3 max-w-[30rem] text-cacau-700">
                Responda as perguntas rápidas e, em seguida, a equipe entra em contato para combinar o horário.
              </p>
              <div className="mt-6">
                <ButtonExternal href={CLINICA.quizUrl}>Responder o quiz</ButtonExternal>
              </div>
            </li>
            <li className="py-8">
              <p className="eyebrow">WhatsApp</p>
              <h2 className="mt-3 text-[2rem]">{whats ? CLINICA.whatsappExibicao : "A confirmar"}</h2>
              <p className="mt-3 max-w-[30rem] text-cacau-700">Converse diretamente com a equipe.</p>
              {whats && (
                <div className="mt-6">
                  <ButtonExternal href={whats} variant="secondary">
                    Chamar no WhatsApp
                  </ButtonExternal>
                </div>
              )}
            </li>
            <li className="py-8">
              <p className="eyebrow">Instagram</p>
              <h2 className="mt-3 text-[2rem]">{CLINICA.instagramHandle}</h2>
              <p className="mt-3 max-w-[30rem] text-cacau-700">Acompanhe novidades e o dia a dia da clínica.</p>
              <div className="mt-2">
                <ButtonExternal href={CLINICA.instagram} variant="link">
                  Abrir o Instagram
                </ButtonExternal>
              </div>
            </li>
          </ul>

          {/* Visita */}
          <div>
            <Foto
              foto={FOTOS.recepcao}
              prioridade
              sizes="(min-width: 1024px) 50vw, 115vw"
              posicao="60% 45%"
              className="enter-photo aspect-[3/2] w-full"
            />
            <h2 className="mt-10 text-[2rem]">Visite a clínica</h2>
            <Visita className="mt-6" />
          </div>
        </div>
      </section>
    </>
  );
}
