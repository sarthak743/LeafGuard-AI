"""
main.py

Entry point of the LeafGuard FastAPI application.
"""

from fastapi import FastAPI

from app.routes.predict import router as predict_router


app = FastAPI(
    title="LeafGuard API",
    description="AI-powered Plant Disease Detection API",
    version="1.0.0"
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