import { useEffect, useState } from 'react'
import { FALLBACK_DATA, placeDataFromReviews, type PlaceData, type Review } from './reviews'

interface ReviewsPageResponse {
  reviews: Review[]
  hasMore: boolean
  rating: number
  userRatingCount: number
}

async function fetchAllReviews(): Promise<PlaceData | null> {
  const allReviews: Review[] = []
  let page = 1
  let rating = 0
  let userRatingCount = 0

  while (true) {
    const res = await fetch(`/api/reviews?page=${page}&limit=50`)
    if (!res.ok) return null

    const data: ReviewsPageResponse = await res.json()
    allReviews.push(...data.reviews)
    rating = data.rating
    userRatingCount = data.userRatingCount

    if (!data.hasMore || data.reviews.length === 0) break
    page += 1
  }

  return allReviews.length > 0 ? placeDataFromReviews(rating, userRatingCount, allReviews) : null
}

export function useGoogleReviews(): PlaceData {
  const [placeData, setPlaceData] = useState(FALLBACK_DATA)

  useEffect(() => {
    fetchAllReviews()
      .then((data) => {
        if (data) setPlaceData(data)
      })
      .catch(() => {})
  }, [])

  return placeData
}
