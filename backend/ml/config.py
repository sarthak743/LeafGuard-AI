"""
config.py

This file contains all configuration variables used throughout
the LeafGuard project.

Having a single configuration file makes the project:
- Easier to maintain
- Easier to debug
- Easier to scale
"""

from pathlib import Path

# ==========================================================
# Project Paths
# ==========================================================

# Root directory of the backend folder
BASE_DIR = Path(__file__).resolve().parent.parent

# Dataset directories
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"

TRAIN_DIR = PROCESSED_DATA_DIR / "train"
VAL_DIR = PROCESSED_DATA_DIR / "val"
TEST_DIR = PROCESSED_DATA_DIR / "test"

# Models directory
MODEL_DIR = BASE_DIR / "models"

# Create the models directory automatically if it doesn't exist
MODEL_DIR.mkdir(parents=True, exist_ok=True)

# Name of the saved model
MODEL_NAME = "best_model.pth"

# Full path where the model will be saved
MODEL_PATH = MODEL_DIR / MODEL_NAME


# ==========================================================
# Dataset Configuration
# ==========================================================

# EfficientNet-B0 expects 224 × 224 RGB images
IMAGE_SIZE = 224

# Number of images processed together
BATCH_SIZE = 16

# Number of worker processes for DataLoader
NUM_WORKERS = 2


# ==========================================================
# Model Configuration
# ==========================================================

# Number of plant disease classes
NUM_CLASSES = 38


# ==========================================================
# Training Configuration
# ==========================================================

# Number of complete passes through the dataset
EPOCHS = 10

# Initial learning rate for Adam optimizer
LEARNING_RATE = 1e-3

# Weight decay (L2 Regularization)
# Helps reduce overfitting
WEIGHT_DECAY = 1e-4


# ==========================================================
# Random Seed
# ==========================================================

# Makes experiments reproducible
RANDOM_SEED = 42


# ==========================================================
# Early Stopping
# ==========================================================

# Stop training if validation loss doesn't improve
EARLY_STOPPING_PATIENCE = 5


# ==========================================================
# Checkpoint Settings
# ==========================================================

# Save the best model based on validation accuracy
SAVE_BEST_ONLY = True


# ==========================================================
# Logging
# ==========================================================

# Print training progress every N batches
PRINT_EVERY = 20

# ==========================================================
# Output Directories
# ==========================================================

OUTPUT_DIR = BASE_DIR / "outputs"

PLOTS_DIR = OUTPUT_DIR / "plots"
LOGS_DIR = OUTPUT_DIR / "logs"
METRICS_DIR = OUTPUT_DIR / "metrics"

PLOTS_DIR.mkdir(parents=True, exist_ok=True)
LOGS_DIR.mkdir(parents=True, exist_ok=True)
METRICS_DIR.mkdir(parents=True, exist_ok=True)