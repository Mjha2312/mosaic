import { useState, useCallback, useEffect } from 'react'
import { Plus, ArrowLeft, MessageSquarePlus, ChevronRight } from 'lucide-react'
import { PERSPECTIVE_TYPES } from '../data/prompts'
import NodeCard from './NodeCard'
import NodeSheet from './NodeSheet'
import ChallengeModal from './ChallengeModal'
import { polarToXY, uid } from '../utils/helpers'

const TYPE_ORDER = ['personal', 'opinion', 'question', 'goal']
const VIBE_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'empathy', label: 'Experience' },
  { id: 'debate', label: 'Opinion' },
  { id: 'unconventional', label: 'Curiosity' },
]

const ACCENT_TEXT = {
  electric: 'neon-text-electric',
  hyper: 'neon-text-hyper',
  acid: 'text-[#84CC16]',
  cyber: 'text-[#06B6D4]',
}

export default function ConversationMap({
  conversation,
  perspectives,
  onRelate,
  onChallenge,
  onAddPerspective,
  onBack,
  onRecordExploration,
}) {
  const [selectedId, setSelectedId] = useState(null)
  const [draft, setDraft] = useState('')
  const [justAddedId, setJustAddedId] = useState(null)
  const [activeFilter, setActiveFilter] = useState('all')
  const [typeCursor, setTypeCursor] = useState(0)
  const [challengeFor, setChallengeFor] = useState(null)
  const [hasRecorded, setHasRecorded] = useState(false)

  // Track exploration — once per conversation open
  useEffect(() => {
    if (hasRecorded || !conversation?.id) return
    setHasRecorded(true)
    onRecordExploration?.(conversation.id)
  }, [conversation?.id, hasRecorded, onRecordExploration])

  const merged = perspectives || []
  const selected = merged.find((n) => n.id === selectedId)

  const filteredNodes =
    activeFilter === 'all'
      ? merged
      : merged.filter((n) => {
          const meta = PERSPECTIVE_TYPES[n.type]
          return meta && meta.vibe === activeFilter
        })

  const connectors = merged.map((n) => {
    const parentNode = merged.find((m) => m.id === n.parentId)
    const fromX = parentNode ? parentNode.x : 50
    const fromY = parentNode ? parentNode.y : 50
    const ctrlX = (fromX + n.x) / 2 + (n.y - fromY) * 0.08
    const ctrlY = (fromY + n.y) / 2 - (n.x - fromX) * 0.08
    return {
      id: n.id,
      d: `M ${fromX} ${fromY} Q ${ctrlX} ${ctrlY} ${n.x} ${n.y}`,
      type: n.type,
    }
  })

  const handleSelect = useCallback((id) => setSelectedId(id), [])

  const handleRelateNode = useCallback(
    (node) => {
      onRelate(node)
    },
    [onRelate]
  )

  const handleAddNode = useCallback(
    (e) => {
      e?.preventDefault()
      const text = draft.trim()
      if (!text || !conversation?.id) return

      const angle = 20 + (merged.length % 7) * 48
      const radiusPct = typeCursor % 2 === 0 ? 40 : 30
      const pos = polarToXY(radiusPct, angle)
      const typeKey = TYPE_ORDER[typeCursor % TYPE_ORDER.length]

      const newNode = {
        id: uid('n'),
        type: typeKey,
        x: pos.x,
        y: pos.y,
        author: 'You',
        text,
        time: 'just now',
        isMine: true,
        relatedCount: 0,
        conversationId: conversation.id,
        createdAt: new Date().toISOString(),
      }

      onAddPerspective(newNode)
      setTypeCursor((c) => c + 1)
      setDraft('')
      setJustAddedId(newNode.id)
      setSelectedId(newNode.id)
      setTimeout(() => setJustAddedId(null), 3000)
    },
    [draft, merged.length, typeCursor, conversation?.id, onAddPerspective]
  )

  const handleSubmitChallenge = useCallback(
    ({ text, type, parentId }) => {
      const parent = merged.find((m) => m.id === parentId)
      const fromX = parent ? parent.x : 50
      const fromY = parent ? parent.y : 50
      const angle = Math.atan2(fromY - 50, fromX - 50) * (180 / Math.PI)
      const spread = 20 + (merged.length % 6) * 12
      const radiusPct = 30 + (merged.length % 3) * 8
      const pos = polarToXY(radiusPct, angle + 30 + spread)

      const newNode = {
        id: uid('ch'),
        type,
        x: pos.x,
        y: pos.y,
        author: 'You',
        text,
        time: 'just now',
        isMine: true,
        relatedCount: 0,
        parentId,
        conversationId: conversation.id,
        isChallenge: true,
        createdAt: new Date().toISOString(),
      }
      onChallenge(newNode)
      setChallengeFor(null)
      setJustAddedId(newNode.id)
      setSelectedId(newNode.id)
      setTimeout(() => setJustAddedId(null), 3000)
    },
    [merged, onChallenge, conversation?.id]
  )

  return (
    <div className="flex flex-col animate-fade-in" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 pt-5 pb-1">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-[11px] text-muted hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-muted font-semibold" aria-live="polite">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" aria-hidden="true" />
              {merged.length} perspective{merged.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── CANVAS ─────────────────────────────────────────────── */}
      <div
        aria-label={`Conversation map for: ${conversation.question}`}
        className="relative mx-3 md:mx-8 mt-2 flex-1 overflow-hidden grid-noise rounded-3xl border border-white/[0.06] bg-[#08080f]/60"
        style={{ minHeight: '52vh' }}
      >
        {/* SVG connectors */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {TYPE_ORDER.map((t) => {
              const meta = PERSPECTIVE_TYPES[t]
              return (
                <linearGradient key={t} id={`grad-${t}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={meta.hexStart} />
                  <stop offset="100%" stopColor={meta.hexEnd} />
                </linearGradient>
              )
            })}
          </defs>
          {connectors.map((c) => {
            const isVisible = filteredNodes.some((fn) => fn.id === c.id)
            return (
              <path
                key={c.id}
                d={c.d}
                fill="none"
                stroke={`url(#grad-${c.type})`}
                strokeWidth={0.35}
                strokeLinecap="round"
                strokeDasharray="1.5 1"
                opacity={
                  !isVisible ? 0.05 : selectedId && selectedId !== c.id ? 0.12 : 0.75
                }
                style={{ transition: 'opacity 0.5s ease' }}
              />
            )
          })}
        </svg>

        {/* Center prompt node */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 animate-float"
          style={{ width: 'min(46vw, 300px)', maxWidth: '84%' }}
        >
          <div className="relative glass-card rounded-[2rem] px-4 py-4 md:px-6 md:py-6 text-center shadow-glow-electric border-[#6366F1]/30 bg-[#0b0b14]/80">
            <div className="absolute -inset-px rounded-[2rem] bg-gradient-to-r from-[#6366F1] via-[#FF2E93] to-[#06B6D4] opacity-25 blur-md -z-10" aria-hidden="true" />
            <div className="micro-label mb-2">mosaic · live</div>
            <p className={`font-display font-bold text-base md:text-xl leading-tight ${ACCENT_TEXT[conversation.accent] || 'neon-text-electric'}`}>
              "{conversation.question}"
            </p>
            <div className="mt-3 flex items-center justify-center gap-2 micro-label">
              <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" aria-hidden="true" />
              {conversation.participantCount || 3} present
            </div>
          </div>
        </div>

        {/* Nodes */}
        {merged.map((node) => (
          <NodeCard
            key={node.id}
            node={node}
            isMine={node.isMine}
            justAdded={justAddedId === node.id}
            isVisible={filteredNodes.some((fn) => fn.id === node.id)}
            isDimmed={selectedId && selectedId !== node.id}
            isSelected={selectedId === node.id}
            onSelect={() => handleSelect(node.id)}
          />
        ))}

        {/* Filter bar (floats in corner) */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-[#0b0b14]/90 backdrop-blur-xl border border-white/[0.08] rounded-full px-2 py-1.5 shadow-card-glow">
          <span className="text-[9px] uppercase tracking-wider text-muted font-semibold px-1" aria-hidden="true">
            Filter:
          </span>
          {VIBE_FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              aria-pressed={activeFilter === f.id}
              className={[
                'px-2.5 py-1 rounded-full text-[10px] font-medium transition-all duration-200',
                activeFilter === f.id
                  ? 'bg-white/15 text-white'
                  : 'text-muted hover:text-white hover:bg-white/[0.06]',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── ADD PERSPECTIVE COMPOSER ───────────────────────────── */}
      <div className="px-4 md:px-8 py-4 pb-20 lg:pb-4">
        <div className="max-w-5xl mx-auto">
          <form
            onSubmit={handleAddNode}
            className="glass-sheet rounded-3xl p-3 md:p-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
            aria-label="Add your perspective to this mosaic"
          >
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Add your perspective to this mosaic..."
                aria-label="Your perspective"
                className="flex-1 bg-transparent outline-none placeholder:text-muted/70 text-sm md:text-base py-2 min-w-0"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-xs font-semibold rounded-full px-4 md:px-5 py-2.5 transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Perspective</span>
                <span className="sm:hidden">Add</span>
              </button>
            </div>
            <div className="mt-2 pt-2 border-t border-white/[0.05] flex items-center gap-2 flex-wrap">
              <MessageSquarePlus className="w-3 h-3 text-muted/60" aria-hidden="true" />
              <span className="text-[10px] text-muted/60">Perspective type:</span>
              <span
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider border rounded-full px-2 py-0.5"
                style={{ color: PERSPECTIVE_TYPES[TYPE_ORDER[typeCursor % 4]].hexStart, borderColor: `${PERSPECTIVE_TYPES[TYPE_ORDER[typeCursor % 4]].hexStart}40` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: PERSPECTIVE_TYPES[TYPE_ORDER[typeCursor % 4]].hexStart }} aria-hidden="true" />
                {PERSPECTIVE_TYPES[TYPE_ORDER[typeCursor % 4]].label}
              </span>
              <button
                type="button"
                onClick={() => setTypeCursor((c) => c + 1)}
                className="flex items-center gap-1 text-[10px] text-muted hover:text-white ml-auto transition-colors"
                aria-label="Change perspective type"
              >
                change
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ── DETAIL SHEET ────────────────────────────────────────── */}
      {selected && (
        <NodeSheet
          node={selected}
          conversation={conversation}
          onClose={() => setSelectedId(null)}
          onRelate={() => handleRelateNode(selected)}
          onChallenge={() => {
            setSelectedId(null)
            setChallengeFor(selected)
          }}
        />
      )}

      {/* ── CHALLENGE MODAL ─────────────────────────────────────── */}
      {challengeFor && (
        <ChallengeModal
          parentNode={challengeFor}
          conversationId={conversation.id}
          onClose={() => setChallengeFor(null)}
          onSubmit={handleSubmitChallenge}
        />
      )}
    </div>
  )
}