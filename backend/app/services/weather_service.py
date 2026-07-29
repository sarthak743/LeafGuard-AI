import httpx

from app.config import (
    OPENWEATHER_API_KEY,
    OPENWEATHER_BASE_URL
)


class WeatherService:

    @staticmethod
    async def get_current_weather(latitude: float, longitude: float):

        params = {
            "lat": latitude,
            "lon": longitude,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric"
        }

        try:

            async with httpx.AsyncClient(timeout=10.0) as client:

                response = await client.get(
                    OPENWEATHER_BASE_URL,
                    params=params
                )

                response.raise_for_status()

                data = response.json()

                return {
                    "location": data["name"],
                    "temperature": data["main"]["temp"],
                    "humidity": data["main"]["humidity"],
                    "rain": "rain" in data
                }

        except httpx.HTTPError as e:

            raise Exception(
                f"Failed to fetch weather data: {str(e)}"
            )
