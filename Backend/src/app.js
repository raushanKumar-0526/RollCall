const express = require("express");
const cors = require("cors");

const protect = require("./middleware/auth.middleware");
const authorizeRoles = require("./middleware/role.middleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RollCall Backend API is running",
  });
});

// Protected test route
app.get("/api/test/protected", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

// Super Admin test route
app.get(
  "/api/test/super-admin",
  protect,
  authorizeRoles("super_admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Super Admin route accessed successfully",
      user: req.user,
    });
  }
);

// Class Admin test route
app.get(
  "/api/test/class-admin",
  protect,
  authorizeRoles("class_admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Class Admin route accessed successfully",
      user: req.user,
    });
  }
);

module.exports = app;