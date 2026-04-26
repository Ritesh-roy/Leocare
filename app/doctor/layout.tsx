"use client"

import { DoctorSidebar } from "@/components/doctor/doctor-sidebar"
import { DoctorTopNav } from "@/components/doctor/doctor-top-nav"
import { AuthProvider } from "@/lib/auth-context"
import { AppointmentsProvider } from "@/lib/appointments-context"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <div className="min-h-screen bg-background">
          <DoctorSidebar />
          <div className="pl-64 transition-all duration-300">
            <DoctorTopNav />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </AppointmentsProvider>
    </AuthProvider>
  )
}
