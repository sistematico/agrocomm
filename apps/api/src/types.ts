export interface Cotacao {
  data: Date;
  preco: number;
  commodityId: number;
  cidade: string;
  estado: string;
}

export interface Localizacao {
  estado: string;
  cidade?: string;
}

export type EstadoBrasileiro = {
  nome: string;
  sigla: string;
  ddd: number[];
}

export type Feriados = {
  date: string;
  name: string;
  image?: string;
}