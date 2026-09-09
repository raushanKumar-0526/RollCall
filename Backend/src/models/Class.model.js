const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    // Class Information
    name: {
      type: String,
      required: true,
      trim: true,
    },

    section: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },

    // Academic Year
    academicYear: {
      type: String,
      required: true,
      trim: true,
    },

    // Class Teacher
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Students belonging to this class
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],

    // Class Status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate class + section + academic year
classSchema.index(
  {
    name: 1,
    section: 1,
    academicYear: 1,
  },
  {
    unique: true,
  }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;