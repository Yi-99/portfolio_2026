const EXPERIENCE = [
  {
    company: 'HEAL Access USA',
    role: 'Staff Software Engineer',
    period: '2025 — Present',
    logo: '/heal-logo.png',
    thumb: '/heal-thumb.png',
    initials: 'HA',
    href: 'https://heal.engineering',
    points: [
      'Designed shared API frameworks and OAuth 2.0 flows across 7 integrations',
      'Built serverless email pipeline processing 50K+ messages with LLMs at 99.9% reliability',
      'Led architecture decisions for microservices and AI-powered automation',
    ],
  },
  {
    company: 'TDP Bakery',
    role: 'Full-stack Developer',
    period: '2025',
    logo: '/tdp-logo.svg',
    thumb: '/tdp-thumb.png',
    initials: 'TB',
    href: 'https://tdpbakery.com',
    points: [
      'Saved $10K+ by replacing Docuware with in-house file storage feature',
      'Rebuilt product management workflow and UI/UX end-to-end from Microsoft Access into a web application',
      'Designed and solely implemented driver route management UI and .NET APIs',
    ],
  },
  {
    company: 'Pollen Sense',
    role: 'Full-stack Developer Intern',
    period: '2024 — 2025',
    logo: '/pollensense-logo.svg',
    thumb: '/pollensense-thumb.png',
    initials: 'PS',
    href: 'https://pollensense.com',
    points: [
      'Implemented GEM seasonality UI visualized in Google Maps API for dynamic pollen season prediction across hundreds of species',
      'Built delete frames feature end-to-end handling cloud image deletion and SQL Server metadata via Azure App Functions',
      'Improved login, register, and org-join workflows by 50% faster performance',
    ],
  },
  {
    company: 'BYU Broadcasting',
    role: 'Backend Software Developer',
    period: '2023 — 2024',
    logo: '/byutv-logo.svg',
    thumb: '/byutv-thumb.png',
    initials: 'BY',
    href: 'https://www.byutv.org',
    points: [
      'Built highly scalable microservice delivering 1TB+ real-time user data daily via Fargate ECS, ElastiCache, and Kinesis',
      'Achieved 99% success rate under 1000% spike test with 2M+ requests in 9 minutes',
      'Reduced load times 10x by converting REST auth to event-driven architecture on AWS EventBridge and SQS',
    ],
  },
]

function ExpCard({ exp, delay }) {
  function onMove(e) {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const mx = ((e.clientX - r.left) / r.width) * 100
    const my = ((e.clientY - r.top) / r.height) * 100
    const tx = (mx - 50) / 50
    const ty = (my - 50) / 50
    el.style.setProperty('--mx', mx + '%')
    el.style.setProperty('--my', my + '%')
    el.style.transform = `perspective(900px) rotateX(${-ty * 2.2}deg) rotateY(${tx * 2.6}deg) translateY(-2px)`
  }

  function onLeave(e) {
    e.currentTarget.style.transform = ''
  }

  const card = (
    <div
      className="exp-card star-enter"
      data-cascade={delay + 1}
      data-cursor={exp.company}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className="exp-inner">
        <div className="exp-thumb">
          <img src={exp.thumb} alt={exp.company} className="exp-thumb-img" />
          <div className="exp-thumb-overlay">
            <img src={exp.logo} alt="" className="exp-logo-img" />
            <h3 className="exp-company">{exp.company}</h3>
            <span className="exp-period">{exp.period}</span>
          </div>
        </div>
        <div className="exp-reveal">
          <div className="exp-reveal-header">
            <h3 className="exp-company">{exp.company}</h3>
            <span className="exp-role">{exp.role}</span>
            <span className="exp-period">{exp.period}</span>
          </div>
          <ul className="exp-points">
            {exp.points.map((p, j) => (
              <li key={j}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  if (exp.href) {
    return <a href={exp.href} target="_blank" rel="noopener noreferrer" style={{ display: 'contents', textDecoration: 'none', color: 'inherit' }}>{card}</a>
  }
  return card
}

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

        <div className="exp-timeline">
          {EXPERIENCE.map((exp, i) => (
            <ExpCard key={i} exp={exp} delay={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
