export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-[#08080f] to-[#050508]" />
      <div className="absolute inset-0 grid-noise opacity-50" />
      <div className="absolute -top-32 -left-32 w-[40rem] h-[40rem] rounded-full bg-[#6366F1]/20 blur-[120px] animate-orb-pulse" />
      <div
        className="absolute top-1/3 -right-40 w-[36rem] h-[36rem] rounded-full bg-[#FF2E93]/15 blur-[130px] animate-orb-pulse"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-40 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[#06B6D4]/15 blur-[120px] animate-orb-pulse"
        style={{ animationDelay: '4s' }}
      />
      <div className="absolute bottom-1/4 right-1/3 w-[24rem] h-[24rem] rounded-full bg-[#84CC16]/[0.06] blur-[110px] animate-drift" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent" />
    </div>
  )
}
