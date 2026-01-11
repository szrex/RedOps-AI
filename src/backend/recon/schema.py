from datetime import datetime
from typing import Dict, Any

def base_recon_schema(target: str, target_type: str) -> Dict[str, Any]:
    return {
        "meta": {
            "target": target,
            "type": target_type,
            "timestamp": datetime.utcnow().isoformat() + "Z",
            "tool": "RedOps AI",
            "phase": "reconnaissance"
        },
        "data": {
            "dns": {},
            "whois": {},
            "http_headers": {}
        }
    }
