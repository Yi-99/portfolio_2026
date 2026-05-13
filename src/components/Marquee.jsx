export default function Marquee() {
  const items = ['Interfaces', 'Identity', 'Motion', '3D', 'Generative', 'Direction']

  function Row({ offset }) {
    return (
      <span>
        {items.map((it, i) => (
          <span key={offset + '-' + i}>
            {it}<span className="star">✦</span>
          </span>
        ))}
      </span>
    )
  }

  return (
    <div className="marquee">
      <div className="marquee-track">
        <Row offset={0} />
        <Row offset={1} />
        <Row offset={2} />
        <Row offset={3} />
      </div>
    </div>
  )
}
