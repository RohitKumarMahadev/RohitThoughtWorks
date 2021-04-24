import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'


const booksDirectory = path.join(process.cwd(), 'books')
export function getAllBookNames(){
    const fileNames = fs.readdirSync(booksDirectory)
    return fileNames.map(fileName => {
      return {
        params:{
          id: fileName.replace(/\.md$/, '')
        }
      }
    })
  }
export async function getBookSummary(id){
  const fullPath = path.join(booksDirectory,`${id}.md`)
  const fileContents = fs.readFileSync(fullPath,'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()
  return { id, contentHtml,...matterResult.data}
}