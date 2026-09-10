import os
import cv2

from utils.embedding_service import FaceEmbeddingService
from utils.profile_service import FaceProfileService
from utils.similarity_service import FaceSimilarityService


class MultiStudentRecognitionService:

    def __init__(self):
        self.embedding_service = FaceEmbeddingService()
        self.profile_service = FaceProfileService()
        self.similarity_service = FaceSimilarityService()

    def recognize_against_all(
        self,
        image,
        threshold=0.70
    ):
        # Generate embedding for the new face
        new_embedding = self.embedding_service.generate_embedding(
            image
        )

        face_data_directory = "face_data"

        if not os.path.exists(face_data_directory):
            return {
                "match": False,
                "message": "No enrolled students found.",
                "candidates": []
            }

        candidates = []

        # Look through every student folder
        student_directories = os.listdir(
            face_data_directory
        )

        for student_id in student_directories:

            student_directory = os.path.join(
                face_data_directory,
                student_id
            )

            if not os.path.isdir(student_directory):
                continue

            profile_path = self.profile_service.get_profile_path(
                student_id
            )

            if not os.path.exists(profile_path):
                continue

            try:
                enrolled_profile = (
                    self.profile_service.load_profile(
                        student_id
                    )
                )

                similarity = (
                    self.similarity_service.cosine_similarity(
                        new_embedding,
                        enrolled_profile
                    )
                )

                candidates.append({
                    "student_id": student_id,
                    "similarity": round(
                        float(similarity),
                        4
                    ),
                    "similarity_percentage": round(
                        float(
                            self.similarity_service
                            .similarity_percentage(similarity)
                        ),
                        2
                    )
                })

            except Exception as error:
                print(
                    f"Could not process student "
                    f"{student_id}: {error}"
                )

        if not candidates:
            return {
                "match": False,
                "message": "No valid student profiles found.",
                "candidates": []
            }

        # Highest similarity first
        candidates.sort(
            key=lambda item: item["similarity"],
            reverse=True
        )

        best_match = candidates[0]

        if best_match["similarity"] >= threshold:
            return {
                "match": True,
                "student_id": best_match["student_id"],
                "similarity": best_match["similarity"],
                "similarity_percentage": (
                    best_match["similarity_percentage"]
                ),
                "threshold": threshold,
                "candidates": candidates
            }

        return {
            "match": False,
            "student_id": None,
            "similarity": best_match["similarity"],
            "similarity_percentage": (
                best_match["similarity_percentage"]
            ),
            "threshold": threshold,
            "candidates": candidates
        }