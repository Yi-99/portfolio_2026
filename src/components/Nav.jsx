import { useState, useEffect } from 'react'

export default function Nav() {
  const [active, setActive] = useState('work')

  useEffect(() => {
    const ids = ['about', 'studio', 'work', 'capabilities', 'contact']
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)

    function onScroll() {
      const y = window.scrollY + window.innerHeight * 0.35
      let cur = 'work'
      for (const s of sections) {
        if (s.offsetTop <= y) cur = s.id
      }
      setActive(cur)
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
      <div className="nav-brand">Yirang&nbsp;Lim</div>
      <button className={'nav-link' + (active === 'about' ? ' is-active' : '')} onClick={() => go('about')} data-cursor="">About</button>
      <button className={'nav-link' + (active === 'studio' ? ' is-active' : '')} onClick={() => go('studio')} data-cursor="">Experience</button>
      <button className={'nav-link' + (active === 'work' ? ' is-active' : '')} onClick={() => go('work')} data-cursor="">Projects</button>
      <button className={'nav-link' + (active === 'capabilities' ? ' is-active' : '')} onClick={() => go('capabilities')} data-cursor="">Skills</button>
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
