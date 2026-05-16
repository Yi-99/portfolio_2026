import { useEffect } from 'react'

export default function CustomCursor() {
  useEffect(() => {
    const ring = document.querySelector('.cursor-ring')
    const dot = document.querySelector('.cursor-dot')
    const label = document.querySelector('.cursor-label')
    if (!ring || !dot) return

    let x = window.innerWidth / 2, y = window.innerHeight / 2
    let rx = x, ry = y
    let raf = 0

    function move(e) {
      x = e.clientX
      y = e.clientY
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    function loop() {
      rx += (x - rx) * 0.18
      ry += (y - ry) * 0.18
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    function over(e) {
      const t = e.target.closest('[data-cursor]')
      if (t) {
        ring.classList.add('is-hover')
        const lbl = t.getAttribute('data-cursor')
        if (label) label.textContent = lbl || ''
      } else {
        ring.classList.remove('is-hover')
        if (label) label.textContent = ''
      }
    }

    function down() { ring.classList.add('is-press') }
    function up() { ring.classList.remove('is-press') }
    function leave() { ring.style.opacity = 0; dot.style.opacity = 0 }
    function enter() { ring.style.opacity = 1; dot.style.opacity = 1 }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerover', over)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring">
        <span className="cursor-label">View</span>
      </div>
      <div className="cursor-dot" />
    </>
  )
}
