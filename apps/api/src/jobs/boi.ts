import { db } from "@/utils";
import { boi } from "@/scrape/scrape.services";

const cotacao = await boi()

await db.cotacao.createMany({ data: cotacao });

db.$disconnect();

process.exit(0);