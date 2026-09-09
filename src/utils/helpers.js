export function uid(prefix = 'm') {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

// Ensure value is an array. If a legacy build stored an object keyed by
// conversation id (each value an array), flatten its values to preserve data.
export function asArray(value) {
  if (Array.isArray(value)) return value
  if (value && typeof value === 'object') {
    const values = Object.values(value)
    if (values.length > 0 && values.every((v) => Array.isArray(v))) return values.flat()
  }
  return []
}

export function asNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

export function polarToXY(radiusPct, angleDeg, centerPct = 50) {
  const rad = (angleDeg * Math.PI) / 180
  const cx = centerPct + radiusPct * Math.cos(rad)
  const cy = centerPct + radiusPct * Math.sin(rad)
  return { x: Math.max(8, Math.min(92, cx)), y: Math.max(10, Math.min(90, cy)) }
}

export function timeAgo(dateString) {
  if (!dateString) return 'just now'
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000)
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

export function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}