const mongoose = require("mongoose");

const faceEnrollmentSchema = new mongoose.Schema(
  {
    // Student whose face is enrolled
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      unique: true,
    },

    // Enrollment status
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },

    // Number of face samples captured
    sampleCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Reference to stored face/embedding data
    embeddingReference: {
      type: String,
      default: null,
    },

    // CNN/model information
    modelName: {
      type: String,
      default: null,
    },

    modelVersion: {
      type: String,
      default: null,
    },

    // Face quality information
    averageQuality: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    // Who performed the enrollment
    enrolledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Enrollment completion date
    enrolledAt: {
      type: Date,
      default: null,
    },

    // Failure/error information
    failureReason: {
      type: String,
      trim: true,
      default: null,
    },

    // Whether the enrollment is currently active
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const FaceEnrollment = mongoose.model(
  "FaceEnrollment",
  faceEnrollmentSchema
);

module.exports = FaceEnrollment;