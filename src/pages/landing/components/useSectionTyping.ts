import { useCallback, useEffect, useRef, useState } from 'react'

export interface NavSection {
  id: string
  label: string
}

const TYPE_INTERVAL_MS = 45

/** Escribe el label de la sección activa letra por letra en el nav, como el
 * prototipo original. `startTyping` se dispara tanto al hacer click manual
 * en el nav como desde el callback `afterLoad` de fullpage.js (ver
 * `pages/landing/index.tsx`) — fullpage.js no agrega `id` a sus secciones
 * (usa `data-anchor`), así que un IntersectionObserver sobre `id`s nunca
 * encuentra nada; por eso el cambio de sección se notifica explícitamente. */
export function useSectionTyping(sections: NavSection[]) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [typed, setTyped] = useState('')
  const activeIdRef = useRef<string | null>(null)
  const timerRef = useRef<number | undefined>(undefined)

  const startTyping = useCallback(
    (id: string) => {
      if (id === activeIdRef.current) return
      const section = sections.find((s) => s.id === id)
      if (!section) return
      const full = `${section.label}_`
      window.clearInterval(timerRef.current)
      activeIdRef.current = id
      setActiveId(id)
      setTyped('')
      let i = 0
      timerRef.current = window.setInterval(() => {
        i += 1
        setTyped(full.slice(0, i))
        if (i >= full.length) window.clearInterval(timerRef.current)
      }, TYPE_INTERVAL_MS)
    },
    [sections],
  )

  useEffect(
    () => () => {
      window.clearInterval(timerRef.current)
      activeIdRef.current = null
    },
    [],
  )

  return { activeId, typed, startTyping }
}
