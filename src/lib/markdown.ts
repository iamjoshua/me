export function parseMarkdownWithFrontmatter(content: string): { frontmatter: Record<string, any>, articleContent: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return {
      frontmatter: {},
      articleContent: content
    }
  }

  const [, frontmatterText, articleContent] = match
  const frontmatter: Record<string, any> = {}

  // Simple YAML parser for basic key-value pairs
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '')
      if (key && value) {
        frontmatter[key] = value
      }
    }
  })

  return {
    frontmatter,
    articleContent
  }
}