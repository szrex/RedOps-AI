from fastapi import FastAPI, HTTPException
from backend.recon.recon_engine import ReconEngine


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

