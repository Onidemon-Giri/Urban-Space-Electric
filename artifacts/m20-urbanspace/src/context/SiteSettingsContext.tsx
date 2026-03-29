import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface SiteSettings {
  stats: {
    yearsExperience: string
    projectsCompleted: string
    safetyRecord: string
    responseTime: string
  }
  servicesCount: number
  contact: {
    phone: string
    email: string
    address: string
  }
}

const defaultSettings: SiteSettings = {
  stats: {
    yearsExperience: "15+",
    projectsCompleted: "2.5k",
    safetyRecord: "100%",
    responseTime: "24/7",
  },
  servicesCount: 8,
  contact: {
    phone: "1-800-M20-ELEC",
    email: "dispatch@m20urbanspace.com",
    address: "Headquartered in New York with full operational capacity across the greater tri-state metropolitan area.",
  },
}

interface SiteSettingsContextType {
  settings: SiteSettings
  updateSettings: (settings: SiteSettings) => void
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
})

const STORAGE_KEY = "m20_site_settings"

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        return { ...defaultSettings, ...parsed, stats: { ...defaultSettings.stats, ...parsed.stats }, contact: { ...defaultSettings.contact, ...parsed.contact } }
      }
    } catch {}
    return defaultSettings
  })

  const updateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
  }

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext)
}
