import { scrapePecuaria } from "@/scrape/scrape.service";
import { db, ultimaDataUtil } from "@/utils";
import { Commodities } from "@/constants";

export async function vacaService() {
  const url = "https://www.scotconsultoria.com.br/cotacoes/vaca-gorda/?ref=smnb";
  const content = "div.conteudo_centro:nth-child(4) > table:nth-child(3) > tbody:nth-child(2) tr";
  const dateDiv = "div.conteudo_centro:nth-child(4) > table:nth-child(3) > thead:nth-child(1) > tr:nth-child(1) > th:nth-child(1)";  
  
  const diaUtil = await ultimaDataUtil(Commodities.Vaca);

  const existeData = await db.cotacao.findMany({
    where: { data: diaUtil, commodity: Commodities.Vaca },
    orderBy: [ { estado: 'asc' }, { cidades: { nome: 'asc' } } ],
    include: { cidades: true }
  })

  if (existeData && existeData.length > 0) return { cotacoes: existeData }; 

  const cotacoes = await scrapePecuaria(url, Commodities.Vaca, content, dateDiv);
  if (cotacoes) {
    await db.cotacao.createMany({ data: cotacoes });
    return { cotacoes }; 
  }

  return null;
}