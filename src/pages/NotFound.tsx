import { ButtonLink } from "../components/Button";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export function NotFound() {
  useDocumentMeta({ title: "Página não encontrada | Clínica Solenime" });

  return (
    <section className="mx-auto flex max-w-page flex-col items-start gap-8 px-6 pb-32 pt-16 lg:px-20 lg:pt-24">
      <p className="eyebrow">Erro 404</p>
      <h1 className="h1-pagina">Esta página não existe.</h1>
      <ButtonLink to="/">Voltar ao início</ButtonLink>
    </section>
  );
}
