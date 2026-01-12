EXECUTION_MODE = "HUMAN"  # Options: HUMAN | AUTO


def can_execute(tool_name: str, requires_approval: bool) -> bool:
    """
    Determines whether a tool can execute based on execution mode.
    """

    if EXECUTION_MODE == "AUTO":
        return True

    if EXECUTION_MODE == "HUMAN":
        return not requires_approval

    return False
