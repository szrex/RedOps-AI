from backend.auto.state import add_log, set_result, finish, fail
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.agent_controller import agent_plan
from backend.ai_engine.hardening_advisor import generate_hardening_advice

from backend.dir_enum.dir_enum_engine import run_dir_enum

async def run_auto_pipeline(target: str):
    try:
        add_log("[RECON] Running reconnaissance")
        recon = ReconEngine(target)
        recon_result = await recon.run()
        set_result("recon", recon_result)

        add_log("[DIR] Running directory enumeration")
        dir_enum = run_dir_enum(target)
        set_result("directory_enum", dir_enum)

        

        add_log("[VA] Running vulnerability assessment")
        va = VulnerabilityAssessmentEngine(recon_result)
        va_result = va.run()
        set_result("vulnerabilities", va_result["findings"])

        add_log("[AI] Generating attack strategy")
        strategy = agent_plan({
            "recon": recon_result,
            "directories": dir_enum,
            "vulnerabilities": va_result
        })
        set_result("ai_strategy", strategy)

        add_log("[AI] Generating hardening advice")
        hardening = generate_hardening_advice(
            target,
            va_result["findings"],
            extra_context={"directories": dir_enum}
        )
        set_result("hardening_advice", hardening)

        add_log("[DONE] Automated pentest completed successfully")
        finish()

    except Exception as e:
        fail(str(e))
