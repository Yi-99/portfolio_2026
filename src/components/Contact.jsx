const CHANNELS = [
  { label: 'ylim.8299@gmail.com', href: 'mailto:ylim.8299@gmail.com' },
  { label: 'yirang-lim', href: 'https://www.linkedin.com/in/yirang-lim', note: 'LinkedIn' },
  { label: 'Yi-99', href: 'https://github.com/Yi-99', note: 'GitHub' },
  { label: '(334) 922-9715', href: 'tel:+13349229715' },
]

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="shell">
        <div className="section-tag reveal" style={{ justifyContent: 'center', display: 'inline-flex' }}>
          § 04 — Get in touch
        </div>
        <h2 className="reveal" data-delay="1">
          Have a project that<br />
          deserves <em>patience?</em>
        </h2>
        <a href="mailto:ylim.8299@gmail.com" className="contact-cta reveal" data-delay="2" data-cursor="Send">
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
