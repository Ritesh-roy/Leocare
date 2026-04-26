"use client"

import Link from "next/link"
import { 
  Stethoscope, 
  Heart, 
  Users, 
  Award,
  Target,
  Eye,
  CheckCircle2,
  Linkedin,
  Twitter,
  Mail
} from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Dr. James Wilson",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop",
    bio: "Former Chief of Medicine at Johns Hopkins with 25+ years of experience."
  },
  {
    name: "Sarah Chen",
    role: "Chief Medical Officer",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop",
    bio: "Harvard Medical School graduate, specializing in healthcare innovation."
  },
  {
    name: "Michael Roberts",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Former Google engineer with expertise in healthcare technology."
  },
  {
    name: "Emily Thompson",
    role: "Head of Patient Care",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "20+ years in patient advocacy and healthcare administration."
  },
]

const values = [
  { icon: Heart, title: "Patient First", desc: "Every decision we make is centered around improving patient outcomes and experience." },
  { icon: Award, title: "Excellence", desc: "We strive for the highest standards in healthcare delivery and technology." },
  { icon: Users, title: "Accessibility", desc: "Quality healthcare should be available to everyone, everywhere." },
  { icon: Target, title: "Innovation", desc: "We continuously push boundaries to revolutionize healthcare delivery." },
]

const milestones = [
  { year: "2018", title: "Founded", desc: "LeoCare was founded with a vision to democratize healthcare access." },
  { year: "2019", title: "First 10,000 Users", desc: "Reached our first milestone of 10,000 registered patients." },
  { year: "2020", title: "Video Consultations", desc: "Launched telemedicine services during the global pandemic." },
  { year: "2021", title: "Series B Funding", desc: "Raised $50M to expand services nationwide." },
  { year: "2022", title: "500+ Doctors", desc: "Onboarded over 500 verified healthcare professionals." },
  { year: "2023", title: "Mobile App Launch", desc: "Released our iOS and Android applications." },
  { year: "2024", title: "50K+ Patients", desc: "Serving over 50,000 patients across 150+ cities." },
]

export default function AboutPage() {
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
              <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
              <Link href="/about" className="text-primary font-medium">About</Link>
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">About LeoCare</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Transforming healthcare delivery through technology, compassion, and innovation.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To make quality healthcare accessible, affordable, and convenient for everyone. We believe that geography, time, or finances should never be a barrier to receiving excellent medical care. Through innovative technology and a network of dedicated healthcare professionals, we are bridging the gap between patients and quality healthcare.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl border border-border">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye size={28} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted healthcare platform globally, where every person can access world-class medical care with just a few clicks. We envision a future where healthcare is proactive, personalized, and centered around the patient. Our goal is to leverage technology to create a healthier world for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-medium">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">How It All Started</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  LeoCare was born out of a simple observation: despite advances in medicine, millions of people still struggle to access quality healthcare. Long wait times, limited availability, and geographical barriers continue to plague healthcare systems worldwide.
                </p>
                <p>
                  In 2018, our founder Dr. James Wilson, frustrated by seeing patients miss critical appointments due to scheduling difficulties, decided to build a solution. What started as a simple appointment booking tool has evolved into a comprehensive healthcare platform serving over 50,000 patients.
                </p>
                <p>
                  Today, LeoCare connects patients with 500+ verified doctors across 100+ specialties, offering both in-person and video consultations. Our platform has facilitated over 2 million appointments and continues to grow as we expand our services to new cities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=300&h=200&fit=crop" 
                alt="Healthcare" 
                className="rounded-2xl object-cover w-full h-48"
              />
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop" 
                alt="Technology" 
                className="rounded-2xl object-cover w-full h-48 mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=200&fit=crop" 
                alt="Doctor" 
                className="rounded-2xl object-cover w-full h-48 -mt-8"
              />
              <img 
                src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=300&h=200&fit=crop" 
                alt="Care" 
                className="rounded-2xl object-cover w-full h-48"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">What We Stand For</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="bg-card p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Key Milestones</h2>
          </div>

          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className="bg-card p-6 rounded-2xl border border-border inline-block">
                      <span className="text-primary font-bold">{milestone.year}</span>
                      <h3 className="text-lg font-semibold text-foreground mt-1">{milestone.title}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium">Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">Meet Our Team</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our leadership team brings together decades of experience in healthcare, technology, and patient advocacy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="bg-card rounded-2xl border border-border overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground text-lg">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex items-center gap-3">
                    <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Linkedin size={16} />
                    </button>
                    <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Twitter size={16} />
                    </button>
                    <button className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                      <Mail size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Expert Doctors" },
              { value: "50K+", label: "Happy Patients" },
              { value: "2M+", label: "Appointments" },
              { value: "150+", label: "Cities" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-primary-foreground/80 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Join Us in Transforming Healthcare
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Whether you are a patient seeking quality care or a healthcare professional looking to expand your reach, LeoCare is here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/doctors">
              <Button size="lg" className="h-12 px-8">Find a Doctor</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="h-12 px-8">Join as Doctor</Button>
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
