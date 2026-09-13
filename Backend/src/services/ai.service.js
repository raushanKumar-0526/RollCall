const sendFaceToAI = async (
  imageBuffer,
  originalName,
  mimeType
) => {
  try {
    const formData = new FormData();

    const blob = new Blob(
      [imageBuffer],
      {
        type: mimeType || "image/jpeg",
      }
    );

    formData.append(
      "image",
      blob,
      originalName || "face.jpg"
    );

    const response = await fetch(
      "http://127.0.0.1:8000/recognize",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "AI service request failed."
      );
    }

    return data;

  } catch (error) {
    console.error(
      "AI Service Error:",
      error.message
    );

    throw new Error(
      `AI service unavailable: ${error.message}`
    );
  }
};


// Send a face sample to Python AI for enrollment
const enrollFaceWithAI = async (
  imageBuffer,
  studentId,
  originalName,
  mimeType
) => {
  try {
    const formData = new FormData();

    const blob = new Blob(
      [imageBuffer],
      {
        type: mimeType || "image/jpeg",
      }
    );

    formData.append(
      "student_id",
      studentId
    );

    formData.append(
      "image",
      blob,
      originalName || "face.jpg"
    );

    const response = await fetch(
      "http://127.0.0.1:8000/enroll",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "AI enrollment request failed."
      );
    }

    return data;

  } catch (error) {
    console.error(
      "AI Enrollment Error:",
      error.message
    );

    throw new Error(
      `AI enrollment service unavailable: ${error.message}`
    );
  }
};

//check enrollment status of a student
const getEnrollmentStatusFromAI = async (studentId) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/enrollment-status/${studentId}`
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "AI enrollment status request failed."
      );
    }

    return data;
  } catch (error) {
    console.error(
      "AI Enrollment Status Error:",
      error.message
    );

    throw new Error(
      `AI enrollment status service unavailable: ${error.message}`
    );
  }
};


module.exports = {
  sendFaceToAI,
  enrollFaceWithAI,
  getEnrollmentStatusFromAI,
};