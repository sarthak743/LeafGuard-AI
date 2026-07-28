import json
import shutil
from pathlib import Path

from sklearn.model_selection import train_test_split
from tqdm import tqdm

# =====================================================
# CONFIG
# =====================================================

TRAIN_RATIO = 0.70
VAL_RATIO = 0.15
TEST_RATIO = 0.15

RANDOM_STATE = 42

BASE_DIR = Path(__file__).resolve().parent.parent

RAW_DIR = BASE_DIR / "data" / "raw" / "PlantVillage"
PROCESSED_DIR = BASE_DIR / "data" / "processed"

TRAIN_DIR = PROCESSED_DIR / "train"
VAL_DIR = PROCESSED_DIR / "val"
TEST_DIR = PROCESSED_DIR / "test"

CLASS_JSON = BASE_DIR / "data" / "class_names.json"

IMAGE_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".JPG",
    ".JPEG",
    ".PNG"
}


# =====================================================
# HELPER FUNCTIONS
# =====================================================

def get_image_files(folder):
    return sorted(
        [
            f for f in folder.iterdir()
            if f.is_file() and f.suffix in IMAGE_EXTENSIONS
        ]
    )


def copy_images(images, destination_folder):
    destination_folder.mkdir(parents=True, exist_ok=True)

    for img in images:
        shutil.copy2(img, destination_folder / img.name)


# =====================================================
# MAIN
# =====================================================

def main():

    print("=" * 60)
    print("LeafGuard Dataset Preparation")
    print("=" * 60)

    if not RAW_DIR.exists():
        raise FileNotFoundError(
            f"\nDataset not found.\nExpected:\n{RAW_DIR}"
        )

    # Delete old processed dataset
    if PROCESSED_DIR.exists():
        shutil.rmtree(PROCESSED_DIR)

    TRAIN_DIR.mkdir(parents=True)
    VAL_DIR.mkdir(parents=True)
    TEST_DIR.mkdir(parents=True)

    class_folders = sorted(
        [folder for folder in RAW_DIR.iterdir() if folder.is_dir()]
    )

    class_names = [folder.name for folder in class_folders]

    with open(CLASS_JSON, "w") as f:
        json.dump(class_names, f, indent=4)

    print(f"\nFound {len(class_names)} classes.\n")

    total_train = 0
    total_val = 0
    total_test = 0

    print("Splitting dataset\n")

    for class_folder in tqdm(class_folders):

        images = get_image_files(class_folder)

        if len(images) < 3:
            print(f"Skipping {class_folder.name} (not enough images)")
            continue

        train_imgs, temp_imgs = train_test_split(
            images,
            train_size=TRAIN_RATIO,
            random_state=RANDOM_STATE,
            shuffle=True
        )

        val_imgs, test_imgs = train_test_split(
            temp_imgs,
            test_size=0.5,
            random_state=RANDOM_STATE,
            shuffle=True
        )

        copy_images(
            train_imgs,
            TRAIN_DIR / class_folder.name
        )

        copy_images(
            val_imgs,
            VAL_DIR / class_folder.name
        )

        copy_images(
            test_imgs,
            TEST_DIR / class_folder.name
        )

        total_train += len(train_imgs)
        total_val += len(val_imgs)
        total_test += len(test_imgs)

        print(
            f"{class_folder.name:<35}"
            f"Train: {len(train_imgs):4}   "
            f"Val: {len(val_imgs):4}   "
            f"Test: {len(test_imgs):4}"
        )

    print("\n" + "=" * 60)
    print("Dataset Preparation Complete")
    print("=" * 60)

    print(f"Total Classes      : {len(class_names)}")
    print(f"Training Images    : {total_train}")
    print(f"Validation Images  : {total_val}")
    print(f"Testing Images     : {total_test}")

    print("\nGenerated:")
    print("processed/train")
    print("processed/val")
    print("processed/test")
    print("class_names.json")


if __name__ == "__main__":
    main()