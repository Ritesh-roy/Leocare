export interface Doctor {
  available: import("react/jsx-runtime").JSX.Element
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  reviews: number
  experience: string
  education: string
  about: string
  availableSlots: string[]
  consultationFee: number
  hospital: string
  languages: string[]
}

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  address: string
  bloodGroup: string
  emergencyContact: string
  medicalHistory: string[]
  avatar: string
}

export interface Appointment {
  id: string
  patientId: string
  patientName: string
  patientEmail?: string
  patientPhone?: string
  patientAvatar: string
  customerToken?: string
  customerStatus?: "new" | "existing"
  doctorId: string
  doctorName: string
  doctorSpecialty: string
  date: string
  time: string
  duration: number
  type: "video" | "in-person"
  status: "confirmed" | "pending" | "cancelled" | "completed"
  reason: string
  notes?: string
}

export type UserRole = "admin" | "doctor" | "patient"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  avatar: string
}
