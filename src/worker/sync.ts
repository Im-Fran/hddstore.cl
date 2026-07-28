import type { Env } from './env'
import { googleSource } from './reviewSources/google'
import type { ReviewSource } from './reviewSources/types'

// ponytail: un solo proveedor hoy; agregar otro es sumarlo a este array.
const SOURCES: ReviewSource[] = [googleSource]

export async function syncReviews(env: Env): Promise<void> {
  const now = Math.floor(Date.now() / 1000)

  for (const source of SOURCES) {
    try {
      const { reviews, stats } = await source.fetch(env)

      for (const r of reviews) {
        await env.DB.prepare(
          `INSERT INTO reviews (id, source, rating, text, author_name, author_photo, author_profile_uri, relative_time, published_at, google_maps_uri, updated_at)
           VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)
           ON CONFLICT(id) DO UPDATE SET
             source = excluded.source,
             rating = excluded.rating,
             text = excluded.text,
             author_name = excluded.author_name,
             author_photo = excluded.author_photo,
             author_profile_uri = excluded.author_profile_uri,
             relative_time = excluded.relative_time,
             published_at = excluded.published_at,
             google_maps_uri = excluded.google_maps_uri,
             updated_at = excluded.updated_at`,
        )
          .bind(
            r.id,
            source.name,
            r.rating,
            r.text,
            r.authorName,
            r.authorPhoto ?? null,
            r.authorProfileUri ?? null,
            r.relativeTime,
            r.publishedAt ?? null,
            r.googleMapsUri,
            now,
          )
          .run()
      }

      if (stats) {
        await env.DB.prepare(
          `INSERT INTO place_stats (id, rating, user_rating_count, updated_at)
           VALUES (1, ?1, ?2, ?3)
           ON CONFLICT(id) DO UPDATE SET
             rating = excluded.rating,
             user_rating_count = excluded.user_rating_count,
             updated_at = excluded.updated_at`,
        )
          .bind(stats.rating, stats.userRatingCount, now)
          .run()
      }
    } catch (err) {
      console.error(`[sync] fuente "${source.name}" falló:`, err)
    }
  }
}
