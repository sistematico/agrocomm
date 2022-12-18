import fs from 'fs'
// import path from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const jsonDir = path.join(__dirname, '..', 'json')

// const getDirectories = source =>
//   readdirSync(source, { withFileTypes: true })
//     .filter(dirent => dirent.isDirectory())
//     .map(dirent => dirent.name)

// console.log(getDirectories('./json'))

function findInDir (dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const fileStat = fs.lstatSync(filePath);
    const fileExt = path.extname(filePath)

    console.log(fileExt)

    if (fileStat.isDirectory()) {
      findInDir(filePath, fileList);
    } else if (fileExt === '.json') {
      const parts = filePath.split("/")

      const dia = parts[parts.length-1]
      const mes = parts[parts.length-2]
      const ano = parts[parts.length-3]
      
      fileList.push({ dia: filePath });
    }
  });

  return fileList;
}

// Usage
console.log(findInDir(jsonDir))