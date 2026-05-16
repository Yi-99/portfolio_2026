const CAPABILITIES = [
  { idx: '01', name: 'Full-stack development', desc: 'Flutter and Dart for mobile. React on the front. FastAPI on the back. End-to-end ownership.', range: 'Dart · TypeScript · Python' },
  { idx: '02', name: 'Cloud & infrastructure', desc: 'AWS Lambda, ECS, SQS, EventBridge, ElastiCache. Docker, Terraform, GitHub Actions.', range: 'Terraform · AWS · Docker' },
  { idx: '03', name: 'API design & integration', desc: 'RESTful APIs, OAuth 2.0 (PKCE), shared frameworks across 7+ third-party providers.', range: 'REST · OAuth' },
  { idx: '04', name: 'Data & ELT pipelines', desc: 'PostgreSQL, DynamoDB, Redis, MongoDB. RAG engines with pgvector. LLM-powered processing.', range: 'SQL · LLM' },
  { idx: '05', name: 'Testing & performance', desc: 'TDD with pytest and integration testing with Localstack.', range: 'Localstack · pytest' },
]

export default function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="shell">
        <div className="section-tag reveal">§ 04 — Skills</div>
        <h2 className="reveal" data-delay="1">
          What I <em>work</em><br />
          with every day.
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
