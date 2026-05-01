import type { Operation, TimerDuration } from '../../types'

const OPERATIONS: { label: string; value: Operation }[] = [
  { label: 'add', value: 'add' },
  { label: 'sub', value: 'sub' },
  { label: 'mul', value: 'mul' },
  { label: 'div', value: 'div' },
]

const DURATIONS: TimerDuration[] = [15, 30, 60]

interface ModeSelectorProps {
  operation: Operation
  duration: TimerDuration
  onOperationChange: (op: Operation) => void
  onDurationChange: (d: TimerDuration) => void
  disabled?: boolean
}

export function ModeSelector({
  operation,
  duration,
  onOperationChange,
  onDurationChange,
  disabled,
}: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-sm bg-surface-container rounded-lg px-md py-sm">
      <div className="flex items-center gap-xs">
        {OPERATIONS.map(op => (
          <button
            key={op.value}
            onClick={() => !disabled && onOperationChange(op.value)}
            disabled={disabled}
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
            onClick={() => !disabled && onDurationChange(d)}
            disabled={disabled}
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
  )
}
