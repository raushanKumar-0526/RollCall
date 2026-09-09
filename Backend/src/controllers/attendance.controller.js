const Attendance = require("../models/Attendance.model");
const Student = require("../models/Student.model");
const Class = require("../models/class.model");

// =====================================================
// HELPER
// Check whether a Class Admin owns the class
// =====================================================

const verifyClassAdminAccess = async (userId, classId) => {
  const classData = await Class.findOne({
    _id: classId,
    classTeacher: userId,
    isActive: true,
  });

  return classData;
};

// =====================================================
// MARK ATTENDANCE
// Class Admin only
// Used for manual OR face recognition attendance
// =====================================================

const markAttendance = async (req, res) => {
  try {
    const {
      studentId,
      classId,
      status,
      source,
      confidence,
      remarks,
    } = req.body;

    // -------------------------------------------------
    // Validate required fields
    // -------------------------------------------------

    if (!studentId || !classId || !status || !source) {
      return res.status(400).json({
        success: false,
        message:
          "Student, class, status and source are required",
      });
    }

    // -------------------------------------------------
    // Validate status
    // -------------------------------------------------

    const allowedStatuses = [
      "present",
      "absent",
      "late",
      "leave",
      "holiday",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance status",
      });
    }

    // -------------------------------------------------
    // Validate source
    // -------------------------------------------------

    const allowedSources = [
      "face_recognition",
      "manual",
    ];

    if (!allowedSources.includes(source)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance source",
      });
    }

    // -------------------------------------------------
    // Only Class Admin can mark attendance
    // -------------------------------------------------

    if (req.user.role !== "class_admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only Class Admin can mark attendance",
      });
    }

    // -------------------------------------------------
    // Verify Class Admin's assigned class
    // -------------------------------------------------

    const classData = await verifyClassAdminAccess(
      req.user.userId,
      classId
    );

    if (!classData) {
      return res.status(403).json({
        success: false,
        message:
          "You can only mark attendance for your assigned class",
      });
    }

    // -------------------------------------------------
    // Find student
    // -------------------------------------------------

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // -------------------------------------------------
    // Verify student belongs to selected class
    // -------------------------------------------------

    if (String(student.class) !== String(classId)) {
      return res.status(403).json({
        success: false,
        message:
          "Student does not belong to this class",
      });
    }

    // -------------------------------------------------
    // Check active student
    // -------------------------------------------------

    if (!student.isActive) {
      return res.status(400).json({
        success: false,
        message: "Student account is inactive",
      });
    }

    // -------------------------------------------------
    // Date handling
    // -------------------------------------------------

    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    // -------------------------------------------------
    // Duplicate attendance check
    // -------------------------------------------------

    const existingAttendance =
      await Attendance.findOne({
        student: studentId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });

    if (existingAttendance) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance has already been marked for this student today",
        attendance: existingAttendance,
      });
    }

    // -------------------------------------------------
    // Face recognition validation
    // -------------------------------------------------

    if (source === "face_recognition") {
      if (
        confidence === undefined ||
        confidence === null
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Confidence score is required for face recognition attendance",
        });
      }

      if (
        typeof confidence !== "number" ||
        confidence < 0 ||
        confidence > 100
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Confidence must be a number between 0 and 100",
        });
      }
    }

    // -------------------------------------------------
    // Create attendance
    // -------------------------------------------------

    const attendance = await Attendance.create({
      student: studentId,
      class: classId,
      date: startOfDay,
      status,
      markedAt: now,
      source,
      confidence:
        source === "face_recognition"
          ? confidence
          : null,
      markedBy: req.user.userId,
      remarks: remarks || "",
    });

    // -------------------------------------------------
    // Populate response
    // -------------------------------------------------

    const populatedAttendance =
      await Attendance.findById(attendance._id)
        .populate(
          "student",
          "rollNumber admissionNumber"
        )
        .populate(
          {
            path: "student",
            populate: {
              path: "user",
              select: "name email",
            },
          }
        )
        .populate(
          "class",
          "name section academicYear"
        )
        .populate(
          "markedBy",
          "name email role"
        );

    res.status(201).json({
      success: true,
      message: "Attendance marked successfully",
      attendance: populatedAttendance,
    });
  } catch (error) {
    console.error(
      "Mark Attendance Error:",
      error
    );

    // Handle MongoDB duplicate key
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "Attendance has already been marked for this student today",
      });
    }

    res.status(500).json({
      success: false,
      message:
        "Server error while marking attendance",
    });
  }
};

// =====================================================
// GET TODAY'S ATTENDANCE
// Class Admin → assigned class
// Super Admin → all classes
// =====================================================

const getTodayAttendance = async (req, res) => {
  try {
    const now = new Date();

    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    let filter = {
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    // Class Admin → assigned class only
    if (req.user.role === "class_admin") {
      const assignedClass =
        await Class.findOne({
          classTeacher: req.user.userId,
          isActive: true,
        });

      if (!assignedClass) {
        return res.status(404).json({
          success: false,
          message:
            "No active class is assigned to you",
        });
      }

      filter.class = assignedClass._id;
    }

    const attendance =
      await Attendance.find(filter)
        .populate(
          "student",
          "rollNumber admissionNumber"
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
        )
        .sort({
          markedAt: -1,
        });

    res.status(200).json({
      success: true,
      date: startOfDay,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get Today Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching today's attendance",
    });
  }
};

// =====================================================
// GET ATTENDANCE BY DATE
// =====================================================

const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date is required",
      });
    }

    const selectedDate = new Date(date);

    if (isNaN(selectedDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    let filter = {
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    };

    // Class Admin → assigned class only
    if (req.user.role === "class_admin") {
      const assignedClass =
        await Class.findOne({
          classTeacher: req.user.userId,
          isActive: true,
        });

      if (!assignedClass) {
        return res.status(404).json({
          success: false,
          message:
            "No active class is assigned to you",
        });
      }

      filter.class = assignedClass._id;
    }

    const attendance =
      await Attendance.find(filter)
        .populate(
          "student",
          "rollNumber admissionNumber"
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
        )
        .sort({
          markedAt: -1,
        });

    res.status(200).json({
      success: true,
      date: startOfDay,
      count: attendance.length,
      attendance,
    });
  } catch (error) {
    console.error(
      "Get Attendance By Date Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching attendance",
    });
  }
};

// =====================================================
// GET STUDENT ATTENDANCE
// =====================================================

const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;

    const student =
      await Student.findById(studentId)
        .populate(
          "user",
          "name email"
        )
        .populate(
          "class",
          "name section academicYear classTeacher"
        );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Class Admin scope
    if (req.user.role === "class_admin") {
      if (
        !student.class ||
        String(student.class.classTeacher) !==
          String(req.user.userId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only view attendance for students in your assigned class",
        });
      }
    }

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
        .sort({
          date: -1,
        });

    // Calculate statistics
    const totalDays = attendance.length;

    const presentDays = attendance.filter(
      (record) =>
        record.status === "present"
    ).length;

    const absentDays = attendance.filter(
      (record) =>
        record.status === "absent"
    ).length;

    const lateDays = attendance.filter(
      (record) =>
        record.status === "late"
    ).length;

    const leaveDays = attendance.filter(
      (record) =>
        record.status === "leave"
    ).length;

    const percentage =
      totalDays > 0
        ? Number(
            (
              ((presentDays + lateDays) /
                totalDays) *
              100
            ).toFixed(2)
          )
        : 0;

    res.status(200).json({
      success: true,
      student,
      statistics: {
        totalDays,
        presentDays,
        absentDays,
        lateDays,
        leaveDays,
        attendancePercentage: percentage,
      },
      attendance,
    });
  } catch (error) {
    console.error(
      "Get Student Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while fetching student attendance",
    });
  }
};

// =====================================================
// UPDATE ATTENDANCE
// Class Admin only
// Used for manual correction
// =====================================================

const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      status,
      correctionReason,
      remarks,
    } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Attendance status is required",
      });
    }

    const allowedStatuses = [
      "present",
      "absent",
      "late",
      "leave",
      "holiday",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid attendance status",
      });
    }

    // Only Class Admin can modify attendance
    if (req.user.role !== "class_admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only Class Admin can modify attendance",
      });
    }

    const attendance =
      await Attendance.findById(id);

    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: "Attendance record not found",
      });
    }

    // Verify assigned class
    const assignedClass =
      await Class.findOne({
        _id: attendance.class,
        classTeacher: req.user.userId,
        isActive: true,
      });

    if (!assignedClass) {
      return res.status(403).json({
        success: false,
        message:
          "You can only modify attendance for your assigned class",
      });
    }

    const oldStatus = attendance.status;

    // Save original status only on first modification
    if (!attendance.isModified) {
      attendance.originalStatus = oldStatus;
    }

    attendance.status = status;
    attendance.isModified = true;
    attendance.correctionReason =
      correctionReason || null;

    if (remarks !== undefined) {
      attendance.remarks = remarks;
    }

    attendance.markedBy = req.user.userId;

    await attendance.save();

    const updatedAttendance =
      await Attendance.findById(id)
        .populate(
          "student",
          "rollNumber admissionNumber"
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

    res.status(200).json({
      success: true,
      message:
        "Attendance updated successfully",
      attendance: updatedAttendance,
    });
  } catch (error) {
    console.error(
      "Update Attendance Error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Server error while updating attendance",
    });
  }
};

module.exports = {
  markAttendance,
  getTodayAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  updateAttendance,
};