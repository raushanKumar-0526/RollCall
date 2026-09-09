const express = require("express");

const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require("../controllers/student.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// Create student
router.post(
  "/",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  createStudent
);

// Get all students
router.get(
  "/",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getAllStudents
);

// Get student by ID
router.get(
  "/:id",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getStudentById
);

// Update student
router.put(
  "/:id",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  updateStudent
);

// Deactivate student
router.delete(
  "/:id",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  deleteStudent
);

module.exports = router;