const express = require("express")
const Appointment = require("../models/Appointment")
const { normalizeEmail, normalizePhone, makeCustomerToken } = require("../utils/customer")

const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 }).lean()
    const mapped = appointments.map((appointment) => ({
      id: appointment._id.toString(),
      patientId: appointment.patientId,
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      patientPhone: appointment.patientPhone,
      patientAvatar: appointment.patientAvatar,
      customerToken: appointment.customerToken,
      customerStatus: appointment.customerStatus,
      doctorId: appointment.doctorId,
      doctorName: appointment.doctorName,
      doctorSpecialty: appointment.doctorSpecialty,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      type: appointment.type,
      status: appointment.status,
      reason: appointment.reason,
      notes: appointment.notes,
      createdAt: appointment.createdAt,
      updatedAt: appointment.updatedAt,
    }))

    res.json({ appointments: mapped })
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments" })
  }
})

router.post("/", async (req, res) => {
  try {
    const {
      patientId,
      patientName,
      patientEmail,
      patientPhone,
      patientAvatar,
      doctorId,
      doctorName,
      doctorSpecialty,
      date,
      time,
      duration,
      type,
      status,
      reason,
      notes,
    } = req.body

    if (!patientName || !patientEmail || !patientPhone || !doctorId || !doctorName || !doctorSpecialty || !date || !time || !duration || !type) {
      return res.status(400).json({ message: "Missing required appointment fields" })
    }

    const normalizedEmail = normalizeEmail(patientEmail)
    const normalizedPhone = normalizePhone(patientPhone)

    const existingCustomer = await Appointment.findOne({
      $or: [{ normalizedEmail }, { normalizedPhone }],
    }).lean()

    const customerToken = existingCustomer?.customerToken || makeCustomerToken()
    const customerStatus = existingCustomer ? "existing" : "new"

    const created = await Appointment.create({
      patientId: existingCustomer?.patientId || patientId || `pt-${Date.now()}`,
      patientName,
      patientEmail,
      patientPhone,
      patientAvatar,
      customerToken,
      customerStatus,
      doctorId,
      doctorName,
      doctorSpecialty,
      date,
      time,
      duration,
      type,
      status: status || "pending",
      reason,
      notes,
      normalizedEmail,
      normalizedPhone,
    })

    res.status(201).json({
      appointment: {
        id: created._id.toString(),
        patientId: created.patientId,
        patientName: created.patientName,
        patientEmail: created.patientEmail,
        patientPhone: created.patientPhone,
        patientAvatar: created.patientAvatar,
        customerToken: created.customerToken,
        customerStatus: created.customerStatus,
        doctorId: created.doctorId,
        doctorName: created.doctorName,
        doctorSpecialty: created.doctorSpecialty,
        date: created.date,
        time: created.time,
        duration: created.duration,
        type: created.type,
        status: created.status,
        reason: created.reason,
        notes: created.notes,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Failed to save appointment" })
  }
})

module.exports = router
