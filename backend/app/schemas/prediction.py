"""
prediction.py

Pydantic response models for the prediction API.
"""

from typing import Optional

from pydantic import BaseModel

class TemperatureRange(BaseModel):
    min: int
    max: int

class WeatherConditions(BaseModel):
    """Weather conditions that favor the disease."""
    temperature_range: TemperatureRange
    high_humidity: bool
    rain_required: bool


class DiseaseDetails(BaseModel):
    """Detailed information about a predicted disease."""

    display_name: str
    plant: str
    severity: str
    description: str
    symptoms: list[str]
    causes: list[str]
    treatment: list[str]
    prevention: list[str]
    recommended_action: str
    weather_conditions: WeatherConditions


class WeatherData(BaseModel):
    """Current weather fetched from OpenWeatherMap."""

    location: str
    temperature: float
    humidity: int
    rain: bool


class WeatherAdvisoryData(BaseModel):
    """Weather advisory generated from disease conditions."""

    risk: str
    score: int
    message: str

class TopPredictionItem(BaseModel):
    """Compact prediction item for top predictions list."""

    class_name: str
    display_name: str
    confidence: float


class PrimaryPrediction(BaseModel):
    """Primary Top-1 prediction."""

    class_name: str
    display_name: str
    confidence: float
    details: Optional[DiseaseDetails] = None


class PredictionResponse(BaseModel):
    """Top-level response for the prediction endpoint."""

    success: bool = True
    message: Optional[str] = None
    confidence: float

    prediction: Optional[PrimaryPrediction] = None

    weather: Optional[WeatherData] = None
    weather_advisory: Optional[WeatherAdvisoryData] = None

    top_predictions: list[TopPredictionItem]