"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { doctors } from "@/lib/data"
import { Search, Plus, Star, Clock, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Doctor } from "@/lib/types"

export default function AdminDoctorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Doctors</h1>
          <p className="text-muted-foreground">Manage doctor profiles and schedules</p>
        </div>
        <Button>
          <Plus size={18} className="mr-2" />
          Add Doctor
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search doctors by name or specialty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-3/2 relative overflow-hidden">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-user.jpg"
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="h-8 w-8">
                      <MoreHorizontal size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSelectedDoctor(doctor)}>
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Doctor</DropdownMenuItem>
                    <DropdownMenuItem>Manage Schedule</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-primary">{doctor.specialty}</p>
                </div>
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{doctor.hospital}</p>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock size={14} />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                {doctor.languages.map((lang) => (
                  <Badge key={lang} variant="secondary" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Doctor Detail Dialog */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Doctor Profile</DialogTitle>
          </DialogHeader>
          {selectedDoctor && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedDoctor.image} 
                  alt={selectedDoctor.name}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-user.jpg"
                  }}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{selectedDoctor.name}</h3>
                  <p className="text-primary">{selectedDoctor.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-[#F59E0B]">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm">{selectedDoctor.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({selectedDoctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-2">About</h4>
                <p className="text-sm text-muted-foreground">{selectedDoctor.about}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium text-foreground">{selectedDoctor.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hospital</p>
                  <p className="font-medium text-foreground">{selectedDoctor.hospital}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Education</p>
                  <p className="font-medium text-foreground">{selectedDoctor.education}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Available Time Slots</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.availableSlots.map((slot) => (
                    <Badge key={slot} variant="outline">{slot}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
