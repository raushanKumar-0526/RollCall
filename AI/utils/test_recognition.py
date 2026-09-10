import cv2

from utils.recognition_service import FaceRecognitionService


STUDENT_ID = "6aa1c881395c9a91cc98bc71"

IMAGE_PATH = (
    "face_data/6aa1c881395c9a91cc98bc71/"
    "05150c2cf3a748ea8de0c8dfdb28f9af.jpg"
)


image = cv2.imread(IMAGE_PATH)

if image is None:
    raise RuntimeError("Could not load test image.")


service = FaceRecognitionService()

result = service.recognize_student(
    image,
    STUDENT_ID
)

print("\nRecognition Result")
print("------------------")
print("Student ID:", result["student_id"])
print("Similarity:", result["similarity"])
print("Similarity %:", result["similarity_percentage"])
print("Threshold:", result["threshold"])
print("Match:", result["match"])