import { Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-7 w-7 rounded-full bg-primary text-white">
            <Leaf size={13} />
          </span>
          <span className="font-display font-semibold text-ink">LeafGuard</span>
        </div>
        <p className="text-sm text-ink/40">© {new Date().getFullYear()} LeafGuard. Grown with care.</p>
      </div>
    </footer>
  )
}
