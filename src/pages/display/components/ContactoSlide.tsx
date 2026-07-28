import { ADDRESS, HOURS_SATURDAY, HOURS_WEEKDAYS } from '@/pages/landing/components/constants'

export function ContactoSlide() {
  return (
    <div className="flex h-full flex-col justify-center gap-6 px-8 py-10">
      <span className="font-mono text-xs font-bold tracking-[0.12em] text-brand">CONTACTO</span>
      <div>
        <span className="font-mono text-[11px] font-semibold tracking-widest text-muted">DIRECCIÓN</span>
        <p className="mt-1.5 mb-0 font-sans text-2xl leading-[1.3] font-semibold text-white">{ADDRESS}</p>
      </div>
      <div>
        <span className="font-mono text-[11px] font-semibold tracking-widest text-muted">HORARIO</span>
        <p className="mt-1.5 mb-0 font-sans text-xl leading-[1.6] text-mist">
          {HOURS_WEEKDAYS}
          <br />
          {HOURS_SATURDAY}
        </p>
      </div>
    </div>
  )
}
