"""
evaluate.py

Evaluate the trained LeafGuard model on the
test dataset.
"""

import json
import matplotlib.pyplot as plt
import torch

from tqdm import tqdm

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    precision_score,
    recall_score,
    f1_score
)

from dataset import get_dataloaders
from model import build_model, get_device
from utils import load_checkpoint

from config import (
    METRICS_DIR,
    PLOTS_DIR
)


def main():
    """
    Evaluate the trained model on the test dataset.
    """

    # Select CPU/GPU
    device = get_device()

    print(f"\nUsing device: {device}")

    # Load test dataset
    _, _, test_loader, class_names = get_dataloaders()

    print(f"Classes: {len(class_names)}")

    # Build model architecture
    model = build_model()

    # Load trained weights
    model = load_checkpoint(model, device)

    # Switch model to evaluation mode
    model.eval()

    # Lists to store predictions and true labels
    all_predictions = []
    all_labels = []

    print("\nEvaluating Model...\n")

    # Disable gradient calculations
    with torch.no_grad():

        # Loop through every batch
        for images, labels in tqdm(
            test_loader,
            desc="Evaluating",
            leave=False
        ):

            # Move data to GPU/CPU
            images = images.to(device)
            labels = labels.to(device)

            # Forward pass
            outputs = model(images)

            # Get predicted class
            _, predictions = torch.max(outputs, dim=1)

            # Store predictions and ground truth labels
            all_predictions.extend(
                predictions.cpu().numpy()
            )

            all_labels.extend(
                labels.cpu().numpy()
            )

    # --------------------------------------------------
    # Calculate Evaluation Metrics
    # --------------------------------------------------

    accuracy = accuracy_score(
        all_labels,
        all_predictions
    )

    precision = precision_score(
        all_labels,
        all_predictions,
        average="weighted"
    )

    recall = recall_score(
        all_labels,
        all_predictions,
        average="weighted"
    )

    f1 = f1_score(
        all_labels,
        all_predictions,
        average="weighted"
    )

    # --------------------------------------------------
    # Print Results
    # --------------------------------------------------

    print("\nEvaluation Results")
    print("=" * 60)

    print(f"Accuracy           : {accuracy * 100:.2f}%")
    print(f"Precision          : {precision * 100:.2f}%")
    print(f"Recall             : {recall * 100:.2f}%")
    print(f"F1 Score           : {f1 * 100:.2f}%")

    # --------------------------------------------------
    # Generate Classification Report
    # --------------------------------------------------

    report = classification_report(
        all_labels,
        all_predictions,
        target_names=class_names
    )

    print("\nClassification Report\n")
    print(report)

    # Save report as text file
    report_path = METRICS_DIR / "classification_report.txt"

    with open(report_path, "w") as file:
        file.write(report)

    # --------------------------------------------------
    # Save Metrics as JSON
    # --------------------------------------------------

    metrics = {
        "accuracy": accuracy,
        "precision": precision,
        "recall": recall,
        "f1_score": f1
    }

    with open(
        METRICS_DIR / "metrics.json",
        "w"
    ) as file:

        json.dump(
            metrics,
            file,
            indent=4
        )

    # --------------------------------------------------
    # Generate Confusion Matrix
    # --------------------------------------------------

    cm = confusion_matrix(
        all_labels,
        all_predictions
    )

    plt.figure(figsize=(18, 18))

    plt.imshow(
        cm,
        cmap="Blues",
        interpolation="nearest"
    )

    # Add colour scale
    plt.colorbar()

    plt.title("Confusion Matrix")

    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")

    plt.tight_layout()

    plt.savefig(
        PLOTS_DIR / "confusion_matrix.png",
        dpi=300,
        bbox_inches="tight"
    )

    plt.close()

    # --------------------------------------------------
    # Completion Message
    # --------------------------------------------------

    print("\nEvaluation Complete!\n")

    print(f"Classification Report saved to:\n{report_path}")

    print(f"\nMetrics JSON saved to:\n{METRICS_DIR / 'metrics.json'}")

    print(f"\nConfusion Matrix saved to:\n{PLOTS_DIR / 'confusion_matrix.png'}")


if __name__ == "__main__":
    main()