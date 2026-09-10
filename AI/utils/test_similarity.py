import cv2

from utils.embedding_service import FaceEmbeddingService
from utils.similarity_service import FaceSimilarityService


IMAGE_1 = (
    "face_data/6aa1c881395c9a91cc98bc71/"
    "05150c2cf3a748ea8de0c8dfdb28f9af.jpg"
)

IMAGE_2 = (
    "face_data/6aa1c881395c9a91cc98bc71/"
    "a11996bf0d5c4e20a3feec5227d25f75.jpg"
)


embedding_service = FaceEmbeddingService()
similarity_service = FaceSimilarityService()


face1 = cv2.imread(IMAGE_1)
face2 = cv2.imread(IMAGE_2)

if face1 is None:
    raise RuntimeError("Could not load first face image.")

if face2 is None:
    raise RuntimeError("Could not load second face image.")


embedding1 = embedding_service.generate_embedding(face1)
embedding2 = embedding_service.generate_embedding(face2)


similarity = similarity_service.cosine_similarity(
    embedding1,
    embedding2
)

percentage = similarity_service.similarity_percentage(
    similarity
)


print("Face comparison completed.")
print("Cosine similarity:", similarity)
print("Similarity percentage:", percentage, "%")