"use client"

import { Calendar, Users, Clock, TrendingUp, Video, Building } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAppointments } from "@/lib/appointments-context"
import { cn } from "@/lib/utils"

const todayAppointments = [
  {
    id: "1",
    patientName: "John Smith",
    patientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    time: "09:00 AM",
    duration: "30 min",
    type: "in-person" as const,
    reason: "Heart checkup",
    status: "upcoming" as const,
  },
  {
    id: "2",
    patientName: "Emma Johnson",
    patientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    time: "10:30 AM",
    duration: "45 min",
    type: "video" as const,
    reason: "Follow-up consultation",
    status: "in-progress" as const,
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    time: "02:00 PM",
    duration: "30 min",
    type: "in-person" as const,
    reason: "ECG Review",
    status: "upcoming" as const,
  },
  {
    id: "4",
    patientName: "Sarah Davis",
    patientAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    time: "03:30 PM",
    duration: "30 min",
    type: "video" as const,
    reason: "Prescription renewal",
    status: "upcoming" as const,
  },
]

const metrics = [
  {
    title: "Today's Appointments",
    value: "8",
    subtitle: "3 completed, 5 remaining",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Patients",
    value: "127",
    subtitle: "+5 this week",
    icon: Users,
    color: "text-[#10B981]",
    bgColor: "bg-[#10B981]/10",
  },
  {
    title: "Avg. Consultation",
    value: "28m",
    subtitle: "2 min faster than avg",
    icon: Clock,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "This Month",
    value: "$12,450",
    subtitle: "+18% from last month",
    icon: TrendingUp,
    color: "text-[#F59E0B]",
    bgColor: "bg-[#F59E0B]/10",
  },
]

export default function DoctorDashboard() {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-primary/10 text-primary border-primary/20"
      case "upcoming":
        return "bg-muted text-muted-foreground border-border"
      default:
        return "bg-muted text-muted-foreground border-border"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Good morning, Dr. Wilson</h1>
          <p className="text-muted-foreground">You have 8 appointments scheduled for today</p>
        </div>
        <Button className="gap-2">
          <Video size={18} />
          Start Next Video Call
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                  <metric.icon size={24} className={metric.color} />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{metric.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{"Today's Schedule"}</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                    apt.status === "in-progress" ? "bg-primary/5 border-primary/20" : "bg-card border-border hover:bg-muted/50"
                  )}
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={apt.patientAvatar} />
                    <AvatarFallback>{apt.patientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-foreground truncate">{apt.patientName}</h4>
                      {apt.status === "in-progress" && (
                        <Badge className="bg-primary text-primary-foreground">In Progress</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{apt.reason}</p>
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <p className="font-medium text-foreground">{apt.time}</p>
                      <p className="text-muted-foreground">{apt.duration}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {apt.type === "video" ? (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Video size={18} className="text-primary" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Building size={18} className="text-accent" />
                        </div>
                      )}
                    </div>

                    {apt.status === "in-progress" ? (
                      <Button size="sm">Join Call</Button>
                    ) : (
                      <Button variant="outline" size="sm">View</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Upcoming */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Next Appointment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={todayAppointments[0].patientAvatar} />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{todayAppointments[0].patientName}</h4>
                  <p className="text-sm text-muted-foreground">{todayAppointments[0].reason}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock size={14} className="text-primary" />
                    <span className="text-sm text-primary font-medium">{todayAppointments[0].time}</span>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4">Start Consultation</Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Video size={18} />
                Start Video Call
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Calendar size={18} />
                View Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users size={18} />
                Patient Records
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
