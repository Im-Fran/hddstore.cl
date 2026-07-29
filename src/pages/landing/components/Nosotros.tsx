import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { PauseIcon, PlayIcon } from 'lucide-react'
import { ReviewCard, Stars } from './ReviewCard'
import type { PlaceData } from './reviews'
import { useGoogleReviews } from './useGoogleReviews'

function ReviewsModal({ data, onClose }: { data: PlaceData; onClose: () => void }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- close solo cierra el modal, no necesita re-suscribirse en cada render
  }, [])

  function close() {
    setVisible(false)
    setTimeout(onClose, 300)
  }

  const mapsUrl = data.placeId ? `https://www.google.com/maps/place/?q=place_id:${data.placeId}` : undefined

  return createPortal(
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={close}
    >
      <div
        className={`flex max-h-[85vh] w-full max-w-2xl origin-center flex-col rounded-xs bg-paper transition-transform duration-300 ${visible ? 'scale-100' : 'scale-95'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-black/8 px-5 py-4">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <Stars rating={data.rating} />
              <span className="font-mono text-sm font-bold text-[#0f1319]">{data.rating.toFixed(1)}</span>
            </div>
            <span className="font-mono text-xs text-[#6b7580]">{data.userRatingCount} reseñas totales</span>
          </div>
          <div className="flex items-center gap-3">
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs font-semibold text-brand hover:underline"
              >
                Ver en Google Maps →
              </a>
            )}
            <button
              type="button"
              onClick={close}
              aria-label="Cerrar"
              className="font-mono text-lg leading-none text-[#6b7580] hover:text-[#0f1319]"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 overflow-y-auto px-5 py-4">
          {data.reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function Nosotros() {
  const placeData = useGoogleReviews()
  const [modalOpen, setModalOpen] = useState(false)
  const [paused, setPaused] = useState(false)

  // El track del marquee se recorre a la mitad (translateY(-50%)), por eso la
  // lista se duplica: al llegar al final el segundo tramo es idéntico al primero.
  const loopedReviews = [...placeData.reviews, ...placeData.reviews]

  return (
    <div className="flex min-h-dvh flex-col justify-center border-b border-black/6 bg-paper px-5 py-6 text-[#0f1319] lg:px-7 lg:py-22.5">
      <div className="mx-auto grid w-full max-w-280 grid-cols-1 gap-5 lg:grid-cols-[1fr_1.1fr] lg:gap-15">
        <div>
          <div className="mb-4 flex items-baseline gap-3.5 lg:mb-7">
            <span className="font-mono text-xs font-bold tracking-[0.12em] text-brand">02 / NOSOTROS</span>
            <div className="h-px flex-1 bg-black/10" />
          </div>
          <h2 className="m-0 mb-3 font-mono text-2xl leading-[1.15] font-extrabold tracking-[-0.01em] lg:mb-5 lg:text-[32px]">
            TÉCNICOS DEL BARRIO,
            <br />
            NO CALL CENTER.
          </h2>
          <p className="m-0 mb-2 font-sans text-sm leading-normal text-[#454e59] last:mb-0 lg:mb-4 lg:text-[15px] lg:leading-[1.65]">
            Somos un taller de servicio técnico ubicado en Ñuñoa. Revisamos tu equipo en el local, te explicamos qué
            tiene y cuánto cuesta arreglarlo antes de tocar un tornillo.
          </p>
          <p className="m-0 mb-2 font-sans text-sm leading-normal text-[#454e59] last:mb-0 lg:mb-4 lg:text-[15px] lg:leading-[1.65]">
            Formateo, mantenimiento, upgrades de hardware, armado de PCs a medida y venta de notebooks
            reacondicionados — todo con repuestos verificados y garantía real.
          </p>
        </div>
        <div className="flex flex-col gap-2 lg:gap-3.5">
          <div className="hidden items-center gap-2.5 lg:flex">
            <img
              src={"/media/google-badge.webp"}
              alt="Clientes satisfechos Google"
              className="size-8.5 rounded object-cover"
            />
            <span className="font-mono text-xs font-semibold tracking-[0.04em] text-[#454e59]">
              CLIENTES SATISFECHOS · GOOGLE
            </span>
          </div>
          <div className="max-h-35 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] mask-[linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] lg:max-h-95">
            <div
              style={paused ? { animationPlayState: 'paused' } : undefined}
              className="flex animate-[hd-marquee-up_32s_linear_infinite] flex-col gap-2 hover:[animation-play-state:paused] lg:animate-[hd-marquee-up_16s_linear_infinite] lg:gap-3.5"
            >
              {loopedReviews.map((r, i) => (
                // key incluye el índice de la copia: la lista se duplica a propósito para el loop del marquee.
                <button
                  key={`${r.id}-${i}`}
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex-none cursor-pointer rounded-xs border border-black/8 border-l-[3px] border-l-brand bg-white px-4 py-3 text-left hover:border-l-4 lg:px-6 lg:py-5.5"
                >
                  <p className="m-0 mb-2 font-sans text-[13px] leading-normal text-[#2b323b] lg:mb-3 lg:text-[14.5px] lg:leading-[1.6]">
                    &quot;{r.text}&quot;
                  </p>
                  <span className="font-mono text-xs font-semibold text-[#6b7580]">— {r.authorName}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="m-0 font-mono text-[11px] text-[#8a93a0]">Presiona una reseña para ver todas</p>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? 'Reanudar reseñas' : 'Pausar reseñas'}
              className="flex shrink-0 items-center justify-center rounded-full border border-black/8 bg-white p-1.5 text-[#454e59]"
            >
              {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <ReviewsModal data={placeData} onClose={() => setModalOpen(false)} />}
    </div>
  )
}
