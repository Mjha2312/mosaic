import { useMemo, useState } from 'react'
import { Compass, Search, Filter, Sparkles, ConciergeBell } from 'lucide-react'
import { PROMPTS, CATEGORIES } from '../data/prompts'
import PromptCard from '../components/PromptCard'
import EmptyState from '../components/EmptyState'

export default function Discover({ onExploreConversation, userInterests }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sort, setSort] = useState('featured')

  const handleSearch = (e) => setQuery(e.target.value)
  const handleCategory = (cat) => setActiveCategory(activeCategory === cat ? 'all' : cat)

  const filtered = useMemo(() => {
    let list = [...PROMPTS]

    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.question.toLowerCase().includes(q) || (p.description || '').toLowerCase().includes(q)
      )
    }

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }

    switch (sort) {
      case 'exchanges':
        list.sort((a, b) => (b.exchangeCount || 0) - (a.exchangeCount || 0))
        break
      case 'perspectives':
        list.sort((a, b) => (b.perspectiveCount || 0) - (a.perspectiveCount || 0))
        break
      case 'recent':
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      default:
        break
    }
    return list
  }, [query, activeCategory, sort])

  const categoryEntries = Object.entries(CATEGORIES)

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <section className="text-center mb-8">
        <div className="micro-label mb-3 inline-flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
          discover
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">
          Explore <span className="neon-text-cyber">Conversations</span>
        </h1>
        <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
          Visual maps of real perspectives. Not a feed — a field of ideas waiting for your tile.
        </p>
      </section>

      {/* Search */}
      <div className="relative max-w-xl mx-auto mb-8">
        <label htmlFor="discover-search" className="sr-only">Search conversations</label>
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-3.5 focus-within:border-[#06B6D4]/50 focus-within:shadow-glow-cyber transition-all">
          <Search className="w-4 h-4 text-muted shrink-0" aria-hidden="true" />
          <input
            id="discover-search"
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="What are you curious about?"
            className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-muted/60"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[10px] text-muted hover:text-white uppercase tracking-wider transition-colors"
              aria-label="Clear search"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap justify-center gap-2 mb-6" role="group" aria-label="Filter by topic">
        <button
          onClick={() => handleCategory('all')}
          aria-pressed={activeCategory === 'all'}
          className={[
            'px-3.5 py-2 rounded-full text-[11px] font-semibold border transition-all duration-300',
            activeCategory === 'all'
              ? 'bg-white/10 border-white/30 text-white'
              : 'bg-white/[0.02] border-white/[0.06] text-muted hover:text-white hover:bg-white/[0.05]',
          ].join(' ')}
        >
          All Topics
        </button>
        {categoryEntries.map(([key, meta]) => {
          const active = activeCategory === key
          return (
            <button
              key={key}
              onClick={() => handleCategory(key)}
              aria-pressed={active}
              className={[
                'px-3.5 py-2 rounded-full text-[11px] font-semibold border transition-all duration-300',
                active
                  ? 'bg-white/10 border-white/30 text-white'
                  : 'bg-white/[0.02] border-white/[0.06] text-muted hover:text-white hover:bg-white/[0.05]',
              ].join(' ')}
            >
              <span
                className="inline-block w-2 h-2 rounded-full mr-1.5"
                style={{ background: meta.color }}
                aria-hidden="true"
              />
              {meta.label}
            </button>
          )
        })}

        {/* Sort control */}
        <div className="ml-2 flex items-center gap-1.5" aria-label="Sort results">
          <Filter className="w-3.5 h-3.5 text-muted" aria-hidden="true" />
          <label htmlFor="discover-sort" className="sr-only">Sort conversations</label>
          <select
            id="discover-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.08] text-[11px] font-semibold text-muted rounded-full px-3 py-2 outline-none focus:border-[#06B6D4]/50"
          >
            <option value="featured">Featured</option>
            <option value="exchanges">Most exchanges</option>
            <option value="perspectives">Most perspectives</option>
            <option value="recent">Most recent</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-center text-[11px] text-muted mb-6" aria-live="polite">
        {filtered.length} conversation{filtered.length !== 1 ? 's' : ''} found
        {activeCategory !== 'all' ? ` in ${CATEGORIES[activeCategory]?.label}` : ''}
        {query.trim() ? ` for "${query.trim()}"` : ''}
      </p>

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((prompt, idx) => (
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
          icon={Search}
          title="No conversations match that"
          description="Try a different topic or clear your search — or be the person who starts this conversation first."
          action
          actionLabel="Clear Filters"
          onAction={() => {
            setQuery('')
            setActiveCategory('all')
          }}
        />
      )}

      {/* Personalization hint */}
      {userInterests && userInterests.length > 0 && (
        <section className="mt-12" aria-label="Suggested for you">
          <div className="flex items-center gap-2 mb-5">
            <ConciergeBell className="w-4 h-4 text-[#FF2E93]" aria-hidden="true" />
            <h2 className="font-display font-bold text-lg">Because You Explored...</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PROMPTS.filter((p) => userInterests.includes(p.category))
              .slice(0, 3)
              .map((prompt, idx) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  index={idx}
                  onExplore={onExploreConversation}
                />
              ))}
          </div>
        </section>
      )}
    </div>
  )
}