import { useState } from "react"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { MapPin, Phone, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSiteSettings } from "@/context/SiteSettingsContext"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  service: z.string().min(1, "Please select a service type."),
  message: z.string().min(10, "Message must be at least 10 characters."),
})

export function Contact() {
  const { toast } = useToast()
  const { settings } = useSiteSettings()
  const { contact } = settings
  const [isPending, setIsPending] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  })

  function onSubmit(_values: z.infer<typeof formSchema>) {
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast({
        title: "Request Submitted Successfully",
        description: "A dispatch coordinator will contact you shortly.",
        variant: "default",
      })
      form.reset()
    }, 1500)
  }

  return (
    <section className="py-24 md:py-32 bg-secondary relative border-t border-border" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Contact Info & Map Area */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-sm font-display tracking-[0.3em] text-primary mb-4 flex items-center gap-4">
                <span className="w-12 h-px bg-primary"></span>
                INITIATE CONTACT
              </h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                READY TO POWER UP?
              </h3>
              <p className="text-muted-foreground max-w-md">
                Whether you need immediate emergency repair or a quote for a multi-million dollar installation, our dispatch team is standing by.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-card border border-border p-6 clip-edges">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-white font-display font-bold text-lg mb-2">Direct Line</h4>
                <p className="text-muted-foreground text-sm mb-1">24/7 Dispatch</p>
                <p className="text-white font-display tracking-widest break-all">{contact.phone}</p>
              </div>
              
              <div className="bg-card border border-border p-6 clip-edges">
                <Mail className="w-8 h-8 text-primary mb-4" />
                <h4 className="text-white font-display font-bold text-lg mb-2">Email Desk</h4>
                <p className="text-muted-foreground text-sm mb-1">Quotes & Support</p>
                <p className="text-white font-display tracking-wide break-all">{contact.email}</p>
              </div>
              
              <div className="bg-card border border-border p-6 clip-edges sm:col-span-2">
                <div className="flex gap-4">
                  <MapPin className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="text-white font-display font-bold text-lg mb-2">Service Area</h4>
                    <p className="text-muted-foreground text-sm">
                      {contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-8 md:p-12 clip-edges relative"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 clip-edges pointer-events-none" />
            <h4 className="text-2xl font-display font-bold text-white mb-8 border-b border-border pb-4">
              SECURE QUOTE REQUEST
            </h4>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-display tracking-wider uppercase text-xs">Full Name / Company</FormLabel>
                        <FormControl>
                          <Input placeholder="M20 Corp" {...field} className="bg-background border-border focus-visible:border-primary rounded-none h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-display tracking-wider uppercase text-xs">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="contact@m20corp.com" {...field} className="bg-background border-border focus-visible:border-primary rounded-none h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-display tracking-wider uppercase text-xs">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} className="bg-background border-border focus-visible:border-primary rounded-none h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground font-display tracking-wider uppercase text-xs">Service Needed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-border focus:border-primary rounded-none h-12 text-white">
                              <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border rounded-none text-white">
                            <SelectItem value="commercial">Commercial Wiring</SelectItem>
                            <SelectItem value="industrial">Industrial Systems</SelectItem>
                            <SelectItem value="residential">Residential Install</SelectItem>
                            <SelectItem value="emergency">Emergency Repair</SelectItem>
                            <SelectItem value="other">Other Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground font-display tracking-wider uppercase text-xs">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your requirements..." 
                          className="bg-background border-border focus-visible:border-primary rounded-none min-h-[120px] resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "TRANSMITTING..." : "SUBMIT DISPATCH REQUEST"}
                </Button>
              </form>
            </Form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
