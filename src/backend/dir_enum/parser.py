import subprocess
from backend.auto.state import add_log, set_result

async def run_dir_enum(target: str):
    add_log("[DIR] Starting directory enumeration")

    cmd = [
        "python",
        "tools/dirsearch/dirsearch.py",
        "-u", target,
        "-e", "php,html,js,json,txt",
        "--format", "json",
        "--output", "dir_enum.json",
        "--quiet"
    ]

    subprocess.run(cmd, capture_output=True)

    try:
        with open("dir_enum.json", "r") as f:
            data = f.read()
            set_result("directory_enum", data)
            add_log("[DIR] Directory enumeration completed")
    except Exception as e:
        add_log(f"[DIR][ERROR] {str(e)}")
