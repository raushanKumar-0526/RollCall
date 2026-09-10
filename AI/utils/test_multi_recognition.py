import cv2

from utils.multi_recognition_service import (
    MultiStudentRecognitionService
)


IMAGE_PATH = (
    "face_data/6aa1c881395c9a91cc98bc71/"
    "05150c2cf3a748ea8de0c8dfdb28f9af.jpg"
)


image = cv2.imread(IMAGE_PATH)

if image is None:
    raise RuntimeError(
        "Could not load test image."
    )


service = MultiStudentRecognitionService()

result = service.recognize_against_all(
    image
)

print("\nMulti-Student Recognition")
print("-------------------------")

print("Match:", result["match"])
print("Student ID:", result.get("student_id"))
print("Similarity:", result.get("similarity"))
print(
    "Similarity %:",
    result.get("similarity_percentage")
)

print("\nCandidates:")

for candidate in result["candidates"]:
    print(
        candidate["student_id"],
        "→",
        candidate["similarity"]
    )