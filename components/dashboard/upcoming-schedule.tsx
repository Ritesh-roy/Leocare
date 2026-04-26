"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ScheduleItem {
  id: string
  time: string
  patient: {
    name: string
    avatar: string
    initials: string
  }
  type: string
}

const scheduleItems: ScheduleItem[] = [
  {
    id: "1",
    time: "9:00 AM",
    patient: {
      name: "James Mitchell",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      initials: "JM",
    },
    type: "General Checkup",
  },
  {
    id: "2",
    time: "10:30 AM",
    patient: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      initials: "EC",
    },
    type: "Follow-up",
  },
  {
    id: "3",
    time: "11:00 AM",
    patient: {
      name: "Robert Taylor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      initials: "RT",
    },
    type: "ECG Test",
  },
  {
    id: "4",
    time: "2:00 PM",
    patient: {
      name: "Lisa Anderson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      initials: "LA",
    },
    type: "Medication Review",
  },
]

export function UpcomingSchedule() {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upcoming Schedule</h3>
          <p className="text-sm text-muted-foreground">April 22, 2026</p>
        </div>
        <button className="px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg transition-colors">
          View Calendar
        </button>
      </div>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[52px] top-0 bottom-0 w-px bg-border" />
        
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div key={item.id} className="flex items-center gap-4 relative">
              <span className="w-[44px] text-sm text-muted-foreground text-right font-medium">
                {item.time.split(" ")[0]}
                <span className="text-xs ml-0.5">{item.time.split(" ")[1]}</span>
              </span>
              
              {/* Timeline dot */}
              <div className="relative z-10 w-3 h-3 rounded-full bg-primary ring-4 ring-card" />
              
              <div className="flex-1 flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={item.patient.avatar} alt={item.patient.name} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                    {item.patient.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">{item.patient.name}</p>
                  <p className="text-xs text-muted-foreground">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
