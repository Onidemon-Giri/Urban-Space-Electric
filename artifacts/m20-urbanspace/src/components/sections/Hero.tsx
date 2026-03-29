import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, Activity } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="home">
      {/* Background with Grid Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10 pointer-events-none" />
        <img 
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Industrial Electrical Background" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container relative z-20 mx-auto px-4 md:px-6 flex flex-col justify-center h-full">
        <div className="max-w-4xl space-y-8 mt-12 md:mt-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-4 py-2 clip-edges backdrop-blur-sm"
          >
            <Activity className="w-4 h-4 text-primary" />
            <span className="text-primary font-display text-xs font-bold tracking-[0.2em] uppercase">
              24/7 Emergency Service Available
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9]"
          >
            POWERING <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-yellow-200 text-glow">
              URBAN SPACES
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl font-light border-l-2 border-primary pl-6"
          >
            Next-generation electrical engineering and contracting for commercial, industrial, and high-end residential infrastructure. Built to perform, wired to last.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Button size="lg" asChild className="group">
              <a href="#contact">
                Request a Quote
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Explore Services</a>
            </Button>
          </motion.div>
        </div>

        {/* Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mt-20 md:mt-32 border-t border-border pt-8"
        >
          {[
            { value: "15+", label: "Years Experience" },
            { value: "2.5k", label: "Projects Completed" },
            { value: "100%", label: "Safety Record" },
            { value: "24/7", label: "Rapid Response" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-2">
              <span className="text-3xl md:text-4xl font-display font-bold text-white">{stat.value}</span>
              <span className="text-xs font-display tracking-widest text-primary uppercase">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hidden md:block"
      >
        <a href="#services" aria-label="Scroll Down">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  )
}
