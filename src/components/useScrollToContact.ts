import type { MouseEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useScrollToContact() {
  const navigate = useNavigate()
  const location = useLocation()

  return (e?: MouseEvent) => {
    e?.preventDefault()

    const scrollNow = () =>
      document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })

    const tryScroll = (attempts: number) => {
      const target = document.getElementById('contacto')
      // Esperar a que la sección exista y a que el scroll del documento esté
      // desbloqueado (el modal pone body overflow:hidden mientras se cierra).
      const ready = target && document.body.style.overflow !== 'hidden'
      if (ready) {
        scrollNow()
        // Correcciones por imágenes/escenas 3D que cargan tarde y desplazan la sección.
        setTimeout(scrollNow, 350)
        setTimeout(scrollNow, 800)
        setTimeout(scrollNow, 1400)
        return
      }
      if (attempts < 60) setTimeout(() => tryScroll(attempts + 1), 80)
    }

    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => tryScroll(0), 100)
    } else {
      setTimeout(() => tryScroll(0), 60)
    }
  }
}
