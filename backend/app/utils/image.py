"""
image.py

Utility functions for image preprocessing.
"""

from io import BytesIO

import torch
from PIL import Image
from torchvision import transforms

from app.config import IMAGE_SIZE, IMAGENET_MEAN, IMAGENET_STD

# Image preprocessing pipeline
transform = transforms.Compose(
    [
        transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
        transforms.ToTensor(),
        transforms.Normalize(
            mean=IMAGENET_MEAN,
            std=IMAGENET_STD
        )
    ]
)

async def preprocess_image(file):
    """
    Convert an uploaded image into a
    model-ready tensor.

    Parameters
    ----------
    file : UploadFile

    Returns
    -------
    torch.Tensor
    """

    # Read uploaded file
    image_bytes = await file.read()

    # Open image using PIL
    image = Image.open(
        BytesIO(image_bytes)
    )

    # Convert image to RGB
    image = image.convert("RGB")

    # Apply preprocessing
    image = transform(image)

    # Add batch dimension
    image = image.unsqueeze(0)

    return image