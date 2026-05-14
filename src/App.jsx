import { useEffect, useRef } from 'react'
import Scene from './components/Scene'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Work from './components/Work'
import Studio from './components/Studio'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import TweaksPanel from './components/TweaksPanel'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .split, .star-enter')
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in')
          if (!e.target.classList.contains('star-enter')) {
            io.unobserve(e.target)
          }
        } else if (e.target.classList.contains('star-enter')) {
          e.target.classList.remove('is-in')
        }
      }
    }, { threshold: 0.18, rootMargin: '0px 0px -60px 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  useReveal()
  const sceneRef = useRef(null)

  return (
    <>
      <Scene ref={sceneRef} />
      <div className="veil" />
      <div className="grain" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Studio />
        <Work />
        <Capabilities />
        <Contact />
      </main>
      <TweaksPanel sceneRef={sceneRef} />
    </>
  )
}
