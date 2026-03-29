import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

export function About() {
  return (
    <section className="py-24 md:py-32 bg-secondary border-y border-border" id="about">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 clip-edges overflow-hidden border border-border">
              <img 
                src={`${import.meta.env.BASE_URL}images/about-texture.png`}
                alt="Industrial Metal Texture" 
                className="w-full aspect-square md:aspect-[4/3] object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/30 clip-edges z-0 pointer-events-none"></div>
            
            <div className="absolute -left-8 top-12 bg-background border border-primary p-6 clip-edges z-20 hidden md:block box-glow">
              <span className="block text-4xl font-display font-black text-primary">Est. 2008</span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Certified Experts</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-sm font-display tracking-[0.3em] text-primary mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-primary"></span>
                OUR STORY
              </h2>
              <h3 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight mb-6">
                PRECISION ENGINEERING. <br/> UNYIELDING RELIABILITY.
              </h3>
              <p className="text-muted-foreground mb-4">
                M20 URBANSPACE ELECTRICALS was founded on a simple principle: modern infrastructure demands modern execution. We don't just run wire; we engineer robust power solutions that form the invisible backbone of the city.
              </p>
              <p className="text-muted-foreground">
                Our elite team of master electricians and system designers bring decades of specialized experience to every site, ensuring absolute compliance and unparalleled operational longevity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              {[
                "Licensed & Fully Insured",
                "OSHA Certified Crews",
                "Advanced Diagnostics",
                "Transparent Quoting",
                "Strict Code Compliance",
                "Turnkey Project Mgmt"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-sm font-display uppercase tracking-wider text-white">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
