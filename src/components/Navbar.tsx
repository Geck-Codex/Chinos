import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Productos', href: '/productos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    if (href.startsWith('#')) {
      const scroll = () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(scroll, 120)
      } else {
        setTimeout(scroll, 60)
      }
    } else {
      navigate(href)
    }
  }

  const bar = (open: string, closed: string, extra: React.CSSProperties = {}): React.CSSProperties => ({
    display: 'block',
    height: '2px',
    width: '22px',
    backgroundColor: '#FAFBFC',
    borderRadius: '2px',
    transformOrigin: 'center',
    transform: menuOpen ? open : closed,
    transition: `transform 0.35s ${EASE}, opacity 0.2s ease-in-out`,
    ...extra,
  })

  return (
    <>
      <div
        className="nav-enter fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-3"
        style={{ pointerEvents: 'none' }}
      >
        <header
          className="mx-auto flex justify-between items-center px-5 md:px-8"
          style={{
            maxWidth: '1680px',
            height: '52px',
            borderRadius: '12px',
            backgroundColor: scrolled ? 'rgba(8,4,3,0.92)' : 'rgba(8,4,3,0.42)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(250,251,252,0.09)',
            transition: 'background-color 0.4s ease',
            pointerEvents: 'all',
          }}
        >
          {/* Logo */}
          <a href="/" onClick={(e) => handleLink(e, '/')} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '9px' }}>
            <img src="/images/handlove.png" alt="" width={26} height={26} style={{ height: '26px', width: 'auto' }} />
            <span
              className="font-black uppercase tracking-widest"
              style={{ color: '#FAFBFC', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
            >
              Handlove
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLink(e, link.href)}
                className="uppercase tracking-wider font-medium text-sm hover:opacity-40 transition-opacity duration-200"
                style={{ color: '#FAFBFC', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* CTA — solo en desktop, abre WhatsApp directo */}
            <a
              href="https://wa.me/5216144864571"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block uppercase tracking-widest font-bold text-xs px-5 py-2.5"
              style={{ backgroundColor: '#CD0032', color: '#FAFBFC', textDecoration: 'none', borderRadius: '6px' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
            >
              Cotizar
            </a>

            {/* Hamburger animado — solo visible en mobile */}
            <button
              className="md:hidden flex flex-col justify-center items-center"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', width: '32px', height: '32px', gap: 0 }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span style={bar('translateY(7px) rotate(45deg)', 'translateY(0) rotate(0)', { marginBottom: '5px' })} />
              <span style={bar('scaleX(0)', 'scaleX(1)', { marginBottom: '5px', opacity: menuOpen ? 0 : 1 })} />
              <span style={bar('translateY(-7px) rotate(-45deg)', 'translateY(0) rotate(0)')} />
            </button>
          </div>
        </header>
      </div>

      {/* Mobile menu overlay — siempre montado, animado por CSS para entrada y salida */}
      <div
        className="fixed inset-0 z-40 flex flex-col"
        style={{
          backgroundColor: '#080403',
          clipPath: menuOpen ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: `clip-path 0.4s ${EASE}, opacity 0.4s ${EASE}`,
        }}
      >
        {/* Acento rojo izquierdo */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

        <nav className="flex flex-col justify-center flex-1 px-10 gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLink(e, link.href)}
              className="font-black uppercase tracking-tight leading-none py-4"
              style={{
                color: '#FAFBFC',
                textDecoration: 'none',
                fontSize: 'clamp(2.4rem, 10vw, 4rem)',
                borderBottom: '1px solid rgba(250,251,252,0.08)',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-32px)',
                transition: `opacity 0.45s ${EASE} ${menuOpen ? 0.12 + i * 0.07 : 0}s, transform 0.45s ${EASE} ${menuOpen ? 0.12 + i * 0.07 : 0}s`,
              }}
              onTouchStart={(e) => (e.currentTarget.style.color = '#CD0032')}
              onTouchEnd={(e) => (e.currentTarget.style.color = '#FAFBFC')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="px-10 pb-12" style={{ opacity: menuOpen ? 1 : 0, transition: `opacity 0.4s ease ${menuOpen ? 0.45 : 0}s` }}>
          <a
            href="#contacto"
            onClick={(e) => handleLink(e, '#contacto')}
            className="inline-block uppercase tracking-widest font-bold px-8 py-4 w-full text-center"
            style={{ backgroundColor: '#CD0032', color: '#FAFBFC', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
          >
            Solicitar cotización
          </a>
        </div>
      </div>
    </>
  )
}
