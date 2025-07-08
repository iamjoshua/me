interface ReadingCardProps {
  title: string
  author: string
  type: string
  category: string
  status: string
  startedAt: string
  completedAt?: string
  content?: string
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'reading':
      return 'bg-blue-100 text-blue-800'
    case 'paused':
      return 'bg-yellow-100 text-yellow-800'
    case 'rereading':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function ReadingCard({ 
  title, 
  author, 
  type, 
  category, 
  status, 
  startedAt, 
  completedAt, 
  content 
}: ReadingCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-semibold mb-1">{title}</h2>
          <h3 className="text-lg text-gray-600">{author}</h3>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
            {status}
          </span>
          {type && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {type}
            </span>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
        {category && (
          <div>
            <span className="font-medium">Category:</span> {category}
          </div>
        )}
        {startedAt && (
          <div>
            <span className="font-medium">Started:</span> {startedAt}
          </div>
        )}
        {completedAt && (
          <div>
            <span className="font-medium">Completed:</span> {completedAt}
          </div>
        )}
      </div>
      
      {content && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-700">{content}</p>
        </div>
      )}
    </div>
  )
}