import { memo } from 'react'

interface Props {
  /** identificador único: se usa para no chocar los ids de los gradientes/filtros SVG */
  id: string
  size: number
  withStem?: boolean
  variant?: number
}

const VARIANTES = [
  { claro: '#ffe566', medio: '#ffb830', oscuro: '#e87818' },
  { claro: '#ffdc4a', medio: '#f5a820', oscuro: '#d96a10' },
  { claro: '#fff080', medio: '#ffc040', oscuro: '#ec8820' },
]

const NUM_PETALOS = 16
const CENTRO_Y = 150
/** Radio del disco marrón — los pétalos miden lo mismo hacia afuera */
const RADIO_DISCO = 52
const LARGO_PETALO = RADIO_DISCO

const HOJA_PATH = 'M0,0 C -18,-12 -40,-10 -54,4 C -40,20 -18,16 0,0 Z'
const HOJA_VENA = 'M0,0 L -50,4'

/** Pequeñas chispas alrededor del centro, posición fija por variante. */
const CHISPAS = [
  { cx: 72, cy: 128, r: 2.2 },
  { cx: 128, cy: 132, r: 1.8 },
  { cx: 118, cy: 168, r: 2.5 },
  { cx: 82, cy: 172, r: 1.6 },
  { cx: 100, cy: 118, r: 1.4 },
  { cx: 145, cy: 148, r: 1.2 },
  { cx: 58, cy: 152, r: 1.5 },
]

/**
 * Pétalo almendrado con punta afilada. Base ancha en y≈0, punta en y=−LARGO_PETALO.
 * Proporción: largo del pétalo ≈ radio del disco (como girasol real).
 */
const PETALO_FRENTE = `M -21,4 C -23,-16 -14,-38 0,-${LARGO_PETALO} C 14,-38 23,-16 21,4 Z`
const PETALO_ATRAS = `M -17,3 C -19,-12 -11,-30 0,-${Math.round(LARGO_PETALO * 0.88)} C 11,-30 19,-12 17,3 Z`

function Petalos({
  angulos,
  path,
  gradId,
  rotOffset = 0,
  stroke,
}: {
  angulos: number[]
  path: string
  gradId: string
  rotOffset?: number
  stroke?: string
}) {
  return (
    <>
      {angulos.map((ang) => (
        <g
          key={`${gradId}-${ang}`}
          transform={`translate(100 ${CENTRO_Y}) rotate(${ang + rotOffset}) translate(0 ${-RADIO_DISCO})`}
        >
          <path
            d={path}
            fill={`url(#${gradId})`}
            stroke={stroke}
            strokeWidth={stroke ? 1.8 : 0}
            strokeLinejoin="round"
          />
        </g>
      ))}
    </>
  )
}

export const Sunflower = memo(function Sunflower({ id, size, withStem = false, variant = 0 }: Props) {
  const tono = VARIANTES[variant % VARIANTES.length]
  const petFrenteId = `petFrente-${id}`
  const petAtrasId = `petAtras-${id}`
  const cenGradId = `cen-${id}`
  const brilloId = `brillo-${id}`
  const glowId = `glow-${id}`
  const talloGradId = `tallo-${id}`

  const angulos = Array.from({ length: NUM_PETALOS }, (_, i) => (i * 360) / NUM_PETALOS)
  const offsetAtras = 180 / NUM_PETALOS

  return (
    <svg viewBox="0 0 200 320" width={size} height={size * 1.6} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={petFrenteId} x1="0" y1={-LARGO_PETALO} x2="0" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff9a8" />
          <stop offset="30%" stopColor={tono.claro} />
          <stop offset="70%" stopColor={tono.medio} />
          <stop offset="100%" stopColor={tono.oscuro} />
        </linearGradient>
        <linearGradient id={petAtrasId} x1="0" y1={-LARGO_PETALO} x2="0" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={tono.claro} />
          <stop offset="50%" stopColor={tono.medio} />
          <stop offset="100%" stopColor={tono.oscuro} />
        </linearGradient>
        <radialGradient id={cenGradId} cx="38%" cy="30%" r="72%">
          <stop offset="0%" stopColor="#a07840" />
          <stop offset="40%" stopColor="#6b4a22" />
          <stop offset="75%" stopColor="#3d2810" />
          <stop offset="100%" stopColor="#1a0c04" />
        </radialGradient>
        <linearGradient id={talloGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2d5520" />
          <stop offset="50%" stopColor="#4a8a35" />
          <stop offset="100%" stopColor="#2d5520" />
        </linearGradient>
        <filter id={brilloId} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#ffb830" floodOpacity="0.35" />
        </filter>
      </defs>

      {withStem && (
        <g>
          <path
            d={`M100 316 C 97 268 103 228 100 ${CENTRO_Y + 22}`}
            stroke={`url(#${talloGradId})`}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          {/* hoja izquierda — capas semitransparentes para profundidad */}
          <g transform={`translate(100 ${CENTRO_Y + 92}) rotate(-20)`} opacity="0.85">
            <path d={HOJA_PATH} fill="#5cb840" />
            <path d={HOJA_PATH} fill="#3a8a28" transform="translate(-4 2) scale(0.92)" opacity="0.6" />
            <path d={HOJA_VENA} stroke="#2a6018" strokeWidth="1.2" fill="none" opacity="0.7" />
          </g>
          {/* hoja derecha */}
          <g transform={`translate(100 ${CENTRO_Y + 145}) rotate(22) scale(-1 1)`} opacity="0.85">
            <path d={HOJA_PATH} fill="#52b038" />
            <path d={HOJA_PATH} fill="#348020" transform="translate(-3 2) scale(0.9)" opacity="0.55" />
            <path d={HOJA_VENA} stroke="#256018" strokeWidth="1.2" fill="none" opacity="0.7" />
          </g>
          {/* brotes en la base del tallo */}
          <g transform={`translate(100 300)`}>
            <path d="M0,0 Q-18,-14 -28,-6 Q-14,2 0,0" fill="#4a9830" opacity="0.75" />
            <path d="M0,0 Q18,-12 26,-4 Q12,2 0,0" fill="#58b038" opacity="0.7" />
            <path d="M0,0 Q-8,-18 0,-24 Q8,-18 0,0" fill="#62c040" opacity="0.65" />
          </g>
        </g>
      )}

      {/* capa trasera — intercalada, tono más cálido */}
      <Petalos
        angulos={angulos}
        path={PETALO_ATRAS}
        gradId={petAtrasId}
        rotOffset={offsetAtras}
        stroke="rgba(120,60,10,0.45)"
      />
      {/* capa delantera — amarillo brillante, punta afilada */}
      <Petalos
        angulos={angulos}
        path={PETALO_FRENTE}
        gradId={petFrenteId}
        stroke="rgba(90,45,5,0.5)"
      />

      <g filter={`url(#${glowId})`}>
        {/* centro: anillos concéntricos + brillo tipo "ojo" */}
        <circle cx="100" cy={CENTRO_Y} r={RADIO_DISCO + 4} fill="#1a0c04" />
        <circle cx="100" cy={CENTRO_Y} r={RADIO_DISCO - 4} fill="#5c4018" />
        <circle cx="100" cy={CENTRO_Y} r={RADIO_DISCO - 14} fill={`url(#${cenGradId})`} />
        <circle cx="100" cy={CENTRO_Y} r="28" fill="#2a1808" opacity="0.55" />

        {/* reflejo principal — media luna brillante */}
        <path
          d={`M 82 ${CENTRO_Y - 22} A 18 14 0 0 1 96 ${CENTRO_Y - 8} A 14 10 0 0 0 82 ${CENTRO_Y - 22}`}
          fill="rgba(255,255,255,0.55)"
          filter={`url(#${brilloId})`}
        />
        <ellipse cx="86" cy={CENTRO_Y - 16} rx="6" ry="4.5" fill="rgba(255,255,255,0.75)" />

        {/* motas de polen / brillo en el centro */}
        {CHISPAS.map((c, i) => (
          <circle
            key={i}
            cx={c.cx + (variant - 1) * 2}
            cy={c.cy}
            r={c.r}
            fill="rgba(255,240,200,0.7)"
          />
        ))}
      </g>

      {/* chispas flotantes alrededor de la flor */}
      <g opacity="0.6">
        <circle cx="52" cy={CENTRO_Y - 30} r="2" fill="rgba(255,255,255,0.8)" />
        <circle cx="148" cy={CENTRO_Y - 18} r="1.5" fill="rgba(255,255,255,0.7)" />
        <circle cx="140" cy={CENTRO_Y + 40} r="2.2" fill="rgba(255,240,180,0.75)" />
        <circle cx="62" cy={CENTRO_Y + 35} r="1.8" fill="rgba(255,255,255,0.65)" />
        <circle cx="100" cy={CENTRO_Y - 78} r="1.6" fill="rgba(255,255,255,0.55)" />
      </g>
    </svg>
  )
})
