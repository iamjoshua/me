interface MinimalArticleProps {
  frontmatter: Record<string, any>
  content: string
}

export default function MinimalArticle({
  frontmatter,
  content
}: MinimalArticleProps) {
  const title = frontmatter.title || "Untitled"
  const author = frontmatter.author || "Joshua Heiland"
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-2xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="text-gray-500 text-sm">{author}</div>
        </header>
        
        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
      </main>
    </div>
  )
}