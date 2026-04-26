"use client"

import { Calendar, Users, Clock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ReactNode
  iconBg: string
}

function MetricCard({ title, value, change, trend, icon, iconBg }: MetricCardProps) {
  return (
    <div className="group bg-card rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-xl", iconBg)}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-lg",
          trend === "up" ? "text-[#10B981] bg-[#10B981]/10" : "text-destructive bg-destructive/10"
        )}>
          {trend === "up" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </div>
  )
}

export function MetricCards() {
  const metrics = [
    {
      title: "Total Appointments",
      value: "1,284",
      change: "+12.5%",
      trend: "up" as const,
      icon: <Calendar size={22} className="text-primary" />,
      iconBg: "bg-primary/10",
    },
    {
      title: "New Patients",
      value: "256",
      change: "+8.2%",
      trend: "up" as const,
      icon: <Users size={22} className="text-accent" />,
      iconBg: "bg-accent/10",
    },
    {
      title: "Avg. Wait Time",
      value: "12 min",
      change: "-3.1%",
      trend: "down" as const,
      icon: <Clock size={22} className="text-[#10B981]" />,
      iconBg: "bg-[#10B981]/10",
    },
    {
      title: "Revenue",
      value: "$48,592",
      change: "+18.7%",
      trend: "up" as const,
      icon: <TrendingUp size={22} className="text-[#F59E0B]" />,
      iconBg: "bg-[#F59E0B]/10",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  )
}
