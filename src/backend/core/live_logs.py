from collections import deque

LOG_BUFFER = deque(maxlen=200)

def log_event(level: str, message: str):
    LOG_BUFFER.append(f"[{level}] {message}")

def get_logs():
    return list(LOG_BUFFER)

def clear_logs():
    LOG_BUFFER.clear()

