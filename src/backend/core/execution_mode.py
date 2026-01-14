EXECUTION_MODE = "HUMAN"  # HUMAN | AUTO

def set_mode(mode: str):
    global EXECUTION_MODE
    if mode not in ["HUMAN", "AUTO"]:
        raise ValueError("Invalid execution mode")
    EXECUTION_MODE = mode

def get_mode():
    return EXECUTION_MODE
