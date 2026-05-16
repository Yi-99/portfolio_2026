const CHANNELS = [
  { label: 'yirang-lim', href: 'https://www.linkedin.com/in/yirang-lim', note: 'LinkedIn' },
  { label: 'Yi-99', href: 'https://github.com/Yi-99', note: 'GitHub' },
  { label: '(334) 922-9715', href: 'tel:+13349229715' },
]

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <div className="section-tag reveal" style={{ justifyContent: 'center', display: 'inline-flex' }}>
          § 05 — Get in touch
        </div>
        <h2 className="reveal" data-delay="1">
          Have a vision that<br />
          needs <em>engineering?</em>
        </h2>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=ylim.8299@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-cta reveal"
          data-delay="2"
          data-cursor="Send"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--cx', ((e.clientX - r.left) / r.width * 100) + '%')
            e.currentTarget.style.setProperty('--cy', ((e.clientY - r.top) / r.height * 100) + '%')
          }}>
          ylim.8299@gmail.com
          <span className="glyph" />
        </a>
        <div className="contact-channels">
          {CHANNELS.map((c, i) => (
            <a key={i} href={c.href} className="chan reveal" data-delay={i + 1} data-cursor="">
              {c.note ? <span className="at">{c.note}</span> : null}{c.label}
            </a>
          ))}
        </div>
        <div className="foot">
          <div className="col">
            <span>© Yirang Lim · 2026</span>
          </div>
          <div className="col">
            <span>Built with React + Three.js</span>
          </div>
        </div>
      </div>
    </section>
  )
}
