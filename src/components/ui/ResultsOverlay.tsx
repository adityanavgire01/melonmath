interface ResultsOverlayProps {
  correct: number
  attempts: number
  duration: number
}

export function ResultsOverlay({ correct, attempts, duration }: ResultsOverlayProps) {
  const cpm = Math.round((correct / duration) * 60)
  const acc = attempts === 0 ? 0 : Math.round((correct / attempts) * 100)
  const incorrect = attempts - correct

  return (
    <div className="flex flex-col items-center gap-xl">
      <div className="flex items-end gap-xl">
        <ResultStat label="cpm" value={cpm.toString()} large />
        <ResultStat label="acc" value={`${acc}%`} large />
      </div>
      <div className="flex items-center gap-lg">
        <ResultStat label="answered" value={attempts.toString()} />
        <ResultStat label="correct" value={correct.toString()} />
        <ResultStat label="incorrect" value={incorrect.toString()} />
      </div>
    </div>
  )
}

interface ResultStatProps {
  label: string
  value: string
  large?: boolean
}

function ResultStat({ label, value, large }: ResultStatProps) {
  return (
    <div className="flex flex-col items-center gap-xs">
      <span className="text-[10px] font-bold tracking-[0.1em] text-on-surface-variant">
        {label}
      </span>
      <span className={`font-normal text-on-surface ${large ? 'text-5xl' : 'text-2xl'}`}>
        {value}
      </span>
    </div>
  )
}
