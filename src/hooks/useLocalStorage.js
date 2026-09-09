import { useState, useCallback, useEffect } from 'react'

function readLS(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    if (raw === null || raw === undefined) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // localStorage full or unavailable
  }
}

export default function useLocalStorage(key, initialValue, normalize) {
  const normalizeValue = useCallback(
    (value) => (typeof normalize === 'function' ? normalize(value) : value),
    [normalize]
  )

  const [storedValue, setStoredValue] = useState(() =>
    normalizeValue(readLS(key, initialValue))
  )

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const next = normalizeValue(value instanceof Function ? value(prev) : value)
        return next
      })
    },
    [normalizeValue]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
    } catch {}
    setStoredValue(normalizeValue(initialValue))
  }, [key, initialValue, normalizeValue])

  useEffect(() => {
    writeLS(key, storedValue)
  }, [key, storedValue])

  return [storedValue, setValue, removeValue]
}
