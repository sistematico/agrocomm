import { db } from '@/schema'
import * as schema from '@/schema/schema'

const hash = await Bun.password.hash('password')

await db.insert(schema.users).values([
  { 
    username: "admin", 
    email: "agrocomm@agrocomm.com.br", 
    name: "Admin", 
    role: "admin", 
    password: hash,
    profile: 1
  }
]).onConflictDoNothing()

await db.insert(schema.plans).values([
  { name: "free" },
  { name: "bronze" },
  { name: "silver" },
  { name: "gold" }
]).onConflictDoNothing()

await db.insert(schema.commodities).values([
  { name: "Arroba do Boi" },
  { name: "Arroba da Vaca" },
  { name: "Saca de Milho" },
  { name: "Saca de Soja" }
]).onConflictDoNothing()

await db.insert(schema.states).values([
  { name: "Acre", abbr: "AC"},
  { name: "Alagoas", abbr: "AL"},
  { name: "Amapá", abbr: "AP"},
  { name: "Amazonas", abbr: "AM"},
  { name: "Bahia", abbr: "BA"},
  { name: "Ceará", abbr: "CE"},
  { name: "Distrito Federal", abbr: "DF"},
  { name: "Espírito Santo", abbr: "ES"},
  { name: "Goiás", abbr: "GO"},
  { name: "Maranhão", abbr: "MA"},
  { name: "Mato Grosso", abbr: "MT"},
  { name: "Mato Grosso do Sul", abbr: "MS"},
  { name: "Minas Gerais", abbr: "MG"},
  { name: "Pará", abbr: "PA"},
  { name: "Paraíba", abbr: "PB"},
  { name: "Paraná", abbr: "PR"},
  { name: "Pernambuco", abbr: "PE"},
  { name: "Piauí", abbr: "PI"},
  { name: "Rio de Janeiro", abbr: "RJ"},
  { name: "Rio Grande do Norte", abbr: "RN"},
  { name: "Rio Grande do Sul", abbr: "RS"},
  { name: "Rondônia", abbr: "RO"},
  { name: "Roraima", abbr: "RR"},
  { name: "Santa Catarina", abbr: "SC"},
  { name: "São Paulo", abbr: "SP"},
  { name: "Sergipe", abbr: "SE"},
  { name: "Tocantins", abbr: "TO"}
]).onConflictDoNothing()

console.log(`Seeding complete.`)

export function movies(movies: any) {
  throw new Error('Function not implemented.')
}
