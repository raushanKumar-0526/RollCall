const express = require("express");
const multer = require("multer");

const {
  recognizeAndMarkAttendance,
} = require("../controllers/faceRecognition.controller");

const protect = require("../middleware/auth.middleware");
const authorizeRoles = require("../middleware/role.middleware");

const router = express.Router();

// Store uploaded image temporarily in memory
const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
  
    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
    ];
  
    const extension = file.originalname
      .toLowerCase()
      .substring(file.originalname.lastIndexOf("."));
  
    if (
      allowedMimeTypes.includes(file.mimetype) ||
      allowedExtensions.includes(extension)
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Only JPG, JPEG, PNG and WEBP image files are allowed."
        ),
        false
      );
    }
  },
});

router.post(
  "/recognize-and-mark",
  protect,
  authorizeRoles("class_admin"),
  upload.single("image"),
  recognizeAndMarkAttendance
);

module.exports = router;