const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientAvatar: { type: String, default: "" },
    customerToken: { type: String, required: true, index: true },
    customerStatus: { type: String, enum: ["new", "existing"], required: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true },
    doctorSpecialty: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    type: { type: String, enum: ["video", "in-person"], required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled", "completed"],
      default: "pending",
    },
    reason: { type: String, default: "" },
    notes: { type: String, default: "" },
    normalizedEmail: { type: String, index: true },
    normalizedPhone: { type: String, index: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Appointment", appointmentSchema)
