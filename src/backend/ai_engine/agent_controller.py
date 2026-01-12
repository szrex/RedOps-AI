from backend.ai_engine.decision_engine import decide_next_actions
from backend.ai_engine.approval_gate import requires_human_approval


def agent_plan(context: dict) -> dict:
    """
    Returns what the AI recommends, not what it executes.
    """

    recommendations = decide_next_actions(context)

    plan = []

    for tool in recommendations:
        plan.append({
            "tool": tool,
            "requires_human_approval": requires_human_approval(tool)
        })

    return {
        "recommended_actions": plan
    }
