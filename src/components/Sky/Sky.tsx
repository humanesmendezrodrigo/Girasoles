import { useMemo } from 'react'
import './Sky.css'

interface Props {
  progreso: number
}

export function Sky({ progreso }: Props) {
  const escalaSol = 1 + progreso * 0.5
  const opacidadSol = Math.max(0, 1 - Math.max(0, (progreso - 0.75) / 0.25))

  return (
    <div className="cielo">
      <div className="sol" style={{ transform: `scale(${escalaSol})`, opacity: opacidadSol }} />
      <Polvo />
    </div>
  )
}

function Polvo() {
  // Posiciones fijas, generadas una sola vez.
  const puntos = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        left: aleatorio(5, 95),
        top: aleatorio(30, 85),
        delay: aleatorio(0, 7),
      })),
    [],
  )

  return (
    <div className="polvo">
      {puntos.map((p, i) => (
        <span key={i} style={{ left: `${p.left}%`, top: `${p.top}%`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  )
}

function aleatorio(min: number, max: number) {
  return min + Math.random() * (max - min)
}
