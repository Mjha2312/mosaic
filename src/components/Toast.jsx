import { useEffect, useState } from 'react'
import { Sparkles, X, HeartHandshake, Check, Plus } from 'lucide-react'

const ICONS = {
  exchange: HeartHandshake,
  success: Check,
  create: Plus,
  info: Sparkles,
}

export default function Toast({ toast, onDismiss }) {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setLeaving(true)
      setTimeout(onDismiss, 300)
    }, 2600)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  if (!toast) return null

  const Icon = ICONS[toast.type] || Sparkles
  const accent =
    toast.type === 'exchange'
      ? 'text-[#84CC16] border-[#84CC16]/40'
      : toast.type === 'create'
      ? 'text-[#FF2E93] border-[#FF2E93]/40'
      : toast.type === 'success'
      ? 'text-[#06B6D4] border-[#06B6D4]/40'
      : 'text-electric border-electric/40'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[80] transition-all duration-300 ${
        leaving ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
      }`}
    >
      <div className="flex items-center gap-3 bg-[#0d0d14]/95 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 py-3 shadow-card-glow max-w-[calc(100vw-2rem)]">
        <span className={`grid w-7 h-7 rounded-full bg-white/[0.05] border ${accent}`}>
          <Icon className={`w-3.5 h-3.5 m-auto ${accent.split(' ')[0]}`} />
        </span>
        <span className="text-xs font-semibold text-ink/90">{toast.message}</span>
        <button
          onClick={() => {
            setLeaving(true)
            setTimeout(onDismiss, 300)
          }}
          aria-label="Dismiss notification"
          className="text-muted hover:text-white transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}