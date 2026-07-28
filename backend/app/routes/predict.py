"""
predict.py

Prediction routes for the LeafGuard API.
"""

from fastapi import (
    APIRouter,
    UploadFile,
    File
)

from app.utils.image import preprocess_image
from app.services.ml_service import predict

# Create router
router = APIRouter()


@router.post("/predict")
async def predict_image(
    file: UploadFile = File(...)
):
    """
    Predict plant disease from an uploaded image.
    """

    # Preprocess uploaded image
    image_tensor = await preprocess_image(file)

    # Run prediction
    predictions = predict(image_tensor)

    # Return predictions
    return {
        "predictions": predictions
    }