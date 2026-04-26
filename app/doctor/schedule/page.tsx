"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Clock, Video, Building } from "lucide-react"
import { cn } from "@/lib/utils"

const scheduleItems = [
  { time: "09:00", patient: "John Smith", type: "in-person", status: "confirmed" },
  { time: "09:30", patient: "Emma Johnson", type: "video", status: "confirmed" },
  { time: "10:00", patient: "Available", type: null, status: "available" },
  { time: "10:30", patient: "Michael Brown", type: "in-person", status: "pending" },
  { time: "11:00", patient: "Available", type: null, status: "available" },
  { time: "11:30", patient: "Sarah Davis", type: "video", status: "confirmed" },
  { time: "14:00", patient: "David Wilson", type: "in-person", status: "confirmed" },
  { time: "14:30", patient: "Available", type: null, status: "available" },
  { time: "15:00", patient: "Available", type: null, status: "available" },
  { time: "15:30", patient: "Lisa Anderson", type: "video", status: "pending" },
]

export default function DoctorSchedulePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground">Manage your availability and appointments</p>
        </div>
        <Button>Set Working Hours</Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-xl border"
            />
          </CardContent>
        </Card>

        {/* Daily Schedule */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>
              Schedule for {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduleItems.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border transition-colors",
                    item.status === "available"
                      ? "bg-muted/30 border-dashed border-border"
                      : "bg-card border-border hover:bg-muted/30"
                  )}
                >
                  <div className="flex items-center gap-2 w-20">
                    <Clock size={16} className="text-muted-foreground" />
                    <span className="font-medium text-foreground">{item.time}</span>
                  </div>

                  <div className="flex-1">
                    <p className={cn(
                      "font-medium",
                      item.status === "available" ? "text-muted-foreground" : "text-foreground"
                    )}>
                      {item.patient}
                    </p>
                  </div>

                  {item.type && (
                    <div className="flex items-center gap-2">
                      {item.type === "video" ? (
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Video size={16} className="text-primary" />
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-accent/10">
                          <Building size={16} className="text-accent" />
                        </div>
                      )}
                    </div>
                  )}

                  {item.status !== "available" ? (
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        item.status === "confirmed"
                          ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
                          : "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20"
                      )}
                    >
                      {item.status}
                    </Badge>
                  ) : (
                    <Button variant="outline" size="sm">Block Slot</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
