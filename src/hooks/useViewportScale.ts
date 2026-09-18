import { useEffect, useState } from 'react'

// El campo está diseñado pensando en este ancho; en pantallas más chicas
// (celular, tablet) todo se escala hacia abajo, y en pantallas muy grandes
// se limita para que no quede demasiado disperso.
const ANCHO_DISEÑO = 1400
const ESCALA_MIN = 0.42
const ESCALA_MAX = 1.15

function calcularEscala() {
  if (typeof window === 'undefined') return 1
  const bruta = window.innerWidth / ANCHO_DISEÑO
  return Math.min(ESCALA_MAX, Math.max(ESCALA_MIN, bruta))
}

/** Factor único que escala posiciones, tamaños y perspectiva de toda la escena. */
export function useViewportScale() {
  const [escala, setEscala] = useState(calcularEscala)

  useEffect(() => {
    const alRedimensionar = () => setEscala(calcularEscala())
    window.addEventListener('resize', alRedimensionar)
    window.addEventListener('orientationchange', alRedimensionar)
    return () => {
      window.removeEventListener('resize', alRedimensionar)
      window.removeEventListener('orientationchange', alRedimensionar)
    }
  }, [])

  return escala
}
