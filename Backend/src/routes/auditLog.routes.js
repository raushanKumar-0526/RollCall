const express = require("express");

const {
  getAuditLogs,
  getAuditLogById,
} = require("../controllers/auditLog.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// =====================================================
// GET ALL AUDIT LOGS
// Super Admin ONLY
// =====================================================

router.get(
  "/",
  protect,
  authorizeRoles("super_admin"),
  getAuditLogs
);

// =====================================================
// GET SINGLE AUDIT LOG
// Super Admin ONLY
// =====================================================

router.get(
  "/:id",
  protect,
  authorizeRoles("super_admin"),
  getAuditLogById
);

module.exports = router;