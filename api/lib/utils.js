import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonDir = path.join(__dirname, '..', 'json')

const estados = [
  { 'AC': 'Acre' },
  { 'AL': 'Alagoas' },
  { 'AP': 'Amapá' },
  { 'AM': 'Amazonas' },
  { 'BA': 'Bahia' },
  { 'CE': 'Ceará' },
  { 'DF': 'Distrito Federal' },
  { 'ES': 'Espírito Santo' },
  { 'GO': 'Goías' },
  { 'MA': 'Maranhão' },
  { 'MT': 'Mato Grosso' },
  { 'MS': 'Mato Grosso do Sul' },
  { 'MG': 'Minas Gerais' },
  { 'PA': 'Pará' },
  { 'PB': 'Paraíba' },
  { 'PR': 'Paraná' },
  { 'PE': 'Pernambuco' },
  { 'PI': 'Piauí' },
  { 'RJ': 'Rio de Janeiro' },
  { 'RN': 'Rio Grande do Norte' },
  { 'RS': 'Rio Grande do Sul' },
  { 'RO': 'Rondônia' },
  { 'RR': 'Roraíma' },
  { 'SC': 'Santa Catarina' },
  { 'SP': 'São Paulo' },
  { 'SE': 'Sergipe' },
  { 'TO': 'Tocantins' },
]

function extractDate(str) {
  const meses = { 
    '01': 'janeiro', 
    '02': 'fevereiro', 
    '03': 'março', 
    '04': 'abril', 
    '05': 'maio', 
    '06': 'junho', 
    '07': 'julho', 
    '08': 'agosto', 
    '09': 'setembro', 
    '10': 'outubro', 
    '11': 'novembro', 
    '12': 'dezembro'
  }

  const numeros = str.replace(/\D/g, "")
  const year = numeros.slice(-8, -4)
  const day = numeros.slice(-10, -8)

  const fmonth = Object.values(meses).reduce((acc,cur) => {
    if(str.includes(cur)) {
      return acc = cur
    } else {
      return acc
    }
  }, '')

  const month = Object.keys(meses).find(key => meses[key] === fmonth)

  return `${year}/${month}/${day}`
}

async function fetchBody(url) {
  const decoder = new TextDecoder('iso-8859-1')
  let myHeaders = new Headers()
  myHeaders.append('Content-Type','text/plain; charset=UTF-8')
  
  const response = await fetch(url, myHeaders)
  const buffer = await response.arrayBuffer()
  const body = decoder.decode(buffer)
  
  return body
}

function recursiveDepth(obj, depth = 0) {
  let keys = Object.keys(obj)
  obj.depth = depth

  keys.forEach(function(key) {
    if (obj[key] && typeof obj[key] === 'object')
      recursiveDepth(obj[key], depth + 1)
  })
}

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

function insertDecimal(num) {
  return (num / 100).toFixed(2)
}

function isNumeric(str) {
  if (typeof str != "string") return false
  return !isNaN(str) && !isNaN(parseFloat(str))
}

function strToMoney(str) {
  if (typeof str != "string") return false
  if (!isNaN(str) && !isNaN(parseFloat(str))) return false
  return (Math.round(str * 100) / 100).toFixed(2)
}

function timestamp() {
  const dateOb = new Date()
  const day = ('0' + dateOb.getDate()).slice(-2)
  const month = ('0' + (dateOb.getMonth() + 1)).slice(-2)
  const year = dateOb.getFullYear()
  return `${year}/${month}/${day}`
}

function getJsonPath(filename) {
  const ts = timestamp()
  const json = `${jsonDir}/${ts}/${filename}`
  
  if (!fs.existsSync(`${jsonDir}/${ts}`)) fs.mkdirSync(`${jsonDir}/${ts}`, { recursive: true })

  return json
}

function walkDirectory(dir, pat, obj) {
  const files = fs.readdirSync(dir)

  for (const key in files) {
    if (!files.hasOwnProperty(key)) continue

    const file = files[key]
    const target = `${dir}/${file}`
    const stats = fs.statSync(target)

    if (stats.isFile()) {
      if (file.endsWith('.json') && file.startsWith(pat)) {
        const dados = JSON.parse(fs.readFileSync(target))
        if (Object.keys(dados).length > 0)
          obj['data'] = dados
      }
    } else if (stats.isDirectory()) {
      obj[file] = {}
      walkDirectory(target, pat, obj[file])
    }
  }
}

function walk(pattern) { 
  let filetree = {}
  walkDirectory(jsonDir, pattern, filetree)
  return filetree
}

export { fetchBody, extractDate, timestamp, getJsonPath, jsonDir, walk }