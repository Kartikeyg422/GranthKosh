

import { Star } from "lucide-react"

const ratingData = [
  { stars: 5, percentage: 50, count: 617 },
  { stars: 4, percentage: 30, count: 370 },
  { stars: 3, percentage: 14, count: 172 },
  { stars: 2, percentage: 4, count: 49 },
  { stars: 1, percentage: 2, count: 26 },
]

const reviews = [
  {
    id: 1,
    author: "Jane Doe",
    time: "2 weeks ago",
    rating: 5,
    text: "An absolutely beautiful and thought-provoking novel. It made me reflect on my own life and choices. Highly recommend!",
    avatar: "👩",
  },
  {
    id: 2,
    author: "John Smith",
    time: "1 month ago",
    rating: 4,
    text: "A very clever concept and an enjoyable read. The pacing was a little slow for me at times, but the ending was worth it.",
    avatar: "👨",
  },
]

export default function CustomerReviews() {
  return (
    <div className="space-y-12">
      {/* Reviews Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <button className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold rounded-lg">
          ✏️ Write a Review
        </button>
      </div>

      {/* Overall Rating and Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-gray-50 p-8 rounded-lg">
        {/* Summary */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">4.5</div>
          <div className="flex gap-0.5 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="fill-blue-600 text-blue-600" />
            ))}
          </div>
          <p className="text-sm text-gray-600">1,234 reviews</p>
        </div>

        {/* Rating Bars */}
        <div className="md:col-span-2 space-y-3">
          {ratingData.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 w-6">{stars}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-gray-200 pt-6 first:border-t-0 first:pt-0">
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl flex-shrink-0">
                {review.avatar}
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-gray-900">{review.author}</p>
                    <p className="text-sm text-gray-500">{review.time}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-blue-600 text-blue-600" />
                    ))}
                    {[...Array(5 - review.rating)].map((_, i) => (
                      <Star key={`empty-${i}`} size={14} className="text-gray-300" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
