import { useState, useEffect } from 'react'

export default function Nav() {
  const [active, setActive] = useState('work')

  useEffect(() => {
    const ids = ['work', 'studio', 'capabilities', 'contact']
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
      <div className="nav-brand">Aria&nbsp;Quill / Studio</div>
      <button className={'nav-link' + (active === 'work' ? ' is-active' : '')} onClick={() => go('work')} data-cursor="">Work</button>
      <button className={'nav-link' + (active === 'studio' ? ' is-active' : '')} onClick={() => go('studio')} data-cursor="">Studio</button>
      <button className={'nav-link' + (active === 'capabilities' ? ' is-active' : '')} onClick={() => go('capabilities')} data-cursor="">Practice</button>
      <button className="nav-cta" onClick={() => go('contact')} data-cursor="↗">
        Get in touch
      </button>
    </nav>
  )
}
