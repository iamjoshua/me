import Template from '@/components/templates'

export default function SampleArticle() {
  const sampleContent = `
    <section class="mb-24">
      <h2 class="flex items-baseline mb-10">
        <span class="section-number text-gray-400 mr-6">01</span>
        <span class="text-xl font-semibold tracking-wide">The Core Matter</span>
      </h2>
      
      <div class="prose prose-lg max-w-none">
        <p class="drop-cap text-lg leading-loose text-gray-800 mb-10">
          This seems like a straightforward question about the nature of consciousness but I don't think we need to know anything about consciousness specifically to answer this question. Nothing, that is, beyond the premise that consciousness is a physical phenomenon and nothing else like spirit stuff. There wouldn't be much reason to engage with this question after all if one were not a physicalist.
        </p>
        
        <p class="text-lg leading-loose text-gray-800 mb-10">
          While mind uploading could only be possible if digital minds are possible that is a distinct question: 
          <a href="/questions/are-digital-minds-possible-in-principle" class="text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-1 transition-colors mx-1">
            Are digital minds possible in principle?
          </a> 
          The question at hand extends the topic and introduces the additional concern of "uploading" particular minds typically with an implicit interest in preservation.
        </p>
      </div>
    </section>
  `

  const frontmatter = {
    template: "philosophy",
    title: "Is mind uploading possible in principle?",
    category: "Consciousness",
    subcategory: "Phenomenal Character & Qualia",
    readTime: "~8 min read",
    author: "Joshua Heiland"
  }

  return (
    <Template
      frontmatter={frontmatter}
      content={sampleContent}
    />
  )
}