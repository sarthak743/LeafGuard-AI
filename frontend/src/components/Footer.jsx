import { Leaf, Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-full bg-primary text-white">
            <Leaf size={13} />
          </span>
          <span className="font-display font-semibold text-ink">LeafGuard</span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:contact@leafguard.ai"
            aria-label="Email"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Mail size={16} />
          </a>
        </div>

        <p className="text-sm text-ink/40">© {new Date().getFullYear()} LeafGuard. Grown with care.</p>
      </div>
    </footer>
  )
}
