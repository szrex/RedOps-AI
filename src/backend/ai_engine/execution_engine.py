from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.report_generator import generate_ai_report


async def execute_tool(tool_name: str, target: str, context: dict) -> dict:
    """
    Executes a tool safely and returns updated context.
    """

    if tool_name == "recon":
        recon = ReconEngine(target)
        context["recon"] = await recon.run()

    elif tool_name == "vulnerability_assessment":
        va = VulnerabilityAssessmentEngine(context["recon"])
        context["vulnerability_assessment"] = va.run()

    elif tool_name == "ai_reporting":
        context["ai_report"] = generate_ai_report(
            target,
            context["vulnerability_assessment"]["findings"]
        )

    return context
