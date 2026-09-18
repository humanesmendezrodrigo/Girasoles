import frame1 from '../../assets/frames/frame-1.png'
import frame2 from '../../assets/frames/frame-2.png'
import frame3 from '../../assets/frames/frame-3.png'
import frame4 from '../../assets/frames/frame-4.png'
import frame5 from '../../assets/frames/frame-5.png'
import frame6 from '../../assets/frames/frame-6.png'

export interface Cuadro {
  src: string
  etiqueta: string
}

// El orden define el recorrido: del campo abierto hasta la carta final.
// Para agregar un cuadro nuevo, solo hay que importarlo arriba y añadirlo aquí.
export const cuadros: Cuadro[] = [
  { src: frame1, etiqueta: 'campo-amplio' },
  { src: frame2, etiqueta: 'acercandose' },
  { src: frame3, etiqueta: 'entre-girasoles' },
  { src: frame4, etiqueta: 'girasol-central' },
  { src: frame5, etiqueta: 'carta-lejos' },
  { src: frame6, etiqueta: 'carta-cerca' },
]
