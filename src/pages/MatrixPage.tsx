import { useState, useCallback, useEffect, useRef } from 'react'
import { StatsBar } from '../components/ui/StatsBar'
import { MatrixDisplay } from '../components/problem/MatrixDisplay'
import { ResultsOverlay } from '../components/ui/ResultsOverlay'
import { RestartButton } from '../components/ui/RestartButton'
import { useTimer } from '../hooks/useTimer'
import { useMatrix } from '../hooks/useMatrix'
import type { MatrixOperation, TimerDuration } from '../types'

const MATRIX_OPS: { label: string; value: MatrixOperation }[] = [
  { label: 'add', value: 'add' },
  { label: 'sub', value: 'sub' },
  { label: 'mul', value: 'mul' },
]

const DURATIONS: TimerDuration[] = [15, 30, 60]

export function MatrixPage() {
  const [operation, setOperation] = useState<MatrixOperation>('mul')
  const [duration, setDuration] = useState<TimerDuration>(30)

  const timer = useTimer(duration)
  const matrix = useMatrix(operation)
  const restartRef = useRef<HTMLButtonElement>(null)

  const handleCellChange = useCallback(
    (index: number, value: string) => {
      if (!timer.finished) {
        timer.start()
        matrix.setCellValue(index, value)
      }
    },
    [timer, matrix],
  )

  const handleSubmit = useCallback(() => {
    if (timer.finished) return
    timer.start()
    matrix.submit()
  }, [timer, matrix])

  const handleSkip = useCallback(() => {
    if (!timer.finished) matrix.skip()
  }, [timer, matrix])

  const handleRestart = useCallback(() => {
    timer.reset()
    matrix.reset()
  }, [timer, matrix])

  const handleOperationChange = useCallback(
    (op: MatrixOperation) => {
      setOperation(op)
      timer.reset()
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

  const focusRestart = useCallback(() => {
    restartRef.current?.focus()
  }, [])

  // Tab from outside matrix cells → restart button.
  // Tab inside matrix cells is handled per-cell (data-matrix-input guard).
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const target = e.target as HTMLElement
        if (target.dataset.matrixInput) return
        e.preventDefault()
        restartRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="flex flex-col items-center gap-xl flex-1 justify-center">
      <div className="flex items-center gap-sm bg-surface-container rounded-lg px-md py-sm">
        <div className="flex items-center gap-xs">
          {MATRIX_OPS.map(op => (
            <button
              key={op.value}
              onClick={() => !timer.running && handleOperationChange(op.value)}
              disabled={timer.running}
              className={
                operation === op.value
                  ? 'px-md py-xs rounded-full text-xs font-bold tracking-[0.1em] bg-primary text-on-primary'
                  : 'px-md py-xs rounded-full text-xs font-bold tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors'
              }
            >
              {op.label}
            </button>
          ))}
        </div>
        <div className="w-px h-4 bg-outline-variant mx-xs" />
        <div className="flex items-center gap-md">
          {DURATIONS.map(d => (
            <button
              key={d}
              onClick={() => !timer.running && handleDurationChange(d)}
              disabled={timer.running}
              className={
                duration === d
                  ? 'text-xs font-bold text-primary'
                  : 'text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors'
              }
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <StatsBar
        remaining={timer.remaining}
        correct={matrix.correct}
        attempts={matrix.attempts}
        elapsed={timer.elapsed}
        isMatrix
      />

      {timer.finished ? (
        <ResultsOverlay
          correct={matrix.correct}
          attempts={matrix.attempts}
          duration={duration}
        />
      ) : (
        <>
          <MatrixDisplay
            a={matrix.problem.a}
            b={matrix.problem.b}
            operation={matrix.problem.operation}
            cellValues={matrix.cellValues}
            wrongCells={matrix.wrongCells}
            onCellChange={handleCellChange}
            onSubmit={handleSubmit}
            onSkip={handleSkip}
            onTabFromLast={focusRestart}
            disabled={timer.finished}
          />
          <span className="text-[11px] tracking-[0.1em] text-on-surface-variant">
            tab to move • enter to submit • ctrl + enter to skip
          </span>
        </>
      )}

      <RestartButton ref={restartRef} onRestart={handleRestart} />
    </div>
  )
}
