import { useState, useCallback, useEffect, useMemo } from 'react'
import { LogOut, ChevronRight, Compass } from 'lucide-react'
import AmbientBackground from './components/AmbientBackground'
import SplashScreen from './components/SplashScreen'
import Walkthrough from './components/Walkthrough'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import EmptyState from './components/EmptyState'
import ConversationMap from './components/ConversationMap'
import SessionSummary from './components/SessionSummary'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Circles from './pages/Circles'
import Create from './pages/Create'
import Profile from './pages/Profile'
import useLocalStorage from './hooks/useLocalStorage'
import useMosaicSession from './hooks/useMosaicSession'
import { STORAGE_KEYS, DEFAULT_PROFILE } from './data/storageKeys'
import { PROMPTS, INITIAL_PERSPECTIVES } from './data/prompts'
import { uid, asArray, asNumber } from './utils/helpers'

const FLOW = { splash: 'splash', walkthrough: 'walkthrough', main: 'main' }

function normalizeProfile(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return DEFAULT_PROFILE
  return {
    ...DEFAULT_PROFILE,
    ...value,
    name: typeof value.name === 'string' ? value.name : DEFAULT_PROFILE.name,
    bio: typeof value.bio === 'string' ? value.bio : DEFAULT_PROFILE.bio,
    initial:
      typeof value.initial === 'string' && value.initial.length === 1
        ? value.initial
        : (typeof value.name === 'string' && value.name.length > 0
            ? value.name.charAt(0).toUpperCase()
            : DEFAULT_PROFILE.initial),
    interests: asArray(value.interests),
    stats: {
      ...DEFAULT_PROFILE.stats,
      ...(value.stats && typeof value.stats === 'object' && !Array.isArray(value.stats)
        ? value.stats
        : {}),
    },
  }
}

export default function App() {
  // ── ONBOARDING FLOW ────────────────────────────────────────────
  const [flow, setFlow] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.walkthroughDone) === '1' ? FLOW.main : FLOW.splash
    } catch {
      return FLOW.splash
    }
  })

  // ── PERSISTED STATE ───────────────────────────────────────────
  const [profile, setProfile] = useLocalStorage(STORAGE_KEYS.profile, DEFAULT_PROFILE, normalizeProfile)
  const [customConversations, setCustomConversations] = useLocalStorage(STORAGE_KEYS.conversations, [], asArray)
  const [customPerspectives, setCustomPerspectives] = useLocalStorage(STORAGE_KEYS.perspectives, [], asArray)
  const [joinedCircles, setJoinedCircles] = useLocalStorage(STORAGE_KEYS.joinedCircles, [], asArray)
  const [exchanges, setExchanges] = useLocalStorage(STORAGE_KEYS.exchanges, 0, asNumber)
  const [explored, setExplored] = useLocalStorage(STORAGE_KEYS.explored, [], asArray)

  // ── ROUTING ───────────────────────────────────────────────────
  const [activePage, setActivePage] = useState('home')
  const [activeConversationId, setActiveConversationId] = useState(null)
  const [createDefaultCircle, setCreateDefaultCircle] = useState(null)

  // ── UI STATE ──────────────────────────────────────────────────
  const [toast, setToast] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [summaryData, setSummaryData] = useState(null)

  // ── SESSION ───────────────────────────────────────────────────
  const { session, recordExploration, recordExchange, recordConnection, endSession } = useMosaicSession()

  // ── DERIVED DATA ──────────────────────────────────────────────
  const allConversations = useMemo(() => [...PROMPTS, ...customConversations], [customConversations])

  const myPerspectives = useMemo(
    () => customPerspectives.filter((p) => p.isMine),
    [customPerspectives]
  )

  const myConversations = useMemo(
    () => customConversations.filter((c) => (c.createdBy || '') === 'You'),
    [customConversations]
  )

  const userInterests = useMemo(() => {
    const interests = new Set()
    ;[...explored]
      .map((id) => PROMPTS.find((p) => p.id === id))
      .filter(Boolean)
      .forEach((p) => interests.add(p.category))
    joinedCircles.forEach((cid) => {
      const convs = PROMPTS.filter((p) => p.circleId === cid)
      convs.forEach((c) => interests.add(c.category))
    })
    return [...interests]
  }, [explored, joinedCircles])

  // ── NAVIGATION ────────────────────────────────────────────────
  const navigate = useCallback((page) => {
    setActiveConversationId(null)
    setActivePage(page)
    if (page !== 'create') setCreateDefaultCircle(null)
  }, [])

  const exploreConversation = useCallback(
    (conversation) => {
      if (!conversation?.id) return
      setActiveConversationId(conversation.id)
      setActivePage('map')
      const isNew = !(Array.isArray(explored) && explored.includes(conversation.id))
      setExplored((prev) => (prev.includes(conversation.id) ? prev : [...prev, conversation.id]))
      if (isNew) {
        setProfile((p) => ({
          ...p,
          stats: { ...p.stats, explored: (p.stats?.explored || 0) + 1 },
        }))
      }
    },
    [setExplored, setProfile, explored]
  )

  // ── CONVERSATION MAP ──────────────────────────────────────────
  const activeConversation = useMemo(
    () => allConversations.find((c) => c.id === activeConversationId) || null,
    [allConversations, activeConversationId]
  )

  const activePerspectives = useMemo(() => {
    if (!activeConversation) return []
    return [
      ...(INITIAL_PERSPECTIVES[activeConversation.id] || []),
      ...customPerspectives.filter((p) => p.conversationId === activeConversation.id),
    ]
  }, [activeConversation, customPerspectives])

  const handleRelate = useCallback(
    (node) => {
      setExchanges((n) => n + 1)
      setProfile((p) => ({
        ...p,
        stats: { ...p.stats, exchanges: (p.stats?.exchanges || 0) + 1 },
      }))
      // bump relatedCount on the perspective
      setCustomPerspectives((prev) =>
        prev.map((p) => (p.id === node.id ? { ...p, relatedCount: (p.relatedCount || 0) + 1 } : p))
      )
      recordExchange()
      setToast({ type: 'exchange', message: 'Meaningful exchange +1' })
    },
    [setExchanges, setProfile, setCustomPerspectives, recordExchange]
  )

  const handleAddPerspective = useCallback(
    (node) => {
      setCustomPerspectives((prev) => [...prev, node])
      setProfile((p) => ({
        ...p,
        stats: { ...p.stats, perspectives: (p.stats?.perspectives || 0) + 1 },
      }))
      recordConnection()
      setToast({ type: 'success', message: 'Perspective added to the mosaic' })
    },
    [setCustomPerspectives, setProfile, recordConnection]
  )

  const handleChallenge = useCallback(
    (node) => {
      setCustomPerspectives((prev) => [...prev, node])
      setProfile((p) => ({
        ...p,
        stats: { ...p.stats, perspectives: (p.stats?.perspectives || 0) + 1 },
      }))
      recordConnection()
      setToast({ type: 'create', message: 'Challenge added — a new tile in the mosaic' })
    },
    [setCustomPerspectives, setProfile, recordConnection]
  )

  const handleCreateConversation = useCallback(
    ({ prompt, description, type, circleId }) => {
      const conv = {
        id: uid('conv'),
        question: prompt,
        description,
        type,
        circleId,
        category: 'perspectives',
        perspectiveCount: 0,
        exchangeCount: 0,
        participantCount: 1,
        accent: 'electric',
        createdAt: new Date().toISOString(),
        createdBy: 'You',
        isCustom: true,
      }
      setCustomConversations((prev) => [...prev, conv])
      setProfile((p) => ({
        ...p,
        stats: { ...p.stats, conversations: (p.stats?.conversations || 0) + 1 },
      }))
      setToast({ type: 'create', message: 'Mosaic created — it is live in your circle' })
      navigate('home')
    },
    [setCustomConversations, setProfile, navigate]
  )

  // ── CIRCLES ───────────────────────────────────────────────────
  const joinCircle = useCallback(
    (circleId) => {
      setJoinedCircles((prev) => (prev.includes(circleId) ? prev : [...prev, circleId]))
      setProfile((p) => ({
        ...p,
        stats: { ...p.stats, circles: (p.stats?.circles || 0) + 1 },
      }))
      setToast({ type: 'success', message: 'Welcome to the circle' })
    },
    [setJoinedCircles, setProfile]
  )

  const leaveCircle = useCallback(
    (circleId) => {
      setJoinedCircles((prev) => prev.filter((id) => id !== circleId))
      setToast({ type: 'info', message: 'Left the circle' })
    },
    [setJoinedCircles]
  )

  // ── SESSION ───────────────────────────────────────────────────
  const handleFinishSession = useCallback(() => {
    const snapshot = endSession()
    setSummaryData(snapshot)
    setShowSummary(true)
  }, [endSession])

  const handleStartAnother = useCallback(() => {
    setShowSummary(false)
    setToast({ type: 'info', message: 'A new session begins' })
    navigate('home')
  }, [navigate])

  // ── ONBOARDING COMPLETION ─────────────────────────────────────
  const completeOnboarding = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.walkthroughDone, '1')
    } catch {}
    setFlow(FLOW.main)
  }, [])

  // reset scroll on page change + map change
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [activePage, activeConversationId])

  const sessionHistory = useMemo(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.sessionHistory)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }, [showSummary]) // re-read after session ends

  const exchangeCount = profile.stats?.exchanges || exchanges

  return (
    <div className="relative min-h-screen bg-abyss text-ink overflow-x-hidden">
      <AmbientBackground />

      {/* ── SPLASH ──────────────────────────────────────────────── */}
      {flow === FLOW.splash && <SplashScreen onComplete={() => setFlow(FLOW.walkthrough)} />}

      {/* ── WALKTHROUGH ─────────────────────────────────────────── */}
      {flow === FLOW.walkthrough && <Walkthrough onComplete={completeOnboarding} />}

      {/* ── MAIN APP ────────────────────────────────────────────── */}
      {flow === FLOW.main && (
        <div className="relative z-10 flex min-h-screen">
          {/* Desktop left sidebar */}
          <Navbar
            activePage={activePage}
            onNavigate={navigate}
            exchangeCount={exchangeCount}
            initial={profile.initial}
          />

          {/* Main content */}
          <main className="flex-1 lg:pl-60 pb-24 lg:pb-10 min-w-0">
            {/* Map view */}
            {activePage === 'map' && activeConversation && (
              <ConversationMap
                conversation={activeConversation}
                perspectives={activePerspectives}
                onRelate={handleRelate}
                onChallenge={handleChallenge}
                onAddPerspective={handleAddPerspective}
                onRecordExploration={recordExploration}
                onBack={() => navigate('home')}
              />
            )}

            {/* Pages */}
            <div key={activePage === 'map' ? 'map' : activePage} className={activePage === 'map' ? '' : 'animate-fade-in'}>
              {activePage === 'map' && !activeConversation && (
                <EmptyState
                  icon={Compass}
                  title="Conversation not found"
                  description="This mosaic may have been removed. Explore another one instead."
                  action
                  actionLabel="Back to Home"
                  onAction={() => navigate('home')}
                />
              )}

              {activePage === 'home' && (
                <Home
                  exchanges={exchangeCount}
                  exploredCount={explored.length}
                  onExploreConversation={exploreConversation}
                  onNavigate={navigate}
                />
              )}

              {activePage === 'discover' && (
                <Discover
                  onExploreConversation={exploreConversation}
                  userInterests={userInterests}
                />
              )}

              {activePage === 'circles' && (
                <Circles
                  joinedCircles={joinedCircles}
                  onJoin={joinCircle}
                  onLeave={leaveCircle}
                  onExploreConversation={exploreConversation}
                  onNavigateCreate={(circleId) => {
                    setCreateDefaultCircle(circleId)
                    navigate('create')
                  }}
                />
              )}

              {activePage === 'create' && (
                <Create onCreate={handleCreateConversation} defaultCircleId={createDefaultCircle} />
              )}

              {activePage === 'profile' && (
                <Profile
                  profile={profile}
                  onUpdateProfile={(updates) =>
                    setProfile((p) => ({ ...p, ...updates, initial: (updates.name || p.name).charAt(0).toUpperCase() }))
                  }
                  conversations={allConversations}
                  myPerspectives={myPerspectives}
                  joinedCircles={joinedCircles}
                  myConversations={myConversations}
                  sessionHistory={sessionHistory}
                  onExploreConversation={exploreConversation}
                />
              )}
            </div>

            {/* Finish Session bar (global, desktop + mobile aware) */}
            {activePage !== 'map' && (
              <div className="max-w-5xl mx-auto px-4 md:px-8">
                <button
                  onClick={handleFinishSession}
                  className="mt-10 w-full flex items-center justify-center gap-2 bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 text-xs font-semibold text-muted hover:text-white hover:border-[#84CC16]/40 transition-all group"
                >
                  <LogOut className="w-4 h-4 text-[#84CC16]" aria-hidden="true" />
                  Finish Session & Reflect
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </button>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ── OVERLAYS ────────────────────────────────────────────── */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {showSummary && summaryData && (
        <SessionSummary
          session={summaryData}
          onClose={() => setShowSummary(false)}
          onRestart={handleStartAnother}
          onViewProfile={() => {
            setShowSummary(false)
            navigate('profile')
          }}
        />
      )}
    </div>
  )
}