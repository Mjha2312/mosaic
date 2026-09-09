import { Sparkles, HeartHandshake, ArrowRight, Compass, Users } from 'lucide-react'
import { PROMPTS } from '../data/prompts'
import PromptCard from '../components/PromptCard'

const TAGLINE_POINTS = [
  { icon: Sparkles, text: 'No feeds. Prompts at the center.' },
  { icon: HeartHandshake, text: 'Meaningful exchanges, not likes.' },
  { icon: Users, text: 'Small circles around real questions.' },
]

export default function Home({ onExploreConversation, onNavigate, exchanges, exploredCount }) {
  const featured = PROMPTS.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="text-center mb-12 md:mb-16" aria-labelledby="hero-title">
        <div className="micro-label mb-4 inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2E93]" aria-hidden="true" />
          reimagine social
        </div>

        <h1
          id="hero-title"
          className="font-display font-extrabold text-3xl sm:text-4xl md:text-6xl leading-tight tracking-tight"
        >
          <span className="block text-ink/100">THE INTERNET HAS ENOUGH FEEDS.</span>
          <span className="block">
            <span className="neon-text-electric">IT NEEDS BETTER</span>
          </span>
          <span className="block">
            <span className="neon-text-hyper">CONVERSATIONS.</span>
          </span>
        </h1>

        <p className="mt-5 text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
          MOSAIC turns social media from a performance space into a collaborative space.
          Instead of scrolling, you explore visual maps of real perspectives around questions
          that actually matter.
        </p>

        {/* Tagline points */}
        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          {TAGLINE_POINTS.map((p, i) => {
            const Icon = p.icon
            return (
              <span
                key={i}
                className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-4 py-2 text-[11px] text-muted animate-fade-in"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <Icon className="w-3.5 h-3.5 text-electric" aria-hidden="true" />
                {p.text}
              </span>
            )
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onExploreConversation(PROMPTS[0])}
            className="group flex items-center gap-2 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] text-white text-sm font-bold rounded-2xl px-7 py-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-electric"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            Explore a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
          <button
            onClick={() => onNavigate('create')}
            className="flex items-center gap-2 bg-white/[0.05] border border-white/15 text-white text-sm font-semibold rounded-2xl px-7 py-4 hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#FF2E93]" aria-hidden="true" />
            Start Your Own Mosaic
          </button>
        </div>

        {/* Live-ish indicators */}
        <div className="mt-8 flex items-center justify-center gap-5 text-[11px] text-muted/70">
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-[#84CC16]" aria-hidden="true" />
            {exchanges} meaningful exchanges this session
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-electric" aria-hidden="true" />
            {exploredCount || 0} conversations explored
          </span>
        </div>
      </section>

      {/* ── FEATURED PROMPTS ─────────────────────────────────── */}
      <section aria-labelledby="featured-title">
        <div className="flex items-center justify-between mb-5">
          <h2 id="featured-title" className="font-display font-bold text-xl flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-electric" aria-hidden="true" />
            Conversations Worth Joining
          </h2>
          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-1.5 text-[11px] text-muted hover:text-white transition-colors"
          >
            Discover more
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((prompt, idx) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              index={idx}
              onExplore={onExploreConversation}
            />
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="mt-16" aria-labelledby="how-title">
        <h2 id="how-title" className="font-display font-bold text-xl flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-[#FF2E93]" aria-hidden="true" />
          How MOSAIC Works
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: '01', title: 'A Prompt', desc: 'Someone starts a mosaic with a question, challenge, or reflection.' },
            { step: '02', title: 'Perspectives', desc: 'People add personal takes as connected nodes — experience, opinion, question, goal.' },
            { step: '03', title: 'Connection', desc: 'Relate to what resonates. Challenge respectfully. Every branch makes the map richer.' },
            { step: '04', title: 'Exchange', desc: 'You build meaningful exchanges, not likes. At the end, you reflect on what connected.' },
          ].map((item, i) => (
            <div
              key={item.step}
              className="glass-card p-5 relative overflow-hidden animate-fade-in"
              style={{ borderRadius: '1.5rem', animationDelay: `${i * 100}ms` }}
            >
              <div className="font-display font-extrabold text-3xl neon-text-electric opacity-80" aria-hidden="true">
                {item.step}
              </div>
              <h3 className="font-display font-bold text-sm mt-2 mb-1.5">{item.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}