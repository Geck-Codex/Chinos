import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Productos', href: '/productos' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Mayoreo', href: '#mayoreo' },
  { label: 'Contacto', href: '#contacto' },
]

const EASE = [0.22, 1, 0.36, 1] as const

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

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-3"
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
            <img src="/images/handlove.png" alt="" style={{ height: '26px', width: 'auto' }} />
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
            {/* CTA — solo en desktop */}
            <a
              href="#contacto"
              onClick={(e) => handleLink(e, '#contacto')}
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
              {/* Barra superior */}
              <motion.span
                animate={menuOpen
                  ? { rotate: 45, y: 7, width: '22px' }
                  : { rotate: 0, y: 0, width: '22px' }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'block', height: '2px', backgroundColor: '#FAFBFC', borderRadius: '2px', transformOrigin: 'center', marginBottom: '5px' }}
              />
              {/* Barra media */}
              <motion.span
                animate={menuOpen
                  ? { scaleX: 0, opacity: 0 }
                  : { scaleX: 1, opacity: 1 }
                }
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ display: 'block', height: '2px', width: '22px', backgroundColor: '#FAFBFC', borderRadius: '2px', transformOrigin: 'center', marginBottom: '5px' }}
              />
              {/* Barra inferior */}
              <motion.span
                animate={menuOpen
                  ? { rotate: -45, y: -7, width: '22px' }
                  : { rotate: 0, y: 0, width: '22px' }
                }
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'block', height: '2px', backgroundColor: '#FAFBFC', borderRadius: '2px', transformOrigin: 'center' }}
              />
            </button>
          </div>
        </header>
      </motion.div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ backgroundColor: '#080403' }}
          >
            {/* Acento rojo izquierdo */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: '#CD0032' }} />

            <nav className="flex flex-col justify-center flex-1 px-10 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLink(e, link.href)}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.45, ease: EASE }}
                  className="font-black uppercase tracking-tight leading-none py-4"
                  style={{
                    color: '#FAFBFC',
                    textDecoration: 'none',
                    fontSize: 'clamp(2.4rem, 10vw, 4rem)',
                    borderBottom: '1px solid rgba(250,251,252,0.08)',
                  }}
                  onTouchStart={(e) => (e.currentTarget.style.color = '#CD0032')}
                  onTouchEnd={(e) => (e.currentTarget.style.color = '#FAFBFC')}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="px-10 pb-12"
            >
              <a
                href="#contacto"
                onClick={(e) => handleLink(e, '#contacto')}
                className="inline-block uppercase tracking-widest font-bold px-8 py-4 w-full text-center"
                style={{ backgroundColor: '#CD0032', color: '#FAFBFC', textDecoration: 'none', fontSize: 'clamp(0.85rem, 1.2vw, 1rem)', borderRadius: '6px' }}
              >
                Solicitar cotización
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
