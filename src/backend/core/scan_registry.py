# src/backend/core/scan_registry.py

SCANS = []

def register_scan(target: str):
    scan = {
        "target": target,
        "status": "ENUM",     # ENUM | ACTIVE | DONE
        "progress": 0
    }
    SCANS.append(scan)
    return scan

def update_scan(target: str, **updates):
    for scan in SCANS:
        if scan["target"] == target:
            scan.update(updates)
            return scan
    return None

def list_scans():
    return SCANS

def clear_scans():
    SCANS.clear()
