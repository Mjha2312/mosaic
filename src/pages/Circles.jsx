import { useState } from 'react'
import { Users, ArrowLeft } from 'lucide-react'
import { CIRCLES } from '../data/circles'
import CircleCard from '../components/CircleCard'
import CircleView from '../components/CircleView'
import EmptyState from '../components/EmptyState'

export default function Circles({
  joinedCircles,
  onJoin,
  onLeave,
  onExploreConversation,
  onNavigateCreate,
}) {
  const [openCircleId, setOpenCircleId] = useState(null)
  const openCircle = CIRCLES.find((c) => c.id === openCircleId) || null

  // Circle screen
  if (openCircle) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <CircleView
          circle={openCircle}
          joined={joinedCircles.includes(openCircle.id)}
          onBack={() => setOpenCircleId(null)}
          onJoin={onJoin}
          onLeave={onLeave}
          onExploreConversation={onExploreConversation}
          onNavigateCreate={() => {
            setOpenCircleId(null)
            onNavigateCreate(openCircle.id)
          }}
        />
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-12 animate-fade-in">
      {/* Header */}
      <section className="text-center mb-10">
        <div className="micro-label mb-3 inline-flex items-center gap-2">
          <Users className="w-3.5 h-3.5 text-[#6366F1]" aria-hidden="true" />
          circles
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-tight">
          Small <span className="neon-text-electric">Communities</span>
          <br />
          Around Shared Interests
        </h1>
        <p className="mt-3 text-sm text-muted max-w-xl mx-auto">
          Not follower bases. Small rooms where a handful of honest perspectives build something together.
        </p>

        {/* Joined summary */}
        <div className="mt-6 inline-flex items-center gap-2 bg-white/[0.04] border border-[#84CC16]/20 text-[#84CC16] rounded-full px-4 py-2 text-[11px] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#84CC16] animate-pulse" aria-hidden="true" />
          You belong to {joinedCircles.length} circle{joinedCircles.length !== 1 ? 's' : ''}
        </div>
      </section>

      {/* Your circles */}
      {joinedCircles.length > 0 && (
        <section className="mb-10" aria-labelledby="your-circles-title">
          <h2 id="your-circles-title" className="font-display font-bold text-lg mb-4">
            Your Circles
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CIRCLES.filter((c) => joinedCircles.includes(c.id)).map((circle) => (
              <CircleCard
                key={circle.id}
                circle={circle}
                joined
                onLeave={onLeave}
                onOpen={setOpenCircleId}
              />
            ))}
          </div>
        </section>
      )}

      {/* All circles */}
      <section aria-labelledby="all-circles-title">
        <h2 id="all-circles-title" className="font-display font-bold text-lg mb-4">
          All Circles
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CIRCLES.map((circle, idx) => (
            <CircleCard
              key={circle.id}
              circle={circle}
              joined={joinedCircles.includes(circle.id)}
              onJoin={onJoin}
              onLeave={onLeave}
              onOpen={setOpenCircleId}
              index={idx}
            />
          ))}
        </div>
      </section>

      {joinedCircles.length === 0 && (
        <div className="mt-10">
          <EmptyState
            icon={Users}
            title="No circles joined yet"
            description="Join a circle to keep conversations like these alive — and get personalized recommendations."
          />
        </div>
      )}
    </div>
  )
}