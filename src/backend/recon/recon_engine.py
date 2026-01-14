import asyncio
from backend.recon.target import Target
from backend.recon.schema import base_recon_schema
from backend.recon.dns_enum import resolve_domain
from backend.recon.whois_lookup import get_whois
from backend.recon.http_fingerprint import get_http_headers
from backend.utils.logger import logger

# ✅ SINGLE import path
from backend.core.live_logs import log_event


class ReconEngine:
    def __init__(self, target_value: str):
        self.target = Target(target_value)

    async def run(self):
        logger.info(f"Starting recon for {self.target.value}")
        log_event("INFO", f"Starting recon for {self.target.value}")

        if self.target.type == "unknown":
            log_event("ERROR", "Invalid target provided")
            raise ValueError("Invalid target provided")

        result = base_recon_schema(
            self.target.value,
            self.target.type
        )

        if self.target.type == "domain":
            dns_task = asyncio.to_thread(resolve_domain, self.target.value)
            whois_task = asyncio.to_thread(get_whois, self.target.value)
            http_task = get_http_headers(self.target.value)

            dns, whois, headers = await asyncio.gather(
                dns_task, whois_task, http_task
            )

            result["data"]["dns"] = dns
            result["data"]["whois"] = whois
            result["data"]["http_headers"] = headers

        logger.info(f"Recon completed for {self.target.value}")
        log_event("SCAN", f"Recon completed for {self.target.value}")

        return result
