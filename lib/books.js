import fs from 'fs'
import path from 'path'

const booksDirectory = path.join(process.cwd(), 'books')
export function getAllBookNames(){
    const fileNames = fs.readdirSync(booksDirectory)
    console.log(fileNames)
    return fileNames.map(fileName => {
      return {
        params:{
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }