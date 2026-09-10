import cv2

from utils.embedding_service import FaceEmbeddingService


IMAGE_PATH = (
    "face_data/6aa1c881395c9a91cc98bc71/"
    "05150c2cf3a748ea8de0c8dfdb28f9af.jpg"
)


service = FaceEmbeddingService()

face = cv2.imread(IMAGE_PATH)

if face is None:
    raise RuntimeError("Could not load face image.")

embedding = service.generate_embedding(face)

print("Embedding generated successfully.")
print("Embedding shape:", embedding.shape)
print("Embedding size:", len(embedding))
print("First 10 values:", embedding[:10])