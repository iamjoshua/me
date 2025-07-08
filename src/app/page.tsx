import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Joshua Heiland</h1>
        
        <p className="text-lg text-gray-600 mb-8">
          I engage with problems in philosophy, create digital tools, and shoot video.
        </p>

        <nav className="space-y-4">
          <Link 
            href="/readings" 
            className="block p-6 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Readings</h2>
            <p className="text-gray-600">View my current reading list and progress</p>
          </Link>
        </nav>
      </div>
    </div>
  );
}
