// https://researchhubs.com/post/computing/javascript/convert-directory-structure--to-json-with-node-js.html
import { lstatSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonDir = path.join(__dirname, '..', '..', 'json')

function arquivo(filename = jsonDir, depth = 0) {
  let stats = lstatSync(filename)
  let info = { name: path.basename(filename) }

  if (stats.isDirectory()) {
    info.type = 'folder'
    let keyName = 'children'

    switch (depth) {
      case 0:
        keyName = 'anos'
        break
      case 1:
        keyName = 'meses'
        break
      case 2:
        keyName = 'dias'
        break
    }

    info[keyName] = readdirSync(filename).map((child) => {
      return arquivo(filename + '/' + child, depth + 1)
    })
  } else if (filename.endsWith('.json')) {
    info.type = 'file'
    const dados = JSON.parse(readFileSync(filename))
    if (Object.keys(dados).length > 0) info.data = dados
  }
  return info
}

function ultimas() {
  const { anos } = arquivo()
  return anos
}

export { arquivo, ultimas }
