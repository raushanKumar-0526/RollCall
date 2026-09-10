import os
import cv2
import numpy as np

from utils.embedding_service import FaceEmbeddingService


class FaceProfileService:

    def __init__(self):
        self.embedding_service = FaceEmbeddingService()

    def get_student_directory(self, student_id):
        return os.path.join(
            "face_data",
            str(student_id)
        )

    def get_profile_path(self, student_id):
        return os.path.join(
            self.get_student_directory(student_id),
            "profile.npy"
        )

    def generate_profile(self, student_id):
        student_dir = self.get_student_directory(student_id)

        if not os.path.exists(student_dir):
            raise FileNotFoundError(
                f"No face data found for student {student_id}"
            )

        image_files = [
            file
            for file in os.listdir(student_dir)
            if file.lower().endswith(
                (".jpg", ".jpeg", ".png")
            )
        ]

        if len(image_files) < 3:
            raise ValueError(
                "At least 3 face samples are required."
            )

        embeddings = []

        for image_file in image_files:
            image_path = os.path.join(
                student_dir,
                image_file
            )

            image = cv2.imread(image_path)

            if image is None:
                continue

            embedding = self.embedding_service.generate_embedding(
                image
            )

            embeddings.append(embedding)

        if len(embeddings) < 3:
            raise ValueError(
                "Could not generate embeddings for at least 3 samples."
            )

        profile = np.mean(
            np.array(embeddings),
            axis=0
        )

        norm = np.linalg.norm(profile)

        if norm == 0:
            raise ValueError(
                "Invalid face profile generated."
            )

        profile = profile / norm

        return profile.astype(np.float32)

    def save_profile(self, student_id):
        profile = self.generate_profile(student_id)

        student_dir = self.get_student_directory(student_id)

        os.makedirs(
            student_dir,
            exist_ok=True
        )

        profile_path = self.get_profile_path(student_id)

        np.save(
            profile_path,
            profile
        )

        return profile_path

    def load_profile(self, student_id):
        profile_path = self.get_profile_path(student_id)

        if not os.path.exists(profile_path):
            raise FileNotFoundError(
                f"Profile not found for student {student_id}"
            )

        profile = np.load(profile_path)

        return profile.astype(np.float32)