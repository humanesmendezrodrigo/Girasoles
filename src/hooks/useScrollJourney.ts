import { useEffect, useRef, useState } from 'react'

interface Opciones {
  /** cuánto avanza el progreso por cada unidad de deltaY de la rueda */
  sensibilidadRueda?: number
  /** cuánto avanza el progreso por cada píxel arrastrado en táctil */
  sensibilidadTactil?: number
  /** salto al usar flechas / Page Up-Down */
  saltoTeclado?: number
}

const clamp = (valor: number) => Math.max(0, Math.min(1, valor))

/**
 * Convierte gestos de scroll (rueda, táctil, teclado) en un progreso
 * continuo de 0 a 1. No usa el scroll real de la página: la escena
 * completa vive en una sola pantalla fija.
 */
export function useScrollJourney({
  sensibilidadRueda = 0.00035,
  sensibilidadTactil = 0.0022,
  saltoTeclado = 0.06,
}: Opciones = {}) {
  const [progreso, setProgreso] = useState(0)
  const tactilYRef = useRef<number | null>(null)

  useEffect(() => {
    const alRuedaMover = (e: WheelEvent) => {
      e.preventDefault()
      setProgreso((p) => clamp(p + e.deltaY * sensibilidadRueda))
    }

    const alTocarInicio = (e: TouchEvent) => {
      tactilYRef.current = e.touches[0].clientY
    }

    const alTocarMover = (e: TouchEvent) => {
      e.preventDefault()
      const y = e.touches[0].clientY
      const anterior = tactilYRef.current ?? y
      const delta = anterior - y
      tactilYRef.current = y
      setProgreso((p) => clamp(p + delta * sensibilidadTactil))
    }

    const alPresionarTecla = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        setProgreso((p) => clamp(p + saltoTeclado))
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        setProgreso((p) => clamp(p - saltoTeclado))
      }
      if (e.key === 'Home') setProgreso(0)
      if (e.key === 'End') setProgreso(1)
    }

    window.addEventListener('wheel', alRuedaMover, { passive: false })
    window.addEventListener('touchstart', alTocarInicio, { passive: true })
    window.addEventListener('touchmove', alTocarMover, { passive: false })
    window.addEventListener('keydown', alPresionarTecla)

    return () => {
      window.removeEventListener('wheel', alRuedaMover)
      window.removeEventListener('touchstart', alTocarInicio)
      window.removeEventListener('touchmove', alTocarMover)
      window.removeEventListener('keydown', alPresionarTecla)
    }
  }, [sensibilidadRueda, sensibilidadTactil, saltoTeclado])

  return progreso
}
