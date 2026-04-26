"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Clock, MoreHorizontal, Video, MapPin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type AppointmentStatus = "confirmed" | "pending" | "cancelled"
type AppointmentType = "video" | "in-person"

interface Appointment {
  id: string
  patient: {
    name: string
    avatar: string
    initials: string
  }
  type: string
  time: string
  duration: string
  status: AppointmentStatus
  appointmentType: AppointmentType
}

const appointments: Appointment[] = [
  {
    id: "1",
    patient: {
      name: "James Mitchell",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      initials: "JM",
    },
    type: "General Checkup",
    time: "9:00 AM",
    duration: "30 min",
    status: "confirmed",
    appointmentType: "in-person",
  },
  {
    id: "2",
    patient: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      initials: "EC",
    },
    type: "Follow-up Consultation",
    time: "10:30 AM",
    duration: "20 min",
    status: "confirmed",
    appointmentType: "video",
  },
  {
    id: "3",
    patient: {
      name: "Robert Taylor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      initials: "RT",
    },
    type: "ECG Test",
    time: "11:00 AM",
    duration: "45 min",
    status: "pending",
    appointmentType: "in-person",
  },
  {
    id: "4",
    patient: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      initials: "LA",
    },
    type: "Medication Review",
    time: "2:00 PM",
    duration: "15 min",
    status: "confirmed",
    appointmentType: "video",
  },
  {
    id: "5",
    patient: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      initials: "MB",
    },
    type: "Annual Physical",
    time: "3:30 PM",
    duration: "60 min",
    status: "cancelled",
    appointmentType: "in-person",
  },
]

const statusConfig = {
  confirmed: {
    label: "Confirmed",
    className: "bg-[#10B981]/10 text-[#10B981]",
  },
  pending: {
    label: "Pending",
    className: "bg-[#F59E0B]/10 text-[#F59E0B]",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive",
  },
}

function AppointmentRow({ appointment }: { appointment: Appointment }) {
  const status = statusConfig[appointment.status]

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        <Avatar className="h-11 w-11 ring-2 ring-border">
          <AvatarImage src={appointment.patient.avatar} alt={appointment.patient.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
            {appointment.patient.initials}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-foreground">{appointment.patient.name}</p>
          <p className="text-sm text-muted-foreground">{appointment.type}</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} />
          <span>{appointment.time}</span>
          <span className="text-border">•</span>
          <span>{appointment.duration}</span>
        </div>

        <div className={cn(
          "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs",
          appointment.appointmentType === "video" 
            ? "bg-primary/10 text-primary" 
            : "bg-accent/10 text-accent"
        )}>
          {appointment.appointmentType === "video" ? (
            <>
              <Video size={12} />
              <span>Video</span>
            </>
          ) : (
            <>
              <MapPin size={12} />
              <span>In-person</span>
            </>
          )}
        </div>

        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium",
          status.className
        )}>
          {status.label}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-secondary transition-all">
              <MoreHorizontal size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rounded-xl">
            <DropdownMenuItem className="rounded-lg cursor-pointer">View Details</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer">Reschedule</DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
              Cancel
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export function AppointmentList() {
  return (
    <div className="bg-card rounded-2xl shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div>
          <h2 className="text-lg font-semibold text-foreground">{"Today's Appointments"}</h2>
          <p className="text-sm text-muted-foreground">You have 5 appointments scheduled</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-xl transition-colors">
          View All
        </button>
      </div>
      <div className="p-2">
        {appointments.map((appointment) => (
          <AppointmentRow key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </div>
  )
}
