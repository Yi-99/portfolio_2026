import { useState, useEffect, useRef } from 'react'

const DETAILS = [
  { label: 'Education', value: 'B.S. Computer Science, Minor in Philosophy — BYU' },
  { label: 'Languages', value: 'Korean (Native) · English (Native) · Persian (Conversational)' },
  { label: 'Interests', value: 'Soccer · Interfaith Dialogue · 1000lbs Club · 500kg Club · Diamond in League' },
]

const HEADING_SEGMENTS = [
  { text: 'Engineer with a' },
  { break: true },
  { text: 'philosophy ' },
  { text: 'minor', em: true },
  { text: ' — because' },
  { break: true },
  { text: 'why', em: true },
  { text: ' matters as much as how.' },
]

function useTypewriter(segments, speed = 38) {
  const [displayed, setDisplayed] = useState([])
  const [done, setDone] = useState(false)
  const started = useRef(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          startTyping()
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  function startTyping() {
    const flat = []
    for (const seg of segments) {
      if (seg.break) {
        flat.push({ type: 'break' })
      } else {
        for (const ch of seg.text) {
          flat.push({ type: 'char', ch, em: seg.em || false })
        }
      }
    }

    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(flat.slice(0, i))
      if (i >= flat.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
  }

  return { displayed, done, sectionRef }
}

function TypedHeading({ displayed }) {
  const elements = []
  let emBuffer = ''
  let key = 0

  function flushEm() {
    if (emBuffer) {
      elements.push(<em key={key++}>{emBuffer}</em>)
      emBuffer = ''
    }
  }

  for (const item of displayed) {
    if (item.type === 'break') {
      flushEm()
      elements.push(<br key={key++} />)
    } else if (item.em) {
      emBuffer += item.ch
    } else {
      flushEm()
      elements.push(item.ch)
    }
  }
  flushEm()

  return (
    <h2 className="about-heading">
      {elements}
    </h2>
  )
}

export default function About() {
  const { displayed, done, sectionRef } = useTypewriter(HEADING_SEGMENTS, 38)

  return (
    <section className="section about" id="about" ref={sectionRef}>
      <div className="shell">
        <div className="section-tag reveal">§ 00 — About</div>

        <div className="about-layout">
          <div className="about-portrait-wrap">
            <div className="portrait about-portrait reveal" data-cursor="">
              <img src="/portrait.png" alt="Portrait of Yirang Lim" />
            </div>
            <div className="about-name reveal" data-delay="1">
              <h3>Yirang Lim</h3>
              <span>Staff Software Engineer</span>
            </div>
          </div>

          <div className="about-content">
            <TypedHeading displayed={displayed} />
            <div className={`about-after-heading${done ? ' is-visible' : ''}`}>
              <p className="about-bio">
                I build systems that scale — from serverless pipelines processing
                50K+ messages to microservices handling 2M+ requests under stress.
                4x hackathon champion with a bias toward shipping fast and iterating.
              </p>

              <div className="about-details">
                {DETAILS.map((d, i) => (
                  <div key={i} className="about-detail" style={{ transitionDelay: `${i * 0.08}s` }}>
                    <span className="about-detail-label">{d.label}</span>
                    <span className="about-detail-value">{d.value}</span>
                  </div>
                ))}
              </div>

              <div className="about-badges">
                <div className="about-badge" style={{ transitionDelay: '0.1s' }}>
                  <span className="about-badge-num">4x</span>
                  <span className="about-badge-lab">1st Place Hackathon Champion</span>
                </div>
                <div className="about-badge" style={{ transitionDelay: '0.2s' }}>
                  <span className="about-badge-num">2x</span>
                  <span className="about-badge-lab">Runner-up</span>
                </div>
                <div className="about-badge" style={{ transitionDelay: '0.3s' }}>
                  <span className="about-badge-num">Founder</span>
                  <span className="about-badge-lab">PhiloAI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
