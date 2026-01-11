SEVERITY_SCORE = {
    "Low": 1,
    "Medium": 2,
    "High": 3,
    "Critical": 4
}

def prioritize_findings(findings: list):
    return sorted(
        findings,
        key=lambda f: SEVERITY_SCORE.get(f["severity"], 0),
        reverse=True
    )
