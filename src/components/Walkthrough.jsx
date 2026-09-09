import { useState, useCallback, useEffect } from 'react'
import { Ghost, Users, HeartHandshake, ChevronLeft, ChevronRight, Zap } from 'lucide-react'

const SLIDES = [
  {
    id: 'no-likes',
    icon: Ghost,
    title: 'NO LIKES.\nNO FEEDS.',
    desc: 'Escape the echo chamber. Mosaic is built around real experiences, not performance culture.',
    accent: '#FF2E93',
    gradient: 'from-[#FF2E93] to-[#FF9A3F]',
    glow: 'shadow-glow-hyper',
  },
  {
    id: 'rooms',
    icon: Users,
    title: 'PERSPECTIVE\nROOMS',
    desc: 'Join small interactive circles around single questions and explore visual connection maps.',
    accent: '#6366F1',
    gradient: 'from-[#6366F1] to-[#06B6D4]',
    glow: 'shadow-glow-electric',
  },
  {
    id: 'exchanges',
    icon: HeartHandshake,
    title: 'MEANINGFUL\nEXCHANGES',
    desc: 'Track genuine interactions and connect with people who think differently.',
    accent: '#84CC16',
    gradient: 'from-[#84CC16] to-[#06B6D4]',
    glow: 'shadow-glow-acid',
  },
]

export default function Walkthrough({ onComplete }) {
  const [slideIdx, setSlideIdx] = useState(0)
  const [direction, setDirection] = useState('next') // 'next' | 'prev' for slide transition
  const [entering, setEntering] = useState(false)

  const slide = SLIDES[slideIdx]
  const Icon = slide.icon
  const isLast = slideIdx === SLIDES.length - 1
  const isFirst = slideIdx === 0

  const handleNext = useCallback(() => {
    if (isLast) {
      setEntering(true)
      return
    }
    setDirection('next')
    setSlideIdx((i) => i + 1)
  }, [isLast])

  const handlePrev = useCallback(() => {
    if (isFirst) return
    setDirection('prev')
    setSlideIdx((i) => i - 1)
  }, [isFirst])

  const handleDot = useCallback((idx) => {
    setDirection(idx > slideIdx ? 'next' : 'prev')
    setSlideIdx(idx)
  }, [slideIdx])

  // Fade-out transition when entering main app
  useEffect(() => {
    if (!entering) return
    const t = setTimeout(() => onComplete(), 500)
    return () => clearTimeout(t)
  }, [entering, onComplete])

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Enter') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [handleNext, handlePrev])

  return (
    <div
      className={`fixed inset-0 z-[90] flex flex-col overflow-hidden transition-opacity duration-500 ease-out ${
        entering ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#050508' }}
      role="dialog"
      aria-modal="true"
      aria-label="MOSAIC onboarding"
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] rounded-full bg-[#6366F1]/15 blur-[120px] animate-orb-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[26rem] h-[26rem] rounded-full bg-[#FF2E93]/10 blur-[120px] animate-orb-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute inset-0 grid-noise opacity-40" />
      </div>

      {/* Top bar — logo + skip */}
      <div className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] via-[#FF2E93] to-[#06B6D4] grid place-items-center shadow-glow-electric">
            <span className="font-display font-bold text-white text-xs">M</span>
          </div>
          <span className="font-display font-bold tracking-[0.3em] text-xs">MOSAIC</span>
        </div>
        <button
          onClick={() => onComplete()}
          disabled={entering}
          className="text-xs text-muted hover:text-white transition-colors disabled:opacity-40"
        >
          Skip to app
        </button>
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        <div key={slide.id} className="max-w-md w-full">
          {/* Slide transition container */}
          <div
            className={`transition-all duration-500 ease-out ${
              direction === 'next' ? 'animate-slide-in-next' : 'animate-slide-in-prev'
            }`}
          >
            {/* Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className={`absolute -inset-3 rounded-3xl bg-gradient-to-br ${slide.gradient} opacity-25 blur-xl animate-orb-pulse`}
                  aria-hidden="true"
                />
                <div
                  className={`relative w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br ${slide.gradient} grid place-items-center ${slide.glow}`}
                >
                  <Icon className="w-9 h-9 md:w-10 md:h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Title */}
            <h1
              className="font-display font-extrabold text-3xl md:text-4xl text-center leading-tight whitespace-pre-line"
              style={{ color: slide.accent }}
            >
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-sm md:text-base text-muted text-center leading-relaxed mt-4 max-w-sm mx-auto">
              {slide.desc}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="relative z-10 pb-8 md:pb-12 flex flex-col items-center gap-5">
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => handleDot(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === slideIdx
                  ? 'w-7 bg-gradient-to-r from-[#6366F1] to-[#FF2E93] shadow-glow-electric'
                  : 'bg-white/15 hover:bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Prev / Next controls */}
        <div className="flex items-center gap-3 w-full max-w-sm px-6">
          <button
            onClick={handlePrev}
            disabled={isFirst || entering}
            className="flex items-center justify-center gap-1.5 bg-white/5 border border-white/15 text-white font-semibold text-xs rounded-full px-5 py-3 hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Prev</span>
          </button>

          <button
            onClick={handleNext}
            disabled={entering}
            className={`flex-1 flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold text-sm text-black transition-all hover:brightness-110 active:scale-[0.98] ${
              isLast
                ? 'bg-gradient-to-r from-[#84CC16] to-[#06B6D4] shadow-glow-acid'
                : 'bg-gradient-to-r from-[#FF2E93] to-[#6366F1] shadow-glow-hyper'
            }`}
          >
            {isLast ? (
              <>
                <Zap className="w-4 h-4" />
                Enter Mosaic
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        <p className="text-[10px] text-muted/50 tracking-wide">
          No feeds. No likes. Just conversations.
        </p>
      </div>
    </div>
  )
}
