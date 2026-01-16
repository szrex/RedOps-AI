AUTO_STATE = {
    "status": "IDLE",   # IDLE | RUNNING | DONE | ERROR
    "target": None,
    "logs": [],
    "results": {}
}

def reset_state(target: str):
    AUTO_STATE["status"] = "RUNNING"
    AUTO_STATE["target"] = target
    AUTO_STATE["logs"] = []
    AUTO_STATE["results"] = {}

def add_log(message: str):
    AUTO_STATE["logs"].append(message)

def set_result(key: str, value):
    AUTO_STATE["results"][key] = value

def finish():
    AUTO_STATE["status"] = "DONE"

def fail(error: str):
    AUTO_STATE["status"] = "ERROR"
    AUTO_STATE["logs"].append(f"[ERROR] {error}")
