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
  { nome: "Acre", sigla: "AC", ddd: [68]},
  { nome: "Alagoas", sigla: "AL", ddd: [82]},
  { nome: "Amapá", sigla: "AP", ddd: [96]},
  { nome: "Amazonas", sigla: "AM", ddd: [92, 97]},
  { nome: "Bahia", sigla: "BA", ddd: [71, 73, 74, 75, 77]},
  { nome: "Ceará", sigla: "CE", ddd: [85, 88]},
  { nome: "Distrito Federal",sigla: "DF", ddd: [61]},
  { nome: "Espírito Santo",sigla: "ES", ddd: [27, 28]},
  { nome: "Goiás", sigla: "GO", ddd: [62, 64]},
  { nome: "Maranhão", sigla: "MA", ddd: [98, 99]},
  { nome: "Mato Grosso",sigla: "MT", ddd: [65, 66]},
  { nome: "Mato Grosso do Sul", sigla: "MS", ddd: [67]},
  { nome: "Minas Gerais", sigla: "MG", ddd: [31, 32, 33, 34, 35, 37, 38]},
  { nome: "Pará", sigla: "PA", ddd: [91, 93, 94]},
  { nome: "Paraíba", sigla: "PB", ddd: [83]},
  { nome: "Paraná", sigla: "PR", ddd: [41, 42, 43, 44, 45, 46]},
  { nome: "Pernambuco", sigla: "PE", ddd: [81, 87]},
  { nome: "Piauí", sigla: "PI", ddd: [86, 89]},
  { nome: "Rio de Janeiro", sigla: "RJ", ddd: [21, 22, 24]},
  { nome: "Rio Grande do Norte", sigla: "RN", ddd: [84]},
  { nome: "Rio Grande do Sul", sigla: "RS", ddd: [51, 53, 54, 55]},
  { nome: "Rondônia", sigla: "RO", ddd: [69]},
  { nome: "Roraima", sigla: "RR", ddd: [95]},
  { nome: "Santa Catarina",sigla: "SC", ddd: [47, 48, 49]},
  { nome: "São Paulo",sigla: "SP", ddd: [11, 12, 13, 14, 15, 16, 17, 18, 19]},
  { nome: "Sergipe", sigla: "SE", ddd: [79]},
  { nome: "Tocantins", sigla: "TO", ddd: [63]}
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

