const Student = require("../models/Student.model");
const Attendance = require("../models/Attendance.model");

const {
  createAuditLog,
} = require("./auditLog.controller");

const { sendFaceToAI } = require("../services/ai.service");

const getAttendanceDate = () => {
  const date = new Date();

  date.setHours(0, 0, 0, 0);

  return date;
};

const recognizeAndMarkAttendance = async (req, res) => {
  try {
    // ==================================================
    // 1. Only Class Admin can use face recognition
    // ==================================================
    if (req.user.role !== "class_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Class Admin can use face recognition attendance.",
      });
    }

    // ==================================================
    // 2. Class Admin must have an assigned class
    // ==================================================
    if (!req.user.assignedClass) {
      return res.status(403).json({
        success: false,
        message: "Class Admin is not assigned to any class.",
      });
    }

    // ==================================================
    // 3. Check image
    // ==================================================
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Face image is required.",
      });
    }

    // ==================================================
    // 4. Send image to Python AI service
    // ==================================================
    const aiResponse = await sendFaceToAI(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // ==================================================
    // 5. Check AI response
    // ==================================================
    if (!aiResponse || !aiResponse.success) {
      return res.status(400).json({
        success: false,
        message: aiResponse?.message || "Face recognition failed.",
      });
    }

    const recognition = aiResponse.data;

    // ==================================================
    // 6. Face not recognized
    // ==================================================
    if (!recognition?.match || !recognition?.student_id) {
      return res.status(200).json({
        success: true,
        message: "Face could not be matched with an enrolled student.",
        data: {
          match: false,
          studentId: null,
          similarity: recognition?.similarity ?? null,
          similarityPercentage:
            recognition?.similarity_percentage ?? null,
          attendanceMarked: false,
        },
      });
    }

    // ==================================================
    // 7. Validate similarity percentage
    // ==================================================
    const similarityPercentage =
      recognition.similarity_percentage;

    if (
      typeof similarityPercentage !== "number" ||
      similarityPercentage < 0 ||
      similarityPercentage > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid similarity score returned by AI service.",
      });
    }

    // ==================================================
    // 8. Find recognized student
    // ==================================================
    const student = await Student.findById(recognition.student_id)
      .populate("class")
      .populate("user", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Recognized student does not exist in MongoDB.",
      });
    }

    // ==================================================
    // 9. Student must be active
    // ==================================================
    if (!student.isActive) {
      return res.status(400).json({
        success: false,
        message: "Recognized student is inactive.",
      });
    }

    // ==================================================
    // 10. Student must have enrolled face
    // ==================================================
    if (!student.faceEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Student face is not enrolled.",
      });
    }

    // ==================================================
    // 11. Student must belong to Class Admin's class
    // ==================================================
    if (!student.class) {
      return res.status(400).json({
        success: false,
        message: "Student is not assigned to any class.",
      });
    }

    const assignedClassId = String(req.user.assignedClass);
    const studentClassId = String(student.class._id);

    if (studentClassId !== assignedClassId) {
      return res.status(403).json({
        success: false,
        message:
          "You can only mark attendance for students in your assigned class.",
      });
    }

    // ==================================================
    // 12. Use student's actual class
    // ==================================================
    const classId = student.class._id;

    // ==================================================
    // 13. Check today's attendance
    // ==================================================
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existingAttendance = await Attendance.findOne({
      student: student._id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    // ==================================================
    // 14. Prevent duplicate attendance
    // ==================================================
    if (existingAttendance) {
      return res.status(200).json({
        success: true,
        message: "Attendance already marked for today.",
        data: {
          match: true,
          studentId: student._id,
          studentName: student.user?.name || "",
          rollNumber: student.rollNumber,
          classId,
          similarity: recognition.similarity ?? null,
          similarityPercentage,
          attendanceMarked: false,
          alreadyMarked: true,
          attendance: existingAttendance,
        },
      });
    }

    // ==================================================
    // 15. Create attendance
    // ==================================================
    const attendance = await Attendance.create({
      student: student._id,
      class: classId,
      date: getAttendanceDate(),
      status: "present",
      markedAt: new Date(),
      source: "face_recognition",
      confidence: similarityPercentage,
      markedBy: req.user.userId,
      originalStatus: "present",
      isCorrected: false,
    });

    await createAuditLog({
      user: req.user.userId,
      role: req.user.role,
      action: "attendance_marked",
      module: "attendance",
      description: `Face recognition attendance marked for ${
        student.user?.name || "student"
      }.`,
      targetType: "attendance",
      targetId: attendance._id,
      metadata: {
        studentId: student._id,
        classId,
        source: "face_recognition",
        similarity: recognition.similarity ?? null,
        similarityPercentage,
        status: attendance.status,
      },
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // ==================================================
    // 16. Send response
    // ==================================================
    return res.status(201).json({
      success: true,
      message: "Face recognized and attendance marked successfully.",
      data: {
        match: true,
        studentId: student._id,
        studentName: student.user?.name || "",
        rollNumber: student.rollNumber,
        classId,
        similarity: recognition.similarity ?? null,
        similarityPercentage,
        attendanceMarked: true,
        attendanceId: attendance._id,
        status: attendance.status,
      },
    });
  } catch (error) {
    console.error(
      "Recognize And Mark Attendance Error:",
      error
    );

    // Handle duplicate-key race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Attendance has already been marked for this student today.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to recognize face and mark attendance.",
      error: error.message,
    });
  }
};

module.exports = {
  recognizeAndMarkAttendance,
};