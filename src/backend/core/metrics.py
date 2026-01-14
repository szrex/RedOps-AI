METRICS = {
    "active_scans": 0,
    "critical": 0,
    "medium": 0,
    "assets": 0
}

def update_metrics(**kwargs):
    METRICS.update(kwargs)

def get_metrics():
    return METRICS
