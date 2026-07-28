import { StarIcon } from 'lucide-react'
import type { Review } from './reviews'

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  const rounded = Math.round(rating)
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon
          key={i}
          size={size}
          className={i < rounded ? 'fill-brand text-brand' : 'fill-none text-black/15'}
        />
      ))}
    </span>
  )
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-none rounded-xs border border-black/8 border-l-[3px] border-l-brand bg-white px-4 py-3.5">
      <div className="mb-2 flex items-center gap-2.5">
        {review.authorPhoto ? (
          <img src={review.authorPhoto} alt="" className="size-9 shrink-0 rounded-full object-cover" loading="lazy" />
        ) : (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/15 font-mono text-xs font-bold text-brand">
            {review.authorName.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <span className="block truncate font-mono text-xs font-semibold text-[#2b323b]">{review.authorName}</span>
          <div className="flex items-center gap-1.5">
            <Stars rating={review.rating} size={12} />
            <span className="font-mono text-[11px] text-[#8a93a0]">{review.relativeTime}</span>
          </div>
        </div>
      </div>
      <p className="m-0 mb-2 font-sans text-[13px] leading-normal whitespace-pre-line text-[#2b323b]">
        &quot;{review.text}&quot;
      </p>
      <a
        href={review.googleMapsUri}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-[11px] font-semibold text-brand hover:underline"
      >
        Ver reseña original en Google Maps →
      </a>
    </div>
  )
}
