import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { INSTAGRAM_URL } from './constants'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import '@vidstack/react/player/styles/default/theme.css'
import '@vidstack/react/player/styles/default/layouts/video.css'
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default'

const GALLERY_VIDEOS = [
  { src: '/media/gallery/armado-pc.mp4', poster: '/media/gallery/armado-pc.webp', label: 'Armado de PC' },
  { src: '/media/gallery/limpieza-pc.mp4', poster: '/media/gallery/limpieza-pc.webp', label: 'Limpieza de PC' },
  { src: '/media/gallery/mantenimiento-pc.mp4', poster: '/media/gallery/mantenimiento-pc.webp', label: 'Mantenimiento de PC' },
  { src: '/media/gallery/mantenimiento-ps4.mp4', poster: '/media/gallery/mantenimiento-ps4.webp', label: 'Mantenimiento de PS4' },
]

export function Galeria() {
  const [openVideo, setOpenVideo] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!openVideo) return
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [openVideo])

  function closeVideo() {
    setVisible(false)
    setTimeout(() => setOpenVideo(null), 300)
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center border-b border-white/8 bg-ink px-5 py-10 lg:px-7 lg:py-22.5">
      <div className="mx-auto w-full max-w-280">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3.5 lg:mb-11">
          <div className="flex items-baseline gap-3.5">
            <span className="font-mono text-xs font-bold tracking-[0.12em] text-brand">03 / GALERÍA</span>
            <div className="h-px w-15 bg-white/10" />
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 font-mono text-[13px] font-semibold text-mist hover:text-brand"
          >
            @hddtecnologiastore →
          </a>
        </div>
        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-2 lg:gap-7">
          <div className="grid aspect-square grid-cols-2 grid-rows-2 gap-2.5">
            {GALLERY_VIDEOS.map((video) => (
              <button
                key={video.src}
                type="button"
                onClick={() => setOpenVideo(video.src)}
                className="group relative flex h-full items-center justify-center overflow-hidden rounded-sm border border-white/8 bg-white/2 hover:border-brand"
              >
                <img src={video.poster} alt={video.label} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 rounded-full bg-brand px-3 py-1.5 font-mono text-[11px] font-semibold text-ink">
                    ▶ Reproducir
                  </span>
                </span>
              </button>
            ))}
          </div>
          <div className="h-70 lg:h-full">
            <iframe
              src="https://www.instagram.com/hddtecnologiastore/embed"
              className="h-full w-full rounded-sm border border-white/10 bg-white/2 lg:h-170"
              title="Feed de Instagram @hddtecnologiastore"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {openVideo &&
        createPortal(
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-5 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
            onClick={closeVideo}
          >
            <div
              className={`max-h-full w-full max-w-3xl origin-center transition-transform duration-300 ${visible ? 'scale-100' : 'scale-50'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <MediaPlayer title="HDD Tecnología Store" src={openVideo} autoPlay className="rounded-sm">
                <MediaProvider />
                <DefaultVideoLayout icons={defaultLayoutIcons} />
              </MediaPlayer>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
