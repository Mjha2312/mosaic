import { useState } from 'react'
import { Plus, Sparkles, Wand2, ArrowRight, Check, FileText, ListChecks, Tag, Users } from 'lucide-react'
import { CONVERSATION_TYPES, CATEGORIES } from '../data/prompts'
import { CIRCLES } from '../data/circles'

export default function CreateMosaic({ onCreate, defaultCircle }) {
  const [prompt, setPrompt] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('question')
  const [circleId, setCircleId] = useState(defaultCircle || '')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (prompt.trim().length < 5) {
      setError('Give your prompt at least a few words — this is the center of the mosaic.')
      return
    }
    if (!circleId) {
      setError('Pick a circle so people know where to find this conversation.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      onCreate({ prompt: prompt.trim(), description: description.trim(), type, circleId })
      setSubmitting(false)
      setPrompt('')
      setDescription('')
      setType('question')
      setCircleId(defaultCircle || '')
      setError('')
    }, 150)
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in" aria-label="Create a new mosaic">
      <div className="glass-card p-6 md:p-8" style={{ borderRadius: '2rem' }}>
        {/* Step label */}
        <div className="flex items-center gap-2 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF2E93] to-[#6366F1] grid place-items-center shadow-glow-hyper">
            <Wand2 className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-display font-bold text-lg">The Prompt</h2>
            <p className="text-[10px] text-muted uppercase tracking-wider">the center of the mosaic</p>
          </div>
        </div>

        {/* Prompt */}
        <label htmlFor="create-prompt" className="flex items-center gap-2 text-xs font-medium text-muted mb-2">
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          What is something worth talking about?
        </label>
        <textarea
          id="create-prompt"
          value={prompt}
          onChange={(e) => { setPrompt(e.target.value); if (error) setError('') }}
          placeholder="e.g. What helped you get through a difficult week?"
          rows={3}
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none focus:border-[#FF2E93]/40 focus:shadow-glow-hyper transition-all resize-none"
        />

        {/* Description */}
        <label htmlFor="create-desc" className="flex items-center gap-2 text-xs font-medium text-muted mt-5 mb-2">
          <ListChecks className="w-3.5 h-3.5" aria-hidden="true" />
          Context (optional)
        </label>
        <input
          id="create-desc"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A sentence that gives people a reason to contribute..."
          className="w-full bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3 text-sm text-ink placeholder:text-muted/50 outline-none focus:border-[#FF2E93]/40 focus:shadow-glow-hyper transition-all"
        />

        {/* Type */}
        <fieldset className="mt-6">
          <legend className="flex items-center gap-2 text-xs font-medium text-muted mb-3">
            <Tag className="w-3.5 h-3.5" aria-hidden="true" />
            Conversation type
          </legend>
          <div className="flex flex-wrap gap-2">
            {Object.entries(CONVERSATION_TYPES).map(([key, meta]) => {
              const selected = type === key
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setType(key)}
                  aria-pressed={selected}
                  className={[
                    'px-4 py-2.5 rounded-full text-xs font-semibold border transition-all duration-300',
                    selected
                      ? 'bg-white/10 border-white/30 text-white'
                      : 'bg-white/[0.02] border-white/[0.08] text-muted hover:text-white hover:bg-white/[0.05]',
                  ].join(' ')}
                  style={selected ? { boxShadow: `0 0 18px ${meta.color}40` } : undefined}
                >
                  <span className="w-2 h-2 inline-block rounded-full mr-1.5" style={{ background: meta.color }} aria-hidden="true" />
                  {meta.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Circle */}
        <fieldset className="mt-6">
          <legend className="flex items-center gap-2 text-xs font-medium text-muted mb-3">
            <Users className="w-3.5 h-3.5" aria-hidden="true" />
            Post it in a circle
          </legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CIRCLES.map((c) => {
              const selected = circleId === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCircleId(c.id)}
                  aria-pressed={selected}
                  className={[
                    'text-left rounded-2xl border px-4 py-3 transition-all duration-200',
                    selected
                      ? 'border-[#6366F1]/50 bg-[#6366F1]/10 shadow-glow-electric'
                      : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]',
                  ].join(' ')}
                >
                  <span className="block text-[11px] font-semibold text-ink/90">{c.name}</span>
                  <span className="block text-[9px] text-muted mt-0.5">{c.participantCount} in circle</span>
                </button>
              )
            })}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="mt-4 text-xs text-[#FF2E93] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-7 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF2E93] via-[#6366F1] to-[#06B6D4] text-white font-bold text-sm rounded-2xl py-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-hyper disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Sparkles className="w-4 h-4 animate-pulse" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Create Mosaic
            </>
          )}
        </button>

        <p className="mt-3 text-center text-[10px] text-muted/60">
          Your conversation becomes a living map others can add to. No approvals, no feeds — just a shared prompt.
        </p>
      </div>
    </form>
  )
}