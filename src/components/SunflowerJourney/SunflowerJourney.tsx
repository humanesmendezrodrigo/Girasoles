import { useScrollJourney } from '../../hooks/useScrollJourney'
import { useViewportScale } from '../../hooks/useViewportScale'
import { useFieldLayout, VIAJE } from './useFieldLayout'
import { Sunflower } from '../Sunflower/Sunflower'
import { Sky } from '../Sky/Sky'
import { Ground } from '../Sky/Ground'
import { ScrollHint } from '../ScrollHint/ScrollHint'
import { Card } from '../Card/Card'
import './SunflowerJourney.css'

const PERSPECTIVA_BASE = 600
const MARCO_TAM_BASE = 220

export function SunflowerJourney() {
  const progreso = useScrollJourney()
  const campo = useFieldLayout()
  const escala = useViewportScale()
  const camZ = progreso * VIAJE

  return (
    <div className="sunflower-journey" style={{ perspective: `${PERSPECTIVA_BASE * escala}px` }}>
      <Sky progreso={progreso} />
      <Ground />

      <div className="mundo">
        {campo.map((flor) => {
          const zAparente = flor.z + camZ
          const oculto = zAparente > -15 // ya pasó de la cámara

          return (
            <div
              key={flor.id}
              className="girasol-wrap"
              style={{
                opacity: oculto ? 0 : 1,
                transform: `translate3d(${flor.x * escala}px, ${flor.y * escala}px, ${zAparente * escala}px)`,
              }}
            >
              <Sunflower id={flor.id} size={flor.size * escala} withStem={flor.withStem} variant={flor.variant} />
            </div>
          )
        })}
      </div>

      <div className="marco marco--izq">
        <Sunflower id="marco-izq" size={MARCO_TAM_BASE * escala} withStem variant={1} />
      </div>
      <div className="marco marco--der">
        <Sunflower id="marco-der" size={MARCO_TAM_BASE * escala} withStem variant={2} />
      </div>

      <ScrollHint progreso={progreso} />
      <Card progreso={progreso} />
    </div>
  )
}
