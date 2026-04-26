"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Stethoscope, 
  Calendar, 
  Video, 
  Shield, 
  Star, 
  Clock,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Pill,
  Activity,
  Users,
  Award,
  CheckCircle2,
  ArrowRight,
  Play,
  Quote,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Sparkles,
  HeartPulse,
  Microscope,
  Syringe,
  Ambulance,
  ClipboardList,
  MessageCircle,
  ThumbsUp,
  Zap,
  Globe,
  CreditCard,
  FileText,
  BadgeCheck,
  TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { doctors } from "@/lib/data"
import { BookingModal } from "@/components/booking/booking-modal"
import { Doctor } from "@/lib/types"
import { AppointmentsProvider } from "@/lib/appointments-context"

const specialties = [
  { icon: Heart, name: "Cardiology", desc: "Heart & cardiovascular care", doctors: 45, color: "#EF4444" },
  { icon: Brain, name: "Neurology", desc: "Brain & nervous system", doctors: 32, color: "#8B5CF6" },
  { icon: Bone, name: "Orthopedics", desc: "Bones & joints specialist", doctors: 38, color: "#F59E0B" },
  { icon: Eye, name: "Ophthalmology", desc: "Eye care & surgery", doctors: 28, color: "#3B82F6" },
  { icon: Baby, name: "Pediatrics", desc: "Children healthcare", doctors: 42, color: "#EC4899" },
  { icon: Pill, name: "Dermatology", desc: "Skin care & treatment", doctors: 35, color: "#10B981" },
  { icon: HeartPulse, name: "General Medicine", desc: "Primary healthcare", doctors: 65, color: "#6366F1" },
  { icon: Microscope, name: "Pathology", desc: "Lab & diagnostics", doctors: 22, color: "#14B8A6" },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    text: "LeoCare made it incredibly easy to find and book an appointment with a specialist. The video consultation feature saved me so much time. Highly recommended!"
  },
  {
    name: "Michael Chen",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "The doctors here are truly exceptional. Dr. Smith took the time to explain everything thoroughly. The online booking system is seamless and user-friendly."
  },
  {
    name: "Emily Rodriguez",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "I was hesitant about telemedicine, but LeoCare changed my mind. The quality of care I received was outstanding. Will definitely continue using this platform."
  },
  {
    name: "David Thompson",
    role: "Patient",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "From booking to consultation, everything was smooth. The reminders and follow-up care really show they care about patients. Five stars!"
  }
]

const faqs = [
  {
    question: "How do I book an appointment?",
    answer: "Simply browse our doctors, select your preferred specialist, choose an available time slot, and confirm your booking. You will receive a confirmation email with all the details."
  },
  {
    question: "Can I have a video consultation?",
    answer: "Yes! We offer video consultations for most specialties. You can choose between in-person visits or video calls when booking your appointment."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, debit cards, and popular digital payment methods. Payment is secure and encrypted for your safety."
  },
  {
    question: "How can I cancel or reschedule?",
    answer: "You can easily cancel or reschedule your appointment through your patient dashboard up to 24 hours before the scheduled time without any charges."
  },
  {
    question: "Are the doctors verified?",
    answer: "Absolutely! All our doctors are board-certified professionals with verified credentials. We conduct thorough background checks and credential verification."
  },
  {
    question: "Is my medical information secure?",
    answer: "Yes, we use industry-standard encryption and comply with HIPAA regulations to ensure your medical information is completely secure and confidential."
  }
]

const blogPosts = [
  {
    title: "10 Tips for a Healthier Heart",
    excerpt: "Discover simple lifestyle changes that can significantly improve your cardiovascular health.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&h=250&fit=crop",
    date: "Apr 15, 2024",
    category: "Heart Health"
  },
  {
    title: "Understanding Mental Health",
    excerpt: "Breaking the stigma and learning to prioritize your mental well-being in today's world.",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=400&h=250&fit=crop",
    date: "Apr 12, 2024",
    category: "Mental Health"
  },
  {
    title: "The Future of Telemedicine",
    excerpt: "How virtual healthcare is revolutionizing the way we access medical services.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
    date: "Apr 10, 2024",
    category: "Technology"
  }
]

const partners = [
  "Mayo Clinic",
  "Johns Hopkins",
  "Cleveland Clinic",
  "Mass General",
  "Stanford Health",
  "UCLA Health"
]

function HomeContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState("")

  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setBookingOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                <Stethoscope size={22} className="text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold text-foreground">LeoCare</span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">Services</a>
              <a href="#specialties" className="text-muted-foreground hover:text-foreground transition-colors">Specialties</a>
              <a href="#doctors" className="text-muted-foreground hover:text-foreground transition-colors">Doctors</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-card border-b border-border">
            <div className="px-4 py-4 space-y-3">
              <a href="#services" className="block text-foreground py-2">Services</a>
              <a href="#specialties" className="block text-foreground py-2">Specialties</a>
              <a href="#doctors" className="block text-foreground py-2">Doctors</a>
              <a href="#how-it-works" className="block text-foreground py-2">How It Works</a>
              <a href="#testimonials" className="block text-foreground py-2">Reviews</a>
              <a href="#contact" className="block text-foreground py-2">Contact</a>
              <div className="pt-4 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link href="/login" className="block">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles size={16} />
                <span>Trusted by 50,000+ patients</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Your Health, Our <span className="text-primary">Priority</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                Book appointments with top doctors in just a few clicks. Get quality healthcare from the comfort of your home or visit in person. Available 24/7.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#doctors">
                  <Button size="lg" className="gap-2 h-12 px-6">
                    Book Appointment <ChevronRight size={18} />
                  </Button>
                </a>
                <Button size="lg" variant="outline" className="gap-2 h-12 px-6">
                  <Play size={18} /> Watch How It Works
                </Button>
              </div>
              
              {/* Trust badges */}
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="text-primary" size={20} />
                  <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-primary" size={20} />
                  <span className="text-sm text-muted-foreground">256-bit SSL Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-primary" size={20} />
                  <span className="text-sm text-muted-foreground">Top Rated Platform</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=600&fit=crop"
                  alt="Doctor consultation"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                    <Shield className="text-[#10B981]" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">100% Secure</p>
                    <p className="text-sm text-muted-foreground">Data Protected</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-card p-4 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                    <Star className="text-[#F59E0B]" size={24} fill="currentColor" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">4.9 Rating</p>
                    <p className="text-sm text-muted-foreground">2,500+ Reviews</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-card p-3 rounded-xl shadow-xl border border-border hidden xl:block">
                <div className="flex items-center gap-2">
                  <Activity className="text-primary" size={20} />
                  <span className="text-sm font-medium text-foreground">Live Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "500+", label: "Expert Doctors", icon: Users },
              { value: "50K+", label: "Happy Patients", icon: Heart },
              { value: "100+", label: "Specializations", icon: Award },
              { value: "24/7", label: "Support Available", icon: Clock },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto mb-2 text-primary-foreground/80" size={28} />
                <p className="text-3xl md:text-4xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/80 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We provide a wide range of medical services designed to meet all your healthcare needs with excellence and compassion.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Calendar, title: "Easy Booking", desc: "Schedule appointments online 24/7 with just a few clicks", color: "#3B82F6" },
              { icon: Video, title: "Video Consult", desc: "Connect with doctors virtually from anywhere in the world", color: "#8B5CF6" },
              { icon: Clock, title: "24/7 Support", desc: "Round-the-clock medical assistance when you need it most", color: "#10B981" },
              { icon: Shield, title: "Secure Records", desc: "Your medical data is encrypted and fully protected", color: "#F59E0B" },
              { icon: Syringe, title: "Lab Tests", desc: "Book lab tests online with home sample collection", color: "#EC4899" },
              { icon: Ambulance, title: "Emergency Care", desc: "Quick response emergency services available 24/7", color: "#EF4444" },
              { icon: Pill, title: "E-Pharmacy", desc: "Order medicines online with doorstep delivery", color: "#14B8A6" },
              { icon: ClipboardList, title: "Health Records", desc: "Access your complete medical history anytime", color: "#6366F1" },
            ].map((service) => (
              <div 
                key={service.title} 
                className="group bg-card p-6 rounded-2xl border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon size={26} style={{ color: service.color }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section id="specialties" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Medical Specialties</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Find Doctors by Specialty
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Browse through our wide range of medical specialties and find the right doctor for your needs.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialties.map((specialty) => (
              <div 
                key={specialty.name}
                className="group bg-card p-6 rounded-2xl border border-border hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${specialty.color}15` }}
                >
                  <specialty.icon size={28} style={{ color: specialty.color }} />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{specialty.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{specialty.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">{specialty.doctors} Doctors</span>
                  <ArrowRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="gap-2">
              View All Specialties <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Book Your Appointment in 3 Easy Steps
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Getting quality healthcare has never been easier. Follow these simple steps to book your appointment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection line for desktop */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-border" />
            
            {[
              { 
                step: "01", 
                title: "Search Doctor", 
                desc: "Browse our extensive list of verified doctors by specialty, location, or availability.",
                icon: Users
              },
              { 
                step: "02", 
                title: "Book Appointment", 
                desc: "Choose your preferred date and time slot, and confirm your appointment instantly.",
                icon: Calendar
              },
              { 
                step: "03", 
                title: "Get Consultation", 
                desc: "Meet with your doctor in person or via video call and receive quality care.",
                icon: Video
              },
            ].map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-shadow text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                    <item.icon size={28} className="text-primary" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground text-sm font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Our Doctors</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Meet Our Expert Medical Team
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced and caring professionals are dedicated to providing you with the best healthcare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-4/3 overflow-hidden relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-user.jpg"
                    }}
                    className="w-full h-full object-contain bg-muted/30 group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={14} className="text-[#F59E0B]" fill="currentColor" />
                    <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                  </div>
                  {doctor.available && (
                    <div className="absolute top-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Available Today
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-primary font-medium text-sm mb-1">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground mb-4">{doctor.experience} experience</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={14} />
                      <span>98%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>120 Reviews</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center pt-4 border-t border-border">
                    <Button onClick={() => handleBookDoctor(doctor)} className="gap-2">
                      Book Now <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="gap-2">
              View All Doctors <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
                We Provide the Best Healthcare Experience
              </h2>
              <p className="text-muted-foreground mb-8">
                LeoCare combines cutting-edge technology with compassionate care to deliver an unmatched healthcare experience. Our platform is designed with you in mind.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Zap, title: "Fast & Easy Booking", desc: "Book appointments in under 60 seconds" },
                  { icon: Globe, title: "Access Anywhere", desc: "Consult doctors from any location worldwide" },
                  { icon: CreditCard, title: "Secure Payments", desc: "Multiple payment options with full encryption" },
                  { icon: FileText, title: "Digital Prescriptions", desc: "Get e-prescriptions directly to your phone" },
                ].map((feature) => (
                  <div key={feature.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-4/3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop"
                  alt="Modern healthcare facility"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Stats card */}
              <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-2xl shadow-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center">
                    <TrendingUp className="text-primary-foreground" size={26} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              What Our Patients Say
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Read what our satisfied patients have to say about their experience with LeoCare.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <Quote size={32} className="text-primary/20 mb-4" />
                <p className="text-foreground mb-6 text-sm leading-relaxed">{testimonial.text}</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={12} className="text-[#F59E0B]" fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-background border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground mb-8">Trusted by leading healthcare institutions</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partners.map((partner) => (
              <div key={partner} className="text-xl md:text-2xl font-bold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Health Blog</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Latest Health Tips & News
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest health tips, medical news, and wellness advice from our experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto text-primary gap-1">
                    Read More <ArrowRight size={14} />
                  </Button>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="gap-2">
              View All Articles <ChevronRight size={18} />
            </Button>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Recognition</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Awards & Certifications
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our commitment to excellence has been recognized by leading healthcare organizations worldwide.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Healthcare Excellence Award 2024", org: "Medical Association", icon: Award },
              { title: "Best Patient Care Platform", org: "Health Tech Awards", icon: Heart },
              { title: "HIPAA Certified", org: "US Department of Health", icon: Shield },
              { title: "Top Rated App 2024", org: "App Store & Play Store", icon: Star },
            ].map((award) => (
              <div key={award.title} className="bg-card p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <award.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{award.title}</h3>
                <p className="text-sm text-muted-foreground">{award.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Promo */}
      <section className="py-20 bg-muted/50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">Mobile App</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
                Healthcare in Your Pocket
              </h2>
              <p className="text-muted-foreground mb-6">
                Download our mobile app and access all healthcare services on the go. Book appointments, video consult, order medicines, and more.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Book appointments instantly",
                  "Video consultations on the go",
                  "Access medical records anywhere",
                  "Get medication reminders",
                  "Track health metrics",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#10B981] flex-shrink-0" size={20} />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 12.5c0-1.58-.79-2.98-2-3.82V5h.5a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H9v3.68c-1.21.84-2 2.24-2 3.82 0 2.49 1.99 4.5 4.44 4.5h1.12c2.45 0 4.44-2.01 4.44-4.5zM12 2a1 1 0 110 2 1 1 0 010-2z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs opacity-80">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 bg-foreground text-background px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.59.34-1.11.84-1.35L13.69 12l-9.85 9.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.22.9-.57 1.18l-2.29 1.32-2.5-2.5 2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27-8.49-8.49z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs opacity-80">Get it on</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative">
                <div className="w-64 h-125 bg-foreground rounded-[40px] p-2 shadow-2xl">
                  <div className="w-full h-full bg-card rounded-4xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=500&fit=crop"
                      alt="Mobile app"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                  Free Download
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Partners */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Insurance</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              We Accept All Major Insurance
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              We work with all major insurance providers to make healthcare accessible and affordable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              "Blue Cross Blue Shield",
              "Aetna",
              "Cigna",
              "United Healthcare",
              "Humana",
              "Kaiser",
            ].map((insurance) => (
              <div key={insurance} className="bg-card p-6 rounded-2xl border border-border flex items-center justify-center h-24 hover:shadow-md transition-shadow">
                <span className="font-semibold text-muted-foreground text-center text-sm">{insurance}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground">
              Do not see your insurance? <a href="#contact" className="text-primary hover:underline">Contact us</a> to verify your coverage.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you. No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Basic",
                price: "Free",
                desc: "Perfect for occasional visits",
                features: ["Book appointments online", "Access medical records", "Email support", "Basic health tips"],
                popular: false,
              },
              {
                name: "Premium",
                price: "$29",
                period: "/month",
                desc: "Best for regular healthcare needs",
                features: ["Everything in Basic", "Unlimited video consultations", "Priority booking", "24/7 phone support", "Family account (up to 4)", "Prescription discounts"],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "/month",
                desc: "For businesses and organizations",
                features: ["Everything in Premium", "Unlimited family members", "Dedicated account manager", "Custom health programs", "On-site health camps", "Analytics dashboard"],
                popular: false,
              },
            ].map((plan) => (
              <div 
                key={plan.name}
                className={`bg-card p-8 rounded-2xl border ${plan.popular ? 'border-primary ring-2 ring-primary relative' : 'border-border'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="text-[#10B981] flex-shrink-0" size={16} />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Tips Carousel */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Health Tips</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Daily Health & Wellness Tips
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Expert advice to help you maintain a healthy lifestyle every day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Stay Hydrated", tip: "Drink at least 8 glasses of water daily for optimal body function.", icon: "💧", color: "#3B82F6" },
              { title: "Exercise Daily", tip: "30 minutes of moderate exercise can significantly improve your health.", icon: "🏃", color: "#10B981" },
              { title: "Sleep Well", tip: "Aim for 7-8 hours of quality sleep every night for better recovery.", icon: "😴", color: "#8B5CF6" },
              { title: "Eat Balanced", tip: "Include fruits, vegetables, and proteins in every meal.", icon: "🥗", color: "#F59E0B" },
            ].map((item) => (
              <div key={item.title} className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Events</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Upcoming Health Events & Webinars
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Join our free health awareness programs and learn from top medical experts.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Heart Health Awareness", date: "Apr 25, 2024", time: "2:00 PM EST", type: "Webinar", speaker: "Dr. Sarah Johnson", spots: 45 },
              { title: "Mental Wellness Workshop", date: "Apr 28, 2024", time: "10:00 AM EST", type: "Online Workshop", speaker: "Dr. Michael Chen", spots: 32 },
              { title: "Diabetes Prevention Camp", date: "May 2, 2024", time: "9:00 AM EST", type: "In-Person", speaker: "Dr. Emily Brown", spots: 20 },
            ].map((event) => (
              <div key={event.title} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                <div className="bg-primary/10 p-4">
                  <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded-full">{event.type}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>Speaker: {event.speaker}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#10B981]">{event.spots} spots left</span>
                    <Button size="sm">Register Free</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="py-16 bg-[#EF4444]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Ambulance className="text-white" size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">24/7 Emergency Services</h3>
                <p className="text-white/80">Immediate medical assistance when you need it most</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-white/80 text-sm">Emergency Hotline</p>
                <p className="text-2xl font-bold text-white">1-800-LEOCARE</p>
              </div>
              <Button size="lg" variant="secondary" className="h-12 gap-2">
                <Phone size={18} /> Call Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Why LeoCare</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              LeoCare vs Traditional Healthcare
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              See how we compare to traditional healthcare methods.
            </p>
          </div>

          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-muted/50 p-4 font-semibold text-foreground">
              <div>Feature</div>
              <div className="text-center">LeoCare</div>
              <div className="text-center">Traditional</div>
            </div>
            {[
              { feature: "Booking Time", leocare: "Under 2 mins", traditional: "30+ mins on phone" },
              { feature: "Wait for Appointment", leocare: "Same day available", traditional: "Days to weeks" },
              { feature: "Consultation Options", leocare: "Video + In-person", traditional: "In-person only" },
              { feature: "Access to Records", leocare: "24/7 online access", traditional: "Office hours only" },
              { feature: "Cost Transparency", leocare: "Upfront pricing", traditional: "Hidden fees common" },
              { feature: "Follow-up Care", leocare: "Automated reminders", traditional: "Patient responsibility" },
            ].map((row, index) => (
              <div key={row.feature} className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/30'}`}>
                <div className="text-foreground font-medium">{row.feature}</div>
                <div className="text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="text-[#10B981]" size={18} />
                  <span className="text-foreground">{row.leocare}</span>
                </div>
                <div className="text-center text-muted-foreground">{row.traditional}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Counter */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Our Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Making Healthcare Accessible
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "2M+", label: "Appointments Booked", icon: Calendar },
              { value: "500K+", label: "Video Consultations", icon: Video },
              { value: "98%", label: "Patient Satisfaction", icon: ThumbsUp },
              { value: "150+", label: "Cities Covered", icon: Globe },
            ].map((stat) => (
              <div key={stat.label} className="bg-card p-8 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
                <stat.icon className="mx-auto mb-4 text-primary" size={40} />
                <p className="text-4xl font-bold text-foreground mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 text-balance">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and platform.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-card rounded-2xl border border-border overflow-hidden"
              >
                <button
                  className="w-full p-6 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <ChevronRight 
                    size={20} 
                    className={`text-muted-foreground flex-shrink-0 transition-transform ${openFaq === index ? 'rotate-90' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust LeoCare for their healthcare needs. Book your first appointment today and experience the difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#doctors">
              <Button size="lg" variant="secondary" className="h-12 px-8 gap-2">
                Book Appointment <ArrowRight size={18} />
              </Button>
            </a>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Sign Up Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border text-center">
            <Mail size={40} className="text-primary mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Subscribe to Our Newsletter</h2>
            <p className="text-muted-foreground mb-6">Get health tips, news, and exclusive offers delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
              <Button className="h-12 px-6 gap-2">
                Subscribe <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <span className="text-primary font-medium">Contact Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6 text-balance">
                Get in Touch With Us
              </h2>
              <p className="text-muted-foreground mb-8">
                Have questions or need assistance? Our team is here to help you. Reach out to us through any of the channels below.
              </p>

              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Our Location", info: "123 Health Street, Medical District, New York, NY 10001" },
                  { icon: Phone, title: "Phone Number", info: "+1 (555) 123-4567" },
                  { icon: Mail, title: "Email Address", info: "support@leocare.com" },
                  { icon: Clock, title: "Working Hours", info: "Mon - Fri: 8:00 AM - 8:00 PM" },
                ].map((contact) => (
                  <div key={contact.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <contact.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{contact.title}</h3>
                      <p className="text-muted-foreground text-sm">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                    <Input placeholder="John" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                    <Input placeholder="Doe" className="h-12" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-lg border border-input bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="How can we help you?"
                  />
                </div>
                <Button className="w-full h-12 gap-2">
                  Send Message <Send size={16} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer */}
          <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
                  <Stethoscope size={22} className="text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold text-foreground">LeoCare</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Your trusted healthcare partner. Book appointments, consult doctors, and manage your health all in one place.
              </p>
              <div className="flex items-center gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["About Us", "Our Doctors", "Services", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <ul className="space-y-3">
                {["Video Consultation", "Book Appointment", "Health Records", "Lab Tests"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-3">
                {["Help Center", "FAQs", "Privacy Policy", "Terms of Service"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="py-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              2024 LeoCare. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Help Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors group">
          <MessageCircle className="text-primary-foreground" size={24} />
          <span className="absolute right-full mr-3 bg-card text-foreground px-3 py-2 rounded-lg shadow-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Need Help?
          </span>
        </button>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        doctor={selectedDoctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  )
}

export default function HomePage() {
  return (
    <AppointmentsProvider>
      <HomeContent />
    </AppointmentsProvider>
  )
}
