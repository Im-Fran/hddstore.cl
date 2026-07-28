import type { Env } from './env'
import { syncReviews } from './sync'

interface PlacesReviewsResponse {
  reviews?: unknown[]
  rating?: number
  userRatingCount?: number
}

async function getReviews(placeId: string, apiKey: string): Promise<Response> {
  const url = new URL(`https://places.googleapis.com/v1/places/${placeId}`)
  url.searchParams.set('fields', 'reviews,rating,userRatingCount')
  url.searchParams.set('languageCode', 'es-419')

  const googleResponse = await fetch(url, {
    headers: { 'X-Goog-Api-Key': apiKey },
  })

  const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' }

  if (!googleResponse.ok) {
    return Response.json(
      { error: 'No se pudieron obtener las reseñas' },
      { status: googleResponse.status, headers: jsonHeaders },
    )
  }

  const data = (await googleResponse.json()) as PlacesReviewsResponse
  return Response.json(data, { headers: jsonHeaders })
}

interface InstagramStats {
  followers: number
  posts: number
}

// Datos mock — reemplazar por integración real con Instagram Graph API
// (requiere cuenta Business/Creator, Facebook App y token de larga
// duración) cuando esté disponible.
const MOCK_INSTAGRAM_STATS: InstagramStats = { followers: 3200, posts: 180 }

function getInstagramStats(): Response {
  return Response.json(MOCK_INSTAGRAM_STATS, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname === '/api/reviews') {
      const placeId = env.GOOGLE_PLACE_ID;
      if (!placeId) {
        return new Response('Se debe configurar el ID del lugar', { status: 500 })
      }
      return getReviews(placeId, env.GOOGLE_PLACES_API_KEY)
    }

    if (url.pathname === '/api/instagram-stats') {
      return getInstagramStats()
    }

    return new Response('Not found', { status: 404 })
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(syncReviews(env))
  },
} satisfies ExportedHandler<Env>
