"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Stethoscope, 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Headphones,
  Building,
  CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
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
              <Link href="/doctors" className="text-muted-foreground hover:text-foreground transition-colors">Doctors</Link>
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
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Contact Us</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
            Have questions? We are here to help. Reach out to our team for any inquiries or support.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 -mt-20">
            {[
              { icon: Phone, title: "Call Us", info: "+1 (555) 123-4567", desc: "Mon-Fri 8am to 8pm", action: "Call Now" },
              { icon: Mail, title: "Email Us", info: "support@leocare.com", desc: "We reply within 24 hours", action: "Send Email" },
              { icon: MessageSquare, title: "Live Chat", info: "Chat with our team", desc: "Available 24/7", action: "Start Chat" },
            ].map((option) => (
              <div key={option.title} className="bg-card p-8 rounded-2xl border border-border shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <option.icon size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{option.title}</h3>
                <p className="text-primary font-medium mb-1">{option.info}</p>
                <p className="text-muted-foreground text-sm mb-4">{option.desc}</p>
                <Button variant="outline" className="w-full">{option.action}</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <span className="text-primary font-medium">Get in Touch</span>
              <h2 className="text-3xl font-bold text-foreground mt-2 mb-6">We Would Love to Hear From You</h2>
              <p className="text-muted-foreground mb-8">
                Whether you have a question about our services, pricing, need support, or anything else, our team is ready to answer all your questions.
              </p>

              <div className="space-y-6 mb-8">
                {[
                  { icon: Building, title: "Headquarters", info: "123 Health Street, Medical District, New York, NY 10001" },
                  { icon: Phone, title: "Phone", info: "+1 (555) 123-4567" },
                  { icon: Mail, title: "Email", info: "support@leocare.com" },
                  { icon: Clock, title: "Working Hours", info: "Monday - Friday: 8:00 AM - 8:00 PM EST" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="bg-muted rounded-2xl h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={40} className="text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Interactive Map</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-2xl border border-border">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#10B981]" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground">We will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">First Name *</label>
                      <Input placeholder="John" className="h-12" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Last Name *</label>
                      <Input placeholder="Doe" className="h-12" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                    <Input type="email" placeholder="john@example.com" className="h-12" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 000-0000" className="h-12" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject *</label>
                    <select className="w-full h-12 px-4 rounded-xl border border-input bg-background text-foreground">
                      <option>General Inquiry</option>
                      <option>Technical Support</option>
                      <option>Billing Question</option>
                      <option>Partnership Inquiry</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message *</label>
                    <textarea 
                      placeholder="How can we help you?" 
                      rows={5} 
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground resize-none"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full h-12 gap-2">
                    Send Message <Send size={18} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-medium">Quick Help</span>
            <h2 className="text-3xl font-bold text-foreground mt-2">Common Questions</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "How do I book an appointment?", link: "/#faq" },
              { title: "What are your consultation fees?", link: "/#pricing" },
              { title: "Do you accept my insurance?", link: "/#insurance" },
              { title: "How do video consultations work?", link: "/services" },
              { title: "Can I get a prescription online?", link: "/services" },
              { title: "How do I access my medical records?", link: "/services" },
            ].map((faq) => (
              <Link 
                key={faq.title}
                href={faq.link}
                className="bg-card p-6 rounded-2xl border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-medium">{faq.title}</span>
                  <Send size={18} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary-foreground mb-4">Need Immediate Assistance?</h2>
                <p className="text-primary-foreground/80 mb-6">
                  Our support team is available 24/7 to help you with any urgent matters. Do not hesitate to reach out.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="h-12 gap-2">
                    <Phone size={18} /> Call Support
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 gap-2 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                    <Headphones size={18} /> Live Chat
                  </Button>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-primary-foreground/80 text-sm mb-2">Emergency Hotline</p>
                <p className="text-4xl font-bold text-primary-foreground">1-800-LEOCARE</p>
              </div>
            </div>
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
