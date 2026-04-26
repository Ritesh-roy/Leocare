"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/lib/appointments-context"
import { Calendar, Clock, Video, Building, CheckCircle, XCircle, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export default function DoctorAppointmentsPage() {
  const { appointments, updateAppointment, cancelAppointment } = useAppointments()
  const [activeTab, setActiveTab] = useState("upcoming")

  // Filter appointments for this doctor (dr-1)
  const doctorAppointments = appointments.filter(apt => apt.doctorId === "dr-1")

  const upcomingAppointments = doctorAppointments.filter(
    apt => apt.status === "confirmed" || apt.status === "pending"
  )
  const completedAppointments = doctorAppointments.filter(apt => apt.status === "completed")
  const cancelledAppointments = doctorAppointments.filter(apt => apt.status === "cancelled")

  const getStatusColor = (status: string) => {
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

  const AppointmentCard = ({ apt }: { apt: typeof appointments[0] }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
      <Avatar className="h-12 w-12">
        <AvatarImage src={apt.patientAvatar} />
        <AvatarFallback>{apt.patientName.charAt(0)}</AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-foreground">{apt.patientName}</h4>
        <p className="text-sm text-muted-foreground truncate">{apt.reason}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-foreground">{apt.date}</p>
          <p className="text-sm text-muted-foreground">{apt.time} ({apt.duration} min)</p>
        </div>

        <div className="flex items-center gap-2">
          {apt.type === "video" ? (
            <div className="p-2 rounded-lg bg-primary/10">
              <Video size={16} className="text-primary" />
            </div>
          ) : (
            <div className="p-2 rounded-lg bg-accent/10">
              <Building size={16} className="text-accent" />
            </div>
          )}
        </div>

        <Badge variant="outline" className={cn("capitalize", getStatusColor(apt.status))}>
          {apt.status}
        </Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={18} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {apt.status !== "completed" && apt.status !== "cancelled" && (
              <>
                <DropdownMenuItem onClick={() => updateAppointment(apt.id, { status: "completed" })}>
                  <CheckCircle size={16} className="mr-2 text-[#10B981]" />
                  Mark Complete
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => cancelAppointment(apt.id)} className="text-destructive">
                  <XCircle size={16} className="mr-2" />
                  Cancel
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuItem>View Patient Profile</DropdownMenuItem>
            <DropdownMenuItem>Add Notes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage your patient appointments</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Calendar size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{doctorAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Total</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-[#10B981]/10">
              <CheckCircle size={20} className="text-[#10B981]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{upcomingAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Upcoming</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent/10">
              <Clock size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-destructive/10">
              <XCircle size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{cancelledAppointments.length}</p>
              <p className="text-sm text-muted-foreground">Cancelled</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcomingAppointments.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedAppointments.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledAppointments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-6">
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No upcoming appointments
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="space-y-4">
            {completedAppointments.length > 0 ? (
              completedAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No completed appointments
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6">
          <div className="space-y-4">
            {cancelledAppointments.length > 0 ? (
              cancelledAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No cancelled appointments
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
