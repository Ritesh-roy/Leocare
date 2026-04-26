"use client"

import { Appointment } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Building, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppointments } from "@/lib/appointments-context"
import { cn } from "@/lib/utils"

interface AdminAppointmentListProps {
  appointments: Appointment[]
}

export function AdminAppointmentList({ appointments }: AdminAppointmentListProps) {
  const { updateAppointment, cancelAppointment } = useAppointments()

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "confirmed":
        return "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
      case "pending":
        return "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "completed":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  if (appointments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No appointments found
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Doctor</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
            <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
            <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((apt) => (
            <tr key={apt.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={apt.patientAvatar} />
                    <AvatarFallback>{apt.patientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{apt.patientName}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-foreground">{apt.doctorName}</p>
                  <p className="text-sm text-muted-foreground">{apt.doctorSpecialty}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div>
                  <p className="font-medium text-foreground">{apt.date}</p>
                  <p className="text-sm text-muted-foreground">{apt.time}</p>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  {apt.type === "video" ? (
                    <Video size={16} className="text-primary" />
                  ) : (
                    <Building size={16} className="text-accent" />
                  )}
                  <span className="text-sm text-foreground capitalize">{apt.type}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <Badge variant="outline" className={cn("capitalize", getStatusColor(apt.status))}>
                  {apt.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal size={18} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => updateAppointment(apt.id, { status: "confirmed" })}>
                      Confirm
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => updateAppointment(apt.id, { status: "completed" })}>
                      Mark Complete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => cancelAppointment(apt.id)} className="text-destructive">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
