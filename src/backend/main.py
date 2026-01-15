from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# ================= CORE IMPORTS =================
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.report_generator import generate_ai_report
from backend.ai_engine.agent_controller import agent_plan
from backend.ai_engine.execution_engine import execute_tool
from backend.ai_engine.execution_policy import can_execute
from backend.ai_engine.hardening_advisor import generate_hardening_advice

from backend.core.execution_mode import get_mode, set_mode
from backend.core.metrics import get_metrics
from backend.core.scan_registry import (
    register_scan,
    update_scan,
    list_scans,
    clear_scans,
)
from backend.core.live_logs import get_logs, log_event, clear_logs

# ================= AUTO MODE ROUTER =================
from backend.auto.auto_routes import router as auto_router


# ================= APP INIT (MUST BE FIRST) =================
app = FastAPI(
    title="RedOps AI",
    description="AI-assisted penetration testing orchestration platform",
    version="0.1.0"
)

# ================= MIDDLEWARE =================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= ROUTERS =================
app.include_router(auto_router)

# ================= ROOT =================
@app.get("/")
def root():
    return {"status": "RedOps AI backend running"}


# ================= RECON =================
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


# ================= VA =================
@app.post("/assess")
async def run_va(target: str):
    try:
        log_event("INFO", f"Vulnerability assessment started for {target}")

        recon = ReconEngine(target)
        recon_result = await recon.run()

        va = VulnerabilityAssessmentEngine(recon_result)
        va_result = va.run()

        update_scan(target, status="DONE", progress=100)
        log_event("AI", f"Risk analysis completed for {target}")

        return va_result

    except Exception as e:
        log_event("ERROR", str(e))
        raise HTTPException(status_code=500, detail=str(e))


# ================= REPORT =================
@app.post("/report")
async def generate_report(target: str):
    recon = ReconEngine(target)
    recon_data = await recon.run()

    va = VulnerabilityAssessmentEngine(recon_data)
    va_data = va.run()

    ai_report = generate_ai_report(target, va_data["findings"])

    return {
        "meta": va_data["meta"],
        "findings": va_data["findings"],
        "ai_report": ai_report["ai_report"],
    }


# ================= AGENT =================
@app.post("/agent/plan")
async def ai_agent_plan():
    return agent_plan({})


@app.post("/agent/execute")
async def ai_agent_execute(target: str, tool: str, requires_human_approval: bool):
    if not can_execute(tool, requires_human_approval):
        return {"status": "blocked", "message": "Human approval required"}

    context = await execute_tool(tool, target, {})
    return {"status": "executed", "context": context}


# ================= HARDENING =================
@app.post("/hardening")
async def ai_hardening_advice(target: str):
    recon = ReconEngine(target)
    recon_data = await recon.run()

    va = VulnerabilityAssessmentEngine(recon_data)
    va_data = va.run()

    advice = generate_hardening_advice(target, va_data["findings"])
    return {"target": target, "hardening_advice": advice}


# ================= DASHBOARD =================
@app.get("/dashboard/metrics")
def dashboard_metrics():
    return get_metrics()


@app.get("/dashboard/targets")
def dashboard_targets():
    return list_scans()


@app.post("/dashboard/targets/clear")
def dashboard_targets_clear():
    clear_scans()
    return {"status": "cleared"}


@app.get("/dashboard/logs")
def dashboard_logs():
    return get_logs()


@app.post("/dashboard/logs/clear")
def dashboard_logs_clear():
    clear_logs()
    return {"status": "cleared"}


# ================= EXECUTION MODE =================
@app.get("/mode")
def get_execution_mode():
    return {"mode": get_mode()}


@app.post("/mode")
def update_execution_mode(mode: str):
    try:
        set_mode(mode)
        return {"status": "updated", "mode": mode}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
