const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { connectDB } = require("./config/db")
const appointmentsRouter = require("./routes/appointments")

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

const allowedOrigins = [process.env.FRONTEND_URL, process.env.FRONTEND_URLS]
  .filter(Boolean)
  .flatMap((value) => value.split(","))
  .map((origin) => origin.trim())
  .filter(Boolean)

if (allowedOrigins.length === 0) {
  console.warn("No FRONTEND_URL/FRONTEND_URLS set. CORS will allow all origins.")
}

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.length === 0) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error("Not allowed by CORS"))
  },
}

app.use(cors(corsOptions))
app.options("*", cors(corsOptions))
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    service: "leocare-backend",
    status: "ok",
  })
})

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() })
})

app.use("/api/appointments", appointmentsRouter)

app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

app.use((error, req, res, next) => {
  if (error && error.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS blocked for this origin" })
  }

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Invalid JSON payload" })
  }

  console.error("Unhandled error:", error)

  return res.status(error.status || 500).json({
    message: error.message || "Internal server error",
  })
})

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend running on port ${port}`)
      console.log(
        allowedOrigins.length > 0
          ? `CORS allowed origins: ${allowedOrigins.join(", ")}`
          : "CORS allowed origins: *"
      )
    })
  })
  .catch((error) => {
    console.error("Failed to start backend:", error.message)
    process.exit(1)
  })
