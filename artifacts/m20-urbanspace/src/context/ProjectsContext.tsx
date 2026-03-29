import { createContext, useContext, useState, ReactNode } from "react"

export interface ProjectFile {
  id: string
  name: string
  type: string
  size: number
  data: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: string
  image: string
  files: ProjectFile[]
  createdAt: string
}

interface ProjectsContextType {
  projects: Project[]
  addProject: (project: Omit<Project, "id" | "createdAt">) => void
  updateProject: (id: string, project: Partial<Omit<Project, "id" | "createdAt">>) => void
  deleteProject: (id: string) => void
  addFileToProject: (projectId: string, file: ProjectFile) => void
  removeFileFromProject: (projectId: string, fileId: string) => void
}

const ProjectsContext = createContext<ProjectsContextType>({
  projects: [],
  addProject: () => {},
  updateProject: () => {},
  deleteProject: () => {},
  addFileToProject: () => {},
  removeFileFromProject: () => {},
})

const PROJECTS_KEY = "m20_projects"

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(PROJECTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return []
}

function saveProjects(projects: Project[]) {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects))
  } catch (e: unknown) {
    if (e instanceof DOMException && e.name === "QuotaExceededError") {
      alert("Storage limit reached. Please delete some files or projects to free up space.")
    }
  }
}

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(loadProjects)

  function persist(next: Project[]) {
    setProjects(next)
    saveProjects(next)
  }

  function addProject(project: Omit<Project, "id" | "createdAt">) {
    persist([...projects, {
      ...project,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }])
  }

  function updateProject(id: string, updates: Partial<Omit<Project, "id" | "createdAt">>) {
    persist(projects.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  function deleteProject(id: string) {
    persist(projects.filter(p => p.id !== id))
  }

  function addFileToProject(projectId: string, file: ProjectFile) {
    persist(projects.map(p =>
      p.id === projectId ? { ...p, files: [...p.files, file] } : p
    ))
  }

  function removeFileFromProject(projectId: string, fileId: string) {
    persist(projects.map(p =>
      p.id === projectId ? { ...p, files: p.files.filter(f => f.id !== fileId) } : p
    ))
  }

  return (
    <ProjectsContext.Provider value={{ projects, addProject, updateProject, deleteProject, addFileToProject, removeFileFromProject }}>
      {children}
    </ProjectsContext.Provider>
  )
}

export function useProjects() {
  return useContext(ProjectsContext)
}
