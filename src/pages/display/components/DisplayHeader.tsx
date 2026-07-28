import { Brand } from '@/pages/landing/components/Brand'
import { WhatsAppIcon } from '@/pages/landing/components/WhatsAppIcon'
import { WHATSAPP_PHONE_LABEL, WHATSAPP_URL } from '@/pages/landing/components/constants'

export function DisplayHeader() {
  return (
    <header className="flex flex-none items-center justify-between gap-4 border-b border-white/8 bg-ink px-5 py-3.5 lg:px-8">
      <Brand />
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp a HDD Tecnología Store"
        className="flex flex-none items-center gap-2 rounded-[3px] bg-accent px-4 py-2.5 font-mono text-sm font-bold text-white"
      >
        <WhatsAppIcon size={16} />
        <span>{WHATSAPP_PHONE_LABEL}</span>
      </a>
    </header>
  )
}
