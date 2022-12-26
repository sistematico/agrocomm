import { lstatSync, readdirSync, readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonDir = path.join(__dirname, '..', '..', 'json')

function arquivo(filename = jsonDir) {
    let stats = lstatSync(filename)
    let info = { path: filename, name: path.basename(filename) }
 
    if (stats.isDirectory()) {
        info.type = 'folder'
        info.children = readdirSync(filename).map(child => {
            return arquivo(filename + '/' + child)
        })
    } else if (filename.endsWith('.json')) {
        info.type = 'file'
        const dados = JSON.parse(readFileSync(filename))
          if (Object.keys(dados).length > 0)
            info.data = dados        
    }
 
    return info
}

export { arquivo }
