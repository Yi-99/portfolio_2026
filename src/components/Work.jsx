import { useRef } from 'react'
import Glyph from './Glyphs'
import { getProjectCardClassName, resolveProjectMedia, setProjectMediaPlaybackState } from './projectMedia'

const WORK = [
  // { id: '00', title: 'Archive · PhiloAI', year: '2026', role: 'Full-stack', client: 'Personal Project', tags: ['LLM', 'React'], span: 'half', glyph: 'grid', href: 'https://archive.philo-ai.com', thumb: '/archive-thumb.png', desc: 'A personal project archiving philosophical texts and insights. Built with React and various web technologies.' },
  { id: '01', title: 'Logos · PhiloAI', year: '2026', role: 'Full-stack · AI', client: 'Personal Project', tags: ['LLM', 'React', 'RAG'], glyph: 'lattice', href: 'https://logos.philo-ai.com', thumb: '/logos-thumb.png', desc: 'AI-powered philosophical exploration platform using RAG pipelines to surface insights from classical texts. Built with React, vector search, and fine-tuned LLMs.' },
  { id: '02', title: 'Nimbus Quote', year: '2026', role: 'Full-stack', client: 'AI Buildery Day @JobNimbus', tags: ['Google APIs', 'Replicate API', 'FastAPI', 'React', 'FastMCP', 'Three.js', 'deck.gl'], glyph: 'grid', href: 'https://nimbusquote.com', localVideo: '/nimbus-quote-demo.mp4', poster: '/nimbus-thumb.png', thumb: '/nimbus-thumb.png', desc: 'Type an address, get a quote-ready roofing estimate. FastAPI + React pipeline pulls slanted roof area from Google Solar API and generates 3D house models via Replicate Hunyuan3D/Tripo3D. 5/5 addresses within ±10% on live accuracy benchmark.' },
  { id: '03', title: 'Halda AI', year: '2026', role: 'Full-stack · AI', client: 'AI Builder Day · UVU + JustBuild', tags: ['Flutter', 'MCP', 'AI', 'Browser Extension'], href: 'https://www.linkedin.com/posts/yirang-lim_hackathon-ai-mcp-ugcPost-7481122986192818176-6u0V/', localVideo: '/halda-ai-demo.mp4', poster: '/halda-ai-demo-poster.jpg', videoOrientation: 'portrait', desc: 'Cross-platform college discovery app that matches students with universities through personalized recommendations, with an MCP-enabled backend and browser extension for application autofill.' },
  { id: '04', title: 'Dub.it (TwelveLab)', year: '2025', role: 'Lead engineer', client: '1st Place · Weber State', tags: ['Extension', 'ElevenLabs', 'Web'], glyph: 'wave', href: 'https://devpost.com/software/elevenlab', loom: '2090f89a248446de8664ff06b365a806', desc: 'Browser extension that dubs web videos in real-time using ElevenLabs voice synthesis. Won 1st place at Weber State hackathon.' },
  { id: '05', title: 'Remi 2.0', year: '2025', role: 'Full-stack', client: '1st Place · JustBuild', tags: ['Google API', 'Solar', 'Maps'], glyph: 'grid', desc: 'Solar panel placement optimizer using Google Maps API for roof detection and energy output estimation. 1st place at JustBuild hackathon.' },
  { id: '06', title: 'Glod-AI', year: '2024', role: 'System design · Backend', client: 'Google Gemini Competition', tags: ['FastAPI', 'Supabase', 'Video'], glyph: 'rings', href: 'https://www.linkedin.com/company/gl%C3%B6d-ai/about/?viewAsMember=true', video: 'uao6JdYdJZE', desc: 'Video analysis platform built for the Google Gemini competition. FastAPI backend with Supabase storage, processing video content through Gemini for intelligent summarization.' },
]

function ProjectMedia({ project, media, onPlaybackChange }) {
  if (media.kind === 'native-video') {
    const video = (
      <video
        className={`card-video card-video--${media.orientation}`}
        src={media.src}
        poster={media.poster}
        title={`${project.title} demo`}
        controls
        playsInline
        preload="metadata"
        onPlay={() => onPlaybackChange(true)}
        onPause={() => onPlaybackChange(false)}
        onEnded={() => onPlaybackChange(false)}
      />
    )

    if (media.orientation === 'portrait') {
      return <div className="card-video-stage card-video-stage--portrait">{video}</div>
    }

    return video
  }

  if (media.kind === 'youtube') {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${media.id}`}
        title={project.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="card-embed"
      />
    )
  }

  if (media.kind === 'loom') {
    return (
      <iframe
        src={`https://www.loom.com/embed/${media.id}`}
        title={project.title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="card-embed"
      />
    )
  }

  if (media.kind === 'image') {
    return <img src={media.src} alt={project.title} className="card-image" loading="lazy" />
  }

  return (
    <>
      <span className="placeholder-tag">Placeholder · {media.glyph}</span>
      <Glyph kind={media.glyph} />
    </>
  )
}

function WorkCard({ w, cascade }) {
  const ref = useRef(null)
  const media = resolveProjectMedia(w)
  const hasInteractiveMedia = ['native-video', 'youtube', 'loom'].includes(media.kind)

  function onPlaybackChange(isPlaying) {
    setProjectMediaPlaybackState(ref.current, media, isPlaying)
  }

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
      className={getProjectCardClassName(media)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor={'Case · ' + w.id}
      data-cascade={cascade}
    >
      <div className="card-body">
        <div className="card-thumb">
          <ProjectMedia project={w} media={media} onPlaybackChange={onPlaybackChange} />
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
          <div className="card-title">
            {w.href && hasInteractiveMedia ? (
              <a href={w.href} target="_blank" rel="noopener noreferrer" className="card-title-link">
                {w.title}<span aria-hidden="true"> ↗</span>
              </a>
            ) : w.title}
          </div>
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

  if (w.href && !hasInteractiveMedia) {
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
          Things I've <em>built</em> — from hackathons<br />to production.
        </h2>
        <div className="work-grid">
          {WORK.map((w, i) => <WorkCard key={w.id} w={w} cascade={i + 1} />)}
        </div>
      </div>
    </section>
  )
}
