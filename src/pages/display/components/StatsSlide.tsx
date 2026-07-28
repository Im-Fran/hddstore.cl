import type { ReactNode } from 'react'
import { Stars } from '@/pages/landing/components/ReviewCard'
import type { PlaceData } from '@/pages/landing/components/reviews'
import { SERVICES } from '@/pages/landing/components/constants'
import { useInstagramStats } from '../useInstagramStats'
import { useStoreOpenStatus } from '../useStoreOpenStatus'

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
  const isOpen = useStoreOpenStatus()
  const featuredReview = placeData.reviews.reduce(
    (best, r) => (r.rating > best.rating ? r : best),
    placeData.reviews[0],
  )

  return (
    <div className="flex h-full flex-col gap-4 px-8 py-10">
      <div className="grid grid-cols-3 gap-4">
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
        <StatTile label="SERVICIOS" value={SERVICES.length} />
        <StatTile
          label="ESTADO"
          value={
            <span className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${isOpen ? 'bg-[#3ddc84]' : 'bg-[#ef4444]'}`}
                aria-hidden
              />
              {isOpen ? 'ABIERTO' : 'CERRADO'}
            </span>
          }
        />
      </div>
      {featuredReview && (
        <div className="flex min-h-0 flex-1 flex-col justify-center gap-3 border border-white/8 border-l-[3px] border-l-brand px-6 py-5">
          <span className="font-mono text-[11px] font-semibold tracking-widest text-muted">RESEÑA DESTACADA</span>
          <p className="m-0 font-sans text-lg leading-[1.5] text-mist italic">&quot;{featuredReview.text}&quot;</p>
          <span className="flex items-center gap-2 font-mono text-sm font-semibold text-white">
            — {featuredReview.authorName}
            <Stars rating={featuredReview.rating} size={16} />
          </span>
        </div>
      )}
    </div>
  )
}
