const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    // ==========================================
    // 1. Check Authorization Header
    // ==========================================

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required. Please provide a valid token.",
      });
    }

    // ==========================================
    // 2. Validate Bearer format
    // ==========================================

    const parts = authHeader.trim().split(/\s+/);

    if (
      parts.length !== 2 ||
      parts[0].toLowerCase() !== "bearer" ||
      !parts[1]
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authorization format. Use: Bearer <token>.",
      });
    }

    const token = parts[1];

    // ==========================================
    // 3. Check JWT Secret
    // ==========================================

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured.");

      return res.status(500).json({
        success: false,
        message: "Authentication configuration error.",
      });
    }

    // ==========================================
    // 4. Verify JWT
    // ==========================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // ==========================================
    // 5. Validate decoded user ID
    // ==========================================

    if (!decoded.userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // ==========================================
    // 6. Find current user in database
    // ==========================================

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // ==========================================
    // 7. Check account status
    // ==========================================

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive.",
      });
    }

    // ==========================================
    // 8. Attach CURRENT user information
    // ==========================================

    req.user = {
      userId: user._id,
      role: user.role,
      assignedClass: user.assignedClass,
    };

    // ==========================================
    // 9. Continue
    // ==========================================

    next();
  } catch (error) {
    console.error(
      "Authentication Error:",
      error.message
    );

    // ==========================================
    // Expired Token
    // ==========================================

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message:
          "Token has expired. Please login again.",
      });
    }

    // ==========================================
    // Invalid / Malformed Token
    // ==========================================

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    // ==========================================
    // Other Errors
    // ==========================================

    return res.status(401).json({
      success: false,
      message: "Authentication failed.",
    });
  }
};

module.exports = protect;