import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonDir = path.join(__dirname, '..', '..', 'json')

function recursiveDepth(obj, depth = 0) {
  let keys = Object.keys(obj)

  keys.forEach(key => {
    console.log(`key: ${key}, depth: ${depth}`)

    if (obj[key] && typeof obj[key] === 'object')
      if (depth < 3)
        recursiveDepth(obj[key], depth + 1)
  })
}

function walkDirectoryDepth(dir, pat, obj, depth = 0) {
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
      obj.depth = depth
      walkDirectoryDepth(target, pat, obj[file], depth + 1)
    }
  }
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
          obj['cotacao'] = dados
      }
    } else if (stats.isDirectory()) {
      obj[file] = {}
      walkDirectory(target, pat, obj[file])
    }
  }
}

function arquivo(pattern) { 
  let filetree = {}
  walkDirectory(jsonDir, pattern, filetree)
  return filetree
}

function ultimas(pattern) { 
  let data = {}
  walkDirectory(jsonDir, pattern, data)
  console.log(data) 

}

export { arquivo, ultimas }