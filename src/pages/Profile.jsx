import { useState } from 'react'
import {
  User as UserIcon,
  HeartHandshake,
  Users,
  Compass,
  Sparkles,
  Pencil,
  Check,
  X,
  MessageSquare,
  Clock,
} from 'lucide-react'
import { PROMPTS, PERSPECTIVE_TYPES } from '../data/prompts'
import { CIRCLES, CIRCLE_ACCENTS } from '../data/circles'
import EmptyState from '../components/EmptyState'

function StatCard({ icon: Icon, value, label, gradient }) {
  return (
    <div className="glass-card p-5 md:p-6 text-center" style={{ borderRadius: '1.5rem' }}>
      <div className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br ${gradient} grid place-items-center shadow-card-glow`}>
        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <div className="font-display font-extrabold text-3xl md:text-4xl text-ink">{value}</div>
      <div className="micro-label mt-1">{label}</div>
    </div>
  )
}

export default function Profile({
  profile,
  onUpdateProfile,
  conversations,
  myPerspectives,
  joinedCircles,
  myConversations,
  sessionHistory,
  onExploreConversation,
}) {
  const [editing, setEditing] = useState(false)
  const [nameDraft, setNameDraft] = useState(profile.name)
  const [bioDraft, setBioDraft] = useState(profile.bio)

  const myPerspectiveNodes = myPerspectives || []
  const myCreatedConversations = myConversations || []
  const history = sessionHistory || []

  const stats = {
    perspectives: myPerspectiveNodes.length,
    exchanges: profile.stats?.exchanges || 0,
    circles: joinedCircles.length,
    explored: profile.stats?.explored || 0,
  }

  const handleSaveEdit = () => {
    onUpdateProfile({ name: nameDraft.trim() || profile.name, bio: bioDraft.trim() })
    setEditing(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      {/* ── IDENTITY CARD ──────────────────────────────────────── */}
      <section className="glass-card p-6 md:p-8 relative overflow-hidden mb-8" style={{ borderRadius: '2rem' }} aria-label="Your identity">
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#6366F1]/20 blur-[100px]" aria-hidden="true" />
        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#6366F1] via-[#FF2E93] to-[#06B6D4] grid place-items-center shadow-glow-electric">
              <span className="font-display font-extrabold text-white text-4xl">{profile.initial}</span>
            </div>
            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#84CC16] border-2 border-abyss grid place-items-center" aria-hidden="true" />
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left min-w-0">
            {!editing ? (
              <>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl">{profile.name}</h1>
                <p className="text-xs text-muted mt-1 md:mt-0.5">{profile.bio}</p>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-electric/10 border border-electric/30 text-electric text-[10px] font-semibold uppercase tracking-wider rounded-full px-3 py-1.5">
                    <Sparkles className="w-3 h-3" aria-hidden="true" />
                    participation-first
                  </span>
                  <span className="inline-flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.1] text-muted text-[10px] font-semibold uppercase tracking-wider rounded-full px-3 py-1.5">
                    no followers · no likes
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3 text-left">
                <div>
                  <label htmlFor="edit-name" className="block text-[10px] uppercase tracking-wider text-muted mb-1">Name</label>
                  <input
                    id="edit-name"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-ink outline-none focus:border-[#6366F1]/50"
                  />
                </div>
                <div>
                  <label htmlFor="edit-bio" className="block text-[10px] uppercase tracking-wider text-muted mb-1">Intro line</label>
                  <input
                    id="edit-bio"
                    value={bioDraft}
                    onChange={(e) => setBioDraft(e.target.value)}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-sm text-ink outline-none focus:border-[#6366F1]/50"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="flex items-center gap-1.5 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-xs font-semibold rounded-xl px-4 py-2.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Save
                  </button>
                  <button
                    onClick={() => { setEditing(false); setNameDraft(profile.name); setBioDraft(profile.bio) }}
                    className="flex items-center gap-1.5 bg-white/5 border border-white/15 text-white text-xs font-semibold rounded-xl px-4 py-2.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Edit */}
          {!editing && (
            <button
              onClick={() => { setEditing(true); setNameDraft(profile.name); setBioDraft(profile.bio) }}
              className="flex items-center gap-2 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 text-[11px] text-muted hover:text-white hover:bg-white/10 transition-all shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────────── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10" aria-label="Your participation stats">
        <StatCard icon={Sparkles} value={stats.perspectives} label="perspectives added" gradient="from-[#6366F1] to-[#06B6D4]" />
        <StatCard icon={HeartHandshake} value={stats.exchanges} label="meaningful exchanges" gradient="from-[#84CC16] to-[#6366F1]" />
        <StatCard icon={Users} value={stats.circles} label="circles joined" gradient="from-[#FF2E93] to-[#FF9A3F]" />
        <StatCard icon={Compass} value={stats.explored} label="conversations explored" gradient="from-[#06B6D4] to-[#84CC16]" />
      </section>

      {/* ── MY PERSPECTIVES ────────────────────────────────────── */}
      <section className="mb-10" aria-labelledby="my-perspectives-title">
        <div className="flex items-center gap-2 mb-5">
          <MessageSquare className="w-4 h-4 text-electric" aria-hidden="true" />
          <h2 id="my-perspectives-title" className="font-display font-bold text-lg">My Perspectives</h2>
        </div>

        {myPerspectiveNodes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myPerspectiveNodes.slice(-6).reverse().map((node) => {
              const meta = PERSPECTIVE_TYPES[node.type] || PERSPECTIVE_TYPES.personal
              const prompt = conversations.find((c) => c.id === node.conversationId) || PROMPTS.find((p) => p.id === node.conversationId)
              return (
                <div key={node.id} className="glass-card p-5 transition-all hover:bg-white/[0.06]" style={{ borderRadius: '1.25rem' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider border rounded-full px-2 py-0.5 ${meta.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      {meta.shortLabel}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] text-muted/60">
                      <HeartHandshake className="w-3 h-3 text-[#84CC16]" aria-hidden="true" />
                      {node.relatedCount || 0}
                    </span>
                  </div>
                  <p className="text-xs text-ink/90 leading-relaxed italic line-clamp-3">"{node.text}"</p>
                  {prompt && (
                    <button
                      onClick={() => onExploreConversation(prompt)}
                      className="mt-3 text-[10px] text-electric hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Compass className="w-3 h-3" aria-hidden="true" />
                      View the mosaic
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="You haven't added a perspective yet"
            description="Explore a conversation map and add your own tile. Your perspectives appear here."
          />
        )}
      </section>

      {/* ── MY CONVERSATIONS ───────────────────────────────────── */}
      <section className="mb-10" aria-labelledby="my-conversations-title">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles className="w-4 h-4 text-[#FF2E93]" aria-hidden="true" />
          <h2 id="my-conversations-title" className="font-display font-bold text-lg">My Conversations</h2>
        </div>

        {myCreatedConversations.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {myCreatedConversations.map((conv) => {
              const circle = CIRCLES.find((c) => c.id === conv.circleId)
              const accent = circle ? CIRCLE_ACCENTS[circle.id] : { color: '#6366F1' }
              return (
                <div key={conv.id} className="glass-card p-5 transition-all hover:bg-white/[0.06]" style={{ borderRadius: '1.25rem' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: accent.color }}>
                      {circle ? circle.name : 'Mosaic'}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-muted ml-auto">
                      <Users className="w-3 h-3" aria-hidden="true" />
                      {conv.perspectiveCount} perspectives
                    </span>
                  </div>
                  <button
                    onClick={() => onExploreConversation(conv)}
                    className="text-left font-display font-bold text-sm text-ink/95 hover:text-electric transition-colors leading-snug"
                  >
                    "{conv.question}"
                  </button>
                  {conv.description && (
                    <p className="text-[11px] text-muted mt-1.5 line-clamp-1">{conv.description}</p>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No conversations started yet"
            description='When you "Start a Mosaic," it will live here for everyone in that circle to build on.'
          />
        )}
      </section>

      {/* ── MY CIRCLES ─────────────────────────────────────────── */}
      <section className="mb-10" aria-labelledby="my-circles-title">
        <div className="flex items-center gap-2 mb-5">
          <Users className="w-4 h-4 text-cyber" aria-hidden="true" />
          <h2 id="my-circles-title" className="font-display font-bold text-lg">My Circles</h2>
        </div>

        {joinedCircles.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {CIRCLES.filter((c) => joinedCircles.includes(c.id)).map((circle) => {
              const accent = CIRCLE_ACCENTS[circle.id] || { color: '#6366F1' }
              return (
                <div key={circle.id} className="glass-card p-4 flex items-center gap-3" style={{ borderRadius: '1.25rem' }}>
                  <div className="w-10 h-10 rounded-xl grid place-items-center" style={{ background: `${accent.color}22`, border: `1px solid ${accent.color}44` }}>
                    <span className="text-base">{circleEmoji(circle.tag)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{circle.name}</div>
                    <div className="text-[10px] text-muted">{circle.activeConversations} live conversations</div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <EmptyState
            title="No circles joined yet"
            description="Join a circle to keep these conversations alive."
          />
        )}
      </section>

      {/* ── SESSION HISTORY ────────────────────────────────────── */}
      <section aria-labelledby="session-history-title">
        <div className="flex items-center gap-2 mb-5">
          <Clock className="w-4 h-4 text-[#84CC16]" aria-hidden="true" />
          <h2 id="session-history-title" className="font-display font-bold text-lg">Session History</h2>
        </div>

        {history.length > 0 ? (
          <div className="glass-card divide-y divide-white/[0.05]" style={{ borderRadius: '1.5rem' }}>
            {history.slice().reverse().slice(0, 5).map((h, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-4">
                <div className="flex items-center gap-2 flex-1 flex-wrap">
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    <Compass className="w-3.5 h-3.5 text-electric" aria-hidden="true" />
                    {h.perspectivesExplored || 0}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    <HeartHandshake className="w-3.5 h-3.5 text-[#84CC16]" aria-hidden="true" />
                    {h.meaningfulExchanges || 0}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-muted">
                    <Users className="w-3.5 h-3.5 text-[#FF2E93]" aria-hidden="true" />
                    {h.newConnections || 0}
                  </span>
                </div>
                <span className="text-[10px] text-muted/60 shrink-0">
                  {h.endTime ? new Date(h.endTime).toLocaleDateString() : 'recent'}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No sessions yet"
            description="Finish a session to see your reflection here — what you explored, exchanged, and built."
          />
        )}
      </section>
    </div>
  )
}

function circleEmoji(tag) {
  const map = { growth: '🌱', craft: '🎨', build: '🔨', study: '📚', experiment: '⚗️', exchange: '✨' }
  return map[tag] || '✨'
}