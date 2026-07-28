import type { ReactNode } from 'react'
import { Stars } from '@/pages/landing/components/ReviewCard'
import type { PlaceData } from '@/pages/landing/components/reviews'
import { useInstagramStats } from '../useInstagramStats'

function StatTile({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 border border-white/8 px-5 py-6">
      <span className="font-mono text-[11px] font-semibold tracking-widest text-muted">{label}</span>
      <span className="font-mono text-3xl font-extrabold text-white">{value}</span>
    </div>
  )
}

export function StatsSlide({ placeData }: { placeData: PlaceData }) {
  const { followers, posts } = useInstagramStats()

  return (
    <div className="grid h-full grid-cols-2 gap-4 px-8 py-10">
      <StatTile label="SEGUIDORES IG" value={followers.toLocaleString('es-CL')} />
      <StatTile label="POSTS IG" value={posts.toLocaleString('es-CL')} />
      <StatTile label="RESEÑAS GOOGLE" value={placeData.userRatingCount.toLocaleString('es-CL')} />
      <StatTile
        label="PUNTAJE GOOGLE"
        value={
          <span className="flex items-center gap-2">
            {placeData.rating.toFixed(1)}
            <Stars rating={placeData.rating} size={20} />
          </span>
        }
      />
    </div>
  )
}
