import hdLogo from '@/assets/hd-logo.png'

export function Footer() {
  return (
    <div className="flex flex-col items-center gap-2.5 border-t border-white/8 bg-ink-soft px-5 py-4 text-center lg:absolute lg:bottom-15 lg:left-0 lg:right-0 lg:flex-row lg:items-center lg:justify-between lg:gap-3.5 lg:px-7 lg:py-7.5 lg:text-left">
      <div className="flex items-center gap-2.5">
        <div className="flex size-6.5 items-center justify-center overflow-hidden rounded-[5px] bg-white">
          <img src={hdLogo} alt="" className="h-5 w-5 object-contain" />
        </div>
        <span className="font-mono text-xs font-semibold text-[#8b94a1]">HDD TECNOLOGÍA STORE © 2026</span>
      </div>
      <div className="flex flex-col items-center gap-1 lg:items-end">
        <span className="font-mono text-xs text-[#5c6672]">Av. Rodrigo de Araya 3076, Ñuñoa</span>
        <span className="font-mono text-xs text-[#5c6672]">
          Desarrollado con ☕ por{' '}
          <a
            href="https://fsolism.cl/?utm_src=hddstore&utm_campaign=footer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand"
          >
            Francisco Solis Maturana
          </a>
        </span>
      </div>
    </div>
  )
}
