import { fetchArticle } from '@/lib/github/fetchArticle'
import Template from '@/components/templates'
import { notFound } from 'next/navigation'

interface ArticlePageProps {
  params: { slug: string }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await fetchArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <Template
      frontmatter={article.frontmatter}
      content={article.content}
    />
  )
}