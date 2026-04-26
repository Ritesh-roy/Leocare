"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Stethoscope, 
  Search, 
  Star, 
  MapPin,
  Clock,
  Video,
  Filter,
  ChevronDown,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Pill,
  HeartPulse,
  Microscope,
  X,
  Calendar
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { doctors } from "@/lib/data"
import { BookingModal } from "@/components/booking/booking-modal"
import { Doctor } from "@/lib/types"
import { AppointmentsProvider } from "@/lib/appointments-context"

const specialties = [
  { icon: HeartPulse, name: "All Specialties" },
  { icon: Heart, name: "Cardiology" },
  { icon: Brain, name: "Neurology" },
  { icon: Bone, name: "Orthopedics" },
  { icon: Eye, name: "Ophthalmology" },
  { icon: Baby, name: "Pediatrics" },
  { icon: Pill, name: "Dermatology" },
  { icon: Microscope, name: "Pathology" },
]

function DoctorsContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "All Specialties" || 
                             doctor.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
    return matchesSearch && matchesSpecialty
  })

  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setBookingOpen(true)
  }

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
              <Link href="/doctors" className="text-primary font-medium">Doctors</Link>
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
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
      <section className="bg-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Doctor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse through our network of 500+ qualified doctors across 100+ specialties
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-card p-4 rounded-2xl border border-border shadow-lg flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input 
                  placeholder="Search doctors, specialties..."
                  className="pl-12 h-12 border-0 bg-muted/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="h-12 gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} /> Filters
              </Button>
              <Button className="h-12 px-8">Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card p-6 rounded-2xl border border-border sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-foreground">Filters</h3>
                  <button className="lg:hidden" onClick={() => setShowFilters(false)}>
                    <X size={20} className="text-muted-foreground" />
                  </button>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Specialty</h4>
                  <div className="space-y-2">
                    {specialties.map((specialty) => (
                      <button
                        key={specialty.name}
                        onClick={() => setSelectedSpecialty(specialty.name)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                          selectedSpecialty === specialty.name
                            ? 'bg-primary/10 text-primary'
                            : 'hover:bg-muted text-foreground'
                        }`}
                      >
                        <specialty.icon size={18} />
                        <span className="text-sm">{specialty.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-3">Availability</h4>
                  <div className="space-y-2">
                    {["Available Today", "Available This Week", "Video Consultation"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-2 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded border-border" />
                        <span className="text-sm text-foreground">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-foreground mb-3">Rating</h4>
                  <div className="space-y-2">
                    {["4.5 & above", "4.0 & above", "3.5 & above"].map((option) => (
                      <label key={option} className="flex items-center gap-3 p-2 cursor-pointer">
                        <input type="radio" name="rating" className="w-4 h-4 border-border" />
                        <span className="text-sm text-foreground">{option}</span>
                        <Star size={14} className="text-[#F59E0B]" fill="currentColor" />
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Doctors Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Showing <span className="text-foreground font-medium">{filteredDoctors.length}</span> doctors
                </p>
                <button className="flex items-center gap-2 text-sm text-foreground">
                  Sort by: <span className="font-medium">Relevance</span> <ChevronDown size={16} />
                </button>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredDoctors.map((doctor) => (
                  <div key={doctor.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img 
                        src={doctor.image}
                        alt={doctor.name}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-user.jpg"
                        }}
                        className="w-full h-48 object-contain bg-muted/30"
                      />
                      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Star size={14} className="text-[#F59E0B]" fill="currentColor" />
                        <span className="text-sm font-medium text-foreground">{doctor.rating}</span>
                      </div>
                      {doctor.available && (
                        <div className="absolute bottom-4 left-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-medium">
                          Available Today
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground text-lg mb-1">{doctor.name}</h3>
                      <p className="text-primary text-sm mb-3">{doctor.specialty}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {doctor.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> New York
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Video size={12} /> Video
                        </span>
                        <span className="bg-muted text-foreground px-3 py-1 rounded-full text-xs font-medium">
                          In-Person
                        </span>
                      </div>

                      <div className="flex items-center justify-center pt-4 border-t border-border">
                        <Button onClick={() => handleBookDoctor(doctor)} className="gap-2">
                          <Calendar size={16} /> Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDoctors.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No doctors found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        doctor={selectedDoctor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  )
}

export default function DoctorsPage() {
  return (
    <AppointmentsProvider>
      <DoctorsContent />
    </AppointmentsProvider>
  )
}
