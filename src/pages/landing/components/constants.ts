import { PanelsTopLeftIcon, WrenchIcon, MemoryStickIcon, PcCaseIcon } from 'lucide-react'
import type { NavSection } from './useSectionTyping'

export interface Service {
  title: string
  desc: string
  icon: React.ExoticComponent<React.SVGProps<SVGSVGElement>>
}

export const SERVICES: Service[] = [
  {
    title: 'SOPORTE TÉCNICO',
    desc: 'Mantenimiento de torre y notebook, instalación de OS, formateo, instalación de programas y remoción de virus.',
    icon: WrenchIcon,
  },
  {
    title: 'REPARACIÓN Y MEJORAS',
    desc: 'Diagnóstico de fallas, reparación de componentes y mejoras de rendimiento en equipos de escritorio y portátiles.',
    icon: PanelsTopLeftIcon,
  },
  {
    title: 'VENTA DE HARDWARE',
    desc: 'Componentes, periféricos y notebooks reacondicionados con garantía y respaldo técnico.',
    icon: MemoryStickIcon,
  },
  {
    title: 'COMPUTADORES A MEDIDA',
    desc: 'Armado de PCs personalizadas para oficina y gaming, según presupuesto y uso real.',
    icon: PcCaseIcon,
  },
]

export const WHATSAPP_URL = 'https://wa.me/56961991725'
export const WHATSAPP_PHONE_LABEL = '+56 9 6199 1725'
export const INSTAGRAM_URL = 'https://instagram.com/hddtecnologiastore'
export const MAPS_URL = 'https://maps.app.goo.gl/YpKtoF9q2wLuqQXg7'

export const ADDRESS = 'Av. Rodrigo de Araya 3076, Ñuñoa, Santiago'
export const HOURS_WEEKDAYS = 'Lunes a Viernes · 11:00–19:30'
export const HOURS_SATURDAY = 'Sábado · 11:00–15:00'

// El orden define tanto los anchors del nav (y de fullpage.js en index.tsx)
// como las secciones cuyo label se "escribe" en el ítem activo.
export const SECTIONS: NavSection[] = [
  { id: 'servicios', label: 'Servicios' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'galeria', label: 'Galería' },
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'contacto', label: 'Contacto' },
]
