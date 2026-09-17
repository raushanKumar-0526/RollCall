const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const Class = require("../models/class.model");


const {
  createAuditLog,
} = require("./auditLog.controller");


// Generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// =====================================================
// REGISTER USER
// =====================================================

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
    } = req.body;

    // ==========================================
    // 1. Validate required fields
    // ==========================================

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Name, email, password and role are required",
      });
    }

    // ==========================================
    // 2. Clean input
    // ==========================================

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return res.status(400).json({
        success: false,
        message: "Name cannot be empty",
      });
    }

    // ==========================================
    // 3. Validate email
    // ==========================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ==========================================
    // 4. Validate password
    // ==========================================

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // ==========================================
    // 5. Public registration roles
    // ==========================================
    // IMPORTANT:
    // super_admin and class_admin cannot be
    // created through public registration.

    const allowedPublicRoles = [
      "student",
      "parent",
    ];

    if (!allowedPublicRoles.includes(role)) {
      return res.status(403).json({
        success: false,
        message:
          "This role cannot be created through public registration.",
      });
    }

    // ==========================================
    // 6. Check existing user
    // ==========================================

    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // ==========================================
    // 7. Hash password
    // ==========================================

    const hashedPassword = await bcrypt.hash(password, 10);

    // ==========================================
    // 8. Create user
    // ==========================================

    const user = await User.create({
      name: cleanName,
      email: cleanEmail,
      password: hashedPassword,
      role,
      phone: phone ? phone.trim() : undefined,
    });

    // ==========================================
    // 9. Generate JWT
    // ==========================================

    const token = generateToken(
      user._id,
      user.role
    );

    // ==========================================
    // 10. Response
    // ==========================================

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
      },
    });
  } catch (error) {
    console.error("Register User Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================

const loginUser = async (req, res) => {
  try {
    const {
      email,
      password,
    } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check account status
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Your account is inactive",
      });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    await createAuditLog({
      user: user._id,
      role: user.role,
      action: "login",
      module: "authentication",
      description: `${user.name} logged in successfully.`,
      targetType: "user",
      targetId: user._id,
      metadata: {
        email: user.email,
      },
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // Generate JWT
    const token = generateToken(user._id, user.role);

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profileImage: user.profileImage,
        assignedClass: user.assignedClass,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
      },
    });
  } catch (error) {
    console.error("Login User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while logging in",
    });
  }
};

// =====================================================
// GET CURRENT USER
// =====================================================

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .populate("assignedClass");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get Current User Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching user",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};