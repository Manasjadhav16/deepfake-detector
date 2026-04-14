from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Deepfake Detector API")

# Allow React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Deepfake Detector API is running!"}

import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
import numpy as np
import io
import base64

# Load model on startup
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_model():
    model = models.efficientnet_b4(weights=None)
    model.classifier[1] = nn.Linear(model.classifier[1].in_features, 2)
    import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
model_path = os.path.join(BASE_DIR, 'src', 'model', 'best_model.pt')
model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    model.to(device)
    return model

model = load_model()

# Image transforms
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406],
                         [0.229, 0.224, 0.225])
])

print("Model loaded successfully! ✅")

from pytorch_grad_cam import GradCAM
from pytorch_grad_cam.utils.image import show_cam_on_image
from pytorch_grad_cam.utils.model_targets import ClassifierOutputTarget
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read uploaded image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert('RGB')
    img_resized = img.resize((224, 224))
    img_array = np.array(img_resized) / 255.0

    # Prepare tensor
    input_tensor = transform(img).unsqueeze(0).to(device)

    # Get prediction
    with torch.no_grad():
        output = model(input_tensor)
        prob = torch.softmax(output, dim=1)
        is_fake = prob[0][0] > prob[0][1]
        confidence = max(prob[0]).item() * 100
        prediction = 'FAKE' if is_fake else 'REAL'

    # Generate Grad-CAM
    target_layers = [model.features[-1]]
    with GradCAM(model=model, target_layers=target_layers) as cam:
        grayscale_cam = cam(input_tensor=input_tensor,
                           targets=[ClassifierOutputTarget(0)])[0]

    # Create heatmap
    visualization = show_cam_on_image(
        img_array.astype(np.float32),
        grayscale_cam,
        use_rgb=True
    )

    # Convert heatmap to base64 string
    fig, ax = plt.subplots(1, 1, figsize=(5, 5))
    ax.imshow(visualization)
    ax.axis('off')
    buf = io.BytesIO()
    plt.savefig(buf, format='png', bbox_inches='tight')
    plt.close()
    buf.seek(0)
    heatmap_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return {
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "heatmap": heatmap_base64
    }