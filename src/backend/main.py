from fastapi import FastAPI, HTTPException
from backend.recon.recon_engine import ReconEngine
from backend.vulnerability_assessment.va_engine import VulnerabilityAssessmentEngine
from backend.ai_engine.risk_reasoner import prioritize_findings
from backend.ai_engine.report_generator import generate_ai_report



app = FastAPI(
    title="RedOps AI",
    description="AI-assisted penetration testing orchestration platform",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"status": "RedOps AI backend running"}

@app.post("/recon")
async def run_recon(target: str):
    try:
        engine = ReconEngine(target)
        return await engine.run()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/assess")
async def run_va(target: str):
    try:
        recon_engine = ReconEngine(target)
        recon_result = await recon_engine.run()

        va_engine = VulnerabilityAssessmentEngine(recon_result)
        va_result = va_engine.run()

        va_result["findings"] = prioritize_findings(va_result["findings"])
        return va_result

    except ValueError as e:
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
