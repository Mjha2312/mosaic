import { SearchX } from 'lucide-react'

export default function EmptyState({ icon: Icon = SearchX, title, description, action, onAction, actionLabel }) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center px-6 py-16 glass-card rounded-3xl animate-fade-in"
      role="status"
    >
      <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/[0.08] grid place-items-center mb-4">
        <Icon className="w-7 h-7 text-muted/50" />
      </div>
      <p className="font-display font-bold text-lg text-ink/90">{title}</p>
      {description && (
        <p className="text-sm text-muted mt-2 max-w-sm leading-relaxed">{description}</p>
      )}
      {action && onAction && (
        <button
          onClick={onAction}
          className="mt-6 flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-xs font-semibold rounded-full px-5 py-2.5 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-electric"
        >
          {actionLabel || 'Explore'}
        </button>
      )}
    </div>
  )
}