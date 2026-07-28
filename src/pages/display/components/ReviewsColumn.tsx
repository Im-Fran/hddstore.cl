import { ReviewCard } from '@/pages/landing/components/ReviewCard'
import type { PlaceData } from '@/pages/landing/components/reviews'

// Reseñas duplicadas a propósito: el track recorre 0→-50% en loop continuo
// (mismo truco que el marquee de Nosotros.tsx), así el segundo tramo calza
// exacto con el primero y no se nota el corte.
export function ReviewsColumn({ placeData }: { placeData: PlaceData }) {
  const loopedReviews = [...placeData.reviews, ...placeData.reviews]

  return (
    <div className="h-full overflow-hidden border-l border-white/8 [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_5%,#000_95%,transparent)] mask-[linear-gradient(to_bottom,transparent,#000_5%,#000_95%,transparent)]">
      <div className="flex animate-[hd-marquee-up_40s_linear_infinite] flex-col gap-3 px-6 py-6">
        {loopedReviews.map((r, i) => (
          <ReviewCard key={`${r.id}-${i}`} review={r} />
        ))}
      </div>
    </div>
  )
}
