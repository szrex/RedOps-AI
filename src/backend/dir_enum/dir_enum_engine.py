import json
import subprocess
import tempfile
import os

VALID_STATUSES = {200, 301, 302, 401, 403}

def run_dir_enum(target: str):
    with tempfile.NamedTemporaryFile(delete=False, suffix=".json") as tmp:
        output_file = tmp.name

    cmd = [
        "ffuf",
        "-u", f"{target}/FUZZ",
        "-w", "backend/dir_enum/wordlist.txt",
        "-mc", "200,301,302,401,403",
        "-of", "json",
        "-o", output_file
    ]

    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    with open(output_file, "r", encoding="utf-8") as f:
        raw = json.load(f)

    os.remove(output_file)

    # ✅ FILTER: keep only real directories
    discovered = []
    for r in raw.get("results", []):
        if r.get("status") in VALID_STATUSES:
            discovered.append({
                "path": r.get("input", {}).get("FUZZ"),
                "status": r.get("status"),
                "length": r.get("length")
            })

    return discovered
