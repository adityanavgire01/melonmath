import { useState, useEffect, useRef, useCallback } from 'react'

export function useTimer(duration: number) {
  const [remaining, setRemaining] = useState(duration)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    if (!running && !finished) setRunning(true)
  }, [running, finished])

  const reset = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRemaining(duration)
    setRunning(false)
    setFinished(false)
  }, [duration])

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!)
          setRunning(false)
          setFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current!)
  }, [running])

  useEffect(() => {
    reset()
  }, [duration]) // eslint-disable-line react-hooks/exhaustive-deps

  const elapsed = duration - remaining

  return { remaining, elapsed, running, finished, start, reset }
}
