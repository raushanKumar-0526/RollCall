const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Basic Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // User Role
    role: {
      type: String,
      enum: ["super_admin", "class_admin", "student", "parent"],
      required: true,
    },

    // Account Status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Profile Information
    phone: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    // Parent-specific information
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Class Admin-specific information
    assignedClass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },

    // Last login information
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;