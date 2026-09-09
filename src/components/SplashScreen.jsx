import { useEffect, useState } from 'react'
import { SkipForward } from 'lucide-react'

const SPLASH_DURATION = 2500 // 2.5 seconds

export default function SplashScreen({ onComplete }) {
  const [fading, setFading] = useState(false)
  const [done, setDone] = useState(false)

  // Auto-transition after 2.5 seconds: fade out then call onComplete
  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true)
    }, SPLASH_DURATION)

    return () => clearTimeout(timer)
  }, [])

  // Once fading is triggered, wait for the fade transition before unmounting
  useEffect(() => {
    if (!fading) return
    const t = setTimeout(() => {
      setDone(true)
      onComplete()
    }, 650)
    return () => clearTimeout(t)
  }, [fading, onComplete])

  // Skip button: fade out immediately
  const handleSkip = () => {
    if (fading) return
    setFading(true)
  }

  if (done) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ease-out ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: '#050508' }}
      aria-label="MOSAIC splash screen"
    >
      {/* Pulsing background orbs */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] rounded-full bg-[#6366F1]/20 blur-[110px] animate-orb-pulse" />
        <div
          className="absolute top-1/3 -right-28 w-[24rem] h-[24rem] rounded-full bg-[#FF2E93]/15 blur-[120px] animate-orb-pulse"
          style={{ animationDelay: '1.2s' }}
        />
        <div
          className="absolute -bottom-28 left-1/3 w-[26rem] h-[26rem] rounded-full bg-[#06B6D4]/15 blur-[110px] animate-orb-pulse"
          style={{ animationDelay: '2s' }}
        />
        <div className="absolute inset-0 grid-noise opacity-40" />
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        {/* Glowing gradient M logo */}
        <div className="relative mb-6">
          <div className="absolute -inset-5 rounded-full bg-gradient-to-br from-[#6366F1]/30 via-[#FF2E93]/20 to-[#06B6D4]/30 blur-2xl animate-orb-pulse" aria-hidden="true" />
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-[#6366F1] via-[#FF2E93] to-[#06B6D4] grid place-items-center shadow-glow-electric animate-pop">
            <span className="font-display font-extrabold text-white text-5xl md:text-6xl">M</span>
          </div>
        </div>

        {/* MOSAIC with shimmer */}
        <h1
          className="font-display font-extrabold text-4xl md:text-5xl tracking-[0.35em] animate-fade-in"
          style={{
            background: 'linear-gradient(90deg, #6366F1, #FF2E93, #06B6D4, #84CC16, #6366F1)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s ease-in-out infinite',
          }}
        >
          MOSAIC
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-sm md:text-base text-muted tracking-wide animate-fade-in" style={{ animationDelay: '400ms' }}>
          Reimagining Social Connection...
        </p>

        {/* Loading dots */}
        <div className="mt-8 flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-[#6366F1] to-[#FF2E93] animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        disabled={fading}
        className="absolute bottom-8 right-6 md:right-10 flex items-center gap-1.5 text-xs text-muted/70 hover:text-white transition-colors z-10"
      >
        <SkipForward className="w-3.5 h-3.5" />
        Skip
      </button>
    </div>
  )
}
