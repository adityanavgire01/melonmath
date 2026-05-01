export function Footer() {
  return (
    <footer className="w-full px-gutter py-md flex items-center justify-between max-w-container mx-auto">
      <span className="text-xs text-on-surface-variant opacity-50">
        © 2024 melon math — precision engine
      </span>
      <nav className="flex items-center gap-lg">
        {['github', 'discord', 'support', 'terms'].map(link => (
          <a
            key={link}
            href="#"
            className="text-xs text-on-surface-variant hover:text-on-surface transition-colors tracking-[0.05em]"
          >
            {link}
          </a>
        ))}
      </nav>
    </footer>
  )
}
