const stroke = 'rgba(232, 236, 255, 0.78)'

export default function Glyph({ kind }) {
  switch (kind) {
    case 'lattice':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            {Array.from({ length: 9 }).map((_, i) =>
              <circle key={'c' + i} cx="100" cy="100" r={12 + i * 10} opacity={1 - i * 0.08} />
            )}
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2
              return <line key={'l' + i} x1="100" y1="100" x2={100 + Math.cos(a) * 92} y2={100 + Math.sin(a) * 92} opacity="0.5" />
            })}
            <circle cx="100" cy="100" r="4" fill="#7aa9ff" stroke="none" />
          </g>
        </svg>
      )
    case 'rings':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            <ellipse cx="100" cy="100" rx="92" ry="36" />
            <ellipse cx="100" cy="100" rx="92" ry="36" transform="rotate(60 100 100)" />
            <ellipse cx="100" cy="100" rx="92" ry="36" transform="rotate(120 100 100)" />
            <circle cx="100" cy="100" r="6" fill="#7aa9ff" stroke="none" />
          </g>
        </svg>
      )
    case 'ribbon':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            {Array.from({ length: 22 }).map((_, i) => {
              const t = i / 22
              const y = 30 + t * 140
              const w = 60 + Math.sin(t * Math.PI) * 60
              return <line key={i} x1={100 - w / 2} y1={y} x2={100 + w / 2} y2={y} />
            })}
          </g>
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            {Array.from({ length: 11 }).map((_, i) =>
              <line key={'v' + i} x1={20 + i * 16} y1="20" x2={20 + i * 16} y2="180" opacity={0.3 + (i % 3) * 0.2} />
            )}
            {Array.from({ length: 11 }).map((_, i) =>
              <line key={'h' + i} x1="20" y1={20 + i * 16} x2="180" y2={20 + i * 16} opacity={0.3 + (i % 4) * 0.2} />
            )}
          </g>
        </svg>
      )
    case 'dots':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          {Array.from({ length: 64 }).map((_, i) => {
            const x = (i % 8) * 24 + 24
            const y = Math.floor(i / 8) * 24 + 24
            const r = 0.5 + ((i * 7) % 6) * 0.6
            return <circle key={i} cx={x} cy={y} r={r} fill={stroke} opacity={0.5 + ((i * 13) % 5) * 0.1} />
          })}
        </svg>
      )
    case 'wave':
      return (
        <svg viewBox="0 0 200 200" className="glyph">
          <g fill="none" stroke={stroke} strokeWidth="0.6">
            {Array.from({ length: 14 }).map((_, i) => {
              const off = (i - 7) * 8
              const d = `M 10 100 Q 60 ${60 + off} 100 100 T 190 100`
              return <path key={i} d={d} opacity={0.2 + (1 - Math.abs(i - 7) / 7) * 0.6} />
            })}
          </g>
        </svg>
      )
    default:
      return null
  }
}
