import { INSTAGRAM_URL, WHATSAPP_URL } from './constants'

// Vive dentro de `.contactoSection` (ver pages/landing/index.tsx), que ya
// fuerza el 100dvh de la sección de fullpage.js — por eso usa flex-1/min-h-0
// en vez de min-h-dvh como el resto de las secciones.
export function Contacto() {
  return (
    <div className="relative flex min-h-0 flex-1 flex-col justify-center overflow-hidden bg-ink px-5 py-10 text-center lg:px-7 lg:py-22.5">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[34px_34px]" />
      <div className="relative mx-auto flex max-w-160 flex-col items-center gap-6.5">
        <span className="font-mono text-xs font-bold tracking-[0.14em] text-brand">05 / CONTACTO</span>
        <h2 className="m-0 font-mono text-[clamp(28px,4vw,42px)] leading-[1.15] font-extrabold text-white">
          ¿EQUIPO CON PROBLEMAS?
          <br />
          ESCRÍBENOS AHORA.
        </h2>
        <div className="mt-1.5 flex flex-wrap justify-center gap-3.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Escribir por WhatsApp"
            className="rounded-[3px] bg-accent px-6.5 py-4 font-mono text-sm font-bold text-white hover:bg-brand-dark"
          >
            WHATSAPP +56 9 6199 1725
          </a>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Ver Instagram"
            className="rounded-[3px] border border-white/20 px-6.5 py-4 font-mono text-sm font-semibold text-mist hover:border-brand-light hover:text-brand-light"
          >
            @hddtecnologiastore
          </a>
        </div>
        <p className="mt-2 mb-0 font-mono text-[12.5px] font-medium tracking-[0.04em] text-muted">
          LUN–VIE 11:00–19:30 · SÁB 11:00–15:00
        </p>
      </div>
    </div>
  )
}
