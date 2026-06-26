import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollUpButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          aria-label="Volver arriba"
          onClick={scrollUp}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.08, backgroundColor: '#a80029' }}
          whileTap={{ scale: 0.92 }}
          style={{
            position: 'fixed',
            bottom: 'clamp(20px, 4vw, 36px)',
            right: 'clamp(20px, 4vw, 36px)',
            zIndex: 900,
            width: '52px',
            height: '52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#CD0032',
            color: '#FAFBFC',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 10px 28px rgba(0,0,0,0.35)',
          }}
        >
          <ArrowUp size={22} strokeWidth={2.4} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
