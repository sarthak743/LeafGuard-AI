"""
predict.py

Prediction routes for the LeafGuard API.
"""

import logging

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)

from app.config import CONFIDENCE_THRESHOLD
from app.utils.image import preprocess_image
from app.services.ml_service import predict
from app.services.disease_database import get_disease_info, get_display_name
from app.schemas.prediction import PredictionResponse
from app.services.weather_service import WeatherService
from app.services.weather_advisory import WeatherAdvisory

logger = logging.getLogger(__name__)

# Create router
router = APIRouter()


@router.post(
    "/predict",
    response_model=PredictionResponse,
    response_model_exclude_none=True
)
async def predict_image(
    file: UploadFile = File(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
):
    """
    Predict plant disease from an uploaded image.

    If the top prediction confidence >= CONFIDENCE_THRESHOLD (70%),
    returns success=True, the primary prediction with full disease details,
    and the list of Top-3 predictions.

    If the top prediction confidence < CONFIDENCE_THRESHOLD (70%),
    returns success=False with a recommendation message, top confidence,
    and the list of Top-3 predictions (no disease lookup).
    """

    # Preprocess uploaded image
    image_tensor = await preprocess_image(file)

    # Run inference (returns list of Top-3 dicts with class_name & confidence)
    predictions = predict(image_tensor)

    # Build top_predictions list (limited to class_name, display_name, confidence)
    top_predictions = []
    for pred in predictions:
        class_name = pred["class_name"]
        confidence = pred["confidence"]
        top_predictions.append(
            {
                "class_name": class_name,
                "display_name": get_display_name(class_name),
                "confidence": confidence
            }
        )

    # Top-1 primary prediction details
    top_1 = predictions[0]
    top_1_class = top_1["class_name"]
    top_1_confidence = top_1["confidence"]

    # Check against confidence threshold
    if top_1_confidence >= CONFIDENCE_THRESHOLD:
        # Perform disease database lookup ONLY for Top-1 prediction
        details = get_disease_info(top_1_class)

        try:
            weather = await WeatherService.get_current_weather(
                latitude,
                longitude
            )

            weather_advisory = WeatherAdvisory.generate(
                weather,
                details
            )

        except Exception as e:
            logger.warning(f"Weather service unavailable: {e}")
            weather = None
            weather_advisory = None

        primary_prediction = {
            "class_name": top_1_class,
            "display_name": get_display_name(top_1_class),
            "confidence": top_1_confidence,
            "details": details
        }

        return {
            "success": True,
            "confidence": top_1_confidence,
            "prediction": primary_prediction,
            "weather": weather,
            "weather_advisory": weather_advisory,
            "top_predictions": top_predictions
        }

    # Below confidence threshold: do NOT perform disease database lookup
    logger.info(
        f"Top prediction '{top_1_class}' confidence ({top_1_confidence}%) "
        f"is below threshold ({CONFIDENCE_THRESHOLD}%)."
    )

    return {
        "success": False,
        "message": (
            "The uploaded image could not be classified with sufficient confidence. "
            "Please upload a clearer image of a single leaf under good lighting."
        ),
        "confidence": top_1_confidence,
        "top_predictions": top_predictions
    }