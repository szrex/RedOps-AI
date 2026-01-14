from fastapi import FastAPI, HTTPException
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.risk_reasoner import prioritize_findings
from backend.ai_engine.report_generator import generate_ai_report
from backend.ai_engine.agent_controller import agent_plan
from backend.ai_engine.execution_engine import execute_tool
from backend.ai_engine.execution_policy import can_execute
from backend.ai_engine.hardening_advisor import generate_hardening_advice
from fastapi.middleware.cors import CORSMiddleware
from backend.core.execution_mode import get_mode, set_mode
from backend.core.metrics import get_metrics
from backend.core.metrics import update_metrics
from backend.core.scan_registry import (
    register_scan,
    update_scan,
    list_scans
)
from backend.core.scan_registry import clear_scans
from backend.core.live_logs import get_logs, log_event, clear_logs



app = FastAPI(
    title="RedOps AI",
    description="AI-assisted penetration testing orchestration platform",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "RedOps AI backend running"}

@app.post("/recon")
async def run_recon(target: str):
    try:
        register_scan(target)
        log_event("INFO", f"Recon started for {target}")

        engine = ReconEngine(target)
        result = await engine.run()

        update_scan(target, status="ACTIVE", progress=50)
        log_event("SCAN", f"Recon completed for {target}")

        return result

    except Exception as e:
        log_event("ERROR", str(e))
        raise HTTPException(status_code=500, detail=str(e))




@app.post("/assess")
async def run_va(target: str):
    try:
        log_event("INFO", f"Vulnerability assessment started for {target}")

        recon_engine = ReconEngine(target)
        recon_result = await recon_engine.run()

        va_engine = VulnerabilityAssessmentEngine(recon_result)
        va_result = va_engine.run()

        update_scan(target, status="DONE", progress=100)
        log_event("AI", f"Risk analysis completed for {target}")

        return va_result

    except ValueError as e:
        log_event("ERROR", str(e))
        raise HTTPException(status_code=400, detail=str(e))

    
@app.post("/report")
async def generate_report(target: str):
    try:
        recon_engine = ReconEngine(target)
        recon_result = await recon_engine.run()

        va_engine = VulnerabilityAssessmentEngine(recon_result)
        va_result = va_engine.run()

        ai_report = generate_ai_report(
            target,
            va_result["findings"]
        )

        return {
            "meta": va_result["meta"],
            "findings": va_result["findings"],
            "ai_report": ai_report["ai_report"]
        }

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.post("/agent/plan")
async def ai_agent_plan(target: str):
    context = {}

    return agent_plan(context)

@app.post("/agent/execute")
async def ai_agent_execute(
    target: str,
    tool: str,
    requires_human_approval: bool
):
    context = {}

    if not can_execute(tool, requires_human_approval):
        return {
            "status": "blocked",
            "message": "Human approval required before execution"
        }

    context = await execute_tool(tool, target, context)

    return {
        "status": "executed",
        "context": context
    }

@app.post("/hardening")
async def ai_hardening_advice(target: str):
    recon = ReconEngine(target)
    recon_data = await recon.run()

    va = VulnerabilityAssessmentEngine(recon_data)
    va_data = va.run()

    advice = generate_hardening_advice(
        target,
        va_data["findings"]
    )

    return {
        "target": target,
        "hardening_advice": advice
    }
@app.get("/dashboard/metrics")
def dashboard_metrics():
    return {
        "active_scans": 12,
        "critical": 4,
        "medium": 27,
        "assets": 1204
    }


@app.get("/dashboard/targets")
def dashboard_targets():
    return list_scans()



@app.get("/dashboard/logs")
def dashboard_logs():
    return {
        "logs": [
            "[INFO] Target identified: 192.168.1.104",
            "[SCAN] Port 443 open, fingerprinting service",
            "[WARN] CVE-2023-44487 potential match",
            "[AI] Reasoning: analyzing exploit feasibility",
            "[SIM] Exploit attempt simulated (lab mode)"
        ]
    }

@app.get("/mode")
def get_execution_mode():
    """
    Returns current execution mode:
    HUMAN or AUTO
    """
    return {
        "mode": get_mode()
    }


@app.post("/mode")
def update_execution_mode(mode: str):
    """
    Update execution mode (HUMAN / AUTO)
    """
    try:
        set_mode(mode)
        return {
            "status": "updated",
            "mode": mode
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@app.get("/dashboard/metrics")
def dashboard_metrics():
    return get_metrics()

@app.get("/dashboard/targets")
def dashboard_targets():
    """
    Returns all live scan targets
    """
    return list_scans()

@app.post("/dashboard/targets/clear")
def clear_dashboard_targets():
    clear_scans()
    return {"status": "cleared"}

@app.get("/dashboard/logs")
def dashboard_logs():
    return get_logs()



@app.post("/dashboard/logs/clear")
def clear_dashboard_logs():
    clear_logs()
    return {"status": "cleared"}
