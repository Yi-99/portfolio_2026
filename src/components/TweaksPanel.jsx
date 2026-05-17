import { useState, useCallback, useEffect } from 'react'

function TweakSection({ label }) {
  return <div className="twk-sect">{label}</div>
}

function TweakRow({ label, value, children }) {
  return (
    <div className="twk-row">
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  )
}

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
        value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  )
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o
          const l = typeof o === 'object' ? o.label : o
          return <option key={v} value={v}>{l}</option>
        })}
      </select>
    </TweakRow>
  )
}

function isLight(hex) {
  const h = String(hex).replace('#', '')
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0')
  const n = parseInt(x.slice(0, 6), 16)
  if (Number.isNaN(n)) return true
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return r * 299 + g * 587 + b * 114 > 148000
}

function TweakColor({ label, value, options, onChange }) {
  const cur = JSON.stringify(value)?.toLowerCase()
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const on = JSON.stringify(o)?.toLowerCase() === cur
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
              aria-checked={on} data-on={on ? '1' : '0'}
              style={{ background: o }}
              onClick={() => onChange(o)}>
              {on && (
                <svg viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round"
                    stroke={isLight(o) ? 'rgba(0,0,0,.78)' : '#fff'} />
                </svg>
              )}
            </button>
          )
        })}
      </div>
    </TweakRow>
  )
}

export default function TweaksPanel({ sceneRef }) {
  const [open, setOpen] = useState(false)
  const [tweaks, setTweaks] = useState({
    accent: '#7aa9ff',
    geometry: 'icosahedron',
    density: 2.0,
    fog: 0.024,
  })

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      sceneRef.current?.setDensity(2.0)
    })
    return () => cancelAnimationFrame(id)
  }, [sceneRef])

  const setTweak = useCallback((key, val) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: val }

      if (key === 'accent') {
        document.documentElement.style.setProperty('--accent', val)
        const r = parseInt(val.slice(1, 3), 16)
        const g = parseInt(val.slice(3, 5), 16)
        const b = parseInt(val.slice(5, 7), 16)
        document.documentElement.style.setProperty('--accent-rgb', `${r},${g},${b}`)
        document.documentElement.style.setProperty('--accent-2', `rgba(${r},${g},${b},0.18)`)
        sceneRef.current?.setAccent(val)
      } else if (key === 'geometry') {
        sceneRef.current?.setGeometry(val)
      } else if (key === 'density') {
        sceneRef.current?.setDensity(val)
      } else if (key === 'fog') {
        sceneRef.current?.setFog(val)
      }

      return next
    })
  }, [sceneRef])

  if (!open) {
    return (
      <button className="twk-toggle-btn" onClick={() => setOpen(true)}>
        ⚙
      </button>
    )
  }

  return (
    <div className="twk-panel">
      <div className="twk-hd">
        <b>Tweaks</b>
        <button className="twk-x" onClick={() => setOpen(false)}>✕</button>
      </div>
      <div className="twk-body">
        <TweakSection label="Scene" />
        <TweakSelect label="Geometry" value={tweaks.geometry}
          options={['icosahedron', 'torus', 'octahedron', 'dodecahedron']}
          onChange={(v) => setTweak('geometry', v)} />
        <TweakSlider label="Star density" value={tweaks.density}
          min={0.2} max={2.0} step={0.05}
          onChange={(v) => setTweak('density', v)} />
        <TweakSlider label="Fog" value={tweaks.fog}
          min={0.005} max={0.05} step={0.001}
          onChange={(v) => setTweak('fog', v)} />

        <TweakSection label="Accent" />
        <TweakColor label="Color" value={tweaks.accent}
          options={['#7aa9ff', '#d97757', '#7fe3a4', '#e5d0a0', '#ff6b9d']}
          onChange={(v) => setTweak('accent', v)} />
      </div>
    </div>
  )
}
