import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const password = "passwd";
const hash = await Bun.password.hash(password);
const ufs = [
  { nome: 'Acre', sigla: 'AC' },                // 1
  { nome: 'Alagoas', sigla: 'AL' },             // 2
  { nome: 'Amapá', sigla: 'AP' },               // 3
  { nome: 'Amazonas', sigla: 'AM' },            // 4
  { nome: 'Bahia', sigla: 'BA' },               // 5
  { nome: 'Ceará', sigla: 'CE' },               // 6 
  { nome: 'Distrito Federal', sigla: 'DF' },    // 7
  { nome: 'Espírito Santo', sigla: 'ES' },      // 8
  { nome: 'Goiás', sigla: 'GO' },               // 9
  { nome: 'Maranhão', sigla: 'MA' },            // 10
  { nome: 'Mato Grosso', sigla: 'MT' },         // 11
  { nome: 'Mato Grosso do Sul', sigla: 'MS' },  // 12
  { nome: 'Minas Gerais', sigla: 'MG' },        // 13
  { nome: 'Pará', sigla: 'PA' },                // 14
  { nome: 'Paraíba', sigla: 'PB' },             // 15
  { nome: 'Paraná', sigla: 'PR' },              // 16
  { nome: 'Pernambuco', sigla: 'PE' },          // 17
  { nome: 'Piauí', sigla: 'PI' },               // 18
  { nome: 'Rio de Janeiro', sigla: 'RJ' },      // 19
  { nome: 'Rio Grande do Norte', sigla: 'RN' }, // 20
  { nome: 'Rio Grande do Sul', sigla: 'RS' },   // 21
  { nome: 'Rondônia', sigla: 'RO' },            // 22
  { nome: 'Roraima', sigla: 'RR' },             // 23
  { nome: 'Santa Catarina', sigla: 'SC' },      // 24
  { nome: 'São Paulo', sigla: 'SP' },           // 25
  { nome: 'Sergipe', sigla: 'SE' },             // 26
  { nome: 'Tocantins', sigla: 'TO' },           // 27
  { nome: 'Brasil', sigla: 'BR' }               // 28
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

for (const uf of ufs) {
  await prisma.estado.upsert({
      where: { sigla: uf.sigla },
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
