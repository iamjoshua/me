import { fetchReadings } from '@/lib/github/fetchReadings'
import { ReadingCard } from '@/components/ReadingCard'

export default async function ReadingsPage() {
  const readings = await fetchReadings()

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Readings</h1>
        
        {readings.length === 0 ? (
          <p className="text-gray-500">No readings found.</p>
        ) : (
          <div className="space-y-6">
            {readings.map((reading, index) => (
              <ReadingCard 
                key={index}
                title={reading.title}
                author={reading.author}
                type={reading.meta.type}
                category={reading.meta.category}
                status={reading.meta.status}
                startedAt={reading.meta.startedAt}
                completedAt={reading.meta.completedAt}
                content={reading.content}
              />
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center">
          <a 
            href="https://github.com/iamjoshua/readings/blob/main/readings.md" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            View source on GitHub →
          </a>
        </div>
      </div>
    </main>
  )
}