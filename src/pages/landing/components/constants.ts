import type { NavSection } from './useSectionTyping'

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
