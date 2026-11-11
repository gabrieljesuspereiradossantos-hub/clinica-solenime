/**
 * Catálogo de procedimentos.
 * Itens vindos de fontes públicas NÃO são confirmados.
 * Só marque `confirmado: true` depois que a clínica validar nome, descrição e indicação.
 * Itens não confirmados não aparecem no site.
 */

export type Categoria = "tratamentos-faciais" | "rejuvenescimento" | "harmonizacao-facial" | "tratamentos-corporais";

export interface Procedimento {
  slug: string;
  nome: string;
  categoria: Categoria;
  descricao: string;
  indicacao: string;
  confirmado: boolean;
}

export const CATEGORIAS: Record<Categoria, string> = {
  "tratamentos-faciais": "Tratamentos faciais",
  rejuvenescimento: "Rejuvenescimento",
  "harmonizacao-facial": "Harmonização facial",
  "tratamentos-corporais": "Tratamentos corporais",
};

export const PROCEDIMENTOS: Procedimento[] = [
  {
    slug: "limpeza-de-pele",
    nome: "Limpeza de pele",
    categoria: "tratamentos-faciais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "dermaplaning",
    nome: "Dermaplaning",
    categoria: "tratamentos-faciais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "microdermoabrasao",
    nome: "Microdermoabrasão",
    categoria: "tratamentos-faciais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "peeling-quimico",
    nome: "Peeling químico",
    categoria: "rejuvenescimento",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "extracao-facial",
    nome: "Extração facial",
    categoria: "tratamentos-faciais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "tratamento-acne",
    nome: "Tratamento para acne",
    categoria: "tratamentos-faciais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "preenchimento-labial",
    nome: "Preenchimento labial",
    categoria: "harmonizacao-facial",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
  {
    slug: "tratamento-celulite",
    nome: "Tratamento para celulite",
    categoria: "tratamentos-corporais",
    descricao: "PENDENTE: descrição validada pela clínica.",
    indicacao: "PENDENTE: indicação validada pela clínica.",
    confirmado: false,
  },
];

export const procedimentosConfirmados = () => PROCEDIMENTOS.filter((p) => p.confirmado);
