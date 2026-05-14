import { useRef } from 'react'
import Glyph from './Glyphs'

const WORK = [
  { id: '01', title: 'Logos · PhiloAI', year: '2025', role: 'Full-stack · AI', client: 'Personal Project', tags: ['LLM', 'React', 'RAG'], span: 'half', glyph: 'lattice', href: 'https://logos.philo-ai.com', thumb: '/logos-thumb.png', desc: 'AI-powered philosophical exploration platform using RAG pipelines to surface insights from classical texts. Built with React, vector search, and fine-tuned LLMs.' },
  { id: '02', title: 'Nimbus Quote', year: '2025', role: 'Full-stack', client: 'Remi · Roofing SaaS', tags: ['3D', 'Google Maps', 'React'], span: 'half', glyph: 'grid', href: 'https://nimbusquote.com', thumb: '/nimbus-thumb.png', desc: 'Roofing estimation SaaS with 3D roof visualization on Google Maps. Instant quotes from aerial imagery with interactive measurement tools.' },
  { id: '03', title: 'Dub.it', year: '2025', role: 'Lead engineer', client: '1st Place · Weber State', tags: ['Extension', 'ElevenLabs', 'Web'], span: 'half', glyph: 'wave', desc: 'Browser extension that dubs web videos in real-time using ElevenLabs voice synthesis. Won 1st place at Weber State hackathon.' },
  { id: '04', title: 'Remi 2.0', year: '2025', role: 'Full-stack', client: '1st Place · JustBuild', tags: ['Google API', 'Solar', 'Maps'], span: 'half', glyph: 'grid', desc: 'Solar panel placement optimizer using Google Maps API for roof detection and energy output estimation. 1st place at JustBuild hackathon.' },
  { id: '05', title: 'Glod-AI', year: '2024', role: 'System design · Backend', client: 'Google Gemini Competition', tags: ['FastAPI', 'Supabase', 'Video'], span: 'featured', glyph: 'rings', href: 'https://www.linkedin.com/company/gl%C3%B6d-ai/about/?viewAsMember=true', desc: 'Video analysis platform built for the Google Gemini competition. FastAPI backend with Supabase storage, processing video content through Gemini for intelligent summarization.' },
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

  const card = (
    <article
      ref={ref}
      className={'card star-enter ' + w.span}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={'Case · ' + w.id}
      data-cascade={cascade}
    >
      <div className="card-body">
        <div className="card-thumb">
          {w.thumb ? (
            <img src={w.thumb} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
          ) : (
            <>
              <span className="placeholder-tag">Placeholder · {w.glyph}</span>
              <Glyph kind={w.glyph} />
            </>
          )}
        </div>
        <div className="card-details">
          <p className="card-desc">{w.desc}</p>
          <div className="card-detail-meta">
            <span>{w.role}</span>
            <span>{w.client}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="card-head">
          <div className="card-title">{w.title}</div>
          <div className="card-meta">
            <div>{w.id} / {w.year}</div>
          </div>
        </div>
        <div className="card-tags">
          {w.tags.map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
    </article>
  )

  if (w.href) {
    return <a href={w.href} target="_blank" rel="noopener noreferrer" style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>{card}</a>
  }
  return card
}

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-tag reveal">§ 03 — Projects</div>
        <h2 className="reveal" data-delay="1">
          Things I've <em>built</em> — from hackathons<br />to production systems.
        </h2>
        <div className="work-grid">
          {WORK.map((w, i) => <WorkCard key={w.id} w={w} cascade={i + 1} />)}
        </div>
      </div>
    </section>
  )
}
