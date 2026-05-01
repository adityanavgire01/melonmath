interface StatsBarProps {
  remaining: number
  correct: number
  attempts: number
  elapsed: number
  isMatrix?: boolean
}

function calcCpm(correct: number, elapsedSeconds: number): string {
  if (elapsedSeconds < 1 || correct === 0) return '—'
  return Math.round((correct / elapsedSeconds) * 60).toString()
}

function calcAcc(correct: number, attempts: number): string {
  if (attempts === 0) return '—'
  return Math.round((correct / attempts) * 100) + '%'
}

export function StatsBar({ remaining, correct, attempts, elapsed, isMatrix }: StatsBarProps) {
  return (
    <div className="flex items-end gap-xl justify-center">
      <Stat label="timer" value={isMatrix ? formatTime(remaining) : `${remaining}s`} highlight />
      <Stat label="cpm" value={calcCpm(correct, elapsed)} />
      <Stat label="acc" value={calcAcc(correct, attempts)} />
    </div>
  )
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

interface StatProps {
  label: string
  value: string
  highlight?: boolean
}

function Stat({ label, value, highlight }: StatProps) {
  return (
    <div className="flex flex-col items-center gap-xs">
      <span className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant">
        {label}
      </span>
      <span className={`text-2xl font-normal ${highlight ? 'text-primary' : 'text-on-surface'}`}>
        {value}
      </span>
    </div>
  )
}
