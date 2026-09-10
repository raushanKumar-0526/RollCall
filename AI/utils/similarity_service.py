import numpy as np


class FaceSimilarityService:

    @staticmethod
    def cosine_similarity(embedding1, embedding2):
        embedding1 = np.asarray(embedding1, dtype=np.float32)
        embedding2 = np.asarray(embedding2, dtype=np.float32)

        norm1 = np.linalg.norm(embedding1)
        norm2 = np.linalg.norm(embedding2)

        if norm1 == 0 or norm2 == 0:
            raise ValueError("Cannot compare zero-length embeddings.")

        similarity = np.dot(
            embedding1,
            embedding2
        ) / (norm1 * norm2)

        return float(similarity)

    @staticmethod
    def similarity_percentage(similarity):
        percentage = ((similarity + 1) / 2) * 100

        return round(
            float(percentage),
            2
        )