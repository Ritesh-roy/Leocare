"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Calendar,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  ChevronLeft,
  Stethoscope,
  FileText,
  Bell,
} from "lucide-react"

interface NavItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
  collapsed?: boolean
  onClick?: () => void
}

function NavItem({ icon, label, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
        "hover:bg-sidebar-accent",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg shadow-primary/25"
          : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
        collapsed && "justify-center px-2"
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState("Dashboard")

  const mainNavItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard" },
    { icon: <Calendar size={20} />, label: "Appointments" },
    { icon: <Users size={20} />, label: "Patients" },
    { icon: <Stethoscope size={20} />, label: "Doctors" },
    { icon: <MessageSquare size={20} />, label: "Messages" },
    { icon: <FileText size={20} />, label: "Reports" },
    { icon: <Bell size={20} />, label: "Notifications" },
  ]

  const bottomNavItems = [
    { icon: <Settings size={20} />, label: "Settings" },
    { icon: <LogOut size={20} />, label: "Logout" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar flex flex-col transition-all duration-300",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className={cn(
        "flex items-center h-16 px-4 border-b border-sidebar-border",
        collapsed ? "justify-center" : "gap-3"
      )}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
          <Stethoscope size={22} className="text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="text-lg font-semibold text-sidebar-foreground">
            LeoCare
          </span>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "absolute -right-3 top-20 w-6 h-6 rounded-full bg-sidebar-accent border border-sidebar-border",
          "flex items-center justify-center text-sidebar-foreground/70 hover:text-sidebar-foreground",
          "transition-transform duration-300 hover:scale-110",
          collapsed && "rotate-180"
        )}
      >
        <ChevronLeft size={14} />
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            active={activeItem === item.label}
            collapsed={collapsed}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            collapsed={collapsed}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </div>
    </aside>
  )
}
