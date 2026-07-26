import { INSTAGRAM_URL } from './constants'

const PHOTO_PLACEHOLDERS = Array.from({ length: 4 }, (_, i) => `Foto ${i + 1}`)

export function Galeria() {
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
            {PHOTO_PLACEHOLDERS.map((label) => (
              <div
                key={label}
                className="flex h-full items-center justify-center overflow-hidden rounded-sm border border-white/8 bg-white/2 hover:border-brand"
              >
                <span className="font-mono text-[11px] font-semibold tracking-[0.04em] text-[#5c6672]">{label}</span>
              </div>
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
    </div>
  )
}
