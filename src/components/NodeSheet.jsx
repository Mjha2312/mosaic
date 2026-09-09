import { useEffect, useState } from 'react'
import { X, HeartHandshake, ShieldQuestion, Sparkles } from 'lucide-react'
import { PERSPECTIVE_TYPES } from '../data/prompts'

function ParticleBurst() {
  const particles = [
    { px: '-14px', py: '-34px', delay: '0ms', color: '#d4ff3f' },
    { px: '16px', py: '-40px', delay: '60ms', color: '#00e5ff' },
    { px: '34px', py: '-24px', delay: '120ms', color: '#6a5cff' },
    { px: '-32px', py: '-22px', delay: '80ms', color: '#ff9a3f' },
    { px: '6px', py: '-50px', delay: '40ms', color: '#ff3df5' },
  ]
  return (
    <span aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full pointer-events-none"
          style={{
            left: '50%',
            top: '30%',
            background: p.color,
            '--px': p.px,
            '--py': p.py,
            animation: `exchangeParticle 600ms ease-out forwards`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </span>
  )
}

export default function NodeSheet({ node, conversation, onClose, onRelate, onChallenge }) {
  const meta = PERSPECTIVE_TYPES[node.type] || PERSPECTIVE_TYPES.personal
  const [relatePop, setRelatePop] = useState(false)
  const [related, setRelated] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const handleRelate = () => {
    if (related) return
    onRelate()
    setRelated(true)
    setRelatePop(true)
    setTimeout(() => setRelatePop(false), 650)
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Perspective by ${node.author}`}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in cursor-default"
      />

      <div className="relative w-full max-w-lg glass-sheet rounded-t-[2rem] px-5 md:px-6 pt-6 pb-8 animate-slide-up shadow-card-glow max-h-[85vh] overflow-y-auto">
        {/* grab handle */}
        <div className="mx-auto w-12 h-1.5 rounded-full bg-white/15 mb-5" aria-hidden="true" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* author */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-10 h-10 rounded-full grid place-items-center text-sm font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${meta.hexStart}, ${meta.hexEnd})` }}
            aria-hidden="true"
          >
            {node.author.charAt(0)}
          </span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm">
              {node.author}
              {node.isChallenge && (
                <span className="ml-2 text-[9px] uppercase tracking-wider text-[#FF2E93] font-semibold">challenge</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted flex-wrap">
              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider border rounded-full px-2 py-0.5 ${meta.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} aria-hidden="true" />
                {meta.label}
              </span>
              <span>{node.time}</span>
            </div>
          </div>
        </div>

        {/* body */}
        <p className="text-base md:text-lg leading-relaxed text-ink/95 mt-2 max-w-xl">
          "{node.text}"
        </p>

        {(node.relatedCount || 0) > 0 && (
          <p className="mt-3 text-xs text-[#84CC16] flex items-center gap-1.5" aria-live="polite">
            <HeartHandshake className="w-3.5 h-3.5" aria-hidden="true" />
            {node.relatedCount} meaningful exchange{node.relatedCount > 1 ? 's' : ''} here
          </p>
        )}

        {/* actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={handleRelate}
            aria-pressed={related}
            className={`relative w-full flex items-center justify-center gap-2 text-black font-bold text-sm rounded-2xl py-4 hover:brightness-110 active:scale-[0.98] transition-all ${
              related
                ? 'bg-gradient-to-r from-[#84CC16] to-[#06B6D4] shadow-glow-acid'
                : 'bg-gradient-to-r from-[#84CC16] to-[#6366F1] shadow-glow-acid'
            }`}
            aria-live="polite"
          >
            {relatePop && <ParticleBurst />}
            {relatePop && (
              <span
                className="absolute -top-2.5 right-4 flex items-center gap-1 text-[#84CC16] bg-black/80 border border-[#84CC16]/40 rounded-full px-2.5 py-1 text-xs font-bold animate-pop"
                aria-hidden="true"
              >
                <HeartHandshake className="w-3 h-3" />
                +1 Exchange
              </span>
            )}
            {relatePop && (
              <span className="absolute inset-0 rounded-2xl bg-[#84CC16]/30 animate-ping opacity-60" aria-hidden="true" />
            )}
            <HeartHandshake className="w-5 h-5" />
            {related ? 'Meaningful exchange counted' : 'Relate · Meaningful Exchange +1'}
          </button>

          <button
            onClick={onChallenge}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-2xl py-4 hover:bg-white/10 hover:border-[#FF2E93]/40 active:scale-[0.98] transition-all"
          >
            <ShieldQuestion className="w-5 h-5 text-[#FF2E93]" />
            Challenge Respectfully
          </button>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted/70">
          Meaningful exchanges, not likes. {related ? 'Atomic — only one per perspective.' : ''}
          {conversation ? ` This tile lives in "${conversation.question.slice(0, 40)}${conversation.question.length > 40 ? '…' : ''}"` : ''}
        </p>
      </div>
    </div>
  )
}