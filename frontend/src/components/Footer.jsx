import { Github, Linkedin, Mail } from 'lucide-react'
import LeafGuardLogo from './ui/LeafGuardLogo.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <LeafGuardLogo size={28} />
          <span className="font-display font-semibold text-ink">LeafGuard</span>
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href="https://github.com/sarthak743"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/sarthak-brid-a5727b379/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="mailto:sarthakbrid9c24@gmail.com"
            aria-label="Email"
            className="grid place-items-center h-9 w-9 rounded-full bg-bg text-ink/50 hover:text-primary hover:bg-canopy hover:scale-110 hover:shadow-soft transition-all duration-300"
          >
            <Mail size={16} />
          </a>
        </div>

        <div className="text-center sm:text-right">
          <p className="text-sm text-ink/40">
            © {new Date().getFullYear()} LeafGuard. Grown with care.
          </p>
          <p className="text-sm text-ink/40">
            Built by Sarthak.
          </p>
        </div>
      </div>
    </footer>
  )
}
