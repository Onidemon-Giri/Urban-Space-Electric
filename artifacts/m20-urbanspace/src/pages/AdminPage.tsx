import { useState } from "react"
import { useLocation } from "wouter"
import { useSiteSettings, SiteSettings } from "@/context/SiteSettingsContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Zap, LogOut, Save, Settings, Phone, Wrench, BarChart3, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const ADMIN_PASSWORD = "m20admin"

export function AdminPage() {
  const [, navigate] = useLocation()
  const { settings, updateSettings } = useSiteSettings()
  const { toast } = useToast()
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("m20_admin_auth") === "true")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const [form, setForm] = useState<SiteSettings>(settings)

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
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="bg-background border-border focus-visible:border-primary rounded-none h-12 pr-12"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  >
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

      <main className="container mx-auto px-4 md:px-6 py-10 max-w-4xl space-y-8">

        {/* Stats Section */}
        <div className="bg-card border border-border clip-edges overflow-hidden">
          <div className="px-8 py-5 border-b border-border flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-white tracking-widest uppercase">Hero Statistics</h2>
            <span className="ml-auto text-xs text-muted-foreground font-display">Shown on homepage banner</span>
          </div>
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
                  <Input
                    value={form.stats[key]}
                    onChange={e => updateStat(key, e.target.value)}
                    className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Count Section */}
        <div className="bg-card border border-border clip-edges overflow-hidden">
          <div className="px-8 py-5 border-b border-border flex items-center gap-3">
            <Wrench className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-white tracking-widest uppercase">Services Display</h2>
            <span className="ml-auto text-xs text-muted-foreground font-display">Number of services to show</span>
          </div>
          <div className="p-8">
            <p className="text-muted-foreground text-sm mb-6">
              Control how many service cards are displayed in the Services section. The website has 8 services available. Choose how many to show (1–8).
            </p>
            <div className="space-y-4">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">
                Services to Display: <span className="text-primary font-bold ml-1">{form.servicesCount}</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={form.servicesCount}
                  onChange={e => setForm(f => ({ ...f, servicesCount: Number(e.target.value) }))}
                  className="flex-1 accent-primary cursor-pointer h-2"
                />
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                    <button
                      key={n}
                      onClick={() => setForm(f => ({ ...f, servicesCount: n }))}
                      className={`w-9 h-9 font-display font-bold text-sm border clip-edges transition-colors ${
                        form.servicesCount === n
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Preview of cards */}
            <div className="mt-6 grid grid-cols-8 gap-1.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-8 clip-edges border transition-colors ${
                    i < form.servicesCount
                      ? "bg-primary/20 border-primary"
                      : "bg-background border-border"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground text-xs mt-2 font-display">{form.servicesCount} of 8 services will be shown</p>
          </div>
        </div>

        {/* Contact Details Section */}
        <div className="bg-card border border-border clip-edges overflow-hidden">
          <div className="px-8 py-5 border-b border-border flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-white tracking-widest uppercase">Contact Information</h2>
            <span className="ml-auto text-xs text-muted-foreground font-display">Displayed in the Contact section</span>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Phone / Direct Line</label>
              <Input
                value={form.contact.phone}
                onChange={e => updateContact("phone", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                placeholder="e.g. 1-800-M20-ELEC"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Email Address</label>
              <Input
                value={form.contact.email}
                onChange={e => updateContact("email", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none h-11"
                placeholder="e.g. dispatch@m20urbanspace.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground font-display tracking-wider uppercase text-xs block">Service Area / Address</label>
              <Textarea
                value={form.contact.address}
                onChange={e => updateContact("address", e.target.value)}
                className="bg-background border-border focus-visible:border-primary rounded-none min-h-[90px] resize-none"
                placeholder="Describe your service area..."
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pb-10">
          <p className="text-muted-foreground text-xs font-display">Changes take effect immediately on the website.</p>
          <Button onClick={handleSave} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            SAVE ALL CHANGES
          </Button>
        </div>

      </main>
    </div>
  )
}
