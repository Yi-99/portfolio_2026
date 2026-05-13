export default function Hero() {
  const headline1 = 'Designing'
  const headline2 = 'the spaces'
  const headline3 = 'between'

  function split(str, offset = 0) {
    return str.split('').map((ch, i) => (
      <span
        key={i}
        className="ch"
        data-i={i + offset}
        style={{ display: ch === ' ' ? 'inline' : 'inline-block' }}
      >
        {ch === ' ' ? ' ' : ch}
      </span>
    ))
  }

  const now = new Date()
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

  return (
    <section className="hero">
      <div className="hero-inner shell">
        <div className="eyebrow reveal" data-cursor="">
          <span className="dot" />
          Independent · 2014 — Present
        </div>

        <h1 className="split is-in">
          <span className="word">{split(headline1, 0)}</span>{' '}
          <span className="word"><em>{split(headline2, headline1.length)}</em></span>{' '}
          <span className="word">{split(headline3, headline1.length + headline2.length)}</span>
        </h1>

        <p className="lede reveal" data-delay="3">
          A studio of one — building interfaces, identities and small worlds
          for ambitious teams in emerging technology. Currently accepting one
          engagement for Q3 2026.
        </p>
      </div>

      <div className="hero-meta">
        <div className="col reveal" data-delay="4">
          <span>Reykjavík, IS</span>
          <span>64.146°N · 21.942°W</span>
        </div>
        <div className="col reveal" data-delay="4" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span>Local time</span>
          <span>{time} GMT</span>
        </div>
        <div className="col reveal" data-delay="4" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <span>Availability</span>
          <span>Q3 · 2026</span>
        </div>
      </div>

      <div className="scroll-cue reveal" data-delay="5">
        Scroll to come closer
        <div className="line" />
      </div>
    </section>
  )
}
