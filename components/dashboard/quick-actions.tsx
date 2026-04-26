"use client"

import { Plus, Calendar, UserPlus, FileText, Video } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuickActionProps {
  icon: React.ReactNode
  label: string
  description: string
  iconBg: string
  onClick?: () => void
}

function QuickAction({ icon, label, description, iconBg, onClick }: QuickActionProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-left w-full"
    >
      <div className={cn("p-3 rounded-xl", iconBg)}>
        {icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </button>
  )
}

export function QuickActions() {
  const actions = [
    {
      icon: <Plus size={20} className="text-primary" />,
      label: "New Appointment",
      description: "Schedule a new patient visit",
      iconBg: "bg-primary/10",
    },
    {
      icon: <UserPlus size={20} className="text-accent" />,
      label: "Add Patient",
      description: "Register new patient",
      iconBg: "bg-accent/10",
    },
    {
      icon: <Video size={20} className="text-[#10B981]" />,
      label: "Start Video Call",
      description: "Begin telemedicine session",
      iconBg: "bg-[#10B981]/10",
    },
    {
      icon: <FileText size={20} className="text-[#F59E0B]" />,
      label: "Create Report",
      description: "Generate medical report",
      iconBg: "bg-[#F59E0B]/10",
    },
  ]

  return (
    <div className="bg-secondary/50 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions.map((action) => (
          <QuickAction key={action.label} {...action} />
        ))}
      </div>
    </div>
  )
}
