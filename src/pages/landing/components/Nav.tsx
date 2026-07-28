import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { SECTIONS, WHATSAPP_URL } from './constants'
import { Brand } from './Brand'
import { WhatsAppIcon } from './WhatsAppIcon'

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
        <Brand />
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
            <WhatsAppIcon />
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
