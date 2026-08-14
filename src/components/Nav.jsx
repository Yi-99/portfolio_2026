import { useState, useEffect } from 'react'
import { getActiveSection } from '../navState.js'

export default function Nav() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const ids = ['about', 'studio', 'work', 'capabilities', 'contact']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    function onScroll() {
      setActive(getActiveSection(sections, window.scrollY, window.innerHeight))
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function go(id) {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' })
  }

  return (
    <nav className="nav" data-cursor="">
      <div className="nav-brand">
        Yirang&nbsp;Lim
      </div>
      <button className={'nav-link' + (active === 'about' ? ' is-active' : '')} onClick={() => go('about')} data-cursor="About">About</button>
      <button className={'nav-link' + (active === 'studio' ? ' is-active' : '')} onClick={() => go('studio')} data-cursor="Experience">Experience</button>
      <button className={'nav-link' + (active === 'work' ? ' is-active' : '')} onClick={() => go('work')} data-cursor="Projects">Projects</button>
      <button className={'nav-link' + (active === 'capabilities' ? ' is-active' : '')} onClick={() => go('capabilities')} data-cursor="Skills">Skills</button>
      <button className="nav-cta" onClick={() => go('contact')} data-cursor="↗"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          e.currentTarget.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%')
          e.currentTarget.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%')
        }}>
        Get in touch
      </button>
    </nav>
  )
}
