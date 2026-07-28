import { useEffect, useState } from 'react'

export function nextSlideIndex(current: number, count: number): number {
  return (current + 1) % count
}

/** Avanza un índice de slide cada `intervalMs` ms, dando la vuelta al llegar a `count`. */
export function useAutoSlide(count: number, intervalMs: number): number {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => nextSlideIndex(current, count))
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [count, intervalMs])

  return index
}
