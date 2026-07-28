"""
model.py

This file creates the neural network architecture
used for plant disease classification.

Responsibilities:
1. Load pretrained EfficientNet-B0
2. Freeze feature extraction layers
3. Replace the classifier
4. Move the model to CPU/GPU
5. Return the ready-to-train model
"""

import torch
from torch import nn
from torchvision.models import (
    efficientnet_b0,
    EfficientNet_B0_Weights
)

from ml.config import NUM_CLASSES


# ==========================================================
# Device Selection
# ==========================================================

# Automatically use GPU if available.
# Otherwise use CPU.
DEVICE = torch.device(
    "cuda" if torch.cuda.is_available() else "cpu"
)


# ==========================================================
# Build Model
# ==========================================================

def build_model():
    """
    Creates and returns a pretrained EfficientNet-B0 model
    customized for LeafGuard.

    Returns
    -------
    torch.nn.Module
        Ready-to-train neural network.
    """

    # ------------------------------------------------------
    # Load pretrained ImageNet weights
    # ------------------------------------------------------

    weights = EfficientNet_B0_Weights.DEFAULT

    model = efficientnet_b0(
        weights=weights
    )

    # ------------------------------------------------------
    # Freeze feature extractor
    #
    # We don't want to retrain the entire network.
    # Only the final classifier should learn.
    # ------------------------------------------------------

    for parameter in model.features.parameters():
        parameter.requires_grad = False

    # ------------------------------------------------------
    # Get input size of the original classifier
    # ------------------------------------------------------

    in_features = model.classifier[1].in_features

    # ------------------------------------------------------
    # Replace classifier
    #
    # Original:
    #     1000 ImageNet classes
    #
    # New:
    #     38 Plant Disease Classes
    # ------------------------------------------------------

    model.classifier = nn.Sequential(

        # Helps reduce overfitting
        nn.Dropout(
            p=0.2,
            inplace=True
        ),

        # Final classification layer
        nn.Linear(
            model.classifier[1].in_features,
            NUM_CLASSES
        )

    )

    # ------------------------------------------------------
    # Move model to selected device
    # ------------------------------------------------------

    model = model.to(DEVICE)

    return model


# ==========================================================
# Utility Function
# ==========================================================

def get_device():
    if torch.cuda.is_available():
        device = torch.device("cuda")
        print(f"Using GPU: {torch.cuda.get_device_name(0)}")
    else:
        device = torch.device("cpu")
        print("Using CPU")

    return device


# ==========================================================
# Test Model
# ==========================================================

if __name__ == "__main__":

    model = build_model()

    print("=" * 60)
    print("LeafGuard EfficientNet-B0")
    print("=" * 60)

    print(model)

    print("\nDevice :", DEVICE)

    # ------------------------------------------------------
    # Create dummy batch
    #
    # Shape:
    # Batch Size = 32
    # Channels   = 3 (RGB)
    # Height     = 224
    # Width      = 224
    # ------------------------------------------------------

    dummy_batch = torch.randn(
        32,
        3,
        224,
        224
    ).to(DEVICE)

    # Forward pass
    output = model(dummy_batch)

    print("\nOutput Shape :", output.shape)

    # Expected:
    # torch.Size([32, 38])