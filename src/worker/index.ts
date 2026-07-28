interface Env {
  GOOGLE_PLACES_API_KEY: string;
  GOOGLE_PLACE_ID: string;
}

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

    return new Response('Not found', { status: 404 })
  },
} satisfies ExportedHandler<Env>
