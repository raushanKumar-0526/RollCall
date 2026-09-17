const mongoose = require("mongoose");

const AuditLog = require("../models/AuditLog.model");

// =====================================================
// CREATE AUDIT LOG
// Internal function used by other controllers
// =====================================================

const createAuditLog = async ({
  user,
  role,
  action,
  module,
  description,
  targetType = null,
  targetId = null,
  metadata = {},
  ipAddress = null,
  userAgent = null,
}) => {
  try {
    const auditLog = await AuditLog.create({
      user,
      role,
      action,
      module,
      description,
      targetType,
      targetId,
      metadata,
      ipAddress,
      userAgent,
    });

    return auditLog;
  } catch (error) {
    console.error("Create Audit Log Error:", error.message);

    // Audit failure must not break
    // the main business operation.
    return null;
  }
};

// =====================================================
// GET ALL AUDIT LOGS
// Super Admin ONLY
// =====================================================

const getAuditLogs = async (req, res) => {
  try {
    const {
      action,
      module,
      role,
      search,
      page = 1,
      limit = 20,
    } = req.query;

    const filter = {};

    // -------------------------------------------------
    // Filters
    // -------------------------------------------------

    if (action) {
      filter.action = action;
    }

    if (module) {
      filter.module = module;
    }

    if (role) {
      filter.role = role;
    }

    // -------------------------------------------------
    // Pagination
    // -------------------------------------------------

    const pageNumber = Math.max(Number(page) || 1, 1);

    const limitNumber = Math.min(
      Math.max(Number(limit) || 20, 1),
      100
    );

    const skip = (pageNumber - 1) * limitNumber;

    // -------------------------------------------------
    // Search user name/email/description
    // -------------------------------------------------

    if (search && search.trim()) {
      const User = require("../models/user.model");

      const searchText = search.trim();

      const users = await User.find({
        $or: [
          {
            name: {
              $regex: searchText,
              $options: "i",
            },
          },
          {
            email: {
              $regex: searchText,
              $options: "i",
            },
          },
        ],
      }).select("_id");

      const userIds = users.map((user) => user._id);

      filter.$or = [
        {
          user: {
            $in: userIds,
          },
        },
        {
          description: {
            $regex: searchText,
            $options: "i",
          },
        },
      ];
    }

    // -------------------------------------------------
    // Fetch logs + total count
    // -------------------------------------------------

    const [logs, total] = await Promise.all([
      AuditLog.find(filter)
        .populate("user", "name email role")
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limitNumber),

      AuditLog.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      count: logs.length,
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
      logs,
    });
  } catch (error) {
    console.error("Get Audit Logs Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching audit logs.",
    });
  }
};

// =====================================================
// GET SINGLE AUDIT LOG
// Super Admin ONLY
// =====================================================

const getAuditLogById = async (req, res) => {
  try {
    const { id } = req.params;

    // -------------------------------------------------
    // Validate MongoDB ObjectId
    // -------------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid audit log ID.",
      });
    }

    const log = await AuditLog.findById(id).populate(
      "user",
      "name email role"
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Audit log not found.",
      });
    }

    return res.status(200).json({
      success: true,
      log,
    });
  } catch (error) {
    console.error("Get Audit Log Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while fetching audit log.",
    });
  }
};

module.exports = {
  createAuditLog,
  getAuditLogs,
  getAuditLogById,
};