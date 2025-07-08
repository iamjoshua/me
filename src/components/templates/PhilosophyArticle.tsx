import { Inter, Crimson_Text, Space_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
})

interface PhilosophyArticleProps {
  frontmatter: Record<string, any>
  content: string
}

export default function PhilosophyArticle({
  frontmatter,
  content
}: PhilosophyArticleProps) {
  const title = frontmatter.title || "Untitled"
  const category = frontmatter.category || "Philosophy"
  const subcategory = frontmatter.subcategory
  const readTime = frontmatter.readTime || "5 min read"
  const author = frontmatter.author || "Joshua Heiland"
  return (
    <div className={`min-h-screen bg-white text-gray-900 font-sans ${inter.variable} ${crimsonText.variable} ${spaceMono.variable}`}>

      <div className="grid grid-cols-[1fr_2fr]">
        {/* Left Column - Fixed with Gradient */}
        <div className="fixed w-1/3 h-screen bg-gradient-to-br from-blue-50 via-blue-100/30 to-white">
        </div>
        
        {/* Right Column - Main Content */}
        <div className="col-start-2">
          {/* Navigation */}
          <nav className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 z-40">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-end items-center">
            <div className={`text-sm text-gray-400 ${spaceMono.className}`}>
              {author}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-3xl mx-auto px-6">
          {/* Header Section - Full Viewport Height */}
          <div className="min-h-screen flex flex-col justify-center pt-20 relative">
            {/* Topic Hierarchy */}
            <div className="mb-24">
              <div className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-6">
                {category}
              </div>
              {subcategory && (
                <div className={`text-3xl md:text-4xl font-light text-gray-700 mb-16 italic leading-tight ${crimsonText.className}`}>
                  {subcategory}
                </div>
              )}
            </div>

            {/* Main Question */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none mb-32 tracking-tighter">
              {title}
            </h1>
            
            {/* Reading Time at Bottom of Fold */}
            <div className={`absolute bottom-8 left-6 text-sm text-gray-400 ${spaceMono.className}`}>
              {readTime}
            </div>
          </div>

          {/* Content */}
          <article className="relative py-32">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </article>

          {/* Footer */}
          <footer className="mt-32 pt-16 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <a 
                href="https://github.com/iamjoshua/writings" 
                className={`hover:text-gray-900 transition-colors text-xs ${spaceMono.className}`}
              >
                View source →
              </a>
              <span className="font-light">{author} © 2024</span>
            </div>
          </footer>
        </main>
        </div>
      </div>
    </div>
  )
}