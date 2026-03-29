import { Zap, MapPin, Phone, Mail, ArrowRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#050505] border-t border-border pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary flex items-center justify-center clip-edges">
                <Zap className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl leading-none tracking-wider text-foreground">
                  M20 URBANSPACE
                </span>
                <span className="font-display text-xs text-primary tracking-[0.2em] uppercase">
                  Electricals
                </span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Powering urban environments with cutting-edge electrical solutions. Licensed, insured, and engineered for tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white border-b border-border pb-2 inline-block">Explore</h4>
            <ul className="space-y-3">
              {['Services', 'About Us', 'Portfolio', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm group">
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all text-primary" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white border-b border-border pb-2 inline-block">Core Services</h4>
            <ul className="space-y-3">
              {['Commercial Systems', 'Industrial Wiring', 'Smart Automation', 'Emergency Repair'].map((item) => (
                <li key={item} className="text-muted-foreground text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-white border-b border-border pb-2 inline-block">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Urban Power Ave, Suite 400<br/>Metropolis, NY 10001</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>1-800-M20-ELEC</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>dispatch@m20urbanspace.com</span>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground font-display tracking-widest uppercase">
            &copy; {currentYear} M20 URBANSPACE ELECTRICALS. All Rights Reserved.
          </p>
          <div className="flex gap-4">
            <span className="w-2 h-2 bg-primary animate-pulse"></span>
            <span className="w-2 h-2 bg-primary/50"></span>
            <span className="w-2 h-2 bg-primary/20"></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
