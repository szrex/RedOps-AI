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
    asyncio.create_task(run_auto_pipeline(data.target))

    return {"status": "started", "target": data.target}

@router.get("/logs")
def get_auto_logs():
    return {
        "status": AUTO_STATE["status"],
        "logs": AUTO_STATE["logs"]
    }

@router.get("/results")
def get_auto_results():
    if AUTO_STATE["status"] != "DONE":
        raise HTTPException(status_code=404, detail="Results not ready")

    return {
        "status": AUTO_STATE["status"],
        "target": AUTO_STATE["target"],
        "results": AUTO_STATE["results"]
    }
