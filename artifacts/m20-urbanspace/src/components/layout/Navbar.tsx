import { useState, useEffect } from "react"
import { Menu, X, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#portfolio" },
  ]

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-lg" 
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2 group"
          onClick={closeMenu}
        >
          <div className="w-10 h-10 bg-primary flex items-center justify-center clip-edges transition-transform group-hover:scale-110">
            <Zap className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none tracking-wider text-foreground group-hover:text-primary transition-colors">
              M20 URBANSPACE
            </span>
            <span className="font-display text-[10px] text-primary tracking-[0.2em] uppercase">
              Electricals
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className="font-display font-medium text-sm tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="w-px h-6 bg-border mx-2"></div>
          <Button asChild variant="default" size="sm">
            <a href="#contact">Get Quote</a>
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <div 
        className={cn(
          "fixed inset-0 top-[72px] bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-100%] pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-8 text-center">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                className="font-display font-bold text-2xl tracking-widest uppercase text-foreground hover:text-primary transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="mt-4 w-64" onClick={closeMenu}>
          <a href="#contact">Get a Free Quote</a>
        </Button>
      </div>
    </header>
  )
}
