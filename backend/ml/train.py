"""
train.py

This file is responsible for training the
LeafGuard plant disease classification model.
"""

import torch
from torch import nn
from torch.optim import Adam
from tqdm import tqdm
from torch.optim.lr_scheduler import ReduceLROnPlateau

from dataset import get_dataloaders
from model import build_model, get_device
from utils import (
    set_seed,
    calculate_accuracy,
    save_checkpoint,
    count_trainable_parameters
)

from config import (
    LEARNING_RATE,
    EPOCHS,
    WEIGHT_DECAY,
    EARLY_STOPPING_PATIENCE
)

def train_one_epoch(
    model,
    train_loader,
    criterion,
    optimizer,
    device
):
    """
    Train the model for one epoch.

    Parameters
    ----------
    model : torch.nn.Module
        Neural network model.

    train_loader : DataLoader
        Training data loader.

    criterion : Loss Function

    optimizer : Optimizer

    device : torch.device

    Returns
    -------
    average_loss : float

    average_accuracy : float
    """

    # Put model into training mode
    model.train()

    running_loss = 0.0
    running_accuracy = 0.0

    # Loop through every batch
    for images, labels in tqdm(train_loader, desc="Training", leave=False):

        # Move data to GPU/CPU
        images = images.to(device)
        labels = labels.to(device)

        # Forward Pass
        outputs = model(images)

        # Calculate Loss
        loss = criterion(outputs, labels)

        # Clear previous gradients
        optimizer.zero_grad()

        # Backpropagation
        loss.backward()

        # Update model weights
        optimizer.step()

        # Store batch statistics
        running_loss += loss.item()
        running_accuracy += calculate_accuracy(outputs, labels)

    # Calculate average statistics
    average_loss = running_loss / len(train_loader)
    average_accuracy = running_accuracy / len(train_loader)

    return average_loss, average_accuracy

def validate_one_epoch(
    model,
    val_loader,
    criterion,
    device
):
    """
    Validate the model for one epoch.

    Parameters
    ----------
    model : torch.nn.Module

    val_loader : DataLoader

    criterion : Loss Function

    device : torch.device

    Returns
    -------
    average_loss : float

    average_accuracy : float
    """

    # Put model into evaluation mode
    model.eval()

    running_loss = 0.0
    running_accuracy = 0.0

    # Disable gradient calculations
    with torch.no_grad():

        # Loop through validation batches
        for images, labels in tqdm(
            val_loader,
            desc="Validation",
            leave=False
        ):

            # Move data to GPU
            images = images.to(device)
            labels = labels.to(device)

            # Forward pass
            outputs = model(images)

            # Calculate loss
            loss = criterion(outputs, labels)

            # Store statistics
            running_loss += loss.item()
            running_accuracy += calculate_accuracy(outputs, labels)

    average_loss = running_loss / len(val_loader)
    average_accuracy = running_accuracy / len(val_loader)

    return average_loss, average_accuracy

def main():

    set_seed()

    device = get_device()

    print(f"\nUsing device: {device}")

    train_loader, val_loader, test_loader, class_names = get_dataloaders()

    print(f"Classes: {len(class_names)}")

    model = build_model()

    count_trainable_parameters(model)

    criterion = nn.CrossEntropyLoss()

    optimizer = Adam(
        model.parameters(),
        lr=LEARNING_RATE,
        weight_decay=WEIGHT_DECAY
    )

    scheduler = ReduceLROnPlateau(
        optimizer,
        mode="max",
        factor=0.5,
        patience=2
    )

    best_val_accuracy = 0.0

    train_losses = []
    train_accuracies = []

    val_losses = []
    val_accuracies = []

    patience_counter = 0
    
    print("\nStarting Training...\n")

    for epoch in range(EPOCHS):

        print("=" * 60)
        print(f"Epoch {epoch + 1}/{EPOCHS}")
        print("=" * 60)

        train_loss, train_accuracy = train_one_epoch(
            model,
            train_loader,
            criterion,
            optimizer,
            device
        )

        val_loss, val_accuracy = validate_one_epoch(
            model,
            val_loader,
            criterion,
            device
        )

        train_losses.append(train_loss)
        train_accuracies.append(train_accuracy)

        val_losses.append(val_loss)
        val_accuracies.append(val_accuracy)

        scheduler.step(val_accuracy)

        current_lr = optimizer.param_groups[0]["lr"]

        print(f"Learning Rate          : {current_lr:.6f}")
        print(f"Train Loss              : {train_loss:.4f}")
        print(f"Train Accuracy          : {train_accuracy:.2f}%")
        print(f"Validation Loss         : {val_loss:.4f}")
        print(f"Validation Accuracy     : {val_accuracy:.2f}%")

        if val_accuracy > best_val_accuracy:

            best_val_accuracy = val_accuracy

            patience_counter = 0

            save_checkpoint(model)

            print(f"New Best Model Saved! ({best_val_accuracy:.2f}%)")

        else:

            patience_counter += 1

            print(f"No Improvement ({patience_counter}/{EARLY_STOPPING_PATIENCE})")

        if patience_counter >= EARLY_STOPPING_PATIENCE:

            print("\nEarly stopping triggered!")

            break

    print("\nTraining Complete!")

    print(f"Best Validation Accuracy: {best_val_accuracy:.2f}%")

if __name__ == "__main__":
    main()