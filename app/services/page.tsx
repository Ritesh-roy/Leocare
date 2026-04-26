"use client"

import Link from "next/link"
import { 
  Stethoscope, 
  Calendar, 
  Video, 
  Shield, 
  Clock,
  ChevronRight,
  Syringe,
  Ambulance,
  Pill,
  ClipboardList,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  HeartPulse,
  Microscope,
  Activity,
  Truck,
  FileText,
  Users,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"

const mainServices = [
  { 
    icon: Calendar, 
    title: "Appointment Booking", 
    desc: "Schedule appointments with top doctors online in just a few clicks. Choose your preferred time and get instant confirmation.",
    features: ["Same-day appointments", "Instant confirmation", "Free rescheduling"],
    color: "#3B82F6" 
  },
  { 
    icon: Video, 
    title: "Video Consultation", 
    desc: "Connect with doctors from anywhere through secure video calls. Get expert medical advice without leaving your home.",
    features: ["HD video quality", "Screen sharing", "Prescription delivery"],
    color: "#8B5CF6" 
  },
  { 
    icon: Clock, 
    title: "24/7 Support", 
    desc: "Round-the-clock medical assistance for all your healthcare needs. Our team is always here to help you.",
    features: ["Instant response", "Multi-language support", "Emergency guidance"],
    color: "#10B981" 
  },
  { 
    icon: Shield, 
    title: "Secure Records", 
    desc: "Your medical data is encrypted and protected with industry-leading security measures. Access your records anytime.",
    features: ["256-bit encryption", "HIPAA compliant", "Easy sharing"],
    color: "#F59E0B" 
  },
  { 
    icon: Syringe, 
    title: "Lab Tests", 
    desc: "Book diagnostic tests online with convenient home sample collection. Get accurate results delivered digitally.",
    features: ["Home collection", "500+ tests available", "Digital reports"],
    color: "#EC4899" 
  },
  { 
    icon: Ambulance, 
    title: "Emergency Care", 
    desc: "Quick response emergency services available 24/7. One call connects you to the nearest emergency facility.",
    features: ["GPS tracking", "Trained paramedics", "Hospital network"],
    color: "#EF4444" 
  },
  { 
    icon: Pill, 
    title: "E-Pharmacy", 
    desc: "Order prescription and OTC medicines online with doorstep delivery. Genuine medicines at best prices.",
    features: ["Genuine medicines", "Same-day delivery", "Auto-refill option"],
    color: "#14B8A6" 
  },
  { 
    icon: ClipboardList, 
    title: "Health Records", 
    desc: "Access and manage your complete medical history digitally. Share records with doctors securely.",
    features: ["Organized history", "Easy access", "Secure sharing"],
    color: "#6366F1" 
  },
]

const specializedServices = [
  { icon: Heart, name: "Cardiac Care", desc: "Complete heart health management" },
  { icon: Brain, name: "Mental Health", desc: "Counseling and therapy sessions" },
  { icon: Bone, name: "Orthopedic Care", desc: "Bone and joint treatments" },
  { icon: Eye, name: "Eye Care", desc: "Vision tests and treatments" },
  { icon: Baby, name: "Pediatrics", desc: "Child healthcare services" },
  { icon: HeartPulse, name: "General Medicine", desc: "Primary healthcare needs" },
  { icon: Microscope, name: "Diagnostics", desc: "Advanced lab services" },
  { icon: Activity, name: "Preventive Care", desc: "Health checkups and screenings" },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <Stethoscope size={22} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">LeoCare</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              <Link href="/doctors" className="text-muted-foreground hover:text-foreground transition-colors">Doctors</Link>
              <Link href="/services" className="text-primary font-medium">Services</Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            </nav>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Our Services</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Comprehensive healthcare solutions designed to meet all your medical needs with excellence and compassion.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">What We Offer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Core Healthcare Services</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {mainServices.map((service) => (
              <div key={service.title} className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-shadow">
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon size={32} style={{ color: service.color }} />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-6">{service.desc}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="text-[#10B981]" size={16} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="gap-2">
                  Learn More <ChevronRight size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Specialized Care</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Medical Specialties</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializedServices.map((service) => (
              <div key={service.name} className="bg-card p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <service.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">How Our Services Work</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Choose Service", desc: "Select the healthcare service you need" },
              { step: "02", title: "Book Online", desc: "Schedule at your convenient time" },
              { step: "03", title: "Get Care", desc: "Receive quality healthcare from experts" },
              { step: "04", title: "Follow Up", desc: "Continuous care and support" },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-bold text-primary/10 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
                {index < 3 && (
                  <ChevronRight className="hidden md:block absolute top-8 -right-4 text-primary/30" size={32} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Join thousands of satisfied patients who trust LeoCare for their healthcare needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/doctors">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Find a Doctor
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <Stethoscope size={22} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">LeoCare</span>
            </Link>
            <p className="text-muted-foreground text-sm">2024 LeoCare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
