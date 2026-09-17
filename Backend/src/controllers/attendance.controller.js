const Attendance = require("../models/attendance.model");
const Student = require("../models/Student.model");
const Class = require("../models/class.model");

const {
  createAuditLog,
} = require("./auditLog.controller");

// ======================================================
// Get normalized attendance date
// Example:
// 17 Sept 2026 08:30 AM
//        ↓
// 17 Sept 2026 00:00:00
// ======================================================
const getAttendanceDate = (date = new Date()) => {
  const normalizedDate = new Date(date);

  normalizedDate.setHours(0, 0, 0, 0);

  return normalizedDate;
};

// ======================================================
// Get date range for a particular calendar day
// Used when reading attendance records.
// ======================================================
const getDayRange = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

// ======================================================
// Validate YYYY-MM-DD format
// ======================================================
const isValidDateString = (dateString) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  const date = new Date(`${dateString}T00:00:00`);

  if (isNaN(date.getTime())) {
    return false;
  }

  // Prevent invalid dates such as 2026-02-31
  const [year, month, day] = dateString
    .split("-")
    .map(Number);

  return (
    date.getFullYear() === year &&
    date.getMonth() + 1 === month &&
    date.getDate() === day
  );
};

// ======================================================
// Helper: Check Class Admin's assigned class
// ======================================================
const verifyClassAdminAccess = (req, classId) => {
  if (req.user.role !== "class_admin") {
    return true;
  }

  if (!req.user.assignedClass) {
    return false;
  }

  return (
    String(req.user.assignedClass) ===
    String(classId)
  );
};

// ======================================================
// MARK ATTENDANCE
// POST /api/attendance/mark
// Class Admin only
// ======================================================
const markAttendance = async (req, res) => {
  try {
    const {
      studentId,
      classId,
      status,
      source = "manual",
      confidence,
      remarks,
    } = req.body;

    // --------------------------------------------------
    // 1. Only Class Admin can mark attendance
    // --------------------------------------------------
    if (req.user.role !== "class_admin") {
      return res.status(403).json({
        success: false,
        message: "Only Class Admin can mark attendance.",
      });
    }

    // --------------------------------------------------
    // 2. Required fields
    // --------------------------------------------------
    if (!studentId || !classId || !status) {
      return res.status(400).json({
        success: false,
        message:
          "studentId, classId and status are required.",
      });
    }

    // --------------------------------------------------
    // 3. Validate status
    // --------------------------------------------------
    const validStatuses = [
      "present",
      "absent",
      "late",
      "leave",
      "holiday",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid attendance status. Allowed values: ${validStatuses.join(
          ", "
        )}`,
      });
    }

    // --------------------------------------------------
    // 4. Validate source
    // --------------------------------------------------
    const validSources = [
      "manual",
      "face_recognition",
    ];

    if (!validSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance source.",
      });
    }

    // --------------------------------------------------
    // 5. Check Class Admin's assigned class
    // --------------------------------------------------
    if (!verifyClassAdminAccess(req, classId)) {
      return res.status(403).json({
        success: false,
        message:
          "You can only mark attendance for your assigned class.",
      });
    }

    // --------------------------------------------------
    // 6. Verify class exists and is active
    // --------------------------------------------------
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    if (!classData.isActive) {
      return res.status(400).json({
        success: false,
        message: "This class is inactive.",
      });
    }

    // --------------------------------------------------
    // 7. Verify student
    // --------------------------------------------------
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    if (!student.isActive) {
      return res.status(400).json({
        success: false,
        message: "This student is inactive.",
      });
    }

    // --------------------------------------------------
    // 8. Student's actual class must match classId
    // --------------------------------------------------
    if (
      !student.class ||
      String(student.class) !== String(classId)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Student does not belong to this class.",
      });
    }

    // --------------------------------------------------
    // 9. Face recognition confidence validation
    // --------------------------------------------------
    if (source === "face_recognition") {
      if (
        confidence === undefined ||
        confidence === null ||
        typeof confidence !== "number"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Confidence value is required for face recognition attendance.",
        });
      }

      if (confidence < 0 || confidence > 100) {
        return res.status(400).json({
          success: false,
          message:
            "Confidence must be between 0 and 100.",
        });
      }
    }

    // --------------------------------------------------
    // 10. Get normalized attendance date
    // --------------------------------------------------
    const attendanceDate = getAttendanceDate();

    // --------------------------------------------------
    // 11. Check duplicate attendance
    // --------------------------------------------------
    const existingAttendance =
      await Attendance.findOne({
        student: studentId,
        date: attendanceDate,
      });

    if (existingAttendance) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance has already been marked for this student today.",
        data: {
          attendanceId: existingAttendance._id,
          status: existingAttendance.status,
          source: existingAttendance.source,
          markedAt: existingAttendance.markedAt,
        },
      });
    }

    // --------------------------------------------------
    // 12. Create attendance
    // --------------------------------------------------
    let attendance;

    try {
      attendance = await Attendance.create({
        student: studentId,
        class: classId,

        // Normalized calendar date
        date: attendanceDate,

        // Actual time attendance was marked
        markedAt: new Date(),

        status,
        source,
        confidence:
          source === "face_recognition"
            ? confidence
            : null,
        markedBy: req.user.userId,
        remarks: remarks || null,
        originalStatus: status,
        isCorrected: false,
      });
    } catch (error) {
      // ------------------------------------------------
      // Handle duplicate-key race condition
      // ------------------------------------------------
      if (error.code === 11000) {
        return res.status(409).json({
          success: false,
          message:
            "Attendance has already been marked for this student today.",
        });
      }

      throw error;
    }

    // --------------------------------------------------
    // 13. Create audit log
    // --------------------------------------------------
    await createAuditLog({
      user: req.user.userId,
      role: req.user.role,
      action: "attendance_marked",
      module: "attendance",
      description: `Attendance marked as ${attendance.status}.`,
      targetType: "attendance",
      targetId: attendance._id,
      metadata: {
        studentId: attendance.student,
        classId: attendance.class,
        status: attendance.status,
        source: attendance.source,
        confidence: attendance.confidence,
      },
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // --------------------------------------------------
    // 14. Populate response
    // --------------------------------------------------
    const populatedAttendance =
      await Attendance.findById(
        attendance._id
      )
        .populate({
          path: "student",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        );

    return res.status(201).json({
      success: true,
      message: "Attendance marked successfully.",
      data: populatedAttendance,
    });
  } catch (error) {
    console.error(
      "Mark Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to mark attendance.",
      error: error.message,
    });
  }
};

// ======================================================
// GET TODAY'S ATTENDANCE
// GET /api/attendance/today
// Super Admin + Class Admin
// ======================================================
const getTodayAttendance = async (req, res) => {
  try {
    const attendanceDate =
      getAttendanceDate();

    let query = {
      date: attendanceDate,
    };

    // --------------------------------------------------
    // Class Admin -> only assigned class
    // --------------------------------------------------
    if (req.user.role === "class_admin") {
      if (!req.user.assignedClass) {
        return res.status(403).json({
          success: false,
          message:
            "No class is assigned to this Class Admin.",
        });
      }

      query.class = req.user.assignedClass;
    }

    // --------------------------------------------------
    // Super Admin -> all classes
    // --------------------------------------------------
    const attendance =
      await Attendance.find(query)
        .populate({
          path: "student",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        )
        .sort({ markedAt: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      data: attendance,
    });
  } catch (error) {
    console.error(
      "Get Today Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch today's attendance.",
      error: error.message,
    });
  }
};

// ======================================================
// GET ATTENDANCE BY DATE
// GET /api/attendance/by-date?date=YYYY-MM-DD
// Super Admin + Class Admin
// ======================================================
const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    // --------------------------------------------------
    // Validate date
    // --------------------------------------------------
    if (!date) {
      return res.status(400).json({
        success: false,
        message:
          "Date is required. Use YYYY-MM-DD format.",
      });
    }

    if (!isValidDateString(date)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid date. Use a valid YYYY-MM-DD date.",
      });
    }

    // --------------------------------------------------
    // Convert requested date to normalized date
    // --------------------------------------------------
    const selectedDate = getAttendanceDate(
      new Date(`${date}T00:00:00`)
    );

    // --------------------------------------------------
    // Query normalized date
    // --------------------------------------------------
    let query = {
      date: selectedDate,
    };

    // --------------------------------------------------
    // Class Admin -> only assigned class
    // --------------------------------------------------
    if (req.user.role === "class_admin") {
      if (!req.user.assignedClass) {
        return res.status(403).json({
          success: false,
          message:
            "No class is assigned to this Class Admin.",
        });
      }

      query.class = req.user.assignedClass;
    }

    const attendance =
      await Attendance.find(query)
        .populate({
          path: "student",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        )
        .sort({ markedAt: -1 });

    return res.status(200).json({
      success: true,
      count: attendance.length,
      date,
      data: attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance By Date Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch attendance.",
      error: error.message,
    });
  }
};

// ======================================================
// GET STUDENT ATTENDANCE
// GET /api/attendance/student/:studentId
// Super Admin + Class Admin
// ======================================================
const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    // --------------------------------------------------
    // Find student
    // --------------------------------------------------
    const student =
      await Student.findById(studentId)
        .populate(
          "class",
          "name section academicYear"
        );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found.",
      });
    }

    // --------------------------------------------------
    // Class Admin -> only assigned class
    // --------------------------------------------------
    if (req.user.role === "class_admin") {
      if (!req.user.assignedClass) {
        return res.status(403).json({
          success: false,
          message:
            "No class is assigned to this Class Admin.",
        });
      }

      if (
        String(student.class?._id) !==
        String(req.user.assignedClass)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only view attendance of students in your assigned class.",
        });
      }
    }

    // --------------------------------------------------
    // Get attendance
    // --------------------------------------------------
    const attendance =
      await Attendance.find({
        student: studentId,
      })
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        )
        .sort({ date: -1 });

    // --------------------------------------------------
    // Calculate statistics
    // --------------------------------------------------
    const total = attendance.length;

    const present = attendance.filter(
      (record) =>
        record.status === "present"
    ).length;

    const absent = attendance.filter(
      (record) =>
        record.status === "absent"
    ).length;

    const late = attendance.filter(
      (record) =>
        record.status === "late"
    ).length;

    const leave = attendance.filter(
      (record) =>
        record.status === "leave"
    ).length;

    const holiday = attendance.filter(
      (record) =>
        record.status === "holiday"
    ).length;

    // Holidays are not counted as attendance days
    const attendanceDays =
      total - holiday;

    // Present + Late count as attended
    const attendancePercentage =
      attendanceDays > 0
        ? Number(
            (
              ((present + late) /
                attendanceDays) *
              100
            ).toFixed(2)
          )
        : 0;

    return res.status(200).json({
      success: true,
      data: {
        student: {
          id: student._id,
          class: student.class,
        },

        statistics: {
          total,
          present,
          absent,
          late,
          leave,
          holiday,
          attendancePercentage,
        },

        attendance,
      },
    });
  } catch (error) {
    console.error(
      "Get Student Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch student attendance.",
      error: error.message,
    });
  }
};

// ======================================================
// UPDATE ATTENDANCE
// PUT /api/attendance/:id
// Class Admin only
// ======================================================
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      correctionReason,
      remarks,
    } = req.body;

    // --------------------------------------------------
    // 1. Only Class Admin can correct attendance
    // --------------------------------------------------
    if (req.user.role !== "class_admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only Class Admin can update attendance.",
      });
    }

    // --------------------------------------------------
    // 2. Find attendance
    // --------------------------------------------------
    const attendance =
      await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message:
          "Attendance record not found.",
      });
    }

    // --------------------------------------------------
    // 3. Check Class Admin assignment
    // --------------------------------------------------
    if (!req.user.assignedClass) {
      return res.status(403).json({
        success: false,
        message:
          "No class is assigned to this Class Admin.",
      });
    }

    if (
      String(attendance.class) !==
      String(req.user.assignedClass)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You can only update attendance for your assigned class.",
      });
    }

    // --------------------------------------------------
    // 4. Verify class is active
    // --------------------------------------------------
    const classData =
      await Class.findOne({
        _id: attendance.class,
        isActive: true,
      });

    if (!classData) {
      return res.status(400).json({
        success: false,
        message:
          "The class associated with this attendance is inactive.",
      });
    }

    // --------------------------------------------------
    // 5. Validate status
    // --------------------------------------------------
    if (status !== undefined) {
      const validStatuses = [
        "present",
        "absent",
        "late",
        "leave",
        "holiday",
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid attendance status.",
        });
      }
    }

    // --------------------------------------------------
    // 6. Track whether status actually changed
    // --------------------------------------------------
    const statusChanged =
      status !== undefined &&
      status !== attendance.status;

    // --------------------------------------------------
    // 7. Correction reason required
    // --------------------------------------------------
    if (statusChanged) {
      if (
        !correctionReason ||
        correctionReason.trim().length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Correction reason is required when changing attendance status.",
        });
      }

      // Save original status only once
      if (!attendance.originalStatus) {
        attendance.originalStatus =
          attendance.status;
      }

      attendance.status = status;

      attendance.correctionReason =
        correctionReason.trim();

      attendance.isCorrected = true;

      attendance.markedBy =
        req.user.userId;
    }

    // --------------------------------------------------
    // 8. Update remarks
    // --------------------------------------------------
    if (remarks !== undefined) {
      attendance.remarks = remarks;
    }

    // --------------------------------------------------
    // 9. Save changes
    // --------------------------------------------------
    await attendance.save();

    // --------------------------------------------------
    // 10. Create audit log only after successful update
    // --------------------------------------------------
    if (statusChanged || remarks !== undefined) {
      await createAuditLog({
        user: req.user.userId,
        role: req.user.role,
        action: "attendance_updated",
        module: "attendance",
        description: statusChanged
          ? `Attendance status updated from ${attendance.originalStatus} to ${attendance.status}.`
          : "Attendance remarks updated.",
        targetType: "attendance",
        targetId: attendance._id,
        metadata: {
          attendanceId: attendance._id,
          studentId: attendance.student,
          classId: attendance.class,
          previousStatus:
            statusChanged
              ? attendance.originalStatus
              : attendance.status,
          newStatus: attendance.status,
          correctionReason:
            attendance.correctionReason,
          remarks: attendance.remarks,
        },
        ipAddress: req.ip,
        userAgent: req.get("user-agent"),
      });
    }

    // --------------------------------------------------
    // 11. Populate updated record
    // --------------------------------------------------
    const updatedAttendance =
      await Attendance.findById(
        attendance._id
      )
        .populate({
          path: "student",
          populate: {
            path: "user",
            select: "name email",
          },
        })
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        );

    return res.status(200).json({
      success: true,
      message:
        "Attendance updated successfully.",
      data: updatedAttendance,
    });
  } catch (error) {
    console.error(
      "Update Attendance Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update attendance.",
      error: error.message,
    });
  }
};

// ======================================================
// EXPORTS
// ======================================================
module.exports = {
  markAttendance,
  getTodayAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  updateAttendance,
};