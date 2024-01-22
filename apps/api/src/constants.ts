import type { EstadoBrasileiro } from "@/types";

export enum Commodities {
  Vaca,           // 0
  Boi,            // 1
  Novilho,        // 2
  Novilha,        // 3
  Bezerro,        // 4
  Bezerra,        // 5
  Soja,           // 6
  Milho,          // 7
  Feijão,         // 8
  Café,           // 9
  Leite,          // 10
  Eucalipto,      // 11
};

export const estadosBrasileiros: EstadoBrasileiro[] = [
  { nome: "Acre", uf: "AC", ddd: [68]},
  { nome: "Alagoas", uf: "AL", ddd: [82]},
  { nome: "Amapá", uf: "AP", ddd: [96]},
  { nome: "Amazonas", uf: "AM", ddd: [92, 97]},
  { nome: "Bahia", uf: "BA", ddd: [71, 73, 74, 75, 77]},
  { nome: "Ceará", uf: "CE", ddd: [85, 88]},
  { nome: "Distrito Federal",uf: "DF", ddd: [61]},
  { nome: "Espírito Santo",uf: "ES", ddd: [27, 28]},
  { nome: "Goiás", uf: "GO", ddd: [62, 64]},
  { nome: "Maranhão", uf: "MA", ddd: [98, 99]},
  { nome: "Mato Grosso",uf: "MT", ddd: [65, 66]},
  { nome: "Mato Grosso do Sul", uf: "MS", ddd: [67]},
  { nome: "Minas Gerais", uf: "MG", ddd: [31, 32, 33, 34, 35, 37, 38]},
  { nome: "Pará", uf: "PA", ddd: [91, 93, 94]},
  { nome: "Paraíba", uf: "PB", ddd: [83]},
  { nome: "Paraná", uf: "PR", ddd: [41, 42, 43, 44, 45, 46]},
  { nome: "Pernambuco", uf: "PE", ddd: [81, 87]},
  { nome: "Piauí", uf: "PI", ddd: [86, 89]},
  { nome: "Rio de Janeiro", uf: "RJ", ddd: [21, 22, 24]},
  { nome: "Rio Grande do Norte", uf: "RN", ddd: [84]},
  { nome: "Rio Grande do Sul", uf: "RS", ddd: [51, 53, 54, 55]},
  { nome: "Rondônia", uf: "RO", ddd: [69]},
  { nome: "Roraima", uf: "RR", ddd: [95]},
  { nome: "Santa Catarina",uf: "SC", ddd: [47, 48, 49]},
  { nome: "São Paulo",uf: "SP", ddd: [11, 12, 13, 14, 15, 16, 17, 18, 19]},
  { nome: "Sergipe", uf: "SE", ddd: [79]},
  { nome: "Tocantins", uf: "TO", ddd: [63]}
];

// type ServicoProvedorURLMap = {
//   [key: string]: string;
// };

// const servicoProvedorURL: ServicoProvedorURLMap = {
//   "Boi-Scot": "https://www.google.com",
//   // Adicione outras combinações de serviço-provedor aqui
// };

// // Função para obter a URL com base no serviço e provedor
// function getUrl(servico: string, provedor: string): string | undefined {
//   return servicoProvedorURL[`${servico}-${provedor}`];
// }

// // Uso
// const url = getUrl("Boi", "Scot");

export enum Servico {
  BOI = "BOI",
  VACA = "VACA",
  GRAOS = "GRAOS",
}

export enum Provedor {
  SCOT = "SCOT",
}

const servicoProvedorURL = new Map<string, string>();
servicoProvedorURL.set(`${Servico.BOI}-${Provedor.SCOT}`, "https://www.scotconsultoria.com.br/cotacoes/boi-gordo/?ref=smnb");
servicoProvedorURL.set(`${Servico.VACA}-${Provedor.SCOT}`, "https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smn");
servicoProvedorURL.set(`${Servico.GRAOS}-${Provedor.SCOT}`, "https://www.scotconsultoria.com.br/cotacoes/graos/?ref=smnb");

export function getUrl(servico: Servico, provedor: Provedor): string | undefined {
  return servicoProvedorURL.get(`${servico}-${provedor}`);
}

// const url = getUrl(Servico.BOI, Provedor.SCOT);

