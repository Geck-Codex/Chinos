import { useState } from 'react'
import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { WEB3FORMS_ACCESS_KEY } from '../web3formsConfig'

const ESTADOS = [
  'Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche',
  'Chiapas', 'Chihuahua', 'Ciudad de México', 'Coahuila', 'Colima',
  'Durango', 'Estado de México', 'Guanajuato', 'Guerrero', 'Hidalgo',
  'Jalisco', 'Michoacán', 'Morelos', 'Nayarit', 'Nuevo León', 'Oaxaca',
  'Puebla', 'Querétaro', 'Quintana Roo', 'San Luis Potosí', 'Sinaloa',
  'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatán',
  'Zacatecas',
]

const labelStyle: CSSProperties = {
  color: 'rgba(250,251,252,0.4)',
  fontSize: '0.58rem',
  letterSpacing: '0.18em',
}

const fieldStyle: CSSProperties = {
  backgroundColor: 'rgba(250,251,252,0.04)',
  border: '1px solid rgba(250,251,252,0.12)',
  color: '#FAFBFC',
  padding: '13px 16px',
  fontSize: '0.92rem',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s, background-color 0.2s',
}

const EMPTY = { nombre: '', telefono: '', compania: '', estado: '', correo: '' }

type Status = 'idle' | 'sending' | 'ok' | 'error'

export function ContactForm() {
  const [values, setValues] = useState(EMPTY)
  const [status, setStatus] = useState<Status>('idle')

  function update(field: keyof typeof EMPTY) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Nueva cotización — ${values.nombre} (${values.estado})`,
          from_name: 'Handlove Mexico Web',
          replyto: values.correo,
          Nombre: values.nombre,
          Teléfono: values.telefono,
          Correo: values.correo,
          Compañía: values.compania || '—',
          Estado: values.estado,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'error')
      setStatus('ok')
      setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'ok') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          border: '1px solid rgba(205,0,50,0.4)',
          backgroundColor: 'rgba(205,0,50,0.06)',
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <p className="font-black uppercase mb-2" style={{ color: '#FAFBFC', fontSize: '1.4rem' }}>
          ¡Solicitud enviada!
        </p>
        <p className="font-light" style={{ color: 'rgba(250,251,252,0.5)', fontSize: '0.92rem' }}>
          Gracias por contactarnos. Te responderemos en menos de 24 horas.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label className="uppercase font-bold" style={labelStyle} htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          required
          value={values.nombre}
          onChange={update('nombre')}
          placeholder="Tu nombre completo"
          style={fieldStyle}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold" style={labelStyle} htmlFor="telefono">
            Número de teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            required
            value={values.telefono}
            onChange={update('telefono')}
            placeholder="+52 ..."
            style={fieldStyle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold" style={labelStyle} htmlFor="correo">
            Correo
          </label>
          <input
            id="correo"
            name="correo"
            type="email"
            required
            value={values.correo}
            onChange={update('correo')}
            placeholder="tu@correo.com"
            style={fieldStyle}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold" style={labelStyle} htmlFor="compania">
            Compañía
          </label>
          <input
            id="compania"
            name="compania"
            type="text"
            value={values.compania}
            onChange={update('compania')}
            placeholder="Nombre de tu empresa"
            style={fieldStyle}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="uppercase font-bold" style={labelStyle} htmlFor="estado">
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            required
            value={values.estado}
            onChange={update('estado')}
            style={{ ...fieldStyle, appearance: 'none', cursor: 'pointer' }}
          >
            <option value="" disabled>
              Selecciona tu estado
            </option>
            {ESTADOS.map((e) => (
              <option key={e} value={e} style={{ color: '#080403' }}>
                {e}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="font-black uppercase tracking-[0.15em] mt-2"
        style={{
          backgroundColor: '#CD0032',
          color: '#FAFBFC',
          padding: '16px 24px',
          fontSize: '0.8rem',
          cursor: status === 'sending' ? 'wait' : 'pointer',
          border: 'none',
          opacity: status === 'sending' ? 0.6 : 1,
          transition: 'opacity 0.2s',
        }}
      >
        {status === 'sending' ? 'Enviando…' : 'Solicitar cotización'}
      </button>

      {status === 'error' && (
        <p className="font-medium" style={{ color: '#CD0032', fontSize: '0.82rem' }}>
          Ocurrió un error al enviar. Intenta de nuevo o llámanos por teléfono.
        </p>
      )}
    </form>
  )
}
