const express = require("express");

const {
  startFaceEnrollment,
  completeFaceEnrollment,
  getFaceEnrollment,
  deleteFaceEnrollment,
} = require("../controllers/faceEnrollment.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// Start enrollment
router.post(
  "/start",
  protect,
  authorizeRoles("class_admin"),
  startFaceEnrollment
);

// Complete enrollment
router.post(
  "/complete",
  protect,
  authorizeRoles("class_admin"),
  completeFaceEnrollment
);

// Get enrollment status
router.get(
  "/:studentId",
  protect,
  authorizeRoles("class_admin"),
  getFaceEnrollment
);

// Reset enrollment
router.delete(
  "/:studentId",
  protect,
  authorizeRoles("class_admin"),
  deleteFaceEnrollment
);

module.exports = router;