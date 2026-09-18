import './FrameLayer.css'

interface Props {
  src: string
  opacidad: number
  escala: number
}

/** Una sola imagen de fondo, posicionada a pantalla completa. */
export function FrameLayer({ src, opacidad, escala }: Props) {
  return (
    <div
      className="frame-layer"
      style={{
        backgroundImage: `url(${src})`,
        opacity: opacidad,
        transform: `scale(${escala})`,
      }}
    />
  )
}
