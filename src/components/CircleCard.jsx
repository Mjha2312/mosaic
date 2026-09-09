import { Users, MessageSquare, Check, ArrowRight } from 'lucide-react'
import { CIRCLE_ACCENTS } from '../data/circles'

export default function CircleCard({ circle, joined, onJoin, onLeave, onOpen, index = 0 }) {
  const accent = CIRCLE_ACCENTS[circle.id] || { color: '#6366F1', gradient: 'from-[#6366F1] to-[#06B6D4]' }
  const Icon = getCircleIcon(circle.tag)

  return (
    <article
      className="glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06] hover:border-white/20 animate-fade-in"
      style={{ borderRadius: '1.5rem' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${accent.gradient} grid place-items-center shadow-card-glow`}
          aria-hidden="true"
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-bold text-sm truncate">{circle.name}</h3>
          {joined && (
            <span className="inline-flex items-center gap-1 text-[9px] text-[#84CC16] font-semibold uppercase tracking-wider">
              <Check className="w-3 h-3" />
              member
            </span>
          )}
        </div>
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
          {circle.activeConversations} live
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted leading-relaxed">{circle.description}</p>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-4 text-[11px] text-muted">
        <span className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-electric" aria-hidden="true" />
          {circle.participantCount} in circle
        </span>
        <span className="flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-cyber" aria-hidden="true" />
          {circle.activeConversations} conversations
        </span>
      </div>

      {/* Actions */}
      <div className="mt-5 flex gap-3">
        {!joined ? (
          <button
            onClick={() => onJoin(circle.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-xs font-semibold rounded-xl py-3 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-electric"
          >
            <Users className="w-3.5 h-3.5" />
            Join Circle
          </button>
        ) : (
          <button
            onClick={() => onLeave && onLeave(circle.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/[0.06] border border-[#84CC16]/30 text-[#84CC16] text-xs font-semibold rounded-xl py-3 hover:bg-[#FF2E93]/10 hover:border-[#FF2E93]/30 hover:text-[#FF2E93] active:scale-[0.98] transition-all"
            title="Leave circle"
          >
            <Check className="w-3.5 h-3.5" />
            Joined
          </button>
        )}
        <button
          onClick={() => onOpen(circle.id)}
          className="flex items-center justify-center px-4 bg-white/[0.05] border border-white/10 text-white text-xs font-semibold rounded-xl py-3 hover:bg-white/10 active:scale-[0.98] transition-all"
          aria-label={`Open ${circle.name} circle`}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  )
}

function getCircleIcon(tag) {
  const icons = {
    growth: '🌱',
    craft: '🎨',
    build: '🔨',
    study: '📚',
    experiment: '⚗️',
    exchange: '✨',
  }
  const emoji = icons[tag] || '✨'
  return () => <span className="text-xl">{emoji}</span>
}