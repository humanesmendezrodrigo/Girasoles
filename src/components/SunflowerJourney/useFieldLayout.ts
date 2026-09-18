import { useMemo } from 'react'

export interface FlorConfig {
  id: string
  x: number
  y: number
  z: number
  size: number
  withStem: boolean
  variant: number
}

/** Distancia total del recorrido en el eje Z. */
export const VIAJE = 5200

/** Qué tan cerca queda el girasol protagonista al llegar al final del recorrido. */
const FIN_Z_HEROE = -90

interface Banda {
  zLejos: number
  zCerca: number
  cantidad: number
  spread: number
  tam: [number, number]
  y: [number, number]
}

// Franjas de profundidad, de la más lejana a la más cercana.
// Para hacer el campo más denso, sube "cantidad"; para flores más grandes, sube "tam".
const BANDAS: Banda[] = [
  { zLejos: -5200, zCerca: -4300, cantidad: 14, spread: 560, tam: [55, 80], y: [-40, 20] },
  { zLejos: -4300, zCerca: -3200, cantidad: 17, spread: 700, tam: [80, 125], y: [-20, 55] },
  { zLejos: -3200, zCerca: -1900, cantidad: 17, spread: 830, tam: [125, 195], y: [0, 110] },
  { zLejos: -1900, zCerca: -700, cantidad: 14, spread: 950, tam: [185, 275], y: [40, 210] },
]

const aleatorio = (min: number, max: number) => min + Math.random() * (max - min)

/** Genera la disposición del campo una sola vez (no cambia entre renders). */
export function useFieldLayout(): FlorConfig[] {
  return useMemo(() => {
    const flores: FlorConfig[] = []

    BANDAS.forEach((banda, bandaIndex) => {
      for (let i = 0; i < banda.cantidad; i++) {
        const size = aleatorio(banda.tam[0], banda.tam[1])
        flores.push({
          id: `f${bandaIndex}-${i}`,
          x: aleatorio(-banda.spread, banda.spread),
          y: aleatorio(banda.y[0], banda.y[1]),
          z: aleatorio(banda.zLejos, banda.zCerca),
          size,
          withStem: size > 100,
          variant: (bandaIndex + i) % 3,
        })
      }
    })

    // El girasol protagonista: llena la pantalla justo al final del recorrido.
    flores.push({
      id: 'heroe',
      x: -10,
      y: -30,
      z: FIN_Z_HEROE - VIAJE,
      size: 420,
      withStem: false,
      variant: 0,
    })

    return flores
  }, [])
}
