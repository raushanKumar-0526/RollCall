import cv2

from utils.embedding_service import FaceEmbeddingService
from utils.profile_service import FaceProfileService
from utils.similarity_service import FaceSimilarityService


class FaceRecognitionService:

    def __init__(self):
        self.embedding_service = FaceEmbeddingService()
        self.profile_service = FaceProfileService()
        self.similarity_service = FaceSimilarityService()

    def recognize_student(
        self,
        image,
        student_id,
        threshold=0.70
    ):
        new_embedding = self.embedding_service.generate_embedding(
            image
        )

        enrolled_profile = self.profile_service.load_profile(
            student_id
        )

        similarity = self.similarity_service.cosine_similarity(
            new_embedding,
            enrolled_profile
        )

        is_match = similarity >= threshold

        return {
            "student_id": student_id,
            "similarity": round(float(similarity), 4),
            "similarity_percentage": round(
                float(
                    self.similarity_service.similarity_percentage(
                        similarity
                    )
                ),
                2
            ),
            "threshold": threshold,
            "match": is_match
        }