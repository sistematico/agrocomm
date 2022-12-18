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
  return { year, month, day }
}

function getJsonPath(filename) {
  const { year, month, day } = timestamp()
  const json = `${jsonDir}/${year}/${month}/${day}/${filename}`
  
  if (!fs.existsSync(`${jsonDir}/${year}/${month}/${day}`)) fs.mkdirSync(`${jsonDir}/${year}/${month}/${day}`, { recursive: true })

  return json
}

function readFiles(dirname = jsonDir, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err)
      return
    }

    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err)
          return
        }

        onFileContent(filename, content)
      })
    })
  })
}


export { getJsonPath, readFiles, jsonDir }