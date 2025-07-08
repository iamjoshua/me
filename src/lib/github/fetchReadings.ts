const GITHUB_API_BASE = 'https://api.github.com/repos/iamjoshua/readings/contents'

export interface ReadingMeta {
  type: string
  category: string
  status: string
  startedAt: string
  completedAt?: string
}

export interface Reading {
  title: string
  author: string
  meta: ReadingMeta
  content?: string
}

export async function fetchReadings(): Promise<Reading[]> {
  try {
    console.log('Fetching readings from:', `${GITHUB_API_BASE}/readings.md`)
    
    // Fetch the readings.md file specifically
    const response = await fetch(`${GITHUB_API_BASE}/readings.md`, {
      next: { 
        tags: ['readings'],
        revalidate: 3600 // 1 hour fallback
      }
    })

    console.log('Response status:', response.status)

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`)
    }

    const data = await response.json()
    console.log('Data keys:', Object.keys(data))
    console.log('Content length:', data.content?.length)
    
    // Decode base64 content
    const content = Buffer.from(data.content, 'base64').toString('utf-8')
    console.log('Decoded content length:', content.length)
    console.log('First 200 chars:', content.substring(0, 200))
    
    // Parse the markdown content
    const readings = parseReadingsMarkdown(content)
    console.log('Parsed readings count:', readings.length)
    
    return readings
  } catch (error) {
    console.error('Failed to fetch readings:', error)
    return []
  }
}

function parseReadingsMarkdown(content: string): Reading[] {
  const readings: Reading[] = []
  
  // Split by entries (each entry starts with a # heading)
  const sections = content.split(/\n(?=# )/).filter(section => section.trim())
  
  for (const section of sections) {
    const lines = section.split('\n')
    const title = lines[0]?.replace(/^# /, '').trim()
    
    // Find the author line (starts with ##, may have extra spaces)
    const authorLine = lines.find(line => line.startsWith('##'))
    const author = authorLine?.replace(/^##\s+/, '').trim()
    
    if (!title || !author) {
      console.log('Skipping section - missing title or author:', { title, author })
      continue
    }
    
    // Extract YAML metadata between ```yaml blocks
    const yamlStart = lines.findIndex(line => line.trim() === '```yaml')
    const yamlEnd = lines.findIndex((line, index) => index > yamlStart && line.trim() === '```')
    
    let meta: ReadingMeta = {
      type: '',
      category: '',
      status: '',
      startedAt: '',
      completedAt: ''
    }
    
    if (yamlStart !== -1 && yamlEnd !== -1) {
      const yamlLines = lines.slice(yamlStart + 1, yamlEnd)
      for (const yamlLine of yamlLines) {
        const colonIndex = yamlLine.indexOf(':')
        if (colonIndex !== -1) {
          const key = yamlLine.slice(0, colonIndex).trim()
          const value = yamlLine.slice(colonIndex + 1).trim()
          if (key && value) {
            const cleanKey = key as keyof ReadingMeta
            if (cleanKey in meta) {
              (meta as any)[cleanKey] = value
            }
          }
        }
      }
    }
    
    // Extract any content after the yaml block
    const contentStart = yamlEnd !== -1 ? yamlEnd + 1 : lines.findIndex(line => line.startsWith('##')) + 1
    const readingContent = lines.slice(contentStart)
      .filter(line => !line.startsWith('```'))
      .join('\n')
      .trim()
    
    readings.push({
      title,
      author,
      meta,
      content: readingContent || undefined
    })
  }
  
  return readings
}