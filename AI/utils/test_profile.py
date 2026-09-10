from utils.profile_service import FaceProfileService


STUDENT_ID = "6aa1c881395c9a91cc98bc71"


service = FaceProfileService()

profile = service.generate_profile(
    STUDENT_ID
)

print("Face profile generated successfully.")
print("Profile shape:", profile.shape)
print("Profile size:", len(profile))
print("Profile norm:", (profile ** 2).sum() ** 0.5)
print("First 10 values:", profile[:10])