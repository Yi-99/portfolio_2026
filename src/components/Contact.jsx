const CHANNELS = [
  { label: 'aria@quill.studio', href: 'mailto:aria@quill.studio' },
  { label: '@ariaquill', href: '#', note: 'Are.na' },
  { label: '@ariaquill', href: '#', note: 'Read.cv' },
  { label: '+44 7700 900 245', href: '#' },
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
        <a href="mailto:aria@quill.studio" className="contact-cta reveal" data-delay="2" data-cursor="Send">
          aria@quill.studio
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
            <span>© Quill Studio · MMXXVI</span>
            <span>v3.2</span>
          </div>
          <div className="col">
            <span>Built quietly in Reykjavík</span>
          </div>
        </div>
      </div>
    </section>
  )
}
