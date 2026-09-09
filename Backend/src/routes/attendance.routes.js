const express = require("express");

const {
  markAttendance,
  getTodayAttendance,
  getAttendanceByDate,
  getStudentAttendance,
  updateAttendance,
} = require("../controllers/attendance.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// =====================================================
// MARK ATTENDANCE
// Class Admin ONLY
// =====================================================

router.post(
  "/mark",
  protect,
  authorizeRoles("class_admin"),
  markAttendance
);

// =====================================================
// GET TODAY'S ATTENDANCE
// Super Admin + Class Admin
// =====================================================

router.get(
  "/today",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getTodayAttendance
);

// =====================================================
// GET ATTENDANCE BY DATE
// Super Admin + Class Admin
// =====================================================

router.get(
  "/by-date",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getAttendanceByDate
);

// =====================================================
// GET STUDENT ATTENDANCE
// Super Admin + Class Admin
// =====================================================

router.get(
  "/student/:studentId",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getStudentAttendance
);

// =====================================================
// UPDATE ATTENDANCE
// Class Admin ONLY
// =====================================================

router.put(
  "/:id",
  protect,
  authorizeRoles("class_admin"),
  updateAttendance
);

module.exports = router;