const DETAILS = [
  { label: 'Education', value: 'B.S. Computer Science, Minor in Philosophy — BYU' },
  { label: 'Languages', value: 'Korean (Native) · English (Native) · Persian (Conversational)' },
  { label: 'Interests', value: 'Soccer · Interfaith Dialogue · 1000lbs Club · 500kg Club · Diamond in League' },
]

export default function About() {
  return (
    <section className="section about" id="about">
      <div className="shell">
        <div className="section-tag reveal">§ 00 — About</div>

        <div className="about-layout">
          <div className="about-portrait-wrap">
            <div className="portrait about-portrait reveal" data-cursor="">
              <img src="/portrait.png" alt="Portrait of Yirang Lim" />
            </div>
            <div className="about-name reveal" data-delay="1">
              <h3>Yirang Lim</h3>
              <span>Staff Software Engineer</span>
            </div>
          </div>

          <div className="about-content">
            <h2 className="about-heading reveal" data-delay="1">
              Engineer with a<br />
              philosophy <em>minor</em> — because<br />
              <em>why</em> matters as much as how.
            </h2>
            <p className="about-bio reveal" data-delay="2">
              I build systems that scale — from serverless pipelines processing
              50K+ messages to microservices handling 2M+ requests under stress.
              4x hackathon champion with a bias toward shipping fast and iterating.
            </p>

            <div className="about-details">
              {DETAILS.map((d, i) => (
                <div key={i} className="about-detail reveal" data-delay={i + 2}>
                  <span className="about-detail-label">{d.label}</span>
                  <span className="about-detail-value">{d.value}</span>
                </div>
              ))}
            </div>

            <div className="about-badges">
              <div className="about-badge reveal" data-delay="3">
                <span className="about-badge-num">4x</span>
                <span className="about-badge-lab">1st Place Hackathon Champion</span>
              </div>
              <div className="about-badge reveal" data-delay="4">
                <span className="about-badge-num">2x</span>
                <span className="about-badge-lab">Runner-up</span>
              </div>
              <div className="about-badge reveal" data-delay="5">
                <span className="about-badge-num">Founder</span>
                <span className="about-badge-lab">PhiloAI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
