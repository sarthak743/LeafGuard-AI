"""
This file contains helper functions used during
training and evaluation.

Responsibilities:
1. Set random seed
2. Calculate accuracy
3. Save model checkpoints
4. Load saved models
"""

import random
import numpy as np
import torch

from ml.config import MODEL_PATH, RANDOM_SEED


# ==========================================================
# Set Random Seed
# ==========================================================

def set_seed(seed=RANDOM_SEED):
    """
    Makes experiments reproducible by fixing randomness.

    Parameters
    ----------
    seed : int
        Random seed value.
    """

    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)

    # If CUDA is available, also seed the GPU
    if torch.cuda.is_available():
        torch.cuda.manual_seed(seed)
        torch.cuda.manual_seed_all(seed)


# ==========================================================
# Calculate Accuracy
# ==========================================================

def calculate_accuracy(outputs, labels):
    """
    Calculates classification accuracy for one batch.

    Parameters
    ----------
    outputs : Tensor
        Raw predictions from the model (logits).

    labels : Tensor
        Ground truth labels.

    Returns
    -------
    float
        Accuracy percentage for the batch.
    """

    # Get predicted class index
    _, predictions = torch.max(outputs, dim=1)

    # Count correct predictions
    correct = (predictions == labels).sum().item()

    # Total images in the batch
    total = labels.size(0)

    accuracy = (correct / total) * 100

    return accuracy


# ==========================================================
# Save Checkpoint
# ==========================================================

def save_checkpoint(model):
    """
    Saves the trained model weights.

    Parameters
    ----------
    model : torch.nn.Module
    """

    torch.save(model.state_dict(), MODEL_PATH)

    print(f"\nModel saved to:\n{MODEL_PATH}")


# ==========================================================
# Load Checkpoint
# ==========================================================

def load_checkpoint(model, device):
    """
    Loads saved model weights.

    Parameters
    ----------
    model : torch.nn.Module

    device : torch.device

    Returns
    -------
    model
    """

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=device
        )
    )

    print(f"\nLoaded model from:\n{MODEL_PATH}")

    return model

def count_trainable_parameters(model):
    """
    Prints model parameter statistics.
    """

    total = sum(p.numel() for p in model.parameters())

    trainable = sum(
        p.numel()
        for p in model.parameters()
        if p.requires_grad
    )

    frozen = total - trainable

    print("\nModel Summary")
    print("-" * 40)
    print(f"Total Parameters     : {total:,}")
    print(f"Trainable Parameters : {trainable:,}")
    print(f"Frozen Parameters    : {frozen:,}")
    print("-" * 40)