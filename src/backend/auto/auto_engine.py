from backend.auto.state import add_log, set_result, finish, fail
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.vulnerability_assessment.correlation_engine import correlate_findings
from backend.ai_engine.hardening_advisor import generate_hardening_advice
from backend.ai_engine.agent_controller import agent_plan
from backend.sqli.detector import run_sqli_detection


async def run_auto_pipeline(target: str):
    try:
        # ===================== RECON =====================
        add_log("[RECON] Running reconnaissance")
        recon_engine = ReconEngine(target)
        recon_result = await recon_engine.run()
        set_result("recon", recon_result)

        # ===================== DIRECTORY ENUM (DISABLED) =====================
        add_log("[DIR] Directory enumeration temporarily disabled")
        directories = []
        set_result("directory_enum", directories)

        # ===================== VULNERABILITY ASSESSMENT =====================
        add_log("[VA] Running vulnerability assessment")
        va_engine = VulnerabilityAssessmentEngine(recon_result)
        va_result = va_engine.run()

        # ===================== SQL INJECTION =====================
        add_log("[SQLi] Running SQL Injection checks")
        sqli_findings = run_sqli_detection(target)
        add_log(f"[SQLi] Found {len(sqli_findings)} potential issues")

        # merge SQLi into VA findings
        all_findings = va_result["findings"] + sqli_findings

        # ===================== CORRELATION =====================
        correlated = correlate_findings(
            recon=recon_result,
            vulnerabilities=all_findings,
            directories=directories
        )
        set_result("vulnerabilities", correlated)
        set_result("sqli", sqli_findings)

        # ===================== AI STRATEGY =====================
        add_log("[AI] Generating exploit strategy")
        strategy = agent_plan({
            "recon": recon_result,
            "directories": directories,
            "vulnerabilities": correlated
        })
        set_result("ai_strategy", strategy)

        # ===================== HARDENING ADVICE =====================
        add_log("[AI] Generating hardening advice")
        advice = generate_hardening_advice(
            target=target,
            recon=recon_result,
            findings=correlated,
            directories=directories
        )
        set_result("hardening_advice", advice)

        # ===================== DONE =====================
        add_log("[DONE] Automated pentest completed successfully")
        finish()

    except Exception as e:
        fail(str(e))
