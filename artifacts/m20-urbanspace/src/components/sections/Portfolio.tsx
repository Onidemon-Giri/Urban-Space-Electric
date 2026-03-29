import { motion } from "framer-motion"

const projects = [
  {
    // server room
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=800&q=80",
    title: "Data Center Alpha",
    category: "Industrial Infrastructure",
    span: "col-span-1 md:col-span-2 row-span-2"
  },
  {
    // modern architecture
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    title: "Metro Plaza Towers",
    category: "Commercial Wiring",
    span: "col-span-1 row-span-1"
  },
  {
    // industrial facility
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Nexus Manufacturing",
    category: "High Voltage Systems",
    span: "col-span-1 row-span-1"
  },
  {
    // electrical panel
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    title: "Grid Substation 4",
    category: "Panel Integration",
    span: "col-span-1 md:col-span-2 row-span-1"
  }
]

export function Portfolio() {
  return (
    <section className="py-24 md:py-32 bg-background relative" id="portfolio">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-display tracking-[0.3em] text-primary mb-4 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-primary"></span>
            PORTFOLIO
            <span className="w-12 h-px bg-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-white">
            PROVEN EXCELLENCE
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] gap-4">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden clip-edges border border-border hover:border-primary transition-colors ${project.span}`}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-display text-xs tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.category}
                </span>
                <h4 className="text-white font-display font-bold text-xl md:text-2xl">
                  {project.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
