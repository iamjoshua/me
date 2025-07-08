import { fetchArticleList } from '@/lib/github/fetchArticleList'
import { ArticleCard } from '@/components/ArticleCard'

export default async function ArticlesPage() {
  const articles = await fetchArticleList()

  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Articles</h1>
        
        {articles.length === 0 ? (
          <p className="text-gray-500">No articles found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ArticleCard 
                key={article.slug} 
                slug={article.slug} 
                name={article.name}
                title={article.title}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}