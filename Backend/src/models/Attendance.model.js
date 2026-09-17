const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    // Student
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    // Class
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    // Attendance Date
    date: {
      type: Date,
      required: true,
    },

    // Attendance Status
    status: {
      type: String,
      enum: ["present", "absent", "late", "leave", "holiday"],
      required: true,
    },

    // Time when attendance was marked
    markedAt: {
      type: Date,
      default: null,
    },

    // How attendance was marked
    source: {
      type: String,
      enum: ["face_recognition", "manual"],
      required: true,
    },

    // Face recognition confidence
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    // User who marked/updated the attendance
    markedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Original status before manual correction
    originalStatus: {
      type: String,
      enum: ["present", "absent", "late", "leave", "holiday"],
      default: null,
    },

    // Reason for manual modification
    correctionReason: {
      type: String,
      trim: true,
      default: null,
    },

    // Whether this record was manually modified
    isCorrected: {
      type: Boolean,
      default: false,
    },

    // Optional notes
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// One attendance record per student per day
attendanceSchema.index(
  {
    student: 1,
    date: 1,
  },
  {
    unique: true,
  }
);

module.exports =
  mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);