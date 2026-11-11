import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CLINICA, whatsappLink } from "../config";
import { ButtonExternal } from "./Button";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Início", end: true },
  { to: "/protocolo-sole", label: "Protocolo Sole" },
  { to: "/procedimentos", label: "Procedimentos" },
  { to: "/sobre", label: "A clínica" },
  { to: "/contato", label: "Contato" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const { pathname } = useLocation();
  const whats = whatsappLink();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // a barra fixa do mobile só aparece depois que a primeira tela saiu de vista
      setShowBar(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-areia-50 focus:px-4 focus:py-2"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color] duration-300 ${
          scrolled || open ? "border-b border-areia-200 bg-areia-50/90 backdrop-blur-md" : "border-b border-transparent bg-areia-50/0"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-page items-center justify-between px-6 lg:h-[88px] lg:px-20">
          <Link to="/" aria-label="Clínica Solenime, página inicial">
            <Logo />
          </Link>

          <nav className="hidden lg:block" aria-label="Principal">
            <ul className="flex items-center gap-9 text-[0.95rem] font-medium text-cacau-700">
              {links.slice(1).map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="nav-link transition-colors hover:text-cacau-800">
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden lg:block">
            <ButtonExternal href={CLINICA.quizUrl}>Responder o quiz</ButtonExternal>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[4px] text-cacau-800 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {/* duas barras que giram até virar um X (em vez de trocar de ícone) */}
            <span className="menu-icone" data-open={open} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>

        <nav id="menu-mobile" aria-label="Menu mobile" hidden={!open} className="h-[calc(100dvh-72px)] overflow-y-auto bg-areia-50 lg:hidden">
          <ul className="flex flex-col px-6 pt-4">
            {links.map((l, i) => (
              <li key={l.to} className="menu-item" style={{ "--i": i } as CSSProperties}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  className="flex min-h-[64px] items-center border-b border-areia-200 font-serif text-3xl text-cacau-800"
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="menu-item px-6 py-8" style={{ "--i": links.length } as CSSProperties}>
            <ButtonExternal href={CLINICA.quizUrl} className="w-full">
              Responder o quiz
            </ButtonExternal>
          </div>
        </nav>
      </header>

      <main id="conteudo" className="flex-1">
        {children}
      </main>

      {/* todas as páginas terminam com espaço próprio (faixa do quiz ou padding), então o rodapé encosta */}
      <footer className="bg-areia-100">
        <div className="mx-auto grid max-w-page gap-10 px-6 pb-12 pt-16 md:grid-cols-2 md:gap-16 lg:grid-cols-[1fr_auto_auto_auto] lg:gap-20 lg:px-20 lg:pt-[72px]">
          <div>
            <Logo />
            <p className="mt-4 max-w-[340px] text-sm leading-relaxed text-cacau-700">
              Rejuvenescimento facial com naturalidade, em {CLINICA.cidade}.
            </p>
          </div>

          <address className="not-italic text-[0.95rem] text-cacau-700 lg:order-last">
            <p className="text-[0.8rem] font-semibold text-grafite">Visite</p>
            <p className="mt-3 leading-relaxed">
              {CLINICA.enderecoLinhas.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
            <ul className="mt-1">
              <li>
                <a href={CLINICA.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center hover:text-cacau-800 md:min-h-[36px]">
                  Como chegar
                </a>
              </li>
              {whats && (
                <li>
                  <a href={whats} target="_blank" rel="noopener noreferrer" className="flex min-h-[44px] items-center hover:text-cacau-800 md:min-h-[36px]">
                    WhatsApp {CLINICA.whatsappExibicao}
                  </a>
                </li>
              )}
            </ul>
          </address>

          <div className="text-[0.95rem] text-cacau-700">
            <p className="text-[0.8rem] font-semibold text-grafite">Navegação</p>
            <ul className="mt-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="flex min-h-[44px] items-center hover:text-cacau-800 md:min-h-[36px]">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-[0.95rem] text-cacau-700">
            <p className="text-[0.8rem] font-semibold text-grafite">Siga</p>
            <ul className="mt-2">
              <li>
                <a
                  href={CLINICA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[44px] items-center hover:text-cacau-800 md:min-h-[36px]"
                >
                  Instagram {CLINICA.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto max-w-page px-6 lg:px-20">
          <p className="border-t border-areia-300 pb-28 pt-6 text-xs leading-relaxed text-cacau-600 lg:pb-10">
            © {new Date().getFullYear()} Clínica Solenime. Os resultados variam de pessoa para pessoa. As informações deste site não substituem a avaliação individual.
          </p>
        </div>
      </footer>

      {/* Barra fixa de ação (mobile) */}
      <div
        className="action-bar fixed inset-x-0 bottom-0 z-30 border-t border-areia-300 bg-areia-50/95 px-6 py-3.5 backdrop-blur lg:hidden"
        data-show={showBar && !open}
      >
        <ButtonExternal href={CLINICA.quizUrl} className="w-full">
          Responder o quiz
        </ButtonExternal>
      </div>
    </div>
  );
}
