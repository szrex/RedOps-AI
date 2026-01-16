from pathlib import Path

TMP_DIR = Path("backend/tmp")

def ensure_tmp_dir():
    TMP_DIR.mkdir(parents=True, exist_ok=True)
    return TMP_DIR
