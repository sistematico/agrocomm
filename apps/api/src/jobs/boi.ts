import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const file = Bun.file("log.txt");
// const writer = file.writer();
// writer.write(new Date() + " run");
// writer.flush();

// model Cotacao {
//   id          Int       @id @default(autoincrement())
//   data        DateTime  @db.Date
//   preco       Int?
//   commodity   Commodity @relation(fields: [commodityId], references: [id])
//   estado      Estado    @relation(fields: [estadoId], references: [id])
//   cidade      Cidade    @relation(fields: [cidadeId], references: [id])
//   commodityId Int
//   estadoId    Int
//   cidadeId    Int
// }

// const preco = Math.floor(Math.random() * (max - min + 1) + min)
const preco = Math.floor(Math.random() * (1000 - 100 + 1) + 100)

await prisma.cotacao.create({
  data: {
    data: new Date(),
    preco,
    commodityId: 1,
    estadoId: 1,
    cidadeId: 1
  },
});