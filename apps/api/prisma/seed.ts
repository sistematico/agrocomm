import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const password = "passwd";
const hash = await Bun.password.hash(password);
const estados = [
  { nome: 'Acre', uf: 'AC' },                // 1
  { nome: 'Alagoas', uf: 'AL' },             // 2
  { nome: 'Amapá', uf: 'AP' },               // 3
  { nome: 'Amazonas', uf: 'AM' },            // 4
  { nome: 'Bahia', uf: 'BA' },               // 5
  { nome: 'Ceará', uf: 'CE' },               // 6 
  { nome: 'Distrito Federal', uf: 'DF' },    // 7
  { nome: 'Espírito Santo', uf: 'ES' },      // 8
  { nome: 'Goiás', uf: 'GO' },               // 9
  { nome: 'Maranhão', uf: 'MA' },            // 10
  { nome: 'Mato Grosso', uf: 'MT' },         // 11
  { nome: 'Mato Grosso do Sul', uf: 'MS' },  // 12
  { nome: 'Minas Gerais', uf: 'MG' },        // 13
  { nome: 'Pará', uf: 'PA' },                // 14
  { nome: 'Paraíba', uf: 'PB' },             // 15
  { nome: 'Paraná', uf: 'PR' },              // 16
  { nome: 'Pernambuco', uf: 'PE' },          // 17
  { nome: 'Piauí', uf: 'PI' },               // 18
  { nome: 'Rio de Janeiro', uf: 'RJ' },      // 19
  { nome: 'Rio Grande do Norte', uf: 'RN' }, // 20
  { nome: 'Rio Grande do Sul', uf: 'RS' },   // 21
  { nome: 'Rondônia', uf: 'RO' },            // 22
  { nome: 'Roraima', uf: 'RR' },             // 23
  { nome: 'Santa Catarina', uf: 'SC' },      // 24
  { nome: 'São Paulo', uf: 'SP' },           // 25
  { nome: 'Sergipe', uf: 'SE' },             // 26
  { nome: 'Tocantins', uf: 'TO' },           // 27
  { nome: 'Brasil', uf: 'BR' }               // 28
]

// Inserir commodities rurais
const mercadorias = [
  'Arroba da Vaca', // 0
  'Arroba do Boi',  // 1
  'Novilho',        // 2
  'Novilha',        // 3
  'Bezerro',        // 4
  'Bezerra',        // 5
  'Soja',           // 6
  'Milho',          // 7
  'Feijão',         // 8
  'Café',           // 9
  'Leite',          // 10
  'Eucalipto'       // 11
];

for (const estado of estados) {
  await prisma.estado.upsert({
      where: { uf: estado.uf },
      update: {},
      create: estado
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
