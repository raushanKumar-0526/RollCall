import cv2


class FaceDetector:
    def __init__(self):
        self.face_cascade = cv2.CascadeClassifier(
            cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
        )

        if self.face_cascade.empty():
            raise RuntimeError("Failed to load Haar Cascade face detector.")

    def detect_faces(self, image):
        if image is None:
            raise ValueError("Invalid image provided.")

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        faces = self.face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(80, 80)
        )

        return faces

    def crop_faces(self, image):
        faces = self.detect_faces(image)

        cropped_faces = []

        for (x, y, w, h) in faces:
            face = image[y:y + h, x:x + w]
            cropped_faces.append(face)

        return cropped_faces