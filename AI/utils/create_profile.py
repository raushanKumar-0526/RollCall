from utils.profile_service import FaceProfileService


STUDENT_ID = "6aa1c881395c9a91cc98bc71"


service = FaceProfileService()

profile_path = service.save_profile(
    STUDENT_ID
)

print("Face profile saved successfully.")
print("Profile path:", profile_path)