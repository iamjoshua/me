import Link from 'next/link'

interface ArticleCardProps {
  slug: string
  name: string
  title: string
}

export function ArticleCard({ slug, name, title }: ArticleCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <Link href={`/articles/${slug}`} className="block">
        <h2 className="text-xl font-semibold mb-2 text-gray-900">
          {title}
        </h2>
        <p className="text-gray-500 text-sm">Click to read →</p>
      </Link>
    </div>
  )
}