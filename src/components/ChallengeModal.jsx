import { useEffect, useState } from 'react'
import { X, ShieldQuestion, Plus, Send } from 'lucide-react'
import { PERSPECTIVE_TYPES } from '../data/prompts'

const RESPONSE_TYPES = [
  { id: 'personal', label: 'Different Experience', note: 'Share what you lived through', icon: '◈' },
  { id: 'opinion', label: 'Counterpoint', note: 'Offer a different reading', icon: '⇄' },
  { id: 'question', label: 'Question', note: 'Ask what they may not have considered', icon: '◯' },
]

export default function ChallengeModal({
  parentNode,
  conversationId,
  onClose,
  onSubmit,
}) {
  const [responseType, setResponseType] = useState('opinion')
  const [draft, setDraft] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (text.length < 3) {
      setError('Your challenge needs a few words to be shared.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      onSubmit({
        text,
        type: responseType,
        parentId: parentNode.id,
        conversationId,
      })
      setSubmitting(false)
    }, 120)
  }

  const parentType = PERSPECTIVE_TYPES[parentNode.type] || PERSPECTIVE_TYPES.personal

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Challenge this perspective"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in cursor-default"
      />

      <div className="relative w-full max-w-lg glass-sheet rounded-[2rem] px-5 md:px-7 pt-6 pb-7 animate-pop shadow-card-glow max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF2E93] to-[#FF9A3F] grid place-items-center shadow-glow-hyper">
              <ShieldQuestion className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <h2 className="font-display font-extrabold text-lg leading-tight">
                Challenge This Perspective
              </h2>
              <p className="text-[10px] text-muted uppercase tracking-wider">
                respectfully, of course
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Parent perspective */}
        <div className="mt-4 glass-card rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-6 h-6 rounded-full grid place-items-center text-[10px] font-bold text-white`} style={{ background: `linear-gradient(135deg, ${parentType.hexStart}, ${parentType.hexEnd})` }}>
              {parentNode.author.charAt(0)}
            </span>
            <span className="text-[11px] text-muted">{parentNode.author} shared:</span>
          </div>
          <p className="text-sm text-ink/90 italic leading-relaxed">"{parentNode.text}"</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Response type */}
          <fieldset className="mt-5">
            <legend className="text-[10px] uppercase tracking-[0.2em] text-muted font-semibold mb-3">
              How is your view different?
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {RESPONSE_TYPES.map((rt) => {
                const selected = responseType === rt.id
                const meta = PERSPECTIVE_TYPES[rt.id]
                return (
                  <button
                    key={rt.id}
                    type="button"
                    onClick={() => setResponseType(rt.id)}
                    aria-pressed={selected}
                    className={[
                      'text-left rounded-2xl border px-3 py-3 transition-all duration-200',
                      selected
                        ? `border-white/30 bg-white/[0.08] ${meta.glow}`
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]',
                    ].join(' ')}
                  >
                    <span className={`block text-lg mb-1 ${meta.accent === 'electric' ? 'text-electric' : meta.accent === 'hyper' ? 'text-hyper' : meta.accent === 'cyber' ? 'text-cyber' : 'text-acid'}`} aria-hidden="true">
                      {rt.icon}
                    </span>
                    <span className={`block text-[10px] font-semibold text-ink/90`}>{rt.label}</span>
                    <span className="block text-[9px] text-muted mt-0.5">{rt.note}</span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Input */}
          <div className="mt-4">
            <label htmlFor="challenge-input" className="block text-[10px] uppercase tracking-[0.2em] text-muted font-semibold mb-2">
              "I see it differently because..."
            </label>
            <textarea
              id="challenge-input"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value)
                if (error) setError('')
              }}
              placeholder="Share a different experience, a counterpoint, or a question that deserves to be asked..."
              rows={4}
              className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none focus:border-[#FF2E93]/40 focus:shadow-glow-hyper transition-all resize-none"
            />
            {error && (
              <p role="alert" className="mt-2 text-xs text-[#FF2E93]">{error}</p>
            )}
          </div>

          {/* Submit */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF2E93] to-[#6366F1] text-white font-semibold text-sm rounded-2xl py-3.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-hyper disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4" />
              Add to Mosaic
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-2xl px-6 py-3.5 hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              <Send className="w-4 h-4 -rotate-45" />
              Cancel
            </button>
          </div>

          <p className="mt-4 text-center text-[10px] text-muted/60">
            A challenge becomes a new perspective node — connected to {parentNode.author}'s, not buried in comments.
          </p>
        </form>
      </div>
    </div>
  )
}