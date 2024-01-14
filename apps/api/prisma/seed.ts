import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const password = "passwd";
const hash = await Bun.password.hash(password);
const ufs = [
  { nome: 'Acre', acronimo: 'AC' },                // 1
  { nome: 'Alagoas', acronimo: 'AL' },             // 2
  { nome: 'Amapá', acronimo: 'AP' },               // 3
  { nome: 'Amazonas', acronimo: 'AM' },            // 4
  { nome: 'Bahia', acronimo: 'BA' },               // 5
  { nome: 'Ceará', acronimo: 'CE' },               // 6 
  { nome: 'Distrito Federal', acronimo: 'DF' },    // 7
  { nome: 'Espírito Santo', acronimo: 'ES' },      // 8
  { nome: 'Goiás', acronimo: 'GO' },               // 9
  { nome: 'Maranhão', acronimo: 'MA' },            // 10
  { nome: 'Mato Grosso', acronimo: 'MT' },         // 11
  { nome: 'Mato Grosso do Sul', acronimo: 'MS' },  // 12
  { nome: 'Minas Gerais', acronimo: 'MG' },        // 13
  { nome: 'Pará', acronimo: 'PA' },                // 14
  { nome: 'Paraíba', acronimo: 'PB' },             // 15
  { nome: 'Paraná', acronimo: 'PR' },              // 16
  { nome: 'Pernambuco', acronimo: 'PE' },          // 17
  { nome: 'Piauí', acronimo: 'PI' },               // 18
  { nome: 'Rio de Janeiro', acronimo: 'RJ' },      // 19
  { nome: 'Rio Grande do Norte', acronimo: 'RN' }, // 20
  { nome: 'Rio Grande do Sul', acronimo: 'RS' },   // 21
  { nome: 'Rondônia', acronimo: 'RO' },            // 22
  { nome: 'Roraima', acronimo: 'RR' },             // 23
  { nome: 'Santa Catarina', acronimo: 'SC' },      // 24
  { nome: 'São Paulo', acronimo: 'SP' },           // 25
  { nome: 'Sergipe', acronimo: 'SE' },             // 26
  { nome: 'Tocantins', acronimo: 'TO' },           // 27
  { nome: 'Brasil', acronimo: 'BR' }               // 28
]

// Inserir commodities rurais
const mercadorias = [
  'Arroba do Boi',  // 1
  'Arroba da Vaca', // 2
  'Novilho',        // 3
  'Novilha',        // 4
  'Bezerro',        // 5
  'Bezerra',        // 6
  'Soja',           // 7
  'Milho',          // 8
  'Feijão',         // 9
  'Café',           // 10
  'Leite',          // 11
  'Eucalipto'       // 12
];

for (const uf of ufs) {
  await prisma.estado.upsert({
      where: { acronimo: uf.acronimo },
      update: {},
      create: uf
  });
}

for (const mercadoria of mercadorias) {
  await prisma.commodity.upsert({
      where: { nome: mercadoria },
      update: {},
      create: { nome: mercadoria }
  });
}

await prisma.user.upsert({
  where: { id: 1 },
  update: {
    usuario: "agrocomm",
    email: "agrocomm@agrocomm.com.br",
    nome: "AgroComm",
    senha: hash,
    cargo: "SUPERADMIN",
  },
  create: {
    usuario: "agrocomm",
    email: "agrocomm@agrocomm.com.br",
    nome: "AgroComm",
    senha: hash,
    cargo: "SUPERADMIN",
  },
});

await prisma.$disconnect();
