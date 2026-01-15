AUTO_STATE = {
    "status": "IDLE",   # IDLE | RUNNING | DONE | ERROR
    "target": None,
    "logs": []
}

def reset_state(target: str):
    AUTO_STATE["status"] = "RUNNING"
    AUTO_STATE["target"] = target
    AUTO_STATE["logs"] = []

def add_log(msg: str):
    AUTO_STATE["logs"].append(msg)

def finish():
    AUTO_STATE["status"] = "DONE"

def fail(error: str):
    AUTO_STATE["status"] = "ERROR"
    AUTO_STATE["logs"].append(f"[ERROR] {error}")
