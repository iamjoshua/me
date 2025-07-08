import { parseMarkdownWithFrontmatter } from '../markdown'

const GITHUB_API_BASE = 'https://api.github.com/repos/iamjoshua/writings/contents'

export async function fetchArticleList() {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/questions`, {
      next: { 
        tags: ['articles'],
        revalidate: 3600
      }
    })

    if (!response.ok) {
      return []
    }

    const files = await response.json()
    const articles = []

    for (const file of files) {
      if (file.type === 'file' && file.name.endsWith('.md')) {
        try {
          // Fetch the file content to get frontmatter
          const fileResponse = await fetch(`${GITHUB_API_BASE}/questions/${file.name}`, {
            next: { 
              tags: ['articles'],
              revalidate: 3600
            }
          })

          if (fileResponse.ok) {
            const fileData = await fileResponse.json()
            const content = Buffer.from(fileData.content, 'base64').toString('utf-8')
            const { frontmatter } = parseMarkdownWithFrontmatter(content)
            
            articles.push({
              slug: file.name.replace('.md', ''),
              name: file.name,
              title: frontmatter.question || frontmatter.title || file.name.replace('.md', '').replace(/-/g, ' ')
            })
          }
        } catch (error) {
          // If individual file fails, fall back to filename
          articles.push({
            slug: file.name.replace('.md', ''),
            name: file.name,
            title: file.name.replace('.md', '').replace(/-/g, ' ')
          })
        }
      }
    }
    
    return articles
  } catch (error) {
    console.error('Failed to fetch articles:', error)
    return []
  }
}