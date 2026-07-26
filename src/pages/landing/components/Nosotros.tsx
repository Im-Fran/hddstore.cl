import googleBadge from '@/assets/google-badge.jpg'

interface Testimonial {
  quote: string
  name: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Me diagnosticaron la notebook al tiro y me explicaron todo antes de cobrar. Quedó como nueva.',
    name: 'Camila R.',
  },
  {
    quote: 'Arme mi PC gamer con ellos, precio justo y componentes que realmente valen la pena.',
    name: 'Matías S.',
  },
  {
    quote: 'Formatearon mi equipo de oficina el mismo día. Rápidos y sin vueltas.',
    name: 'Paula G.',
  },
]
// El track del marquee se recorre a la mitad (translateY(-50%)), por eso la
// lista se duplica: al llegar al final el segundo tramo es idéntico al primero.
const LOOPED_TESTIMONIALS = [...TESTIMONIALS, ...TESTIMONIALS]

export function Nosotros() {
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
              src={googleBadge}
              alt="Clientes satisfechos Google"
              className="size-8.5 rounded object-cover"
            />
            <span className="font-mono text-xs font-semibold tracking-[0.04em] text-[#454e59]">
              CLIENTES SATISFECHOS · GOOGLE
            </span>
          </div>
          <div className="max-h-35 overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] mask-[linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)] lg:max-h-95">
            <div className="flex animate-[hd-marquee-up_16s_linear_infinite] flex-col gap-2 hover:[animation-play-state:paused] lg:gap-3.5">
              {LOOPED_TESTIMONIALS.map((t, i) => (
                // key incluye el índice de la copia: la lista se duplica a propósito para el loop del marquee.
                <div
                  key={`${t.name}-${i}`}
                  className="flex-none rounded-xs border border-black/8 border-l-[3px] border-l-brand bg-white px-4 py-3 lg:px-6 lg:py-5.5"
                >
                  <p className="m-0 mb-2 font-sans text-[13px] leading-normal text-[#2b323b] lg:mb-3 lg:text-[14.5px] lg:leading-[1.6]">&quot;{t.quote}&quot;</p>
                  <span className="font-mono text-xs font-semibold text-[#6b7580]">— {t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
