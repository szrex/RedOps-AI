import subprocess
import os
import re

FEROX_PATH = r"C:\Users\crimb\AppData\Local\Microsoft\WinGet\Packages\epi052.feroxbuster_Microsoft.Winget.Source_8wekyb3d8bbwe\feroxbuster.exe"
WORDLIST = r"X:\RedOps-AI\wordlists\common.txt"


STATUS_REGEX = re.compile(r"Status:\s*(200|301|302|403)")
URL_REGEX = re.compile(r"(https?://[^\s]+)")

TRAILING_JUNK = ".,);]}>\"'"

def clean_url(url: str) -> str:
    return url.rstrip(TRAILING_JUNK)

def run_feroxbuster(target: str) -> list[str]:
    if not os.path.isfile(FEROX_PATH):
        raise RuntimeError(f"[FEROX] Binary not found: {FEROX_PATH}")

    if not os.path.isfile(WORDLIST):
        raise RuntimeError(f"[FEROX] Wordlist not found: {WORDLIST}")

    cmd = [
        FEROX_PATH,
        "-u", target,
        "-w", WORDLIST,
        "-s", "200,301,302,403",
        "-q",
        "--no-state"
    ]

    proc = subprocess.run(
        cmd,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        shell=False
    )

    if proc.returncode != 0:
        raise RuntimeError(proc.stderr)

    found = set()

    for line in proc.stdout.splitlines():
        # ONLY lines with HTTP status are valid findings
        if not STATUS_REGEX.search(line):
            continue

        match = URL_REGEX.search(line)
        if match:
            found.add(clean_url(match.group(1)))

    return sorted(found)