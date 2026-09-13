const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const classRoutes = require("./routes/class.routes");
const studentRoutes = require("./routes/student.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const auditLogRoutes = require("./routes/auditLog.routes");
const faceEnrollmentRoutes = require("./routes/faceEnrollment.routes");
const faceRecognitionRoutes = require("./routes/faceRecognition.routes");

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RollCall Backend API is running",
  });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/classes", classRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/audit-logs", auditLogRoutes);
app.use("/api/face-enrollment", faceEnrollmentRoutes);
app.use("/api/face-recognition", faceRecognitionRoutes);

module.exports = app;