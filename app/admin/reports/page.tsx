"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp } from "lucide-react"

const reports = [
  {
    id: 1,
    title: "Monthly Appointments Report",
    description: "Detailed breakdown of all appointments for the current month",
    icon: Calendar,
    type: "Appointments",
    date: "Generated: Jan 15, 2024",
  },
  {
    id: 2,
    title: "Patient Demographics Report",
    description: "Analysis of patient demographics and distribution",
    icon: Users,
    type: "Patients",
    date: "Generated: Jan 14, 2024",
  },
  {
    id: 3,
    title: "Revenue Summary Report",
    description: "Financial overview including revenue by department",
    icon: DollarSign,
    type: "Financial",
    date: "Generated: Jan 13, 2024",
  },
  {
    id: 4,
    title: "Performance Analytics Report",
    description: "Key performance indicators and trends analysis",
    icon: TrendingUp,
    type: "Analytics",
    date: "Generated: Jan 12, 2024",
  },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
          <p className="text-muted-foreground">Generate and download system reports</p>
        </div>
        <Button className="gap-2">
          <FileText size={18} />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <report.icon size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{report.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{report.date}</span>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={14} />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
