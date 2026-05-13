const CAPABILITIES = [
  { idx: '01', name: 'Interface design', desc: 'Product surfaces — from first-principles flow design to production-ready component systems.', range: '4–12 wks' },
  { idx: '02', name: 'Motion + interaction', desc: 'The choreography of a product. State changes, transitions, micro-feedback, hero moments.', range: '2–6 wks' },
  { idx: '03', name: 'Brand identity', desc: 'Marks, type systems, and the rules that hold them together across surface and time.', range: '6–10 wks' },
  { idx: '04', name: 'Creative direction', desc: 'Embedded direction for in-house teams; one foot in product, one foot in marketing.', range: 'Ongoing' },
  { idx: '05', name: 'Generative + 3D', desc: 'Procedural systems, real-time scenes, and the slow art of making computers feel handmade.', range: 'Variable' },
]

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <div className="section-tag reveal">§ 03 — Practice</div>
        <h2 className="reveal" data-delay="1">
          What the studio<br />
          actually <em>does</em>.
        </h2>
        <div className="cap-list">
          {CAPABILITIES.map((c, i) => (
            <div key={i} className="cap-row reveal" data-delay={i} data-cursor="Brief">
              <div className="idx">{c.idx}</div>
              <div className="name">{c.name}</div>
              <div className="desc">{c.desc}</div>
              <div className="meta">{c.range}</div>
              <span className="arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
