import { drizzle } from 'drizzle-orm/node-postgres'
// import { eq } from 'drizzle-orm'
import {
  users,
  commodities,
  regions,
  prices,
  priceUpdates,
  priceAlerts,
  commodityTypeEnum,
  unitEnum
} from './schema'



const db = drizzle(process.env.DATABASE_URL!)

async function main() {
  console.log(
    'Iniciando seed de dados para o sistema de cotações agropecuárias...'
  )

  // Criando usuário administrador
  const admin: typeof users.$inferInsert = {
    name: 'Admin',
    age: 35,
    email: 'admin@agrocotacoes.com',
    password: 'senhaSegura123', // Em produção, usar hash
    role: 'admin'
  }

  // Criando usuário comum
  const user: typeof users.$inferInsert = {
    name: 'João Silva',
    age: 30,
    email: 'joao@exemplo.com',
    password: 'senha123', // Em produção, usar hash
    role: 'user'
  }

  // Inserindo usuários
  await db.insert(users).values([admin, user])
  console.log('Usuários criados!')

  // Obtendo lista de usuários
  const userList = await db.select().from(users)
  console.log('Usuários no banco de dados: ', userList)

  enum CommodityType {
    SOJA = 'SOJA',
    MILHO = 'MILHO',
    BOI = 'BOI',
    VACA = 'VACA',
    BEZERRO = 'BEZERRO',
    BEZERRA = 'BEZERRA'
  }

  // enum Unit {
  //   SACA_60KG = 'SACA_60KG',
  //   ARROBA = 'ARROBA',
  //   UNIDADE = 'UNIDADE'
  // }




  type Commodity = {
    name: string
    // type: CommodityType
    type: string
    // unit: Unit
    unit: string
    description: string
  }


  // Inserindo commodities
  const commodityValues: Commodity[] = [
    {
      name: 'Saca de Soja',
      type: 'SOJA',
      unit: 'SACA_60KG',
      description: 'Preço da saca de soja de 60kg'
    },
    {
      name: 'Saca de Milho',
      type: 'MILHO',
      unit: 'SACA_60KG',
      description: 'Preço da saca de milho de 60kg'
    },
    {
      name: 'Arroba do Boi',
      type: 'BOI',
      unit: 'ARROBA',
      description: 'Preço da arroba do boi'
    },
    {
      name: 'Arroba da Vaca',
      type: 'VACA',
      unit: 'ARROBA',
      description: 'Preço da arroba da vaca'
    },
    {
      name: 'Bezerro',
      type: 'BEZERRO',
      unit: 'UNIDADE',
      description: 'Preço unitário do bezerro'
    },
    {
      name: 'Bezerra',
      type: 'BEZERRA',
      unit: 'UNIDADE',
      description: 'Preço unitário da bezerra'
    }
  ]

  await db.insert(commodities).values(commodityValues)
  console.log('Commodities inseridas!')

  // Obtendo commodities do banco
  const commodityList = await db.select().from(commodities)
  console.log('Commodities no banco de dados: ', commodityList)

  // Inserindo regiões
  const regionValues = [
    { name: 'Norte Mato Grosso', state: 'MT', city: 'Sinop' },
    { name: 'Oeste Bahia', state: 'BA', city: 'Barreiras' },
    { name: 'Triângulo Mineiro', state: 'MG', city: 'Uberaba' },
    { name: 'Noroeste Paraná', state: 'PR', city: 'Maringá' },
    { name: 'Centro-Oeste Goiás', state: 'GO', city: 'Rio Verde' }
  ]

  await db.insert(regions).values(regionValues)
  console.log('Regiões inseridas!')

  // Obtendo regiões do banco
  const regionList = await db.select().from(regions)
  console.log('Regiões no banco de dados: ', regionList)

  console.log('Seed de dados concluído com sucesso!')
}

main().catch((e) => {
  console.error('Erro durante o seed:', e)
  process.exit(1)
})
