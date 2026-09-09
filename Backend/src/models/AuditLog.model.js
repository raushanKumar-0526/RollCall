const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    // User who performed the action
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Role of the user at the time of the action
    role: {
      type: String,
      enum: ["super_admin", "class_admin", "student", "parent"],
      required: true,
    },

    // Type of action
    action: {
      type: String,
      enum: [
        "login",
        "logout",
        "create",
        "update",
        "delete",
        "attendance_marked",
        "attendance_updated",
        "face_enrolled",
        "student_created",
        "student_updated",
        "class_created",
        "class_updated",
        "settings_updated",
      ],
      required: true,
    },

    // Module where the action happened
    module: {
      type: String,
      enum: [
        "authentication",
        "attendance",
        "face_enrollment",
        "student",
        "class",
        "settings",
        "system",
      ],
      required: true,
    },

    // Human-readable description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Type of target affected by the action
    targetType: {
      type: String,
      enum: [
        "user",
        "student",
        "class",
        "attendance",
        "face_enrollment",
        "system",
      ],
      default: null,
    },

    // ID of the affected record
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
    },

    // Additional information
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    // IP address from which action was performed
    ipAddress: {
      type: String,
      default: null,
    },

    // Browser/device information
    userAgent: {
      type: String,
      default: null,
    },

    // Action timestamp
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Useful indexes for Super Admin audit-log searches
auditLogSchema.index({ user: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, timestamp: -1 });
auditLogSchema.index({ module: 1, timestamp: -1 });
auditLogSchema.index({ targetId: 1, timestamp: -1 });

const AuditLog = mongoose.model("AuditLog", auditLogSchema);

module.exports = AuditLog;