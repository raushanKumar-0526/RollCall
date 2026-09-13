const Student = require("../models/Student.model");
const Attendance = require("../models/Attendance.model");

const {
  sendFaceToAI,
} = require("../services/ai.service");

const recognizeAndMarkAttendance = async (req, res) => {
  try {
    // 1. Check image
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Face image is required.",
      });
    }

    // 2. Send image to Python AI service
    const aiResponse = await sendFaceToAI(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    // 3. Check AI response
    if (!aiResponse.success) {
      return res.status(400).json({
        success: false,
        message: aiResponse.message || "Face recognition failed.",
      });
    }

    const recognition = aiResponse.data;

    // 4. Face not recognized
    if (!recognition.match || !recognition.student_id) {
      return res.status(200).json({
        success: true,
        message: "Face could not be matched with an enrolled student.",
        data: {
          match: false,
          studentId: null,
          similarity: recognition.similarity ?? null,
          similarityPercentage:
            recognition.similarity_percentage ?? null,
          attendanceMarked: false,
        },
      });
    }

    // 5. Get recognized student from MongoDB
    const student = await Student.findById(recognition.student_id)
      .populate("class")
      .populate("user", "name email");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Recognized student does not exist in MongoDB.",
      });
    }

    // 6. Check student status
    if (!student.isActive) {
      return res.status(400).json({
        success: false,
        message: "Recognized student is inactive.",
      });
    }

    // 7. Check face enrollment
    if (!student.faceEnrolled) {
      return res.status(400).json({
        success: false,
        message: "Student face is not enrolled.",
      });
    }

    // 8. Class Admin can only mark their assigned class
    if (req.user.role === "class_admin") {
      if (!req.user.assignedClass) {
        return res.status(403).json({
          success: false,
          message: "Class Admin is not assigned to any class.",
        });
      }

      if (
        student.class._id.toString() !==
        req.user.assignedClass.toString()
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only mark attendance for your assigned class.",
        });
      }
    }

    const classId = student.class._id;

    // 9. Check today's attendance
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

    // 10. Prevent duplicate attendance
    if (existingAttendance) {
      return res.status(200).json({
        success: true,
        message: "Attendance already marked for today.",
        data: {
          match: true,
          studentId: student._id,
          studentName: student.user?.name || "",
          rollNumber: student.rollNumber,
          similarity: recognition.similarity,
          similarityPercentage:
            recognition.similarity_percentage,
          attendanceMarked: false,
          alreadyMarked: true,
          attendance: existingAttendance,
        },
      });
    }

    // 11. Create attendance
    const attendance = await Attendance.create({
      student: student._id,
      class: classId,
      date: new Date(),
      status: "present",
      markedAt: new Date(),
      source: "face_recognition",
      confidence: recognition.similarity_percentage,
      markedBy: req.user.userId,
    });

    // 12. Send response
    return res.status(201).json({
      success: true,
      message: "Face recognized and attendance marked successfully.",
      data: {
        match: true,
        studentId: student._id,
        studentName: student.user?.name || "",
        rollNumber: student.rollNumber,
        classId: classId,
        similarity: recognition.similarity,
        similarityPercentage:
          recognition.similarity_percentage,
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