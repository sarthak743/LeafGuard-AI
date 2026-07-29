from fastapi import APIRouter, Query

from app.services.weather_service import WeatherService

router = APIRouter(
    prefix="/weather",
    tags=["Weather"]
)


@router.get("/test")
async def weather_test(
    lat: float = Query(...),
    lon: float = Query(...)
):
    weather = await WeatherService.get_current_weather(
        latitude=lat,
        longitude=lon
    )

    return weather

from app.services.weather_advisory import WeatherAdvisory

@router.get("/advisory-test")
async def advisory_test():

    weather = {
        "temperature": 25,
        "humidity": 75,
        "rain": False
    }

    disease = {
        "display_name": "Tomato Early Blight",

        "weather_conditions": {
            "temperature_range": {
                "min": 20,
                "max": 30
            },
            "high_humidity": True,
            "rain_required": False
        }
    }

    return WeatherAdvisory.generate(
        weather,
        disease
    )