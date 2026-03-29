import { useState, useRef, useCallback } from "react"
import { useLocation } from "wouter"
import { useSiteSettings, SiteSettings } from "@/context/SiteSettingsContext"
import { useProjects, ProjectFile } from "@/context/ProjectsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Zap, LogOut, Save, Settings, Phone, Wrench, BarChart3,
  Eye, EyeOff, FolderOpen, Plus, Trash2, ImageIcon, FileText,
  Download, Upload, X, ChevronDown, ChevronUp
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const ADMIN_PASSWORD = "m20admin"

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function SectionCard({ icon: Icon, title, badge, children, defaultOpen = true }: {
  icon: React.ElementType
  title: string
  badge?: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="bg-card border border-border clip-edges overflow-hidden">
      <button
        className="w-full px-8 py-5 border-b border-border flex items-center gap-3 hover:bg-primary/5 transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        <Icon className="w-5 h-5 text-primary shrink-0" />
        <h2 className="font-display font-bold text-white tracking-widest uppercase text-left flex-1">{title}</h2>
        {badge && <span className="text-xs text-muted-foreground font-display mr-2">{badge}</span>}
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

function ProjectCard({ project, onDelete }: {
  project: ReturnType<typeof useProjects>["projects"][0]
  onDelete: () => void
}) {
  const { addFileToProject, removeFileFromProject } = useProjects()
  const [expanded, setExpanded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFilesAdded(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const data = await readFileAsDataURL(file)
      const pf: ProjectFile = {
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        data,
      }
      addFileToProject(project.id, pf)
    }
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  function downloadFile(name: string, data: string) {
    const a = document.createElement("a")
    a.href = data
    a.download = name
    a.click()
  }

  const isImage = (type: string) => type.startsWith("image/")

  return (
    <div className="border border-border bg-background clip-edges overflow-hidden">
      {/* Project Header */}
      <div className="flex items-start gap-4 p-4">
        <div className="w-20 h-16 shrink-0 bg-card border border-border clip-edges overflow-hidden">
          {project.image ? (
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-display font-bold truncate">{project.title}</h4>
          <p className="text-primary text-xs font-display tracking-wider uppercase mt-0.5">{project.category}</p>
          {project.description && (
            <p className="text-muted-foreground text-xs mt-1 line-clamp-2">{project.description}</p>
          )}
          <p className="text-muted-foreground text-xs mt-1">{project.files.length} file{project.files.length !== 1 ? "s" : ""} attached</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            title={expanded ? "Collapse" : "Manage files"}
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
            title="Delete project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded: file management */}
      {expanded && (
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-display tracking-widest text-muted-foreground uppercase">Attached Files</span>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-display tracking-wider uppercase transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Add Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
              onChange={handleFilesAdded}
            />
          </div>

          {project.files.length === 0 ? (
            <p className="text-muted-foreground text-xs text-center py-4">No files yet. Click "Add Files" to upload.</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {project.files.map(file => (
                <div key={file.id} className="flex items-center gap-3 bg-card border border-border p-2.5 clip-edges">
                  {isImage(file.type) ? (
                    <img src={file.data} alt={file.name} className="w-10 h-8 object-cover shrink-0 clip-edges" />
                  ) : (
                    <div className="w-10 h-8 bg-secondary flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-xs font-display truncate">{file.name}</p>
                    <p className="text-muted-foreground text-xs">{formatBytes(file.size)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => downloadFile(file.name, file.data)}
                      className="p-1.5 text-muted-foreground hover:text-primary transition-colors"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFileFromProject(project.id, file.id)}
                      className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      title="Remove file"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function AddProjectForm({ onDone }: { onDone: () => void }) {
  const { addProject } = useProjects()
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [imageData, setImageData] = useState("")
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload")
  const [imageUrl, setImageUrl] = useState("")
  const [files, setFiles] = useState<ProjectFile[]>([])
  const [dragging, setDragging] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleImageFile(file: File) {
    const data = await readFileAsDataURL(file)
    setImageData(data)
    setImagePreview(data)
  }

  async function handleFilesSelected(selected: FileList | null) {
    if (!selected) return
    const newFiles: ProjectFile[] = []
    for (const file of Array.from(selected)) {
      const data = await readFileAsDataURL(file)
      newFiles.push({ id: crypto.randomUUID(), name: file.name, type: file.type, size: file.size, data })
    }
    setFiles(f => [...f, ...newFiles])
  }

  const onDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setDragging(true) }, [])
  const onDragLeave = useCallback(() => setDragging(false), [])
  const onDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) handleImageFile(file)
  }, [])

  function removeFile(id: string) {
    setFiles(f => f.filter(x => x.id !== id))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    const finalImage = imageMode === "url" ? imageUrl : imageData
    addProject({ title: title.trim(), category: category.trim(), description: description.trim(), image: finalImage, files })
    onDone()
  }

  const finalPreview = imageMode === "url" ? imageUrl : imagePreview

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Project Title *</label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Metro Plaza Towers" required className="bg-background border-border focus-visible:border-primary rounded-none h-10" />
        </div>
        <div className="space-y-1.5">
          <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Category</label>
          <Input value={category} onChange={e => setCategory(e.target.value)} placeholder="e.g. Commercial Wiring" className="bg-background border-border focus-visible:border-primary rounded-none h-10" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Description</label>
        <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe the project..." className="bg-background border-border focus-visible:border-primary rounded-none min-h-[80px] resize-none" />
      </div>

      {/* Image */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Project Photo</label>
          <div className="flex gap-2">
            {(["upload", "url"] as const).map(mode => (
              <button key={mode} type="button" onClick={() => setImageMode(mode)}
                className={cn("text-xs font-display px-3 py-1 border clip-edges transition-colors", imageMode === mode ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary")}
              >
                {mode === "upload" ? "Upload" : "URL"}
              </button>
            ))}
          </div>
        </div>

        {imageMode === "upload" ? (
          <div
            onClick={() => imageInputRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={cn(
              "relative border-2 border-dashed clip-edges cursor-pointer transition-colors flex items-center justify-center overflow-hidden",
              dragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/60",
              finalPreview ? "h-40" : "h-28"
            )}
          >
            {finalPreview ? (
              <>
                <img src={finalPreview} alt="preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-display text-xs tracking-widest">CHANGE PHOTO</p>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-xs font-display">Click or drag & drop an image</p>
              </div>
            )}
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleImageFile(f) }} />
          </div>
        ) : (
          <Input
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="bg-background border-border focus-visible:border-primary rounded-none h-10"
          />
        )}
      </div>

      {/* File Attachments */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-muted-foreground font-display tracking-wider uppercase text-xs">Attachments (PDF, Docs, etc.)</label>
          <button type="button" onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-display tracking-wider uppercase transition-colors">
            <Upload className="w-3.5 h-3.5" /> Add Files
          </button>
          <input ref={fileInputRef} type="file" multiple className="hidden"
            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip"
            onChange={e => handleFilesSelected(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div className="space-y-1.5 max-h-40 overflow-y-auto">
            {files.map(file => (
              <div key={file.id} className="flex items-center gap-3 bg-background border border-border p-2 clip-edges">
                {file.type.startsWith("image/") ? (
                  <img src={file.data} alt={file.name} className="w-8 h-6 object-cover shrink-0" />
                ) : (
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                )}
                <span className="flex-1 text-white text-xs font-display truncate">{file.name}</span>
                <span className="text-muted-foreground text-xs shrink-0">{formatBytes(file.size)}</span>
                <button type="button" onClick={() => removeFile(file.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" size="sm" className="flex-1 gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={onDone}>Cancel</Button>
      </div>
    </form>
  )
}

export function AdminPage() {
  const [, navigate] = useLocation()
  const { settings, updateSettings } = useSiteSettings()
  const { projects, deleteProject } = useProjects()
  const { toast } = useToast()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("m20_admin_auth") === "true")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [form, setForm] = useState<SiteSettings>(settings)
  const [showAddProject, setShowAddProject] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("m20_admin_auth", "true")
      setAuthed(true)
      setPasswordError("")
    } else {
      setPasswordError("Incorrect password. Please try again.")
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("m20_admin_auth")
    setAuthed(false)
    setPassword("")
  }

  function handleSave() {
    updateSettings(form)
    toast({ title: "Settings Saved", description: "Website content has been updated successfully." })
  }

  function updateStat(key: keyof SiteSettings["stats"], value: string) {
    setForm(f => ({ ...f, stats: { ...f.stats, [key]: value } }))
  }

  function updateContact(key: keyof SiteSettings["contact"], value: string) {
    setForm(f => ({ ...f, contact: { ...f.contact, [key]: value } }))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 bg-primary flex items-center justify-center clip-edges">
              <Zap className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-lg leading-none tracking-wider text-foreground block">M20 URBANSPACE</span>
              <span className="font-display text-[10px] text-primary tracking-[0.2em] uppercase">Admin Portal</span>
            </div>
          </div>
          <div className="bg-card border border-border p-8 clip-edges">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5 text-primary" />
              <h1 className="font-display font-bold text-white tracking-widest uppercase text-lg">Admin Login</h1>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Password</label>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    className="bg-background border-border focus-visible:border-primary rounded-none h-12 pr-12"
                    placeholder="Enter admin password" autoFocus />
                  <button type="button" onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {passwordError && <p className="text-destructive text-xs font-display">{passwordError}</p>}
              </div>
              <Button type="submit" className="w-full">ACCESS ADMIN PANEL</Button>
            </form>
            <p className="text-muted-foreground text-xs mt-4 text-center font-display">
              <button onClick={() => navigate("/")} className="hover:text-primary transition-colors">← Back to Website</button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary flex items-center justify-center clip-edges">
              <Zap className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
            </div>
            <div>
              <span className="font-display font-bold text-sm text-foreground tracking-wider">M20 ADMIN PANEL</span>
              <span className="block text-[10px] text-primary font-display tracking-widest uppercase">Site Settings</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" rel="noopener noreferrer">View Site</a>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 md:px-6 py-10 max-w-4xl space-y-6">

        {/* Projects Section */}
        <SectionCard icon={FolderOpen} title="Projects" badge={`${projects.length} project${projects.length !== 1 ? "s" : ""}`}>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground text-sm">
                Add projects with photos and files. They appear in the Portfolio section on the website.
              </p>
              {!showAddProject && (
                <Button size="sm" variant="outline" onClick={() => setShowAddProject(true)} className="gap-2 shrink-0 ml-4">
                  <Plus className="w-4 h-4" /> New Project
                </Button>
              )}
            </div>

            {showAddProject && (
              <div className="border border-primary/40 bg-primary/5 clip-edges">
                <div className="px-6 py-4 border-b border-primary/20 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-primary" />
                  <span className="font-display font-bold text-primary text-sm tracking-widest uppercase">New Project</span>
                </div>
                <AddProjectForm onDone={() => setShowAddProject(false)} />
              </div>
            )}

            {projects.length === 0 && !showAddProject ? (
              <div className="text-center py-10 border border-dashed border-border clip-edges">
                <FolderOpen className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-display text-sm mb-4">No projects added yet</p>
                <Button size="sm" onClick={() => setShowAddProject(true)} className="gap-2">
                  <Plus className="w-4 h-4" /> Add First Project
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onDelete={() => deleteProject(project.id)}
                  />
                ))}
                {projects.length > 0 && !showAddProject && (
                  <button
                    onClick={() => setShowAddProject(true)}
                    className="w-full py-3 border border-dashed border-border hover:border-primary text-muted-foreground hover:text-primary font-display text-xs tracking-widest uppercase transition-colors clip-edges flex items-center justify-center gap-2"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Another Project
                  </button>
                )}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Stats Section */}
        <SectionCard icon={BarChart3} title="Hero Statistics" badge="Shown on homepage banner" defaultOpen={false}>
          <div className="p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { key: "yearsExperience" as const, label: "Years Experience", placeholder: "e.g. 15+" },
                { key: "projectsCompleted" as const, label: "Projects Completed", placeholder: "e.g. 2.5k" },
                { key: "safetyRecord" as const, label: "Safety Record", placeholder: "e.g. 100%" },
                { key: "responseTime" as const, label: "Response Time", placeholder: "e.g. 24/7" },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="space-y-2">
                  <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">{label}</label>
                  <Input value={form.stats[key]} onChange={e => updateStat(key, e.target.value)}
                    className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                    placeholder={placeholder} />
                </div>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Services Count Section */}
        <SectionCard icon={Wrench} title="Services Display" badge="Number of services shown" defaultOpen={false}>
          <div className="p-8">
            <p className="text-muted-foreground text-sm mb-6">
              Control how many service cards appear in the Services section (1–8 available).
            </p>
            <div className="space-y-4">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">
                Services to Display: <span className="text-primary font-bold ml-1">{form.servicesCount}</span>
              </label>
              <div className="flex items-center gap-4">
                <input type="range" min={1} max={8} step={1} value={form.servicesCount}
                  onChange={e => setForm(f => ({ ...f, servicesCount: Number(e.target.value) }))}
                  className="flex-1 accent-primary cursor-pointer h-2" />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, servicesCount: n }))}
                      className={cn("w-9 h-9 font-display font-bold text-sm border clip-edges transition-colors",
                        form.servicesCount === n ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary")}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-8 gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={cn("h-8 clip-edges border transition-colors", i < form.servicesCount ? "bg-primary/20 border-primary" : "bg-background border-border")} />
              ))}
            </div>
            <p className="text-muted-foreground text-xs mt-2 font-display">{form.servicesCount} of 8 services will be shown</p>
          </div>
        </SectionCard>

        {/* Contact Details Section */}
        <SectionCard icon={Phone} title="Contact Information" badge="Displayed in Contact section" defaultOpen={false}>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Phone / Direct Line</label>
              <Input value={form.contact.phone} onChange={e => updateContact("phone", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                placeholder="e.g. 1-800-M20-ELEC" />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Email Address</label>
              <Input value={form.contact.email} onChange={e => updateContact("email", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                placeholder="e.g. dispatch@m20urbanspace.com" />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Service Area / Address</label>
              <Textarea value={form.contact.address} onChange={e => updateContact("address", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none min-h-[90px] resize-none"
                placeholder="Describe your service area..." />
            </div>
          </div>
        </SectionCard>

        {/* Save Button */}
        <div className="flex items-center justify-between pb-10">
          <p className="text-muted-foreground text-xs font-display">Stats, services & contact changes require saving. Projects save automatically.</p>
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            SAVE SETTINGS
          </Button>
        </div>

      </main>
    </div>
  )
}
