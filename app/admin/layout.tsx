"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AdminTopNav } from "@/components/admin/admin-top-nav"
import { AuthProvider } from "@/lib/auth-context"
import { AppointmentsProvider } from "@/lib/appointments-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <div className="min-h-screen bg-background">
          <AdminSidebar />
          <div className="pl-64 transition-all duration-300">
            <AdminTopNav />
            <main className="p-6">{children}</main>
          </div>
        </div>
      </AppointmentsProvider>
    </AuthProvider>
  )
}
