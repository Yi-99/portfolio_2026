const STATS = [
  { num: '11', lab: 'Years independent' },
  { num: '47', lab: 'Shipped projects' },
  { num: '4', lab: 'Awwwards · SoTD' },
]

export default function Studio() {
  return (
    <section className="section" id="studio">
      <div className="shell">
        <div className="section-tag reveal">§ 02 — Studio</div>
        <h2 className="reveal" data-delay="1">
          <em>Eleven years</em> of designing<br />
          for teams who would rather<br />
          be making than describing.
        </h2>
        <div className="about-grid">
          <div className="about-copy">
            <p className="reveal">
              <strong>Aria Quill</strong> is an independent design practice operating out of a small studio in Reykjavík. The work moves between product, brand and motion — though those lines blur most weeks.
            </p>
            <p className="reveal" data-delay="1">
              Engagements are kept deliberately small: one project at a time, four to twelve weeks, embedded with the founding team. Clients have included early-stage robotics labs, audio platforms, climate instruments and a handful of artists.
            </p>
            <p className="reveal" data-delay="2">
              Outside of client work I write infrequently about typography, latency and the quiet design of physical things. The studio runs an annual fellowship — one designer, one summer, no deliverables.
            </p>
            <div className="stat-grid">
              {STATS.map((s, i) => (
                <div key={i} className="stat reveal" data-delay={i + 1}>
                  <div className="num">{s.num}</div>
                  <div className="lab">{s.lab}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="portrait reveal" data-delay="2" data-cursor="">
            <span className="placeholder-tag">Drop portrait · 4:5</span>
            <div className="cross">A·Q</div>
          </div>
        </div>
      </div>
    </section>
  )
}
