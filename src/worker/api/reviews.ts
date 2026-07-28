import type { Env } from '../env'

interface ReviewRow {
  id: string
  rating: number
  text: string
  author_name: string
  author_photo: string | null
  author_profile_uri: string | null
  relative_time: string
  google_maps_uri: string
}

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' }

export async function getReviewsPage(url: URL, env: Env): Promise<Response> {
  const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
  const limit = Math.max(1, Number(url.searchParams.get('limit')) || 50)
  const offset = (page - 1) * limit

  const [rowsResult, countRow, statsRow] = await Promise.all([
    env.DB.prepare(
      `SELECT id, rating, text, author_name, author_photo, author_profile_uri, relative_time, google_maps_uri
       FROM reviews
       ORDER BY published_at IS NULL, published_at DESC
       LIMIT ?1 OFFSET ?2`,
    )
      .bind(limit, offset)
      .all<ReviewRow>(),
    env.DB.prepare(`SELECT COUNT(*) AS total FROM reviews`).first<{ total: number }>(),
    env.DB.prepare(`SELECT rating, user_rating_count FROM place_stats WHERE id = 1`).first<{
      rating: number
      user_rating_count: number
    }>(),
  ])

  const rows = rowsResult.results
  const total = countRow?.total ?? 0

  return Response.json(
    {
      reviews: rows.map((r) => ({
        id: r.id,
        rating: r.rating,
        text: r.text,
        authorName: r.author_name,
        authorPhoto: r.author_photo ?? undefined,
        authorProfileUri: r.author_profile_uri ?? undefined,
        relativeTime: r.relative_time,
        googleMapsUri: r.google_maps_uri,
      })),
      page,
      limit,
      total,
      hasMore: offset + rows.length < total,
      rating: statsRow?.rating ?? 0,
      userRatingCount: statsRow?.user_rating_count ?? 0,
    },
    { headers: jsonHeaders },
  )
}
