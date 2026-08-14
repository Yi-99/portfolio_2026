export default function Hero() {
  const headline1 = 'Building'
  const headline2 = 'what matters'
  const headline3 = 'at scale'

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
          Software Engineer · HEAL Access USA
        </div>

        <h1 className="split is-in">
          <span className="word">{split(headline1, 0)}</span>{' '}
          <span className="word"><em>{split(headline2, headline1.length)}</em></span>{' '}
          <span className="word">{split(headline3, headline1.length + headline2.length)}</span>
        </h1>

        <p className="lede reveal" data-delay="3">
          Full-stack engineer with a knack for scalable systems, cloud infrastructure,
          and AI-powered pipelines.
        </p>
      </div>

      <div className="hero-meta">
        <div className="col reveal" data-delay="4">
          <span>Lehi, UT</span>
        </div>
        <div className="col reveal" data-delay="4" style={{ alignItems: 'center', textAlign: 'center' }}>
          <span>Local time</span>
          <span>{time} MST</span>
        </div>
        <div className="col reveal" data-delay="4" style={{ alignItems: 'flex-end', textAlign: 'right' }}>
          <span>Languages</span>
          <span>EN · KR · FA</span>
        </div>
      </div>

      <div className="scroll-cue reveal" data-delay="5">
        Scroll to come closer
        <div className="line" />
      </div>
    </section>
  )
}
