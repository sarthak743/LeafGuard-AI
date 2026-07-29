"""
ml_service.py

Handles model loading and prediction.
"""
import json
import torch

from ml.model import (
    build_model,
    get_device
)

from ml.utils import load_checkpoint

from app.config import (
    MODEL_PATH,
    CLASS_NAMES_PATH
)

# Select device
device = get_device()

# Build model architecture
model = build_model()

# Load trained weights
model = load_checkpoint(
    model,
    device
)

# Load class names
with open(CLASS_NAMES_PATH, "r") as file:
    class_names = json.load(file)

# Evaluation mode
model.eval()

@torch.no_grad()
def predict(image_tensor):
    """
    Run inference on a preprocessed image.

    Parameters
    ----------
    image_tensor : torch.Tensor

    Returns
    -------
    top_probabilities : torch.Tensor

    top_indices : torch.Tensor
    """

    # Move image to GPU / CPU
    image_tensor = image_tensor.to(device)

    # Forward pass
    outputs = model(image_tensor)

    # Convert logits to probabilities
    probabilities = torch.softmax(
        outputs,
        dim=1
    )

    # Get Top 3 predictions
    top_probabilities, top_indices = torch.topk(
        probabilities,
        k=3
    )

    # Remove batch dimension
    top_probabilities = top_probabilities.squeeze()
    top_indices = top_indices.squeeze()

    predictions = []

    for probability, index in zip(
        top_probabilities,
        top_indices
    ):

        predictions.append(
            {
                "class_name": class_names[index.item()],
                "confidence": round(
                    probability.item() * 100,
                    2   
                )
            }
        )

    return predictions
