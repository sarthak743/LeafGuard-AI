from pathlib import Path

import torch
from torch.utils.data import DataLoader
from torchvision import datasets, transforms

# ==========================================================
# Configuration
# ==========================================================

from config import IMAGE_SIZE, BATCH_SIZE, NUM_WORKERS

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data" / "processed"

TRAIN_DIR = DATA_DIR / "train"
VAL_DIR = DATA_DIR / "val"
TEST_DIR = DATA_DIR / "test"

# ==========================================================
# Image Transformations
# ==========================================================

train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(15),
    transforms.ColorJitter(
        brightness=0.2,
        contrast=0.2,
        saturation=0.2,
        hue=0.1
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

test_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
])

# ==========================================================
# Datasets
# ==========================================================

train_dataset = datasets.ImageFolder(
    root=TRAIN_DIR,
    transform=train_transform
)

val_dataset = datasets.ImageFolder(
    root=VAL_DIR,
    transform=test_transform
)

test_dataset = datasets.ImageFolder(
    root=TEST_DIR,
    transform=test_transform
)

# ==========================================================
# DataLoaders
# ==========================================================

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=NUM_WORKERS,
    pin_memory=torch.cuda.is_available()
)

val_loader = DataLoader(
    val_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS,
    pin_memory=torch.cuda.is_available()
)

test_loader = DataLoader(
    test_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=NUM_WORKERS,
    pin_memory=torch.cuda.is_available()
)

# ==========================================================
# Utility Function
# ==========================================================

def get_dataloaders():
    """
    Returns:
        train_loader, val_loader, test_loader, class_names
    """
    class_names = train_dataset.classes

    return (
        train_loader,
        val_loader,
        test_loader,
        class_names
    )


# ==========================================================
# Test the Pipeline
# ==========================================================

if __name__ == "__main__":

    train_loader, val_loader, test_loader, class_names = get_dataloaders()

    print("=" * 50)
    print(f"Number of classes : {len(class_names)}")
    print(f"Training images   : {len(train_dataset)}")
    print(f"Validation images : {len(val_dataset)}")
    print(f"Testing images    : {len(test_dataset)}")
    print("=" * 50)

    images, labels = next(iter(train_loader))

    print(f"Image Batch Shape : {images.shape}")
    print(f"Label Batch Shape : {labels.shape}")