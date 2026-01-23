import os
import shutil
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent

DELETED_DIRS = 0
DELETED_FILES = 0


def clean_pycache(root: Path):
    global DELETED_DIRS, DELETED_FILES

    for path in root.rglob("*"):
        try:
            # Remove __pycache__ directories
            if path.is_dir() and path.name == "__pycache__":
                shutil.rmtree(path)
                DELETED_DIRS += 1
                print(f"[DIR] Removed {path}")

            # Remove compiled Python files
            elif path.is_file() and path.suffix in {".pyc", ".pyo", ".pyd"}:
                path.unlink()
                DELETED_FILES += 1
                print(f"[FILE] Removed {path}")

        except Exception as e:
            print(f"[WARN] Failed to remove {path}: {e}")


if __name__ == "__main__":
    print(f"[START] Cleaning Python cache from: {PROJECT_ROOT}")
    clean_pycache(PROJECT_ROOT)
    print("\n[DONE]")
    print(f"Directories removed: {DELETED_DIRS}")
    print(f"Files removed: {DELETED_FILES}")
