import cv2
import numpy as np

from fastapi import FastAPI, File, UploadFile, Form

from utils.face_capture import FaceCapture
from utils.profile_service import FaceProfileService
from utils.multi_recognition_service import MultiStudentRecognitionService


app = FastAPI(
    title="RollCall AI Service",
    description="AI service for facial recognition and automated attendance",
    version="1.0.0"
)


# Services
face_capture = FaceCapture()
profile_service = FaceProfileService()
recognition_service = MultiStudentRecognitionService()


@app.get("/")
def root():
    return {
        "success": True,
        "message": "RollCall AI Service is running"
    }


@app.get("/health")
def health_check():
    return {
        "success": True,
        "service": "RollCall AI",
        "status": "healthy"
    }


@app.post("/enroll")
async def enroll_face(
    student_id: str = Form(...),
    image: UploadFile = File(...)
):
    try:
        # Read uploaded image
        image_bytes = await image.read()

        image_array = np.frombuffer(
            image_bytes,
            dtype=np.uint8
        )

        frame = cv2.imdecode(
            image_array,
            cv2.IMREAD_COLOR
        )

        if frame is None:
            return {
                "success": False,
                "message": "Invalid image file."
            }

        # Capture and save face
        result = face_capture.save_face(
            frame,
            student_id
        )

        if not result["success"]:
            return result

        # Count saved face samples
        student_directory = profile_service.get_student_directory(
            student_id
        )

        image_files = [
            file
            for file in __import__("os").listdir(student_directory)
            if file.lower().endswith(
                (".jpg", ".jpeg", ".png")
            )
        ]

        sample_count = len(image_files)

        # Profile is generated after at least 3 samples
        if sample_count < 3:
            return {
                "success": True,
                "message": "Face sample captured successfully.",
                "data": {
                    "student_id": student_id,
                    "sample_count": sample_count,
                    "profile_generated": False,
                    "required_samples": 3
                }
            }

        # Generate and save profile automatically
        profile_path = profile_service.save_profile(
            student_id
        )

        return {
            "success": True,
            "message": "Face sample captured and face profile generated successfully.",
            "data": {
                "student_id": student_id,
                "sample_count": sample_count,
                "profile_generated": True,
                "profile_path": profile_path,
                "required_samples": 3
            }
        }

    except Exception as error:

        print(
            "Enrollment Error:",
            error
        )

        return {
            "success": False,
            "message": "Failed to process face enrollment.",
            "error": str(error)
        }


@app.post("/recognize")
async def recognize_face(
    image: UploadFile = File(...)
):
    try:

        image_bytes = await image.read()

        image_array = np.frombuffer(
            image_bytes,
            dtype=np.uint8
        )

        frame = cv2.imdecode(
            image_array,
            cv2.IMREAD_COLOR
        )

        if frame is None:
            return {
                "success": False,
                "message": "Invalid image file."
            }

        # Detect faces
        faces = face_capture.detector.detect_faces(
            frame
        )

        if len(faces) == 0:
            return {
                "success": True,
                "message": "No face detected.",
                "data": {
                    "match": False,
                    "student_id": None,
                    "similarity": None,
                    "similarity_percentage": None,
                    "candidates": []
                }
            }

        if len(faces) > 1:
            return {
                "success": True,
                "message": "Multiple faces detected. Please process one face at a time.",
                "data": {
                    "match": False,
                    "student_id": None,
                    "similarity": None,
                    "similarity_percentage": None,
                    "candidates": []
                }
            }

        # Crop detected face
        x, y, w, h = [
            int(value)
            for value in faces[0]
        ]

        face = frame[
            y:y + h,
            x:x + w
        ]

        # Recognize against all enrolled students
        result = recognition_service.recognize_against_all(
            face
        )

        return {
            "success": True,
            "message": "Face recognition completed.",
            "data": result
        }

    except Exception as error:

        print(
            "Recognition Error:",
            error
        )

        return {
            "success": False,
            "message": "Face recognition failed.",
            "error": str(error)
        }