import { ArrowLeft, Users, MessageSquare, PlusCircle, Compass, Sparkles } from 'lucide-react'
import { CIRCLE_ACCENTS } from '../data/circles'
import { PROMPTS, CONVERSATION_TYPES } from '../data/prompts'
import PromptCard from './PromptCard'
import EmptyState from './EmptyState'

export default function CircleView({ circle, joined, onBack, onJoin, onLeave, onExploreConversation, onNavigateCreate }) {
  const accent = CIRCLE_ACCENTS[circle.id] || { color: '#6366F1', gradient: 'from-[#6366F1] to-[#06B6D4]' }
  const circlePrompts = PROMPTS.filter((p) => p.circleId === circle.id)
  const hasPrompts = circlePrompts.length > 0

  return (
    <div className="animate-fade-in">
      {/* Back + header */}
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-medium text-muted hover:text-white transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Circles
        </button>

        {/* Circle hero */}
        <div className="glass-card p-6 md:p-8 relative overflow-hidden animate-fade-in" style={{ borderRadius: '2rem' }}>
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-25"
            style={{ background: accent.color }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className={`w-16 h-16 shrink-0 rounded-3xl bg-gradient-to-br ${accent.gradient} grid place-items-center shadow-card-glow`} aria-hidden="true">
              <span className="text-2xl">{getCircleEmoji(circle.tag)}</span>
            </div>
            <div className="flex-1">
              <div className="micro-label mb-1.5" style={{ color: accent.color }}>circle</div>
              <h1 className="font-display font-extrabold text-2xl md:text-3xl">{circle.name}</h1>
              <p className="text-sm text-muted mt-2 max-w-lg leading-relaxed">{circle.description}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  {circle.participantCount} in circle
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  {circle.activeConversations} active conversations
                </span>
              </div>
            </div>
            <div className="flex gap-3 md:flex-col">
              {joined ? (
                <button
                  onClick={() => onLeave(circle.id)}
                  className="flex items-center justify-center gap-2 bg-white/[0.06] border border-white/15 text-[#84CC16] text-xs font-semibold rounded-xl px-5 py-3 hover:bg-white/10 transition-all"
                >
                  <Users className="w-3.5 h-3.5" />
                  Joined
                </button>
              ) : (
                <button
                  onClick={() => onJoin(circle.id)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-xs font-semibold rounded-xl px-5 py-3 hover:brightness-110 transition-all shadow-glow-electric"
                >
                  <Users className="w-3.5 h-3.5" />
                  Join Circle
                </button>
              )}
              <button
                onClick={onNavigateCreate}
                className="flex items-center justify-center gap-2 bg-white/[0.05] border border-white/10 text-white text-xs font-semibold rounded-xl px-5 py-3 hover:bg-white/10 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                Create Conversation
              </button>
            </div>
          </div>
        </div>

        {/* Conversations */}
        <section className="mt-8" aria-label={`Conversations in ${circle.name}`}>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric" aria-hidden="true" />
              Live Mosaics
            </h2>
            <span className="text-[11px] text-muted">
              {circlePrompts.length} active
            </span>
          </div>

          {hasPrompts ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {circlePrompts.map((prompt, idx) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  index={idx}
                  onExplore={onExploreConversation}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Compass}
              title="This circle is quiet right now"
              description="No live mosaics yet. Be the first to start a conversation worth having here."
              action
              actionLabel="Create a Mosaic"
              onAction={onNavigateCreate}
            />
          )}
        </section>
      </div>
    </div>
  )
}

function getCircleEmoji(tag) {
  const map = {
    growth: '🌱',
    craft: '🎨',
    build: '🔨',
    study: '📚',
    experiment: '⚗️',
    exchange: '✨',
  }
  return map[tag] || '✨'
}