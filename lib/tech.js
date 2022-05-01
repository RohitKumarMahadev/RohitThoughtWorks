import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'


const techDirectory = path.join(process.cwd(), 'tech')
export function getTechPostsByDate(){
    const fileNames = fs.readdirSync(techDirectory)
    const techPosts = fileNames.map(fileName => {
      const fullPath = path.join(techDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)
      return {
          id: fileName.replace(/\.md$/, ''),
          ...matterResult.data
      }
    })
     // Sort posts by date
    return techPosts.sort((a, b) => {
      if (a.date < b.date) {
        return 1
      } else {
        return -1
      }
    })
  }
export function getAllTechPosts(){
  const fileNames = fs.readdirSync(techDirectory)
   return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
export async function getTechPost(id){
  const fullPath = path.join(techDirectory,`${id}.md`)
  const fileContents = fs.readFileSync(fullPath,'utf8')
  const matterResult = matter(fileContents)
  const processedContent = await remark().use(html).process(matterResult.content)
  const contentHtml = processedContent.toString()
  return { id, contentHtml,...matterResult.data}
}