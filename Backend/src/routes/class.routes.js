const express = require("express");

const {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
} = require("../controllers/class.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// =====================================================
// SUPER ADMIN ROUTES
// =====================================================

// Create class
router.post(
  "/",
  protect,
  authorizeRoles("super_admin"),
  createClass
);

// Get all classes
router.get(
  "/",
  protect,
  authorizeRoles("super_admin"),
  getAllClasses
);

// Update class
router.put(
  "/:id",
  protect,
  authorizeRoles("super_admin"),
  updateClass
);

// Deactivate class
router.delete(
  "/:id",
  protect,
  authorizeRoles("super_admin"),
  deleteClass
);

// =====================================================
// SUPER ADMIN + CLASS ADMIN
// =====================================================

// Get individual class
router.get(
  "/:id",
  protect,
  authorizeRoles("super_admin", "class_admin"),
  getClassById
);

module.exports = router;