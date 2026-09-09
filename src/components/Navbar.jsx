import { LayoutGrid, Compass, Users, PlusCircle, User as UserIcon, Sparkles } from 'lucide-react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: LayoutGrid },
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'circles', label: 'Circles', icon: Users },
  { id: 'create', label: 'Create', icon: PlusCircle },
  { id: 'profile', label: 'Profile', icon: UserIcon },
]

export default function Navbar({ activePage, onNavigate, exchangeCount, initial }) {
  return (
    <>
      {/* ── DESKTOP SIDEBAR ──────────────────────────────────────── */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 z-40 w-60 flex-col border-r border-white/[0.06] bg-[#070709]/70 backdrop-blur-2xl px-5 py-6">
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          aria-label="MOSAIC home"
          className="flex items-center gap-3 mb-8"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#6366F1] via-[#FF2E93] to-[#06B6D4] grid place-items-center shadow-glow-electric">
            <span className="font-display font-extrabold text-white text-sm">M</span>
          </div>
          <span className="font-display font-bold tracking-[0.3em] text-sm">MOSAIC</span>
        </button>

        {/* Nav items */}
        <nav aria-label="Primary" className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'bg-gradient-to-r from-[#6366F1]/25 to-[#FF2E93]/25 border border-[#6366F1]/40 text-white shadow-glow-electric'
                    : 'text-muted hover:text-white hover:bg-white/[0.05] border border-transparent',
                ].join(' ')}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Exchange counter */}
        <div className="mt-auto glass-card rounded-2xl p-4">
          <div className="flex items-center gap-2 text-[#84CC16]" aria-live="polite" aria-label={`${exchangeCount} meaningful exchanges`}>
            <Sparkles className="w-4 h-4" />
            <span className="font-display font-bold text-lg">{exchangeCount}</span>
          </div>
          <p className="text-[10px] text-muted mt-1">meaningful exchanges</p>
          <p className="text-[10px] text-muted/60 mt-2 leading-relaxed">
            No likes. No followers. Just understanding.
          </p>
        </div>
      </aside>

      {/* ── MOBILE TOP BAR ───────────────────────────────────────── */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#070709]/85 backdrop-blur-2xl border-b border-white/[0.06]">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => onNavigate('home')}
            aria-label="MOSAIC home"
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] via-[#FF2E93] to-[#06B6D4] grid place-items-center shadow-glow-electric">
              <span className="font-display font-extrabold text-white text-xs">{initial}</span>
            </div>
            <span className="font-display font-bold tracking-[0.3em] text-xs">MOSAIC</span>
          </button>

          <div
            className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1.5"
            aria-live="polite"
            aria-label={`${exchangeCount} meaningful exchanges`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#84CC16]" />
            <span className="text-xs font-semibold">{exchangeCount}</span>
          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM NAV ────────────────────────────────────── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3"
        aria-label="Primary navigation"
      >
        <div className="glass-sheet rounded-3xl p-1.5 flex items-center justify-around" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'flex flex-col items-center gap-0.5 rounded-2xl px-3 py-1.5 transition-all duration-300 min-w-[3.4rem]',
                  isActive
                    ? 'bg-gradient-to-br from-[#6366F1] to-[#FF2E93] text-white shadow-glow-electric'
                    : 'text-muted hover:text-white hover:bg-white/[0.06]',
                ].join(' ')}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[9px] font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}