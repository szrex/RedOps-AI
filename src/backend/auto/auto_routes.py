import asyncio
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.auto.state import AUTO_STATE, reset_state
from backend.auto.auto_engine import run_auto_pipeline

router = APIRouter(prefix="/auto", tags=["Auto Pentest"])

class TargetIn(BaseModel):
    target: str

@router.post("/start")
async def start_auto_scan(data: TargetIn):
    if AUTO_STATE["status"] == "RUNNING":
        raise HTTPException(status_code=400, detail="Scan already running")

    reset_state(data.target)

    # 🔥 RUN AS BACKGROUND TASK
    asyncio.create_task(run_auto_pipeline(data.target))

    return {
        "status": "started",
        "target": data.target
    }

@router.get("/logs")
def get_auto_logs():
    return {
        "status": AUTO_STATE["status"],
        "logs": AUTO_STATE["logs"]
    }
