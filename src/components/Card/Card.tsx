import { carta } from './content'
import './Card.css'

interface Props {
  progreso: number
}

export function Card({ progreso }: Props) {
  const opacidad = Math.max(0, Math.min(1, (progreso - 0.9) / 0.1))

  return (
    <div
      className="carta-capa"
      style={{ opacity: opacidad, pointerEvents: opacidad > 0.5 ? 'auto' : 'none' }}
    >
      <div className="carta">
        <div className="carta__fecha">{carta.fecha}</div>
        <h1>{carta.titulo}</h1>
        {carta.parrafos.map((linea) => (
          <p key={linea}>{linea}</p>
        ))}
        <div className="carta__firma">— {carta.firma}</div>
        <div className="carta__volver">desliza hacia arriba para volver al campo</div>
      </div>
    </div>
  )
}
