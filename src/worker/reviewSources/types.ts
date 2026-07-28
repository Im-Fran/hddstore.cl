import type { Env } from '../env'

export interface NormalizedReview {
  id: string
  rating: number
  text: string
  authorName: string
  authorPhoto?: string
  authorProfileUri?: string
  relativeTime: string
  publishedAt?: number
  googleMapsUri: string
}

export interface ReviewSourceResult {
  reviews: NormalizedReview[]
  stats?: { rating: number; userRatingCount: number }
}

export interface ReviewSource {
  name: string
  fetch(env: Env): Promise<ReviewSourceResult>
}
