import { useState, useCallback } from 'react'
import { STORAGE_KEYS } from '../data/storageKeys'

const EMPTY_SESSION = {
  active: false,
  startTime: null,
  perspectivesExplored: 0,
  meaningfulExchanges: 0,
  newConnections: 0,
  conversationsExplored: [],
}

export default function useMosaicSession() {
  const readSession = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.session)
      let value = raw ? JSON.parse(raw) : EMPTY_SESSION
      if (!value || typeof value !== 'object' || Array.isArray(value)) return EMPTY_SESSION
      return {
        ...EMPTY_SESSION,
        ...value,
        conversationsExplored: Array.isArray(value.conversationsExplored)
          ? value.conversationsExplored
          : [],
      }
    } catch {
      return EMPTY_SESSION
    }
  }, [])

  const [session, setSession] = useState(readSession)

  const persistSession = useCallback((next) => {
    const value = next instanceof Function ? next(session) : next
    try {
      localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(value))
    } catch {}
    return value
  }, [session])

  const startSession = useCallback(() => {
    const next = {
      active: true,
      startTime: Date.now(),
      perspectivesExplored: 0,
      meaningfulExchanges: 0,
      newConnections: 0,
      conversationsExplored: [],
    }
    setSession(persistSession(next))
    return next
  }, [persistSession])

  const recordExploration = useCallback((conversationId) => {
    setSession((prev) => {
      if (!prev.active) {
        const started = {
          active: true,
          startTime: Date.now(),
          perspectivesExplored: 1,
          meaningfulExchanges: 0,
          newConnections: 0,
          conversationsExplored: [conversationId].filter(Boolean),
        }
        return persistSession(started)
      }
      const set = prev.conversationsExplored || []
      const isNew = conversationId && !set.includes(conversationId)
      const next = {
        ...prev,
        perspectivesExplored: (prev.perspectivesExplored || 0) + 1,
        conversationsExplored: isNew ? [...set, conversationId] : set,
      }
      return persistSession(next)
    })
  }, [persistSession])

  const recordExchange = useCallback(() => {
    setSession((prev) => {
      const base = prev.active ? prev : { ...EMPTY_SESSION, active: true, startTime: Date.now() }
      return persistSession({
        ...base,
        meaningfulExchanges: (base.meaningfulExchanges || 0) + 1,
      })
    })
  }, [persistSession])

  const recordConnection = useCallback(() => {
    setSession((prev) => {
      const base = prev.active ? prev : { ...EMPTY_SESSION, active: true, startTime: Date.now() }
      return persistSession({
        ...base,
        newConnections: (base.newConnections || 0) + 1,
      })
    })
  }, [persistSession])

  const endSession = useCallback(() => {
    const snapshot = { ...session }
    setSession({ ...EMPTY_SESSION })
    try {
      const history = []
      try {
        const raw = localStorage.getItem(STORAGE_KEYS.sessionHistory)
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed)) history.push(...parsed)
        }
      } catch {}
      history.push({ ...snapshot, endTime: Date.now() })
      localStorage.setItem(STORAGE_KEYS.sessionHistory, JSON.stringify(history.slice(-20)))
    } catch {}
    return snapshot
  }, [session])

  return {
    session,
    startSession,
    recordExploration,
    recordExchange,
    recordConnection,
    endSession,
  }
}