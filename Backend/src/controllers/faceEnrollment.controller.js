const FaceEnrollment = require("../models/FaceEnrollment.model");
const Student = require("../models/Student.model");
const Class = require("../models/class.model");

// Start face enrollment
const startFaceEnrollment = async (req, res) => {
  try {
    const { studentId } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required.",
      });
    }

    // Find student
    const student = await Student.findById(studentId).populate("class");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Class Admin can only enroll students from assigned class
    if (
      req.user.role === "class_admin" &&
      student.class._id.toString() !== req.user.assignedClass?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only enroll students from your assigned class.",
      });
    }

    // Check if already enrolled
    if (student.faceEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Face is already enrolled for this student.",
      });
    }

    // Check existing enrollment record
    let enrollment = await FaceEnrollment.findOne({
      student: studentId,
    });

    if (enrollment) {
      enrollment.status = "pending";
      enrollment.sampleCount = 0;
      enrollment.failureReason = null;
      enrollment.enrolledBy = req.user.userId;

      await enrollment.save();
    } else {
      enrollment = await FaceEnrollment.create({
        student: studentId,
        status: "pending",
        sampleCount: 0,
        enrolledBy: req.user.userId,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Face enrollment started.",
      data: {
        enrollmentId: enrollment._id,
        studentId: student._id,
        studentName: student.user,
        status: enrollment.status,
        sampleCount: enrollment.sampleCount,
      },
    });
  } catch (error) {
    console.error("Start Face Enrollment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to start face enrollment.",
      error: error.message,
    });
  }
};


// Complete face enrollment
const completeFaceEnrollment = async (req, res) => {
  try {
    const {
      studentId,
      sampleCount,
      embeddingReference,
      modelName,
      modelVersion,
      averageQuality,
    } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required.",
      });
    }

    if (!sampleCount || sampleCount < 3 || sampleCount > 5) {
      return res.status(400).json({
        success: false,
        message: "Sample count must be between 3 and 5.",
      });
    }

    const student = await Student.findById(studentId).populate("class");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Class Admin scope check
    if (
      req.user.role === "class_admin" &&
      student.class._id.toString() !== req.user.assignedClass?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only enroll students from your assigned class.",
      });
    }

    const enrollment = await FaceEnrollment.findOne({
      student: studentId,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment session not found. Start enrollment first.",
      });
    }

    enrollment.status = "completed";
    enrollment.sampleCount = sampleCount;
    enrollment.embeddingReference = embeddingReference || null;
    enrollment.modelName = modelName || null;
    enrollment.modelVersion = modelVersion || null;
    enrollment.averageQuality =
      averageQuality !== undefined ? averageQuality : null;
    enrollment.enrolledBy = req.user.userId;
    enrollment.enrolledAt = new Date();
    enrollment.failureReason = null;
    enrollment.isActive = true;

    await enrollment.save();

    // Update student
    student.faceEnrolled = true;
    student.faceEnrollmentDate = new Date();

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Face enrollment completed successfully.",
      data: {
        studentId: student._id,
        enrollmentId: enrollment._id,
        status: enrollment.status,
        sampleCount: enrollment.sampleCount,
        faceEnrolled: student.faceEnrolled,
        faceEnrollmentDate: student.faceEnrollmentDate,
      },
    });
  } catch (error) {
    console.error("Complete Face Enrollment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to complete face enrollment.",
      error: error.message,
    });
  }
};


// Get enrollment status
const getFaceEnrollment = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate("class");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Class Admin scope check
    if (
      req.user.role === "class_admin" &&
      student.class._id.toString() !== req.user.assignedClass?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    const enrollment = await FaceEnrollment.findOne({
      student: studentId,
    });

    return res.status(200).json({
      success: true,
      data: {
        studentId: student._id,
        faceEnrolled: student.faceEnrolled,
        faceEnrollmentDate: student.faceEnrollmentDate,
        enrollment,
      },
    });
  } catch (error) {
    console.error("Get Face Enrollment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch face enrollment.",
      error: error.message,
    });
  }
};


// Delete / reset face enrollment
const deleteFaceEnrollment = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate("class");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // Class Admin scope check
    if (
      req.user.role === "class_admin" &&
      student.class._id.toString() !== req.user.assignedClass?.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only manage students from your assigned class.",
      });
    }

    const enrollment = await FaceEnrollment.findOne({
      student: studentId,
    });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Face enrollment not found.",
      });
    }

    enrollment.status = "pending";
    enrollment.sampleCount = 0;
    enrollment.embeddingReference = null;
    enrollment.modelName = null;
    enrollment.modelVersion = null;
    enrollment.averageQuality = null;
    enrollment.enrolledAt = null;
    enrollment.failureReason = null;
    enrollment.isActive = false;

    await enrollment.save();

    student.faceEnrolled = false;
    student.faceEnrollmentDate = null;

    await student.save();

    return res.status(200).json({
      success: true,
      message: "Face enrollment has been reset.",
    });
  } catch (error) {
    console.error("Delete Face Enrollment Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reset face enrollment.",
      error: error.message,
    });
  }
};


module.exports = {
  startFaceEnrollment,
  completeFaceEnrollment,
  getFaceEnrollment,
  deleteFaceEnrollment,
};