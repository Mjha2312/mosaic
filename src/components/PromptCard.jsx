import { Sparkles, Users, HeartHandshake, ArrowRight } from 'lucide-react'
import { CONVERSATION_TYPES } from '../data/prompts'

export default function PromptCard({ prompt, onExplore, index = 0 }) {
  const type = CONVERSATION_TYPES[prompt.type] || CONVERSATION_TYPES.question
  const delay = { animationDelay: `${index * 70}ms` }

  return (
    <article
      className="glass-card p-5 md:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07] hover:border-white/20 animate-fade-in group"
      style={{ borderRadius: '1.5rem', ...delay }}
    >
      {/* Category row */}
      <div className="flex items-center gap-2 mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider border rounded-full px-2.5 py-1"
          style={{ color: type.color, borderColor: `${type.color}40`, background: `${type.color}14` }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: type.color }} aria-hidden="true" />
          {type.label}
        </span>
        <span className="text-[10px] text-muted/60 ml-auto">
          {prompt.participantCount} present
        </span>
      </div>

      {/* Prompt */}
      <h3 className="font-display font-bold text-base md:text-lg leading-snug text-ink/95">
        "{prompt.question}"
      </h3>

      {prompt.description && (
        <p className="text-xs text-muted mt-2 leading-relaxed line-clamp-2">{prompt.description}</p>
      )}

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[11px] text-muted" title="Perspectives">
          <Users className="w-3.5 h-3.5 text-electric" aria-hidden="true" />
          {prompt.perspectiveCount} perspectives
        </span>
        <span className="flex items-center gap-1.5 text-[11px] text-muted" title="Meaningful exchanges">
          <HeartHandshake className="w-3.5 h-3.5 text-[#84CC16]" aria-hidden="true" />
          {prompt.exchangeCount || 0} exchanges
        </span>
      </div>

      {/* Explore action */}
      <button
        onClick={() => onExplore(prompt)}
        aria-label={`Explore the conversation: ${prompt.question}`}
        className="mt-4 w-full flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 text-white text-xs font-semibold rounded-xl py-3 hover:bg-gradient-to-r hover:from-[#6366F1] hover:to-[#FF2E93] hover:border-transparent transition-all duration-300 active:scale-[0.98] group-hover:border-[#6366F1]/40"
      >
        <Sparkles className="w-4 h-4 text-electric" aria-hidden="true" />
        Explore Mosaic
        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 -ml-1 transition-opacity" aria-hidden="true" />
      </button>
    </article>
  )
}