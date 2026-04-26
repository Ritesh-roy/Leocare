"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  Stethoscope, 
  Search,
  Calendar,
  Clock,
  User,
  ArrowRight,
  Heart,
  Brain,
  Activity,
  Pill
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  { name: "All", count: 24 },
  { name: "Heart Health", count: 6, icon: Heart },
  { name: "Mental Health", count: 5, icon: Brain },
  { name: "Nutrition", count: 4, icon: Activity },
  { name: "Medications", count: 3, icon: Pill },
  { name: "Lifestyle", count: 6, icon: Activity },
]

const blogPosts = [
  {
    id: 1,
    title: "10 Tips for a Healthier Heart: A Comprehensive Guide",
    excerpt: "Discover simple lifestyle changes that can significantly improve your cardiovascular health and reduce the risk of heart disease.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
    date: "Apr 15, 2024",
    readTime: "8 min read",
    author: "Dr. Sarah Johnson",
    category: "Heart Health",
    featured: true
  },
  {
    id: 2,
    title: "Understanding Mental Health in the Modern World",
    excerpt: "Breaking the stigma and learning to prioritize your mental well-being in today's fast-paced society.",
    image: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?w=600&h=400&fit=crop",
    date: "Apr 12, 2024",
    readTime: "6 min read",
    author: "Dr. Michael Chen",
    category: "Mental Health",
    featured: true
  },
  {
    id: 3,
    title: "The Future of Telemedicine: What You Need to Know",
    excerpt: "How virtual healthcare is revolutionizing the way we access medical services and what it means for patients.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    date: "Apr 10, 2024",
    readTime: "5 min read",
    author: "Emily Roberts",
    category: "Technology",
    featured: false
  },
  {
    id: 4,
    title: "Nutrition Basics: Building a Balanced Diet",
    excerpt: "Everything you need to know about creating a sustainable, healthy eating plan that works for your lifestyle.",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    date: "Apr 8, 2024",
    readTime: "7 min read",
    author: "Dr. Lisa Wang",
    category: "Nutrition",
    featured: false
  },
  {
    id: 5,
    title: "Managing Diabetes: A Complete Guide",
    excerpt: "Learn about the latest treatments, lifestyle modifications, and monitoring techniques for diabetes management.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    date: "Apr 5, 2024",
    readTime: "10 min read",
    author: "Dr. James Wilson",
    category: "Lifestyle",
    featured: false
  },
  {
    id: 6,
    title: "Sleep Better Tonight: Expert Tips for Quality Rest",
    excerpt: "Discover science-backed strategies to improve your sleep quality and wake up feeling refreshed.",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&h=400&fit=crop",
    date: "Apr 3, 2024",
    readTime: "6 min read",
    author: "Dr. Anna Thompson",
    category: "Lifestyle",
    featured: false
  },
  {
    id: 7,
    title: "Understanding Common Medications and Their Side Effects",
    excerpt: "A comprehensive guide to the most prescribed medications and what you should know about taking them.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop",
    date: "Apr 1, 2024",
    readTime: "9 min read",
    author: "Dr. Robert Brown",
    category: "Medications",
    featured: false
  },
  {
    id: 8,
    title: "Exercise and Mental Health: The Powerful Connection",
    excerpt: "How physical activity can improve your mood, reduce anxiety, and boost overall mental well-being.",
    image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
    date: "Mar 28, 2024",
    readTime: "5 min read",
    author: "Dr. Michelle Lee",
    category: "Mental Health",
    featured: false
  },
]

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = blogPosts.filter(post => post.featured)

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
              <Link href="/blog" className="text-primary font-medium">Blog</Link>
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">Health Blog</h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
            Expert health tips, medical insights, and wellness guides to help you live your healthiest life.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Search articles..."
                className="pl-12 h-12 bg-card border-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {selectedCategory === "All" && searchQuery === "" && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User size={14} /> {post.author}
                      </span>
                      <Button variant="ghost" size="sm" className="gap-1">
                        Read More <ArrowRight size={14} />
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="bg-card p-6 rounded-2xl border border-border sticky top-24">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted text-foreground'
                      }`}
                    >
                      <span className="text-sm">{category.name}</span>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">{category.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Subscribe to get the latest health tips delivered to your inbox.
                  </p>
                  <Input placeholder="Your email" className="mb-3" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCategory === "All" ? "All Articles" : selectedCategory}
                </h2>
                <span className="text-muted-foreground">{filteredPosts.length} articles</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-card/90 backdrop-blur-sm text-foreground px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                        <Button variant="ghost" size="sm" className="gap-1 text-xs">
                          Read <ArrowRight size={12} />
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <p className="text-muted-foreground">No articles found matching your criteria.</p>
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
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
