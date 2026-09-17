const Class = require("../models/class.model");
const User = require("../models/user.model");

// =====================================================
// CREATE CLASS
// Super Admin only
// =====================================================

const createClass = async (req, res) => {
  try {
    const {
      name,
      section,
      academicYear,
      classTeacher,
    } = req.body;

    // Validate required fields
    if (!name || !section || !academicYear || !classTeacher) {
      return res.status(400).json({
        success: false,
        message:
          "Class name, section, academic year and class teacher are required",
      });
    }

    // Check whether teacher exists
    const teacher = await User.findById(classTeacher);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Class teacher not found",
      });
    }

    // Check teacher role
    if (teacher.role !== "class_admin") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a Class Admin",
      });
    }

    // Check duplicate class
    const existingClass = await Class.findOne({
      name,
      section: section.toUpperCase(),
      academicYear,
    });

    if (existingClass) {
      return res.status(409).json({
        success: false,
        message:
          "This class and section already exists for the selected academic year",
      });
    }

    // Create class
    const newClass = await Class.create({
      name,
      section: section.toUpperCase(),
      academicYear,
      classTeacher,
    });

    // Update Class Admin's assigned class
    await User.findByIdAndUpdate(
      classTeacher,
      {
        assignedClass: newClass._id,
      },
      {
        new: true,
      }
    );

    const populatedClass = await Class.findById(newClass._id)
      .populate("classTeacher", "name email role");

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: populatedClass,
    });
  } catch (error) {
    console.error("Create Class Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while creating class",
    });
  }
};

// =====================================================
// GET ALL CLASSES
// Super Admin
// =====================================================

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("classTeacher", "name email role")
      .populate("students", "rollNumber user")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: classes.length,
      classes,
    });
  } catch (error) {
    console.error("Get All Classes Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching classes",
    });
  }
};

// =====================================================
// GET SINGLE CLASS
// =====================================================

const getClassById = async (req, res) => {
  try {
    const { id } = req.params;

    const classData = await Class.findById(id)
      .populate("classTeacher", "name email role")
      .populate("students", "rollNumber user");

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // Class Admin can only access assigned class
    if (
      req.user.role === "class_admin" &&
      String(req.user.assignedClass) !== String(classData._id)
    ) {
      return res.status(403).json({
        success: false,
        message: "You can only access your assigned class",
      });
    }

    res.status(200).json({
      success: true,
      class: classData,
    });
  } catch (error) {
    console.error("Get Class Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while fetching class",
    });
  }
};

// =====================================================
// UPDATE CLASS
// Super Admin only
// =====================================================

const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      section,
      academicYear,
      classTeacher,
      isActive,
    } = req.body;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // If class teacher is changed
    if (classTeacher) {
      const teacher = await User.findById(classTeacher);

      if (!teacher) {
        return res.status(404).json({
          success: false,
          message: "New class teacher not found",
        });
      }

      if (teacher.role !== "class_admin") {
        return res.status(400).json({
          success: false,
          message: "Selected user is not a Class Admin",
        });
      }

      // Remove class assignment from old teacher
      if (
        existingClass.classTeacher &&
        String(existingClass.classTeacher) !== String(classTeacher)
      ) {
        await User.findByIdAndUpdate(
          existingClass.classTeacher,
          {
            assignedClass: null,
          }
        );
      }

      // Assign class to new teacher
      await User.findByIdAndUpdate(
        classTeacher,
        {
          assignedClass: existingClass._id,
        }
      );
    }

    // Update class
    existingClass.name = name || existingClass.name;

    existingClass.section = section
      ? section.toUpperCase()
      : existingClass.section;

    existingClass.academicYear =
      academicYear || existingClass.academicYear;

    existingClass.classTeacher =
      classTeacher || existingClass.classTeacher;

    if (typeof isActive === "boolean") {
      existingClass.isActive = isActive;
    }

    await existingClass.save();

    const updatedClass = await Class.findById(id)
      .populate("classTeacher", "name email role")
      .populate("students", "rollNumber user");

    res.status(200).json({
      success: true,
      message: "Class updated successfully",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Update Class Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while updating class",
    });
  }
};

// =====================================================
// DELETE / DEACTIVATE CLASS
// Super Admin only
// =====================================================

const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;

    const existingClass = await Class.findById(id);

    if (!existingClass) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // We don't physically delete the class.
    // We deactivate it instead.
    existingClass.isActive = false;

    // Remove class assignment from teacher
    if (existingClass.classTeacher) {
      await User.findByIdAndUpdate(
        existingClass.classTeacher,
        {
          assignedClass: null,
        }
      );
    }

    await existingClass.save();

    res.status(200).json({
      success: true,
      message: "Class deactivated successfully",
    });
  } catch (error) {
    console.error("Delete Class Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deactivating class",
    });
  }
};

//=====================================================
// Assign class to a class_admin
// Super admin only
//=====================================================

const assignClassTeacher = async (req, res) => {
  try {
    const { classId } = req.params;
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({
        success: false,
        message: "Teacher ID is required.",
      });
    }

    // Find class
    const classData = await Class.findById(classId);

    if (!classData) {
      return res.status(404).json({
        success: false,
        message: "Class not found.",
      });
    }

    // Find teacher
    const teacher = await User.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    // Make sure user is a Class Admin
    if (teacher.role !== "class_admin") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a class admin.",
      });
    }

    // If another teacher was already assigned,
    // remove their assignedClass
    if (
      classData.classTeacher &&
      classData.classTeacher.toString() !== teacherId
    ) {
      await User.findByIdAndUpdate(
        classData.classTeacher,
        {
          $set: {
            assignedClass: null,
          },
        }
      );
    }

    // Assign teacher to class
    classData.classTeacher = teacherId;
    await classData.save();

    // Assign class to teacher
    teacher.assignedClass = classData._id;
    await teacher.save();

    return res.status(200).json({
      success: true,
      message: "Class teacher assigned successfully.",
      data: {
        classId: classData._id,
        teacherId: teacher._id,
        teacherName: teacher.name,
        teacherEmail: teacher.email,
        assignedClass: teacher.assignedClass,
      },
    });

  } catch (error) {
    console.error("Assign Class Teacher Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to assign class teacher.",
      error: error.message,
    });
  }
};

module.exports = {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  assignClassTeacher
};