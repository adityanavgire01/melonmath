import { forwardRef } from 'react'
import { RotateCcw } from 'lucide-react'

interface RestartButtonProps {
  onRestart: () => void
  hint?: string
}

export const RestartButton = forwardRef<HTMLButtonElement, RestartButtonProps>(
  ({ onRestart, hint = 'tab + enter to restart' }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        onRestart()
      }
    }

    return (
      <button
        ref={ref}
        onClick={onRestart}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary focus:text-primary transition-colors group outline-none"
        aria-label="restart session"
      >
        <div className="p-2 rounded border border-transparent group-hover:border-outline-variant group-focus:border-outline transition-colors">
          <RotateCcw size={20} />
        </div>
        <span className="text-[10px] tracking-[0.1em] font-bold">{hint}</span>
      </button>
    )
  },
)

RestartButton.displayName = 'RestartButton'
