import { useEffect, useState } from 'react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setIsVisible(window.scrollY > 8)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      className={`back-to-top${isVisible ? ' is-visible' : ''}`}
      type="button"
      onClick={goTop}
      data-cursor="Top"
      aria-label="Back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <span aria-hidden="true">↑</span>
      <span>Top</span>
    </button>
  )
}
