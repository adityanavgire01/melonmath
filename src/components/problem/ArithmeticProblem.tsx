import { useRef, useEffect } from 'react'

interface ArithmeticProblemProps {
  display: string
  value: string
  onChange: (v: string) => void
  onSubmit: () => void
  flash: 'correct' | 'wrong' | null
  disabled: boolean
}

export function ArithmeticProblem({
  display,
  value,
  onChange,
  onSubmit,
  flash,
  disabled,
}: ArithmeticProblemProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled, display])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  const flashColor =
    flash === 'correct'
      ? 'text-primary'
      : flash === 'wrong'
        ? 'text-error'
        : 'text-on-surface'

  return (
    <div className="flex items-center justify-center gap-4">
      <span
        className={`text-6xl font-normal tracking-tight transition-colors duration-100 ${flashColor}`}
      >
        {display}
      </span>
      <span className={`text-6xl font-light text-outline transition-colors duration-100 ${flash === 'wrong' ? 'text-error' : ''}`}>
        =
      </span>
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKey}
        disabled={disabled}
        autoComplete="off"
        autoCorrect="off"
        inputMode="numeric"
        className={`w-32 bg-transparent border-b-2 text-6xl font-normal text-center text-on-surface outline-none transition-colors duration-100
          ${flash === 'correct' ? 'border-primary' : flash === 'wrong' ? 'border-error' : 'border-outline-variant focus:border-primary'}
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        `}
      />
    </div>
  )
}
