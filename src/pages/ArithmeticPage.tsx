import { useState, useCallback, useEffect, useRef } from 'react'
import { ModeSelector } from '../components/ui/ModeSelector'
import { StatsBar } from '../components/ui/StatsBar'
import { ArithmeticProblem } from '../components/problem/ArithmeticProblem'
import { ResultsOverlay } from '../components/ui/ResultsOverlay'
import { RestartButton } from '../components/ui/RestartButton'
import { useTimer } from '../hooks/useTimer'
import { useArithmetic } from '../hooks/useArithmetic'
import type { Operation, TimerDuration } from '../types'

export function ArithmeticPage() {
  const [operation, setOperation] = useState<Operation>('add')
  const [duration, setDuration] = useState<TimerDuration>(30)
  const [inputValue, setInputValue] = useState('')
  const [flash, setFlash] = useState<'correct' | 'wrong' | null>(null)

  const timer = useTimer(duration)
  const arithmetic = useArithmetic(operation)
  const flashTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const restartRef = useRef<HTMLButtonElement>(null)

  const triggerFlash = useCallback((type: 'correct' | 'wrong') => {
    if (flashTimeout.current) clearTimeout(flashTimeout.current)
    setFlash(type)
    flashTimeout.current = setTimeout(() => setFlash(null), 180)
  }, [])

  const handleSubmit = useCallback(() => {
    if (timer.finished || inputValue.trim() === '') return
    timer.start()
    const correct = arithmetic.submit(inputValue)
    triggerFlash(correct ? 'correct' : 'wrong')
    setInputValue('')
  }, [timer, inputValue, arithmetic, triggerFlash])

  const handleRestart = useCallback(() => {
    timer.reset()
    arithmetic.reset()
    setInputValue('')
    setFlash(null)
  }, [timer, arithmetic])

  const handleOperationChange = useCallback(
    (op: Operation) => {
      setOperation(op)
      timer.reset()
      setInputValue('')
      setFlash(null)
    },
    [timer],
  )

  const handleDurationChange = useCallback(
    (d: TimerDuration) => {
      setDuration(d)
      handleRestart()
    },
    [handleRestart],
  )

  // Tab always focuses the restart button; Enter on it restarts.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        e.preventDefault()
        restartRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex flex-col items-center gap-xl flex-1 justify-center">
      <ModeSelector
        operation={operation}
        duration={duration}
        onOperationChange={handleOperationChange}
        onDurationChange={handleDurationChange}
        disabled={timer.running}
      />
      <StatsBar
        remaining={timer.remaining}
        correct={arithmetic.correct}
        attempts={arithmetic.attempts}
        elapsed={timer.elapsed}
      />
      {timer.finished ? (
        <ResultsOverlay
          correct={arithmetic.correct}
          attempts={arithmetic.attempts}
          duration={duration}
        />
      ) : (
        <ArithmeticProblem
          display={arithmetic.problem.display}
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
          flash={flash}
          disabled={timer.finished}
        />
      )}
      <RestartButton ref={restartRef} onRestart={handleRestart} />
    </div>
  )
}
