const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    // Link student with login account
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Student Information
    rollNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    admissionNumber: {
      type: String,
      trim: true,
      uppercase: true,
    },

    dateOfBirth: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: null,
    },

    phone: {
      type: String,
      trim: true,
    },

    // Class Information
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    // Face Enrollment Status
    faceEnrolled: {
      type: Boolean,
      default: false,
    },

    faceEnrollmentDate: {
      type: Date,
      default: null,
    },

    // Student Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Emergency Contact
    emergencyContact: {
      name: {
        type: String,
        trim: true,
      },

      phone: {
        type: String,
        trim: true,
      },

      relation: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Student roll number should be unique within a class
studentSchema.index(
  {
    class: 1,
    rollNumber: 1,
  },
  {
    unique: true,
  }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;