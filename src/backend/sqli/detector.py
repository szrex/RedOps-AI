from backend.sqli.sqli_engine import detect_sqli


def run_sqli_detection(target_url: str):
    if not target_url.startswith("http"):
        return []

    return detect_sqli(target_url)
