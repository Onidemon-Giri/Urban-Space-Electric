import { motion } from "framer-motion"
import { 
  Building2, 
  Home, 
  Factory, 
  Zap, 
  Sun, 
  Cpu, 
  ShieldCheck, 
  Cable 
} from "lucide-react"
import { useSiteSettings } from "@/context/SiteSettingsContext"

const allServicesData = [
  {
    icon: Building2,
    title: "Commercial Electrical",
    desc: "Comprehensive power systems, lighting control, and infrastructure for office buildings and retail spaces."
  },
  {
    icon: Factory,
    title: "Industrial Systems",
    desc: "Heavy-duty machinery wiring, motor controls, and high-voltage installations for manufacturing facilities."
  },
  {
    icon: Home,
    title: "Residential Services",
    desc: "High-end residential wiring, custom lighting design, and electrical remodeling."
  },
  {
    icon: Zap,
    title: "Emergency Repairs",
    desc: "24/7 rapid response troubleshooting and critical fault repairs to minimize downtime."
  },
  {
    icon: Sun,
    title: "Solar & Renewable",
    desc: "Commercial solar grid integration, battery storage systems, and EV charging stations."
  },
  {
    icon: Cpu,
    title: "Smart Automation",
    desc: "Intelligent building controls, IoT integration, and automated energy management."
  },
  {
    icon: ShieldCheck,
    title: "Inspections & Safety",
    desc: "Code compliance auditing, thermal imaging, and preventative maintenance programs."
  },
  {
    icon: Cable,
    title: "Panel Upgrades",
    desc: "Main switchgear replacements, sub-panel installations, and complete structural rewiring."
  }
]

export function Services() {
  const { settings } = useSiteSettings()
  const servicesData = allServicesData.slice(0, settings.servicesCount)

  return (
    <section className="py-24 md:py-32 bg-background relative" id="services">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-sm font-display tracking-[0.3em] text-primary mb-4 flex items-center gap-4">
              <span className="w-12 h-px bg-primary"></span>
              CORE CAPABILITIES
            </h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
              ENGINEERED FOR <br/> MAXIMUM PERFORMANCE
            </h3>
          </div>
          <p className="text-muted-foreground max-w-sm md:text-right text-sm">
            We deliver uncompromising quality across the entire spectrum of electrical contracting, maintaining rigid safety standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-card border border-card-border p-8 clip-edges hover:border-primary transition-colors duration-300 overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              
              <div className="relative z-10">
                <service.icon className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h4 className="text-xl font-display font-bold text-white mb-3">{service.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-transparent group-hover:border-primary transition-colors duration-300 m-2" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
