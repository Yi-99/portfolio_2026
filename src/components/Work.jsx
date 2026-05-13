import { useRef } from 'react'
import Glyph from './Glyphs'

const WORK = [
  { id: '01', title: 'Lattice OS', year: '2025', role: 'Lead designer', client: 'Halcyon Robotics', tags: ['Interface', 'Motion', '3D'], span: 'featured', glyph: 'lattice' },
  { id: '02', title: 'Nimbus', year: '2025', role: 'Art direction', client: 'Northwind Labs', tags: ['Brand', 'Type'], span: 'third', glyph: 'rings' },
  { id: '03', title: 'Quietfield', year: '2024', role: 'Product + motion', client: 'Quietfield Health', tags: ['iOS', 'Motion'], span: 'half', glyph: 'ribbon' },
  { id: '04', title: 'Coastline 06', year: '2024', role: 'Generative', client: 'Self-initiated', tags: ['Generative', 'Print'], span: 'half', glyph: 'grid' },
  { id: '05', title: 'Fieldnote', year: '2023', role: 'Product', client: 'Fieldnote', tags: ['Web', 'Editor'], span: 'third', glyph: 'dots' },
  { id: '06', title: 'Concord', year: '2023', role: 'Brand · Web', client: 'Concord.fm', tags: ['Audio', 'Brand'], span: 'third', glyph: 'wave' },
]

function WorkCard({ w, cascade }) {
  const ref = useRef(null)

  function onMove(e) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = ((e.clientX - r.left) / r.width) * 100
    const my = ((e.clientY - r.top) / r.height) * 100
    const tx = (mx - 50) / 50
    const ty = (my - 50) / 50
    el.style.setProperty('--mx', mx + '%')
    el.style.setProperty('--my', my + '%')
    el.style.transform = `perspective(900px) rotateX(${-ty * 2.2}deg) rotateY(${tx * 2.6}deg) translateY(-2px)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = ''
  }

  return (
    <article
      ref={ref}
      className={'card star-enter ' + w.span}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={'Case · ' + w.id}
      data-cascade={cascade}
    >
      <div className="card-thumb">
        <span className="placeholder-tag">Placeholder · {w.glyph}</span>
        <Glyph kind={w.glyph} />
      </div>
      <div>
        <div className="card-head">
          <div className="card-title">{w.title}</div>
          <div className="card-meta">
            <div>{w.id} / {w.year}</div>
            <div style={{ marginTop: 6, color: 'var(--ink-2)', textTransform: 'none', letterSpacing: '0.06em' }}>
              {w.client}
            </div>
          </div>
        </div>
        <div className="card-tags">
          {w.tags.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </article>
  )
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-tag reveal">§ 01 — Selected work</div>
        <h2 className="reveal" data-delay="1">
          A handful of <em>recent</em> orbits — each<br />one a different kind of weather.
        </h2>
        <div className="work-grid">
          {WORK.map((w, i) => <WorkCard key={w.id} w={w} cascade={i + 1} />)}
        </div>
      </div>
    </section>
  )
}
