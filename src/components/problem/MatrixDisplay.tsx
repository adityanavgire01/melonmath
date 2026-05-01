import { useRef, useEffect } from 'react'
import type { MatrixOperation } from '../../types'

type Matrix2x2 = [[number, number], [number, number]]

const OPERATORS: Record<MatrixOperation, string> = {
  add: '+',
  sub: '−',
  mul: '×',
}

interface MatrixGridProps {
  matrix: Matrix2x2
}

function MatrixGrid({ matrix }: MatrixGridProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-4xl font-thin text-on-surface-variant">[</span>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">
        {matrix.flat().map((v, i) => (
          <span key={i} className="text-3xl font-normal text-on-surface text-center w-8">
            {v}
          </span>
        ))}
      </div>
      <span className="text-4xl font-thin text-on-surface-variant">]</span>
    </div>
  )
}

interface ResultInputGridProps {
  cellValues: [string, string, string, string]
  wrongCells: boolean[]
  onChange: (index: number, value: string) => void
  onSubmit: () => void
  onSkip: () => void
  onTabFromLast: () => void
  disabled: boolean
}

export function ResultInputGrid({
  cellValues,
  wrongCells,
  onChange,
  onSubmit,
  onSkip,
  onTabFromLast,
  disabled,
}: ResultInputGridProps) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  useEffect(() => {
    refs[0].current?.focus()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (e.ctrlKey) {
        onSkip()
        return
      }
      onSubmit()
      setTimeout(() => refs[0].current?.focus(), 0)
      return
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      if (!e.shiftKey && index === 3) {
        // last cell → hand off to restart button
        onTabFromLast()
        return
      }
      const next = e.shiftKey ? (index + 3) % 4 : (index + 1) % 4
      refs[next].current?.focus()
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-4xl font-thin text-primary">[</span>
      <div className="grid grid-cols-2 gap-3">
        {cellValues.map((val, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="number"
            value={val}
            onChange={e => onChange(i, e.target.value)}
            onKeyDown={e => handleKey(e, i)}
            disabled={disabled}
            inputMode="numeric"
            autoComplete="off"
            data-matrix-input="true"
            className={`w-16 h-12 bg-surface-container-high text-center text-xl font-normal rounded-sm outline-none border transition-colors
              [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
              ${wrongCells[i] ? 'border-error text-error' : 'border-outline-variant text-on-surface focus:border-primary'}
            `}
          />
        ))}
      </div>
      <span className="text-4xl font-thin text-primary">]</span>
    </div>
  )
}

interface MatrixDisplayProps {
  a: Matrix2x2
  b: Matrix2x2
  operation: MatrixOperation
  cellValues: [string, string, string, string]
  wrongCells: boolean[]
  onCellChange: (index: number, value: string) => void
  onSubmit: () => void
  onSkip: () => void
  onTabFromLast: () => void
  disabled: boolean
}

export function MatrixDisplay({
  a,
  b,
  operation,
  cellValues,
  wrongCells,
  onCellChange,
  onSubmit,
  onSkip,
  onTabFromLast,
  disabled,
}: MatrixDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <MatrixGrid matrix={a} />
      <span className="text-3xl font-light text-on-surface-variant">
        {OPERATORS[operation]}
      </span>
      <MatrixGrid matrix={b} />
      <span className="text-3xl font-light text-on-surface-variant">=</span>
      <ResultInputGrid
        cellValues={cellValues}
        wrongCells={wrongCells}
        onChange={onCellChange}
        onSubmit={onSubmit}
        onSkip={onSkip}
        onTabFromLast={onTabFromLast}
        disabled={disabled}
      />
    </div>
  )
}
