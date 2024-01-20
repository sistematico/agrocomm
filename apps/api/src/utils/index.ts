import { PrismaClient } from "@prisma/client";
import type { Localizacao, Feriados } from "@/types";

export const db = new PrismaClient();

export async function loadUrl(url: string) {
  const data = await fetch(url)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const decoder = new TextDecoder("iso-8859-1" as any);
      return decoder.decode(buffer);
    });

  return data;
}

export function limparCidadeEstado(entrada: string): Localizacao | null {
  const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  const palavras = entrada.split(/\s+/); // Separa a entrada em palavras
  if (palavras.length === 0) return null;

  const estado = palavras[0].toUpperCase();
  if (!estados.includes(estado)) return null; // Verifica se a sigla do estado é válida

  const cidade = palavras.slice(1).join(' ') || 'Nenhuma'; // Junta o restante das palavras como nome da cidade
  return { estado, cidade };
}

export async function getOrCreateCity(nome: string, estado: string) {
  if (!nome || nome === "Nenhuma") return null; // Retorna null para nomes de cidades inválidos

  try {
    let estadoDb = await db.estado.findUnique({ where: { sigla: estado } });
    if (!estadoDb) {
      estadoDb = await db.estado.create({ data: { nome: estado, sigla: estado } });
    }

    let city = await db.cidade.findFirst({ where: { nome, estado: estadoDb.sigla } });
    if (!city) {
      city = await db.cidade.create({ data: { nome, estado: estadoDb.sigla } });
    }

    await db.$disconnect();

    return city.nome;

  } catch (error) {
    await db.$disconnect();
    console.error("Erro ao criar ou obter cidade:", error);
    return null; // Retorna null em caso de erro
  }
}

export function extractDateFromString(str: string): Date | null {
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
  const match = str.match(regex);

  if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // Mês em JavaScript é 0-indexado
      const year = parseInt(match[3], 10);

      // return new Date(year, month, day);
      const utcDate = new Date(year, month, day).toISOString();

      console.log("UTC:", utcDate, "Local:", new Date(year, month, day))

      return new Date(utcDate);
  }

  return null;
}

export async function ultimaDataUtil(commodity: number) {
  const path = import.meta.dir + "/../json/feriados.json";
  const file = Bun.file(path);
  const { feriados } = await file.json();
  let dataAtual = new Date();

  while (true) {
    const dataFormatada = `${dataAtual.getFullYear()}-${(dataAtual.getMonth() + 1).toString().padStart(2, '0')}-${dataAtual.getDate().toString().padStart(2, '0')}`;
    const dataFeriado = new Date(dataFormatada);

    if (dataAtual.getDay() >= 1 && dataAtual.getDay() <= 5 && feriados.filter((feriado: Feriados) => feriado.date === dataFormatada).length === 0) return dataFeriado; 

    dataAtual.setDate(dataAtual.getDate() - 1);
  }
}