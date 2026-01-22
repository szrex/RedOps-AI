from backend.auto.state import add_log, set_result, finish, fail
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.hardening_advisor import generate_hardening_advice
from backend.ai_engine.agent_controller import agent_plan
from backend.dir_enum.ferox_engine import run_feroxbuster
from backend.vulnerability_assessment.correlation_engine import correlate_findings




async def run_auto_pipeline(target: str):
    try:
        # RECON
        add_log("[RECON] Running reconnaissance")
        recon_engine = ReconEngine(target)
        recon_result = await recon_engine.run()
        set_result("recon", recon_result)

        # DIRECTORY ENUMERATION
        add_log("[DIR] Directory enumeration temporarily disabled")
        directories = "Directory Enumeration is disabled temporarily"
        set_result("directory_enum", directories)


        # VULNERABILITY ASSESSMENT
        add_log("[VA] Running vulnerability assessment")
        va_engine = VulnerabilityAssessmentEngine(
        recon_result=recon_result,
         directories=directories
        )

        va_result = va_engine.run()

        correlated = correlate_findings(
        recon=recon_result,
        vulnerabilities=va_result["findings"],
        directories=directories
        )

        set_result("vulnerabilities", correlated)

        from backend.vulnerability_assessment.sql_risk_engine import analyze_sql_injection_risk

        sql_risks = analyze_sql_injection_risk(
        target=target,
        recon=recon_result,
        directories=directories
        )

        va_result["findings"].extend(sql_risks)


        # AI STRATEGY
        add_log("[AI] Generating exploit strategy")
        strategy = agent_plan({
            "recon": recon_result,
            "directories": directories,
            "vulnerabilities": va_result["findings"]
        })
        set_result("ai_strategy", strategy)

        # HARDENING ADVICE
        add_log("[AI] Generating hardening advice")
        advice = generate_hardening_advice(
            target=target,
             recon=recon_result,
            findings=va_result["findings"],
            directories=directories
        )
        set_result("hardening_advice", advice)

        add_log("[DONE] Automated pentest completed successfully")
        finish()

    except Exception as e:
        fail(str(e))
