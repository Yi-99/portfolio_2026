import { useEffect } from 'react'
import Scene from './components/Scene'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import BackToTop from './components/BackToTop'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Studio from './components/Studio'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import { shouldRemainRevealed } from './revealState'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .split, .star-enter')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const wasRevealed = e.target.classList.contains('is-in')
        if (shouldRemainRevealed(wasRevealed, e.isIntersecting)) {
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()

  return (
    <>
      <Scene />
      <div className="veil" />
      <div className="grain" />
      <CustomCursor />
      <Nav />
      <BackToTop />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Studio />
        <Work />
        <Capabilities />
        <Contact />
      </main>
    </>
  )
}
