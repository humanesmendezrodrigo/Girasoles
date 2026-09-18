import './ScrollHint.css'

interface Props {
  progreso: number
}

/** "Desliza para caminar entre los girasoles", visible solo al inicio. */
export function ScrollHint({ progreso }: Props) {
  const opacidad = Math.max(0, 1 - progreso / 0.05)
  if (opacidad <= 0) return null

  return (
    <div className="scroll-hint" style={{ opacity: opacidad }}>
      Desliza para caminar entre los girasoles
      <span className="scroll-hint__flecha" />
    </div>
  )
}
