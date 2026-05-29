import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const NAV_LINKS = ['Productos', 'Nosotros', 'Mayoreo', 'Contacto']

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 md:px-6 pt-3"
      style={{ pointerEvents: 'none' }}
    >
      <header
        className="mx-auto flex justify-between items-center px-5 md:px-8"
        style={{
          maxWidth: '1680px',
          height: '52px',
          borderRadius: '12px',
          backgroundColor: scrolled ? 'rgba(8,4,3,0.82)' : 'rgba(8,4,3,0.42)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(250,251,252,0.09)',
          transition: 'background-color 0.4s ease',
          pointerEvents: 'all',
        }}
      >
        <a
          href="#"
          className="font-black uppercase tracking-widest"
          style={{ color: '#FAFBFC', fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)', textDecoration: 'none' }}
        >
          Hand<span style={{ color: '#CD0032' }}>love</span>
        </a>

        <nav className="hidden md:flex gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="uppercase tracking-wider font-medium text-sm hover:opacity-40 transition-opacity duration-200"
              style={{ color: '#FAFBFC', textDecoration: 'none' }}
            >
              {link}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          className="uppercase tracking-widest font-bold text-xs px-5 py-2.5"
          style={{ backgroundColor: '#CD0032', color: '#FAFBFC', textDecoration: 'none', borderRadius: '4px' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a80029')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#CD0032')}
        >
          Cotizar
        </a>
      </header>
    </motion.div>
  )
}
