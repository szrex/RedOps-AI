from backend.ai_engine.tool_registry import TOOLS

def requires_human_approval(tool_name: str) -> bool:
    return TOOLS.get(tool_name, {}).get("requires_approval", True)
