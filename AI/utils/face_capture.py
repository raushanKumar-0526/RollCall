import cv2
import os
import uuid

from utils.face_detector import FaceDetector


class FaceCapture:
    def __init__(self, base_dir="face_data"):
        self.base_dir = base_dir
        self.detector = FaceDetector()

        os.makedirs(self.base_dir, exist_ok=True)

    def save_face(self, image, student_id):
        faces = self.detector.detect_faces(image)

        if len(faces) == 0:
            return {
                "success": False,
                "message": "No face detected."
            }

        if len(faces) > 1:
            return {
                "success": False,
                "message": "Multiple faces detected. Please keep only one person in the frame."
            }

        # Convert NumPy values to normal Python integers
        x, y, w, h = [int(value) for value in faces[0]]

        face = image[y:y + h, x:x + w]

        student_dir = os.path.join(
            self.base_dir,
            str(student_id)
        )

        os.makedirs(student_dir, exist_ok=True)

        filename = f"{uuid.uuid4().hex}.jpg"
        filepath = os.path.join(student_dir, filename)

        success = cv2.imwrite(filepath, face)

        if not success:
            return {
                "success": False,
                "message": "Failed to save face sample."
            }

        return {
            "success": True,
            "message": "Face sample captured successfully.",
            "path": filepath,
            "face_width": int(w),
            "face_height": int(h)
        }