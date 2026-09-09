const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const Student = require("../models/Student.model");
const Class = require("../models/class.model");

// =====================================================
// CREATE STUDENT
// Super Admin + Class Admin
// =====================================================

const createStudent = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      rollNumber,
      admissionNumber,
      dateOfBirth,
      gender,
      phone,
      classId,
      emergencyContact,
    } = req.body;

    // -----------------------------------------------
    // Validate required fields
    // -----------------------------------------------

    if (!name || !email || !password || !rollNumber || !classId) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, password, roll number and class are required",
      });
    }

    // -----------------------------------------------
    // Check class
    // -----------------------------------------------

    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    if (!classData.isActive) {
      return res.status(400).json({
        success: false,
        message: "Cannot add student to an inactive class",
      });
    }

    // -----------------------------------------------
    // Class Admin scope check
    // -----------------------------------------------

    if (req.user.role === "class_admin") {
      if (
        String(classData.classTeacher) !==
        String(req.user.userId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only add students to your assigned class",
        });
      }
    }

    // -----------------------------------------------
    // Check existing email
    // -----------------------------------------------

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    // -----------------------------------------------
    // Check duplicate roll number
    // -----------------------------------------------

    const existingStudent = await Student.findOne({
      class: classId,
      rollNumber: rollNumber.toUpperCase(),
    });

    if (existingStudent) {
      return res.status(409).json({
        success: false,
        message:
          "This roll number already exists in this class",
      });
    }

    // -----------------------------------------------
    // Hash password
    // -----------------------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // -----------------------------------------------
    // Create User account
    // -----------------------------------------------

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "student",
      phone,
    });

    // -----------------------------------------------
    // Create Student record
    // -----------------------------------------------

    const student = await Student.create({
      user: user._id,
      rollNumber: rollNumber.toUpperCase(),
      admissionNumber,
      dateOfBirth,
      gender,
      phone,
      class: classId,
      emergencyContact,
    });

    // -----------------------------------------------
    // Add student to Class
    // -----------------------------------------------

    classData.students.push(student._id);

    await classData.save();

    // -----------------------------------------------
    // Return populated student
    // -----------------------------------------------

    const populatedStudent = await Student.findById(student._id)
      .populate("user", "name email phone role")
      .populate(
        "class",
        "name section academicYear"
      );

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student: populatedStudent,
    });
  } catch (error) {
    console.error("Create Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating student",
    });
  }
};

// =====================================================
// GET ALL STUDENTS
// Super Admin → All students
// Class Admin → Assigned class only
// =====================================================

const getAllStudents = async (req, res) => {
  try {
    let filter = {};

    // Class Admin can only see assigned class
    if (req.user.role === "class_admin") {
      const assignedClass = await Class.findOne({
        classTeacher: req.user.userId,
        isActive: true,
      });

      if (!assignedClass) {
        return res.status(404).json({
          success: false,
          message: "No active class is assigned to you",
        });
      }

      filter.class = assignedClass._id;
    }

    const students = await Student.find(filter)
      .populate(
        "user",
        "name email phone profileImage isActive"
      )
      .populate(
        "class",
        "name section academicYear"
      )
      .sort({
        rollNumber: 1,
      });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    console.error("Get All Students Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching students",
    });
  }
};

// =====================================================
// GET STUDENT BY ID
// =====================================================

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id)
      .populate(
        "user",
        "name email phone profileImage isActive"
      )
      .populate(
        "class",
        "name section academicYear classTeacher"
      );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // -----------------------------------------------
    // Class Admin scope check
    // -----------------------------------------------

    if (req.user.role === "class_admin") {
      if (
        !student.class ||
        String(student.class.classTeacher) !==
          String(req.user.userId)
      ) {
        return res.status(403).json({
          success: false,
          message:
            "You can only access students from your assigned class",
        });
      }
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    console.error("Get Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching student",
    });
  }
};

// =====================================================
// UPDATE STUDENT
// Super Admin + Class Admin
// =====================================================

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      email,
      phone,
      rollNumber,
      admissionNumber,
      dateOfBirth,
      gender,
      classId,
      emergencyContact,
      isActive,
    } = req.body;

    // -----------------------------------------------
    // Find student
    // -----------------------------------------------

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // -----------------------------------------------
    // Class Admin scope check
    // -----------------------------------------------

    if (req.user.role === "class_admin") {
      const assignedClass = await Class.findOne({
        _id: student.class,
        classTeacher: req.user.userId,
      });

      if (!assignedClass) {
        return res.status(403).json({
          success: false,
          message:
            "You can only update students from your assigned class",
        });
      }
    }

    // -----------------------------------------------
    // Update User information
    // -----------------------------------------------

    const user = await User.findById(student.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Student user account not found",
      });
    }

    if (name) {
      user.name = name;
    }

    if (email) {
      const existingEmail = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: user._id },
      });

      if (existingEmail) {
        return res.status(409).json({
          success: false,
          message: "This email is already in use",
        });
      }

      user.email = email.toLowerCase();
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    await user.save();

    // -----------------------------------------------
    // Handle class change
    // -----------------------------------------------

    if (classId && String(classId) !== String(student.class)) {
      const newClass = await Class.findById(classId);

      if (!newClass) {
        return res.status(404).json({
          success: false,
          message: "New class not found",
        });
      }

      if (!newClass.isActive) {
        return res.status(400).json({
          success: false,
          message: "Cannot move student to an inactive class",
        });
      }

      // Class Admin cannot move students to another class
      if (req.user.role === "class_admin") {
        if (
          String(newClass.classTeacher) !==
          String(req.user.userId)
        ) {
          return res.status(403).json({
            success: false,
            message:
              "You can only move students within your assigned class",
          });
        }
      }

      // Remove from old class
      await Class.findByIdAndUpdate(
        student.class,
        {
          $pull: {
            students: student._id,
          },
        }
      );

      // Add to new class
      await Class.findByIdAndUpdate(
        newClass._id,
        {
          $addToSet: {
            students: student._id,
          },
        }
      );

      student.class = newClass._id;
    }

    // -----------------------------------------------
    // Update Student information
    // -----------------------------------------------

    if (rollNumber) {
      const duplicateRoll = await Student.findOne({
        class: student.class,
        rollNumber: rollNumber.toUpperCase(),
        _id: { $ne: student._id },
      });

      if (duplicateRoll) {
        return res.status(409).json({
          success: false,
          message:
            "This roll number already exists in this class",
        });
      }

      student.rollNumber = rollNumber.toUpperCase();
    }

    if (admissionNumber !== undefined) {
      student.admissionNumber = admissionNumber;
    }

    if (dateOfBirth !== undefined) {
      student.dateOfBirth = dateOfBirth;
    }

    if (gender !== undefined) {
      student.gender = gender;
    }

    if (emergencyContact !== undefined) {
      student.emergencyContact = emergencyContact;
    }

    await student.save();

    const updatedStudent = await Student.findById(student._id)
      .populate(
        "user",
        "name email phone profileImage isActive"
      )
      .populate(
        "class",
        "name section academicYear"
      );

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error("Update Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating student",
    });
  }
};

// =====================================================
// DEACTIVATE STUDENT
// =====================================================

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Class Admin scope check
    if (req.user.role === "class_admin") {
      const assignedClass = await Class.findOne({
        _id: student.class,
        classTeacher: req.user.userId,
      });

      if (!assignedClass) {
        return res.status(403).json({
          success: false,
          message:
            "You can only deactivate students from your assigned class",
        });
      }
    }

    // Deactivate student
    student.isActive = false;
    await student.save();

    // Deactivate login account
    await User.findByIdAndUpdate(
      student.user,
      {
        isActive: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "Student deactivated successfully",
    });
  } catch (error) {
    console.error("Delete Student Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deactivating student",
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};