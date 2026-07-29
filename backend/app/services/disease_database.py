"""
disease_database.py

Loads the disease knowledge database once at import time
and provides a lookup function for the prediction pipeline.
"""

import json
import logging
from typing import Optional

from app.config import DISEASES_DB_PATH

logger = logging.getLogger(__name__)


# ==========================================================
# Load Database
# ==========================================================

def _load_disease_database() -> dict:
    """
    Load and validate diseases.json from disk.

    Returns
    -------
    dict
        Disease name -> disease info mapping.

    Raises
    ------
    FileNotFoundError
        If diseases.json does not exist.

    ValueError
        If the file contains invalid JSON or is empty.
    """

    if not DISEASES_DB_PATH.exists():
        raise FileNotFoundError(
            f"Disease database not found: {DISEASES_DB_PATH}"
        )

    with open(DISEASES_DB_PATH, "r") as file:
        try:
            data = json.load(file)
        except json.JSONDecodeError as e:
            raise ValueError(
                f"Invalid JSON in disease database: {e}"
            )

    if not data:
        raise ValueError(
            "Disease database is empty."
        )

    logger.info(
        f"Loaded disease database: {len(data)} entries "
        f"from {DISEASES_DB_PATH}"
    )

    return data


# Load once at import time
disease_database: dict = _load_disease_database()


# ==========================================================
# Lookup
# ==========================================================

def get_disease_info(disease_name: str) -> Optional[dict]:
    """
    Look up disease details by the ML class name.

    Parameters
    ----------
    disease_name : str
        The predicted class name (e.g. "Tomato___Early_blight").

    Returns
    -------
    dict or None
        Disease info dictionary, or None if not found.
    """

    info = disease_database.get(disease_name)

    if info is None:
        logger.warning(
            f"Disease '{disease_name}' not found in database."
        )

    return info


def get_display_name(disease_name: str) -> str:
    """
    Get the human-readable display name for a disease class.

    Parameters
    ----------
    disease_name : str
        The predicted class name (e.g. "Tomato___Early_blight").

    Returns
    -------
    str
        Display name (e.g. "Early Blight").
    """

    info = disease_database.get(disease_name)

    if info and "display_name" in info:
        return info["display_name"]

    return disease_name.replace("___", " - ").replace("_", " ")

