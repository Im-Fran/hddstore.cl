import { useEffect, useState } from 'react'

export interface InstagramStats {
  followers: number
  posts: number
}

const FALLBACK_STATS: InstagramStats = { followers: 0, posts: 0 }

export function useInstagramStats(): InstagramStats {
  const [stats, setStats] = useState(FALLBACK_STATS)

  useEffect(() => {
    fetch('/api/instagram-stats')
      .then((res) => res.json())
      .then((data: InstagramStats) => setStats(data))
      .catch(() => {})
  }, [])

  return stats
}
