"use client"

import { useState } from "react"
import { Doctor } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppointments } from "@/lib/appointments-context"
import { Star, Clock, Video, Building, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface BookingModalProps {
  doctor: Doctor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function BookingModal({ doctor, open, onOpenChange }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [appointmentType, setAppointmentType] = useState<"video" | "in-person">("in-person")
  const [patientName, setPatientName] = useState("")
  const [patientEmail, setPatientEmail] = useState("")
  const [patientPhone, setPatientPhone] = useState("")
  const [reason, setReason] = useState("")
  const [bookingComplete, setBookingComplete] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [customerToken, setCustomerToken] = useState("")
  const [customerStatus, setCustomerStatus] = useState<"new" | "existing" | null>(null)
  
  const { addAppointment } = useAppointments()
  const configuredApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.VITE_API_URL
  const fallbackApiBaseUrl = process.env.NODE_ENV === "production"
    ? "https://leocare-api.onrender.com"
    : "http://localhost:5000"
  const apiBaseUrl = (configuredApiBaseUrl || fallbackApiBaseUrl).replace(/\/+$/, "")

  const resetForm = () => {
    setStep(1)
    setSelectedDate(undefined)
    setSelectedTime("")
    setAppointmentType("in-person")
    setPatientName("")
    setPatientEmail("")
    setPatientPhone("")
    setReason("")
    setBookingComplete(false)
    setSubmitError("")
    setSubmitting(false)
    setCustomerToken("")
    setCustomerStatus(null)
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(resetForm, 300)
  }

  const handleSubmit = async () => {
    if (!doctor || !selectedDate || !selectedTime) return
    setSubmitError("")
    setSubmitting(true)

    try {
      const response = await fetch(`${apiBaseUrl}/api/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientName,
          patientEmail,
          patientPhone,
          patientAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
          doctorId: doctor.id,
          doctorName: doctor.name,
          doctorSpecialty: doctor.specialty,
          date: selectedDate.toISOString().split("T")[0],
          time: selectedTime,
          duration: 30,
          type: appointmentType,
          status: "pending",
          reason,
        }),
      })

      const rawResponse = await response.text()
      let payload: {
        message?: string
        appointment?: {
          patientId: string
          patientName: string
          patientEmail: string
          patientPhone: string
          patientAvatar: string
          customerToken: string
          customerStatus: "new" | "existing"
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
      }

      try {
        payload = JSON.parse(rawResponse)
      } catch {
        throw new Error(rawResponse || "Server returned an invalid response")
      }

      if (!response.ok || !payload.appointment) {
        throw new Error(payload.message || "Failed to save booking")
      }

      addAppointment({
        patientId: payload.appointment.patientId,
        patientName: payload.appointment.patientName,
        patientEmail: payload.appointment.patientEmail,
        patientPhone: payload.appointment.patientPhone,
        patientAvatar: payload.appointment.patientAvatar,
        customerToken: payload.appointment.customerToken,
        customerStatus: payload.appointment.customerStatus,
        doctorId: payload.appointment.doctorId,
        doctorName: payload.appointment.doctorName,
        doctorSpecialty: payload.appointment.doctorSpecialty,
        date: payload.appointment.date,
        time: payload.appointment.time,
        duration: payload.appointment.duration,
        type: payload.appointment.type,
        status: payload.appointment.status,
        reason: payload.appointment.reason,
        notes: payload.appointment.notes,
      })

      setCustomerToken(payload.appointment.customerToken)
      setCustomerStatus(payload.appointment.customerStatus)
      setBookingComplete(true)
    } catch (error) {
      const message = error instanceof Error ? error.message : "Booking save failed"
      setSubmitError(message)
    } finally {
      setSubmitting(false)
    }
  }

  if (!doctor) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {bookingComplete ? "Booking Confirmed" : `Book Appointment with ${doctor.name}`}
          </DialogTitle>
        </DialogHeader>

        {bookingComplete ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-[#10B981]" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Appointment Booked Successfully!</h3>
            <p className="text-muted-foreground mb-6">
              Your appointment with {doctor.name} has been scheduled for{" "}
              {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} at {selectedTime}.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              A confirmation email has been sent to {patientEmail}
            </p>
            <div className="mb-6 rounded-xl border border-border bg-muted/40 px-4 py-3 text-left text-sm">
              <p className="font-medium text-foreground">Customer Token: {customerToken || "N/A"}</p>
              <p className="text-muted-foreground">
                Customer Type: {customerStatus === "existing" ? "Existing Customer" : "New Customer"}
              </p>
            </div>
            <Button onClick={handleClose}>Done</Button>
          </div>
        ) : (
          <>
            {/* Doctor Info */}
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl mb-6">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-user.jpg"
                }}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                <p className="text-primary text-sm">{doctor.specialty}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star size={14} className="text-[#F59E0B]" fill="currentColor" />
                    {doctor.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {doctor.experience}
                  </span>
                </div>
              </div>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                    step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}
                >
                  {s}
                </div>
              ))}
            </div>

            {/* Step 1: Select Date & Time */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Select Date</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-xl border"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-base font-medium mb-3 block">Available Time Slots</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {doctor.availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={cn(
                            "py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                            selectedTime === slot
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Appointment Type & Details */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium mb-3 block">Appointment Type</Label>
                  <RadioGroup
                    value={appointmentType}
                    onValueChange={(v) => setAppointmentType(v as "video" | "in-person")}
                    className="grid grid-cols-2 gap-4"
                  >
                    <label
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                        appointmentType === "in-person" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <RadioGroupItem value="in-person" />
                      <Building size={20} className="text-primary" />
                      <div>
                        <p className="font-medium text-foreground">In-Person</p>
                        <p className="text-sm text-muted-foreground">Visit the clinic</p>
                      </div>
                    </label>
                    <label
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors",
                        appointmentType === "video" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <RadioGroupItem value="video" />
                      <Video size={20} className="text-primary" />
                      <div>
                        <p className="font-medium text-foreground">Video Call</p>
                        <p className="text-sm text-muted-foreground">Online consultation</p>
                      </div>
                    </label>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="reason" className="text-base font-medium mb-3 block">
                    Reason for Visit
                  </Label>
                  <Textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Briefly describe your symptoms or reason for the appointment..."
                    className="min-h-25"
                  />
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={!reason}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Patient Information */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="mb-2 block">Full Name</Label>
                    <Input
                      id="name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Summary */}
                <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                  <h4 className="font-medium text-foreground">Appointment Summary</h4>
                  <div className="text-sm space-y-1 text-muted-foreground">
                    <p>Doctor: {doctor.name}</p>
                    <p>Date: {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
                    <p>Time: {selectedTime}</p>
                    <p>Type: {appointmentType === "video" ? "Video Call" : "In-Person Visit"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={!patientName || !patientEmail || !patientPhone || submitting}
                    >
                      {submitting ? "Saving..." : "Confirm Booking"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
