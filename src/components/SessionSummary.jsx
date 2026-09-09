import { useEffect } from 'react'
import { PartyPopper, Compass, HeartHandshake, Link2, Sparkles, User as UserIcon, X } from 'lucide-react'

function Stat({ icon: Icon, value, label, hint, color }) {
  return (
    <div className="glass-card p-5 text-center" style={{ borderRadius: '1.25rem' }}>
      <div className={`w-11 h-11 mx-auto mb-3 rounded-2xl grid place-items-center ${color}`}>
        <Icon className="w-5 h-5 text-white" aria-hidden="true" />
      </div>
      <div className="font-display font-extrabold text-3xl text-ink">{value}</div>
      <div className="micro-label mt-1">{label}</div>
      <p className="text-[10px] text-muted mt-2 leading-relaxed">{hint}</p>
    </div>
  )
}

export default function SessionSummary({ session, onRestart, onViewProfile, onClose }) {
  const explored = session.conversationsExplored?.length || 0
  const perspectives = session.perspectivesExplored || 0
  const exchanges = session.meaningfulExchanges || 0
  const connections = session.newConnections || 0

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[75] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Session complete summary"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm animate-fade-in cursor-default"
      />

      <div className="relative w-full max-w-lg glass-sheet rounded-[2rem] px-5 md:px-8 pt-7 pb-8 animate-pop shadow-card-glow max-h-[90vh] overflow-y-auto">
        {/* Accent glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#84CC16]/20 blur-[90px] -z-10" aria-hidden="true" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 grid place-items-center hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-7">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-[#84CC16] to-[#06B6D4] grid place-items-center shadow-glow-acid mb-4">
            <PartyPopper className="w-6 h-6 text-black" aria-hidden="true" />
          </div>
          <h2 className="font-display font-extrabold text-2xl md:text-3xl tracking-wide">
            SESSION <span className="neon-text-electric">COMPLETE</span>
          </h2>
          <p className="text-xs text-muted mt-2">
            You engaged, not consumed. Here is what your session built.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Stat
            icon={Compass}
            value={perspectives}
            label="perspectives explored"
            hint={perspectives === 1 ? 'You visited a new corner of an idea.' : `You explored ideas from ${perspectives} different perspectives.`}
            color="bg-gradient-to-br from-[#6366F1] to-[#06B6D4] shadow-glow-electric"
          />
          <Stat
            icon={HeartHandshake}
            value={exchanges}
            label="meaningful exchanges"
            hint={exchanges > 0 ? `You had ${exchanges} meaningful exchange${exchanges > 1 ? 's' : ''} today.` : 'No exchanges yet — someone is waiting to be heard.'}
            color="bg-gradient-to-br from-[#84CC16] to-[#6366F1] shadow-glow-acid"
          />
          <Stat
            icon={Link2}
            value={connections}
            label="new connections"
            hint={connections > 0 ? 'You connected ideas that had not met yet.' : 'Every button you press is a chance for a new one.'}
            color="bg-gradient-to-br from-[#FF2E93] to-[#6366F1] shadow-glow-hyper"
          />
          <Stat
            icon={Sparkles}
            value={explored}
            label="conversations explored"
            hint={explored === 1 ? 'One mosaic explored.' : `${explored} mosaics explored.`}
            color="bg-gradient-to-br from-[#06B6D4] to-[#84CC16] shadow-glow-cyber"
          />
        </div>

        {/* Reflection line */}
        <div className="mt-6 glass-card rounded-2xl p-4 text-center">
          <p className="text-sm text-ink/80 italic leading-relaxed">
            {perspectives === 0 && exchanges === 0
              ? '"The map is empty until you place a tile. Start a perspective and watch the mosaic take shape."'
              : exchanges > 0
              ? `"You had ${exchanges} meaningful exchange${exchanges > 1 ? 's' : ''} today. That is how conversations grow."`
              : '"You chose to explore. That is where every meaningful exchange begins."'}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#84CC16] to-[#06B6D4] text-black font-bold text-sm rounded-2xl py-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-glow-acid"
          >
            <Compass className="w-4 h-4" />
            Start Another Experience
          </button>
          <button
            onClick={onViewProfile}
            className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/15 text-white font-semibold text-sm rounded-2xl py-3.5 hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            <UserIcon className="w-4 h-4" />
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}