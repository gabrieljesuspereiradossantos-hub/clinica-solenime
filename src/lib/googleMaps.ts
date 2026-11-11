/**
 * Carrega a Maps JavaScript API uma única vez, sob demanda.
 * A chave é pública por natureza (vai para o navegador): restrinja-a no Google Cloud
 * por referenciador HTTP (domínio do site + localhost) e só às APIs "Maps JavaScript API" e "Places API (New)".
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    google?: any;
    __solenimeMapsReady?: () => void;
  }
}

let carregando: Promise<any> | null = null;

export function carregarGoogleMaps(chave: string): Promise<any> {
  if (window.google?.maps?.importLibrary) return Promise.resolve(window.google);
  if (carregando) return carregando;

  carregando = new Promise((resolve, reject) => {
    window.__solenimeMapsReady = () => resolve(window.google);
    const s = document.createElement("script");
    const params = new URLSearchParams({
      key: chave,
      v: "weekly",
      loading: "async",
      language: "pt-BR",
      region: "BR",
      callback: "__solenimeMapsReady",
    });
    s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    s.async = true;
    s.onerror = () => {
      carregando = null;
      reject(new Error("Não foi possível carregar a Maps JavaScript API"));
    };
    document.head.appendChild(s);
  });
  return carregando;
}
