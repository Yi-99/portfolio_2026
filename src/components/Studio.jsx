const STATS = [
  { num: '5x', lab: '1st Place Hackathons' },
  { num: '7', lab: 'API Integrations' },
  { num: '99.9%', lab: 'Delivery Reliability' },
]

export default function Studio() {
  return (
    <section className="section" id="studio">
      <div className="shell">
        <div className="section-tag reveal">§ 02 — Experience</div>
        <h2 className="reveal" data-delay="1">
          From <em>microservices</em> to<br />
          AI pipelines — building<br />
          systems that scale.
        </h2>
        <div className="about-grid">
          <div className="about-copy">
            <p className="reveal">
              <strong>Staff Software Engineer at HEAL Access USA</strong> — designing shared API frameworks, OAuth 2.0 flows across 7 integrations, and a serverless email pipeline processing 50K+ messages with LLMs at 99.9% reliability.
            </p>
            <p className="reveal" data-delay="1">
              Previously at <strong>BYU Broadcasting</strong>, built a highly scalable microservice delivering 1TB+ of real-time user data daily via Fargate ECS, ElastiCache, and Kinesis — achieving 99% success rate under 1000% spike tests with 2M+ requests in 9 minutes.
            </p>
            <p className="reveal" data-delay="2">
              At <strong>TDP Bakery</strong>, replaced legacy Docuware with an in-house solution saving $10K+, and rebuilt product management workflows from Microsoft Access into a modern web application with .NET APIs.
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
            <div className="cross">Y·L</div>
          </div>
        </div>
      </div>
    </section>
  )
}
