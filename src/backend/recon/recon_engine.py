from backend.recon.target import Target
from backend.recon.dns_enum import resolve_domain
from backend.recon.whois_lookup import get_whois
from backend.recon.http_fingerprint import get_http_headers

class ReconEngine:
    def __init__(self, target_value: str):
        self.target = Target(target_value)

    def run(self):
        if self.target.type == "unknown":
            raise ValueError("Invalid target provided")

        result = {
            "target": self.target.value,
            "type": self.target.type,
            "dns": {},
            "whois": {},
            "http_headers": {}
        }

        if self.target.type == "domain":
            result["dns"] = resolve_domain(self.target.value)
            result["whois"] = get_whois(self.target.value)
            result["http_headers"] = get_http_headers(self.target.value)

        return result
