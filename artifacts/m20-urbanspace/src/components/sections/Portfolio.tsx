import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, FileText, Download, ImageIcon } from "lucide-react"
import { useProjects, Project } from "@/context/ProjectsContext"

const defaultProjects = [
  {
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=800&q=80",
    title: "Data Center Alpha",
    category: "Industrial Infrastructure",
    description: "",
    files: [],
  },
  {
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
    title: "Metro Plaza Towers",
    category: "Commercial Wiring",
    description: "",
    files: [],
  },
  {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    title: "Nexus Manufacturing",
    category: "High Voltage Systems",
    description: "",
    files: [],
  },
  {
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    title: "Grid Substation 4",
    category: "Panel Integration",
    description: "",
    files: [],
  },
]

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function ProjectModal({ project, onClose }: { project: typeof defaultProjects[0] | Project; onClose: () => void }) {
  const hasFiles = "files" in project && project.files.length > 0

  function downloadFile(name: string, data: string, type: string) {
    const a = document.createElement("a")
    a.href = data
    a.download = name
    a.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25 }}
        className="bg-card border border-border clip-edges w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-secondary flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-background/80 border border-border hover:border-primary flex items-center justify-center clip-edges transition-colors"
          >
            <X className="w-4 h-4 text-foreground" />
          </button>
          <div className="absolute bottom-4 left-6">
            <span className="text-primary font-display text-xs tracking-widest uppercase block mb-1">{project.category}</span>
            <h3 className="text-white font-display font-bold text-2xl">{project.title}</h3>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {project.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
          )}

          {hasFiles && (
            <div>
              <h4 className="text-white font-display font-bold text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Project Files
              </h4>
              <div className="space-y-2">
                {"files" in project && project.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-background border border-border p-3 clip-edges">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileText className="w-4 h-4 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="text-white text-sm font-display truncate">{file.name}</p>
                        <p className="text-muted-foreground text-xs">{formatBytes(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => downloadFile(file.name, file.data, file.type)}
                      className="ml-3 p-2 text-muted-foreground hover:text-primary transition-colors shrink-0"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function Portfolio() {
  const { projects: customProjects } = useProjects()
  const [selected, setSelected] = useState<(typeof defaultProjects[0]) | Project | null>(null)

  const allProjects = customProjects.length > 0
    ? customProjects
    : defaultProjects

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-[250px]">
          {allProjects.map((project, index) => (
            <motion.div
              key={"id" in project ? project.id : project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative overflow-hidden clip-edges border border-border hover:border-primary transition-colors cursor-pointer"
              onClick={() => setSelected(project)}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              ) : (
                <div className="w-full h-full bg-secondary flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-muted-foreground" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent flex flex-col justify-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-primary font-display text-xs tracking-widest uppercase mb-2 block opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.category}
                </span>
                <h4 className="text-white font-display font-bold text-xl">
                  {project.title}
                </h4>
                {"files" in project && project.files.length > 0 && (
                  <span className="text-primary/70 text-xs font-display mt-1 flex items-center gap-1">
                    <FileText className="w-3 h-3" />
                    {project.files.length} file{project.files.length !== 1 ? "s" : ""} attached
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {allProjects.length === 0 && (
          <div className="text-center py-16 text-muted-foreground font-display">
            No projects yet. Add projects from the Admin Panel.
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  )
}
