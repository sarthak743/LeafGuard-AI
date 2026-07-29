class WeatherAdvisory:

    HUMIDITY_THRESHOLD = 70

    @staticmethod
    def generate(weather: dict, disease: dict):
        disease_name = disease["display_name"]

        disease_conditions = disease["weather_conditions"]

        score = 0
        reasons = []

        # Temperature Check
        temp = weather["temperature"]

        temp_range = disease_conditions["temperature_range"]

        if temp_range["min"] <= temp <= temp_range["max"]:
            score += 1
            reasons.append("temperature is favorable")

        # Humidity Check
        humidity_required = disease_conditions["high_humidity"]

        if humidity_required and weather["humidity"] >= WeatherAdvisory.HUMIDITY_THRESHOLD:
            score += 1
            reasons.append("humidity is high")

        # Rain Check
        rain_required = disease_conditions["rain_required"]

        if rain_required and weather["rain"]:
            score += 1
            reasons.append("rain supports disease spread")

        # Risk Level
        if score == 3:
            risk = "High"

        elif score == 2:
            risk = "Medium"

        else:
            risk = "Low"

        # Build Message
        if reasons:
            if score == 3:

                message = (
                    f"Current weather conditions are highly favorable for the spread of "
                    f"{disease_name} because "
                    + ", ".join(reasons)
                    + ". Monitor nearby plants closely."
                )

            elif score == 2:

                message = (
                    f"Current weather conditions are moderately favorable for the spread of "
                    f"{disease_name} because "
                    + ", ".join(reasons)
                    + "."
                )

            else:

                message = (
                    f"Current weather conditions are not favorable for the spread of "
                    f"{disease_name}."
                )

        else:
            message = (
                "Current weather conditions are not favorable for disease spread."
            )

        return {
            "risk": risk,
            "score": score,
            "message": message
        }

