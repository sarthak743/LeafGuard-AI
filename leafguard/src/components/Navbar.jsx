import { useEffect, useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Upload', href: '#upload' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/70 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-white shadow-soft group-hover:rotate-12 transition-transform duration-300">
            <Leaf size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-semibold text-ink">LeafGuard</span>
        </a>

        <ul className="hidden md:flex items-center gap-9">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-ink/70 hover:text-primary transition-colors relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#upload"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:bg-primary-dark hover:shadow-lift transition-all duration-300"
        >
          Analyze Leaf
        </a>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden grid place-items-center h-10 w-10 rounded-full text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-black/5 px-6 py-4 flex flex-col gap-4">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-ink/80 font-medium">
              {link.label}
            </a>
          ))}
          <a
            href="#upload"
            onClick={() => setOpen(false)}
            className="inline-flex justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Analyze Leaf
          </a>
        </div>
      )}
    </header>
  )
}
