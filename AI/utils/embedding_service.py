import cv2
import numpy as np
import tensorflow as tf

from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input


class FaceEmbeddingService:

    def __init__(self):
        print("Loading CNN model...")

        self.model = MobileNetV2(
            weights="imagenet",
            include_top=False,
            pooling="avg"
        )

        print("CNN model loaded successfully.")

    def preprocess_face(self, face):
        if face is None:
            raise ValueError("Invalid face image.")

        # Resize face to CNN input size
        face = cv2.resize(face, (224, 224))

        # OpenCV uses BGR, TensorFlow expects RGB
        face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)

        # Convert to float32
        face = face.astype(np.float32)

        # MobileNetV2 preprocessing
        face = preprocess_input(face)

        # Add batch dimension
        face = np.expand_dims(face, axis=0)

        return face

    def generate_embedding(self, face):
        processed_face = self.preprocess_face(face)

        embedding = self.model.predict(
            processed_face,
            verbose=0
        )[0]

        # L2 normalization
        norm = np.linalg.norm(embedding)

        if norm == 0:
            raise ValueError("Failed to generate valid embedding.")

        embedding = embedding / norm

        return embedding.astype(np.float32)

    def embedding_size(self):
        return 1280