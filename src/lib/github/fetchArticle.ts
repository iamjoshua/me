import { parseMarkdownWithFrontmatter } from '../markdown'

const GITHUB_API_BASE = 'https://api.github.com/repos/iamjoshua/writings/contents'

export interface Article {
  frontmatter: Record<string, any>
  content: string
  slug: string
}

export async function fetchArticle(slug: string): Promise<Article | null> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/questions/${slug}.md`, {
      next: { 
        tags: ['articles'],
        revalidate: 3600
      }
    })

    if (!response.ok) {
      return null
    }

    const data = await response.json()
    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    const { frontmatter, articleContent } = parseMarkdownWithFrontmatter(content)
    
    return {
      frontmatter,
      content: articleContent,
      slug
    }
  } catch (error) {
    console.error('Failed to fetch article:', error)
    return null
  }
}