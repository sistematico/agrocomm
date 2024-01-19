export interface Cotacao {
  data: Date;
  preco: number;
  commodityId: number;
  cidadeId: number;
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