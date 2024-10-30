import { db } from '@/db'
import { users, profiles, commodities, states } from '@/db/schema'

const hash = await Bun.password.hash('password')

async function seed() {
  const admin = await db.insert(users).values([
    { 
      fullname: 'Admin', 
      username: 'admin', 
      email: 'agrocomm@agrocomm.com.br', 
      password: hash,
      // role: 'superadmin', 
    }
  ])
  .onConflictDoNothing()
  .returning()

  if (admin.length > 0) await db.insert(profiles).values({ userId: admin[0].id, bio: 'Admin' })

  await db.insert(commodities).values([
    { name: 'Arroba do Boi', slug: 'boi' },
    { name: 'Arroba da Vaca', slug: 'vaca' },
    { name: 'Saca de Milho', slug: 'milho' },
    { name: 'Saca de Soja', slug: 'soja' }
  ]).onConflictDoNothing()

  await db.insert(states).values([
    { name: 'Acre', abbr: 'AC'},
    { name: 'Alagoas', abbr: 'AL'},
    { name: 'Amapá', abbr: 'AP'},
    { name: 'Amazonas', abbr: 'AM'},
    { name: 'Bahia', abbr: 'BA'},
    { name: 'Ceará', abbr: 'CE'},
    { name: 'Distrito Federal', abbr: 'DF'},
    { name: 'Espírito Santo', abbr: 'ES'},
    { name: 'Goiás', abbr: 'GO'},
    { name: 'Maranhão', abbr: 'MA'},
    { name: 'Mato Grosso', abbr: 'MT'},
    { name: 'Mato Grosso do Sul', abbr: 'MS'},
    { name: 'Minas Gerais', abbr: 'MG'},
    { name: 'Pará', abbr: 'PA'},
    { name: 'Paraíba', abbr: 'PB'},
    { name: 'Paraná', abbr: 'PR'},
    { name: 'Pernambuco', abbr: 'PE'},
    { name: 'Piauí', abbr: 'PI'},
    { name: 'Rio de Janeiro', abbr: 'RJ'},
    { name: 'Rio Grande do Norte', abbr: 'RN'},
    { name: 'Rio Grande do Sul', abbr: 'RS'},
    { name: 'Rondônia', abbr: 'RO'},
    { name: 'Roraima', abbr: 'RR'},
    { name: 'Santa Catarina', abbr: 'SC'},
    { name: 'São Paulo', abbr: 'SP'},
    { name: 'Sergipe', abbr: 'SE'},
    { name: 'Tocantins', abbr: 'TO'}
  ]).onConflictDoNothing()
}

seed()
  .then(() => {
    console.log('🌱 Seeding complete.')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(0)
  })