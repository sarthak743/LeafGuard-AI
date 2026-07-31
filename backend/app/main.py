"""
main.py

Entry point of the LeafGuard FastAPI application.
"""

from fastapi import FastAPI

from app.routes.predict import router as predict_router
from app.routes.weather import router as weather_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="LeafGuard API",
    description="AI-powered Plant Disease Detection API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    """
    Root endpoint.
    """

    return {
        "message": "Welcome to LeafGuard API!"
    }


# Register all routes
app.include_router(
    predict_router
)

app.include_router(weather_router)