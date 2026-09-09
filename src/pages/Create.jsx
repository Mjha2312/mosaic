import { Plus, Sparkles } from 'lucide-react'
import CreateMosaic from '../components/CreateMosaic'
import { CIRCLES } from '../data/circles'

export default function Create({ onCreate, defaultCircleId }) {
  const defaultCircle = defaultCircleId || (CIRCLES.length > 0 ? CIRCLES[0].id : '')

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <section className="text-center mb-8">
        <div className="micro-label mb-3 inline-flex items-center gap-2">
          <Plus className="w-3.5 h-3.5 text-[#FF2E93]" aria-hidden="true" />
          create
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">
          START A <span className="neon-text-hyper">MOSAIC</span>
        </h1>
        <p className="mt-3 text-sm text-muted max-w-lg mx-auto">
          One prompt sits at the center. People add their perspectives around it. You lay the first tile of
          something that belongs to everyone who joins.
        </p>
      </section>

      <CreateMosaic onCreate={onCreate} defaultCircle={defaultCircle} />

      {/* Tips */}
      <section className="mt-8" aria-labelledby="tips-title">
        <h2 id="tips-title" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" aria-hidden="true" />
          Prompts that spark real mosaics
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            'Ask one thing, not three. Narrow prompts invite depth.',
            'Stay open. "What helped you" beats "Is X good or bad?"',
            'Add context. Give people a reason to open up.',
          ].map((tip, i) => (
            <div key={i} className="glass-card p-4 text-xs text-muted leading-relaxed" style={{ borderRadius: '1.25rem' }}>
              <span className="font-bold text-white text-sm mr-1.5">{i + 1}.</span>
              {tip}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}