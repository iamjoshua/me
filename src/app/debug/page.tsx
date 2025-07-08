import { getReadings } from '@/lib/readings'

export default async function DebugPage() {
  let debugInfo = null
  let error = null
  
  try {
    const readings = await getReadings()
    debugInfo = {
      count: readings.length,
      readings: readings.slice(0, 2) // Show first 2 for debugging
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error'
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Debug Readings</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
        )}
        
        {debugInfo && (
          <div className="bg-gray-100 p-4 rounded">
            <h2 className="text-xl font-bold mb-4">Debug Info</h2>
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(debugInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </main>
  )
}