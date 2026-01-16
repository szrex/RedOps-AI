from backend.auto.state import add_log, set_result, finish, fail
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.hardening_advisor import generate_hardening_advice
from backend.ai_engine.agent_controller import agent_plan

async def run_auto_pipeline(target: str):
    try:
        add_log("[RECON] Running reconnaissance")
        recon = ReconEngine(target)
        recon_result = await recon.run()
        set_result("recon", recon_result)

        add_log("[VA] Running vulnerability assessment")
        va_engine = VulnerabilityAssessmentEngine(recon_result)
        va_result = va_engine.run()
        set_result("vulnerabilities", va_result["findings"])

        add_log("[AI] Generating exploit strategy")
        ai_strategy = agent_plan({"recon": recon_result, "va": va_result})
        set_result("ai_strategy", ai_strategy)

        add_log("[AI] Generating hardening advice")
        advice = generate_hardening_advice(target, va_result["findings"])
        set_result("hardening_advice", advice)

        add_log("[DONE] Automated pentest completed successfully")
        finish()

    except Exception as e:
        fail(str(e))
