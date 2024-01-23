import { db } from "@/utils";
import { sojaService } from "@/cotacoes/soja.service";

const cotacao = await sojaService();

if (cotacao) {
  await db.cotacao.createMany({ data: cotacao.cotacoes, skipDuplicates: true });
  db.$disconnect();
}

process.exit(0);