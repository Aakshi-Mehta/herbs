# /ai-service/utils.py

import numpy as np
import hashlib
from PIL import Image

def preprocess_image(file_bytes):
    img = Image.open(file_bytes).convert("RGB")
    img = img.resize((224, 224))  
    arr = np.array(img) / 255.0
    return arr.flatten()  

def compute_embedding_hash(vector: np.ndarray) -> str:

    vec_bytes = vector.tobytes()
    return hashlib.sha256(vec_bytes).hexdigest()

def cosine_similarity(vec1: np.ndarray, vec2: np.ndarray) -> float:
    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))
