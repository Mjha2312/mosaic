import { PERSPECTIVE_TYPES } from '../data/prompts'
import { Sparkles } from 'lucide-react'

export default function NodeCard({ node, isMine, justAdded, isVisible, isDimmed, isSelected, onSelect }) {
  const type = PERSPECTIVE_TYPES[node.type] || PERSPECTIVE_TYPES.personal

  return (
    <button
      onClick={onSelect}
      aria-label={`${type.label} by ${node.author}: ${node.text}`}
      className={[
        'absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 text-left group',
        isDimmed ? 'opacity-15 scale-[0.95]' : 'opacity-100',
        isSelected ? 'scale-105 z-30' : '',
        justAdded ? 'animate-pop' : '',
        !isVisible ? 'opacity-0 scale-90 pointer-events-none' : '',
      ].join(' ')}
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        width: 'min(36vw, 200px)',
        maxWidth: '78%',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className={[
          'glass-card p-3 border-white/[0.12] cursor-pointer hover:bg-white/[0.08]',
          'transition-all duration-200 hover:-translate-y-1',
          isSelected ? 'border-white/30' : '',
          justAdded ? type.glow : '',
        ].join(' ')}
        style={{ borderRadius: '1.15rem' }}
      >
        {/* badge row */}
        <div className="flex items-center justify-between mb-2">
          <span
            className={`inline-flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wider border rounded-full px-2 py-0.5 ${type.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${type.dot}`} aria-hidden="true" />
            {type.shortLabel}
          </span>
          {isMine && (
            <span className="inline-flex items-center gap-1 text-[9px] text-[#84CC16]">
              <Sparkles className="w-3 h-3" />
              you
            </span>
          )}
        </div>

        {/* text */}
        <p className="text-[11px] md:text-xs leading-snug text-ink/90 line-clamp-3">
          "{node.text}"
        </p>

        {/* author + time */}
        <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] text-muted">
            <span
              className="w-5 h-5 rounded-full grid place-items-center text-[9px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${type.hexStart}, ${type.hexEnd})` }}
              aria-hidden="true"
            >
              {node.author.charAt(0)}
            </span>
            <span className="font-medium text-ink/70">{node.author}</span>
          </span>
          <span className="text-[9px] text-muted/60">{node.time}</span>
        </div>
      </div>
    </button>
  )
}
