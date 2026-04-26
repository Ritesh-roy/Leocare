"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, Plus, Calendar, User } from "lucide-react"

const reports = [
  {
    id: 1,
    patient: "John Smith",
    type: "Medical Report",
    date: "Jan 15, 2024",
    status: "Completed",
  },
  {
    id: 2,
    patient: "Emma Johnson",
    type: "Lab Results",
    date: "Jan 14, 2024",
    status: "Pending Review",
  },
  {
    id: 3,
    patient: "Michael Brown",
    type: "Prescription",
    date: "Jan 13, 2024",
    status: "Completed",
  },
  {
    id: 4,
    patient: "Sarah Davis",
    type: "Consultation Notes",
    date: "Jan 12, 2024",
    status: "Completed",
  },
]

export default function DoctorReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Medical Reports</h1>
          <p className="text-muted-foreground">Create and manage patient reports</p>
        </div>
        <Button className="gap-2">
          <Plus size={18} />
          Create Report
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <FileText size={24} className="text-primary" />
                </div>
                
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  <div>
                    <p className="font-semibold text-foreground">{report.type}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User size={14} />
                      <span>{report.patient}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar size={14} />
                    <span>{report.date}</span>
                  </div>
                  
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      report.status === "Completed" 
                        ? "bg-[#10B981]/10 text-[#10B981]" 
                        : "bg-[#F59E0B]/10 text-[#F59E0B]"
                    }`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">View</Button>
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
