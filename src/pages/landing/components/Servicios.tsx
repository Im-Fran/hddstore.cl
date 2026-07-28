import { SERVICES, WHATSAPP_URL } from './constants'

const ServiciosSection = () =>{
  return (
    <div className="relative grid min-h-dvh grid-cols-1 border-b border-white/8 bg-ink lg:grid-cols-[2fr_3fr]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[34px_34px]" />
      <div className="relative z-2 flex flex-col justify-center gap-4 px-5 py-7.5 lg:gap-6.5 lg:pr-7.5 lg:pb-7.5 lg:pl-10 lg:py-0">
        <div className="flex items-center gap-2.25">
          <span className="h-1.75 w-1.75 animate-[hd-blink_1.4s_step-start_infinite] rounded-full bg-[#3ddc84]" />
          <span className="font-mono text-[11.5px] 2xl:text-[13px] 3xl:text-[14px] font-semibold tracking-[0.16em] text-muted">
            STATUS: OPERATIVO · ÑUÑOA
          </span>
        </div>
        <h1 className="m-0 max-w-155 font-mono text-[clamp(30px,8vw,58px)] 2xl:text-[clamp(40px,6vw,68px)] 3xl:text-[clamp(48px,7vw,80px)] leading-[1.05] font-extrabold tracking-[-0.01em] text-white">
          DIAGNÓSTICO,
          <br />
          REPARACIÓN
          <br />
          Y UPGRADE<span className="text-brand">_</span>
        </h1>
        <p className="m-0 max-w-115 font-sans text-sm lg:text-base 2xl:text-lg 3xl:text-xl leading-[1.6] text-[#adb5bd]">
          Servicio técnico en PC y notebook, venta de hardware y armado de computadores a medida. Sin rodeos, con
          diagnóstico real.
        </p>
        <div className="mt-2 flex flex-wrap gap-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Agendar por WhatsApp"
            className="flex items-center gap-2 rounded-[3px] bg-accent px-5.5 py-3.5 font-mono text-[13.5px] 2xl:text-[14px] 3xl:text-[15px] font-bold text-white hover:bg-brand-dark"
          >
            AGENDAR POR WHATSAPP →
          </a>
          <a
            href="#nosotros"
            className="flex items-center gap-2 rounded-[3px] border border-white/20 px-5.5 py-3.5 font-mono text-[13.5px] 2xl:text-[14px] 3xl:text-[15px] font-semibold text-mist hover:border-brand-light hover:text-brand-light"
          >
            CONÓCENOS
          </a>
        </div>
      </div>
      <div className="@container relative items-center justify-center overflow-hidden bg-ink-soft px-4 py-6 sm:px-7.5 sm:py-9 flex">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,#161d26_0px,#161d26_2px,#0d1117_2px,#0d1117_18px)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,18,0.35),rgba(10,13,18,0.85))]" />
        <div className="relative grid w-full grid-cols-2 gap-[3cqw]">
          {SERVICES.map((s) => (
            <div key={s.title} className="flex w-full flex-col items-start justify-center gap-[1cqw] rounded-md border border-white/10 bg-ink/55 p-[clamp(0.5rem,4cqw,1.5rem)] backdrop-blur-sm transition-all duration-300 hover:border-brand">
              <div className="flex flex-none items-center justify-center">
                <s.icon className="size-[clamp(1.25rem,7cqw,3.75rem)] text-brand stroke-1 transition-all duration-300" />
              </div>
              <div className="flex flex-col gap-[0.5cqw]">
                <h3 className="font-mono text-[clamp(0.7rem,3.2cqw,1.5rem)] font-bold tracking-tight text-white transition-all duration-300">{s.title}</h3>
                <p className="font-sans text-[clamp(0.5rem,2.2cqw,1.125rem)] leading-snug text-[#9aa5b1]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export { ServiciosSection }