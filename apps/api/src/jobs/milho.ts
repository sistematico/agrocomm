import { db } from "@/utils";
import { milhoService } from "@/cotacoes/milho.service";

const cotacao = await milhoService();

if (cotacao) {
  await db.cotacao.createMany({ data: cotacao.cotacoes, skipDuplicates: true });
  db.$disconnect();
}

process.exit(0);