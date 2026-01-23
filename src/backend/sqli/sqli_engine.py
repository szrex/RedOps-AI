import requests
from urllib.parse import urlparse, parse_qs, urlencode
from backend.sqli.payloads import SQLI_PAYLOADS, SQL_ERROR_SIGNATURES

HEADERS = {
    "User-Agent": "RedOps-AI-SQLi-Scanner"
}

TIMEOUT = 10


def inject_payload(url: str, param: str, payload: str):
    parsed = urlparse(url)
    query = parse_qs(parsed.query)

    query[param] = payload
    new_query = urlencode(query, doseq=True)

    injected_url = f"{parsed.scheme}://{parsed.netloc}{parsed.path}?{new_query}"

    try:
        res = requests.get(injected_url, headers=HEADERS, timeout=TIMEOUT)
        return res.text.lower()
    except Exception:
        return ""


def detect_sqli(url: str):
    parsed = urlparse(url)
    params = parse_qs(parsed.query)

    findings = []

    if not params:
        return findings

    for param in params:
        for payload in SQLI_PAYLOADS:
            response = inject_payload(url, param, payload)

            for signature in SQL_ERROR_SIGNATURES:
                if signature in response:
                    findings.append({
                        "type": "SQL Injection",
                        "parameter": param,
                        "payload": payload,
                        "evidence": signature,
                        "risk": "High",
                        "impact": "Database compromise, data leakage, authentication bypass"
                    })
                    break

    return findings
