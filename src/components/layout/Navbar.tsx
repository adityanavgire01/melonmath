import { NavLink } from 'react-router-dom'
import { Keyboard, Settings, Info, User } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'arithmetic', to: '/arithmetic', enabled: true },
  { label: 'calculus', to: '/calculus', enabled: false },
  { label: 'algebra', to: '/algebra', enabled: false },
  { label: 'matrix', to: '/matrix', enabled: true },
]

interface NavbarProps {
  onOpenShortcuts: () => void
}

export function Navbar({ onOpenShortcuts }: NavbarProps) {
  return (
    <header className="w-full px-gutter py-md flex items-center justify-between max-w-container mx-auto">
      <div className="flex items-center gap-xl">
        <NavLink
          to="/"
          className="text-primary font-bold text-sm tracking-[0.15em] uppercase select-none"
        >
          melon math
        </NavLink>
        <nav className="flex items-center gap-lg">
          {NAV_ITEMS.map(item =>
            item.enabled ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-xs font-bold tracking-[0.1em] px-md py-xs rounded-full bg-surface-container text-on-surface'
                    : 'text-xs font-bold tracking-[0.1em] text-on-surface-variant hover:text-on-surface transition-colors'
                }
              >
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.to}
                className="text-xs font-bold tracking-[0.1em] text-on-surface-variant opacity-30 cursor-not-allowed select-none"
              >
                {item.label}
              </span>
            ),
          )}
        </nav>
      </div>
      <div className="flex items-center gap-md">
        <button
          onClick={onOpenShortcuts}
          className="text-on-surface-variant hover:text-on-surface transition-colors p-xs"
          aria-label="keyboard shortcuts"
        >
          <Keyboard size={18} />
        </button>
        <button
          className="text-on-surface-variant hover:text-on-surface transition-colors p-xs opacity-40 cursor-not-allowed"
          aria-label="settings"
          disabled
        >
          <Settings size={18} />
        </button>
        <button
          className="text-on-surface-variant hover:text-on-surface transition-colors p-xs opacity-40 cursor-not-allowed"
          aria-label="info"
          disabled
        >
          <Info size={18} />
        </button>
        <button
          className="text-on-surface-variant hover:text-on-surface transition-colors p-xs opacity-40 cursor-not-allowed"
          aria-label="account"
          disabled
        >
          <User size={18} />
        </button>
      </div>
    </header>
  )
}
