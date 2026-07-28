import type { Env } from '../env'
import type { NormalizedReview, ReviewSource, ReviewSourceResult } from './types'

interface GooglePlaceReview {
  name?: string
  rating?: number
  text?: { text: string }
  authorAttribution?: { displayName: string; photoUri?: string; uri?: string }
  relativePublishTimeDescription?: string
  publishTime?: string
  googleMapsUri?: string
}

interface GooglePlacesResponse {
  reviews?: GooglePlaceReview[]
  rating?: number
  userRatingCount?: number
}

function normalize(r: GooglePlaceReview): NormalizedReview | null {
  if (!r.name || !r.text?.text || !r.authorAttribution?.displayName || !r.googleMapsUri) return null

  return {
    id: r.name,
    rating: r.rating ?? 0,
    text: r.text.text,
    authorName: r.authorAttribution.displayName,
    authorPhoto: r.authorAttribution.photoUri,
    authorProfileUri: r.authorAttribution.uri,
    relativeTime: r.relativePublishTimeDescription ?? '',
    publishedAt: r.publishTime ? Math.floor(new Date(r.publishTime).getTime() / 1000) : undefined,
    googleMapsUri: r.googleMapsUri,
  }
}

export const googleSource: ReviewSource = {
  name: 'google',
  async fetch(env: Env): Promise<ReviewSourceResult> {
    if (!env.GOOGLE_PLACE_ID) throw new Error('Falta GOOGLE_PLACE_ID')

    const url = new URL(`https://places.googleapis.com/v1/places/${env.GOOGLE_PLACE_ID}`)
    url.searchParams.set(
      'fields',
      'rating,userRatingCount,reviews.name,reviews.rating,reviews.text,reviews.authorAttribution,reviews.relativePublishTimeDescription,reviews.publishTime,reviews.googleMapsUri',
    )
    url.searchParams.set('languageCode', 'es-419')

    const res = await fetch(url, { headers: { 'X-Goog-Api-Key': env.GOOGLE_PLACES_API_KEY } })
    if (!res.ok) throw new Error(`Google Places respondió ${res.status}`)

    const data = (await res.json()) as GooglePlacesResponse
    const reviews = (data.reviews ?? [])
      .map(normalize)
      .filter((r): r is NormalizedReview => r !== null)

    return {
      reviews,
      stats:
        data.rating !== undefined && data.userRatingCount !== undefined
          ? { rating: data.rating, userRatingCount: data.userRatingCount }
          : undefined,
    }
  },
}
