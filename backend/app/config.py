import os
from dotenv import load_dotenv
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR.parent / ".env")

MODEL_PATH = BASE_DIR / "models" / "best_model.pth"

IMAGE_SIZE = 224

IMAGENET_MEAN = [0.485, 0.456, 0.406]

IMAGENET_STD = [0.229, 0.224, 0.225]

CLASS_NAMES_PATH = BASE_DIR / "data" / "class_names.json"

DISEASES_DB_PATH = BASE_DIR / "app" / "database" / "diseases.json"

# Minimum confidence percentage required to return full disease details
CONFIDENCE_THRESHOLD = 70.0

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"