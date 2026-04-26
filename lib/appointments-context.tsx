"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { Appointment } from "./types"
import { appointments as initialAppointments } from "./data"

interface AppointmentsContextType {
  appointments: Appointment[]
  addAppointment: (appointment: Omit<Appointment, "id">) => void
  updateAppointment: (id: string, updates: Partial<Appointment>) => void
  cancelAppointment: (id: string) => void
  getAppointmentsByDoctor: (doctorId: string) => Appointment[]
  getAppointmentsByPatient: (patientId: string) => Appointment[]
}

const AppointmentsContext = createContext<AppointmentsContextType | undefined>(undefined)

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments)

  const addAppointment = useCallback((appointment: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
    }
    setAppointments((prev) => [...prev, newAppointment])
  }, [])

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, ...updates } : apt))
    )
  }, [])

  const cancelAppointment = useCallback((id: string) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: "cancelled" } : apt))
    )
  }, [])

  const getAppointmentsByDoctor = useCallback(
    (doctorId: string) => {
      return appointments.filter((apt) => apt.doctorId === doctorId)
    },
    [appointments]
  )

  const getAppointmentsByPatient = useCallback(
    (patientId: string) => {
      return appointments.filter((apt) => apt.patientId === patientId)
    },
    [appointments]
  )

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        updateAppointment,
        cancelAppointment,
        getAppointmentsByDoctor,
        getAppointmentsByPatient,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentsContext)
  if (context === undefined) {
    throw new Error("useAppointments must be used within an AppointmentsProvider")
  }
  return context
}
