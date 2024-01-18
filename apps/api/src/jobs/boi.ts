import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// const file = Bun.file("log.txt");
// const writer = file.writer();
// writer.write(new Date() + " run");
// writer.flush();

// const preco = Math.floor(Math.random() * (max - min + 1) + min)
const preco = Math.floor(Math.random() * (1000 - 100 + 1) + 100);


// Primeiro, criar ou conectar a uma cidade
const cidade = await prisma.cidade.upsert({
  where: { id: 1 },
  update: {},
  create: {
    nome: 'Campo Grande',
    estado: 'MS'
  }
});

// Depois, criar a cotação referenciando o ID da cidade e do estado
await prisma.cotacao.create({
  data: {
    data: new Date(),
    preco,
    commodityId: 1,  // Supondo que o commodity com ID 1 existe
    cidadeId: cidade.id,
    estado: cidade.estado, // Usando o estadoId da cidade criada/conectada
  },
});

prisma.$disconnect();

process.exit(0);