// Fotos enviadas pela Clínica Solenime em 10/11/2026 (uso de imagem das pessoas fotografadas autorizado pela clínica).
// Geradas por scripts/otimizar-fotos.mjs em AVIF, WebP e JPEG, larguras 800 e 1600.
// A recepção (hero) fica em public/fotos com URL fixa, para o preload no index.html.

export interface FonteFoto {
  /** srcset de cada formato ("url 800w, url 1600w") */
  avif: string;
  webp: string;
  jpg: string;
  /** JPEG de 1600px, para navegadores sem srcset */
  src: string;
  alt: string;
}

const arquivos = import.meta.glob("../assets/fotos/*.{avif,webp,jpg}", { eager: true, import: "default" }) as Record<
  string,
  string
>;

export function fontes(nome: string, alt: string): FonteFoto {
  const url = (largura: number, ext: string) => {
    const u = arquivos[`../assets/fotos/${nome}-${largura}.${ext}`];
    if (!u) throw new Error(`Foto não encontrada: ${nome}-${largura}.${ext} (rode scripts/otimizar-fotos.mjs)`);
    return u;
  };
  const set = (ext: string) => `${url(800, ext)} 800w, ${url(1600, ext)} 1600w`;
  return { avif: set("avif"), webp: set("webp"), jpg: set("jpg"), src: url(1600, "jpg"), alt };
}

function publica(nome: string, alt: string): FonteFoto {
  const set = (ext: string) => `/fotos/${nome}-800.${ext} 800w, /fotos/${nome}-1600.${ext} 1600w`;
  return { avif: set("avif"), webp: set("webp"), jpg: set("jpg"), src: `/fotos/${nome}-1600.jpg`, alt };
}

export const FOTOS = {
  recepcao: publica("recepcao", "Recepção da Clínica Solenime, com painel de madeira iluminado e o letreiro dourado na parede"),
  retrato: fontes("retrato", "Mulher sorrindo, sentada na recepção da Clínica Solenime"),
  salaDeEspera: fontes("sala-de-espera", "Sala de espera com sofá claro, poltrona verde e mesa com orquídeas"),
  atendimento: fontes("atendimento", "Profissional atendendo uma paciente na sala de procedimentos"),
  recepcaoNoite: fontes("recepcao-noite", "Balcão da recepção iluminado, com orquídeas e o letreiro da Clínica Solenime"),
};
