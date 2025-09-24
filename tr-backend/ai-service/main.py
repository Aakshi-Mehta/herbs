# /ai-service/main.py

from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import hashlib
import numpy as np
from PIL import Image
import io
import uuid
from pydantic import BaseModel
from typing import List

app = FastAPI()

class CompareRequest(BaseModel):
    vec1: List[float]
    vec2: List[float]

@app.post("/compare")
async def compare_vectors(req: CompareRequest):
    v1 = np.array(req.vec1)
    v2 = np.array(req.vec2)

    similarity = float(np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2)))
    match = similarity > 0.88 
    return {"similarity": similarity, "match": match}
    
@app.post("/embed")
async def embed(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        embedding = np.array(image).flatten()[:128]  
        embedding = embedding / np.linalg.norm(embedding)

        hash_digest = hashlib.sha256(contents).hexdigest()

        return JSONResponse({
            "embedding": embedding.tolist(),
            "hash": f"sha256:{hash_digest}",
            "vectorId": str(uuid.uuid4())
        })
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)
