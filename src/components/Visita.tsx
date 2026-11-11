import { CLINICA, whatsappLink } from "../config";
import { ButtonExternal } from "./Button";

/**
 * Bloco de visita: endereço, WhatsApp e horário, com "Como chegar" e "Chamar no WhatsApp".
 * Usado na home (A clínica), em A clínica e em Contato. O horário só aparece quando estiver confirmado.
 */
export function Visita({ className = "", botoes = true }: { className?: string; botoes?: boolean }) {
  const whats = whatsappLink();

  return (
    <div className={className}>
      <dl className="grid gap-6 border-t border-areia-300 pt-6 sm:grid-cols-2">
        <div>
          <dt className="eyebrow">Endereço</dt>
          <dd className="mt-2 leading-relaxed text-cacau-800">
            {CLINICA.enderecoLinhas.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt className="eyebrow">WhatsApp</dt>
          <dd className="mt-2 text-cacau-800">
            {whats ? (
              <a href={whats} target="_blank" rel="noopener noreferrer" className="underline decoration-cacau-800/30 underline-offset-4 hover:decoration-cacau-800">
                {CLINICA.whatsappExibicao}
              </a>
            ) : (
              "A confirmar"
            )}
          </dd>
          {CLINICA.horarios && (
            <>
              <dt className="eyebrow mt-5">Horário</dt>
              <dd className="mt-2 text-cacau-800">{CLINICA.horarios}</dd>
            </>
          )}
        </div>
      </dl>

      {botoes && (
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&_a]:whitespace-nowrap">
          <ButtonExternal href={CLINICA.mapsUrl} variant="secondary">
            Como chegar
          </ButtonExternal>
          {whats && (
            <ButtonExternal href={whats} variant="secondary">
              Chamar no WhatsApp
            </ButtonExternal>
          )}
        </div>
      )}
    </div>
  );
}
