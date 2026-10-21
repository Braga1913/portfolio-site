import Link from "next/link";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-foreground/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 lg:px-10 h-14">
          <Link href="/" className="font-display text-xl tracking-wide">
            PARTH<span className="text-sakura">.</span>SARTHI
          </Link>
          <div className="flex items-center gap-5 sm:gap-6 font-mono text-[11px] tracking-widest uppercase">
            <Link href="/" className="hover:text-sakura transition-colors">
              Home
            </Link>
            <Link href="/blog/" className="text-sakura">
              Blog
            </Link>
            <Link href="/#contact" className="hover:text-sakura transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer className="px-6 lg:px-10 py-10 border-t border-foreground/5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] tracking-widest uppercase opacity-50">
          <span>© 2026 Parth Sarthi</span>
          <span>Built with code &amp; imagination</span>
        </div>
      </footer>
    </div>
  );
}
