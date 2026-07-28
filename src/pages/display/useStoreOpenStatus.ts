import { useEffect, useState } from 'react'

const UPDATE_INTERVAL_MS = 60_000

// Lunes a viernes 11:00-19:30, sábado 11:00-15:00, domingo cerrado.
export function isStoreOpen(date: Date): boolean {
  const day = date.getDay()
  const minutes = date.getHours() * 60 + date.getMinutes()
  if (day === 0) return false
  const closeMinutes = day === 6 ? 15 * 60 : 19 * 60 + 30
  return minutes >= 11 * 60 && minutes < closeMinutes
}

/** Si la tienda está abierta ahora mismo, según el reloj del dispositivo. */
export function useStoreOpenStatus(): boolean {
  const [open, setOpen] = useState(() => isStoreOpen(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setOpen(isStoreOpen(new Date())), UPDATE_INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return open
}
