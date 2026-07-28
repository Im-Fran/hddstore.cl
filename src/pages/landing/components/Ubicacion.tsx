import { ADDRESS, HOURS_SATURDAY, HOURS_WEEKDAYS, MAPS_URL } from './constants'

export function Ubicacion() {
  return (
    <div className="flex min-h-dvh flex-col justify-center border-b border-black/6 bg-paper px-5 py-10 text-[#0f1319] lg:px-7 lg:py-22.5">
      <div className="mx-auto w-full max-w-280">
        <div className="mb-7 flex items-baseline gap-3.5">
          <span className="font-mono text-xs font-bold tracking-[0.12em] text-brand">04 / UBICACIÓN</span>
          <div className="h-px flex-1 bg-black/10" />
        </div>
        <div className="grid grid-cols-1 border border-black/10 lg:grid-cols-2">
          <div className="flex flex-col gap-5.5 bg-white px-6 py-7 lg:px-9 lg:py-10">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#8b94a1]">DIRECCIÓN</span>
              <p className="mt-1.5 mb-0 font-sans text-[17px] leading-[1.4] font-semibold text-[#0f1319]">
                {ADDRESS}
              </p>
            </div>
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-widest text-[#8b94a1]">HORARIO</span>
              <p className="mt-1.5 mb-0 font-sans text-[15px] leading-[1.7] text-[#454e59]">
                {HOURS_WEEKDAYS}
                <br />
                {HOURS_SATURDAY}
              </p>
            </div>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Cómo llegar en Google Maps"
              className="flex items-center gap-2 self-start rounded-[3px] bg-ink px-5 py-3.25 font-mono text-[13px] font-bold text-white hover:bg-accent"
            >
              CÓMO LLEGAR →
            </a>
          </div>
          <div className="min-h-55 lg:min-h-80">
            <iframe
              title="Mapa HDD Tecnología Store"
              src="https://www.google.com/maps?q=Av.+Rodrigo+de+Araya+3076,+%C3%91u%C3%B1oa,+Santiago&output=embed"
              className="block h-full min-h-55 w-full border-0 grayscale-[0.3] contrast-[1.05] lg:min-h-80"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
