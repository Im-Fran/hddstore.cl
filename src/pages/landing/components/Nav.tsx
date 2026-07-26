import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import hdLogo from '@/assets/hd-logo.png'
import { SECTIONS, WHATSAPP_URL } from './constants'

interface NavProps {
  activeId: string | null
  typed: string
  onNavigate: (id: string) => void
}

export function Nav({ activeId, typed, onNavigate }: NavProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="sticky top-0 z-50 border-b border-white/8 bg-ink/92 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-4 px-4 py-3 lg:px-7">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 flex-none items-center justify-center overflow-hidden rounded-md bg-white">
            <img src={hdLogo} alt="Logo HDD Tecnología Store" className="size-7.5 object-contain" />
          </div>
          <div className="flex flex-col leading-[1.05]">
            <span className="font-mono text-sm font-bold tracking-[0.03em] text-white">HDD</span>
            <span className="font-mono text-[8.5px] font-medium tracking-[0.14em] text-muted">
              TECNOLOGÍA STORE
            </span>
          </div>
        </div>
        <div className="hidden items-center gap-5.5 lg:flex">
          {SECTIONS.map((s) => {
            const isActive = s.id === activeId
            const full = `${s.label}_`
            const current = isActive ? typed : ''
            const done = current.length >= full.length
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-mono text-[13px] font-medium whitespace-nowrap text-[#c7cdd5] hover:text-white"
                onClick={() => onNavigate(s.id)}
              >
                {isActive ? (
                  <>
                    <span className="font-bold text-brand">&gt; </span>
                    <span className="font-bold text-white">{current.slice(0, -1)}</span>
                    <span className={`font-bold text-white ${done ? 'animate-hd-blink' : ''}`}>
                      {current.slice(-1)}
                    </span>
                  </>
                ) : (
                  s.label
                )}
              </a>
            )
          })}
        </div>
        <div className="flex flex-none items-center gap-2.5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Escribir por WhatsApp a HDD Tecnología Store"
            className="flex flex-none items-center gap-1.75 rounded-[3px] bg-accent px-3.5 py-2.25 font-mono text-[12.5px] font-bold tracking-[0.02em] text-white hover:bg-brand-dark lg:px-4"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="flex-none">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.36 5.07L2 22l5.1-1.33A9.94 9.94 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18a7.9 7.9 0 01-4.03-1.1l-.29-.17-3.03.79.81-2.95-.19-.3A7.95 7.95 0 014 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm4.4-5.6c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.46-.39-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
            </svg>
            <span className="hidden sm:inline">WHATSAPP</span>
          </a>
          <button
            type="button"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex flex-none items-center justify-center rounded-[3px] border border-white/15 p-2 text-mist hover:border-brand-light hover:text-brand-light lg:hidden"
          >
            {menuOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="flex flex-col border-t border-white/8 px-4 py-2 lg:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => {
                onNavigate(s.id)
                setMenuOpen(false)
              }}
              className={`border-b border-white/5 py-3 font-mono text-sm font-medium last:border-b-0 ${
                s.id === activeId ? 'text-brand' : 'text-[#c7cdd5]'
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
