import { getReviewsPage } from './api/reviews'
import type { Env } from './env'
import { syncReviews } from './sync'

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
      return getReviewsPage(url, env)
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
