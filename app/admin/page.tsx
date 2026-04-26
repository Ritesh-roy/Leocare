"use client"

import { Calendar, Users, Stethoscope, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAppointments } from "@/lib/appointments-context"
import { doctors, patients } from "@/lib/data"
import { AdminAppointmentList } from "@/components/admin/admin-appointment-list"
import { AdminCharts } from "@/components/admin/admin-charts"

const metrics = [
  {
    title: "Total Appointments",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Calendar,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Total Patients",
    value: "3,842",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-[#10B981]",
    bgColor: "bg-[#10B981]/10",
  },
  {
    title: "Active Doctors",
    value: "48",
    change: "+2",
    trend: "up",
    icon: Stethoscope,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Monthly Revenue",
    value: "$142,580",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
    color: "text-[#F59E0B]",
    bgColor: "bg-[#F59E0B]/10",
  },
]

export default function AdminDashboard() {
  const { appointments } = useAppointments()
  
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here is an overview of your healthcare system.</p>
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
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  metric.trend === "up" ? "text-[#10B981]" : "text-destructive"
                }`}>
                  {metric.trend === "up" ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {metric.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <AdminCharts />

      {/* Recent Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminAppointmentList appointments={appointments.slice(0, 5)} />
        </CardContent>
      </Card>
    </div>
  )
}
