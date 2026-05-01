import { Modal } from './Modal'

const SHORTCUTS = [
  { key: 'enter', action: 'submit answer' },
  { key: 'tab', action: 'next matrix cell' },
  { key: 'tab + enter', action: 'restart session' },
  { key: 'ctrl + enter', action: 'skip problem (matrix)' },
  { key: 'esc', action: 'close modal' },
]

interface ShortcutsModalProps {
  open: boolean
  onClose: () => void
}

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-sm font-bold tracking-[0.1em] text-on-surface mb-md">
        keyboard shortcuts
      </h2>
      <div className="flex flex-col gap-sm">
        {SHORTCUTS.map(s => (
          <div key={s.key} className="flex items-center justify-between">
            <span className="text-xs text-on-surface-variant">{s.action}</span>
            <kbd className="text-xs font-mono bg-surface-container-high text-primary px-sm py-xs rounded-sm border border-outline-variant">
              {s.key}
            </kbd>
          </div>
        ))}
      </div>
    </Modal>
  )
}
