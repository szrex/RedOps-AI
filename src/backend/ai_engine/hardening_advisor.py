from backend.ai_engine.llm_client import call_llm
import json


def generate_hardening_advice(
    target: str,
    recon: dict,
    findings: list,
    directories: list
) -> list[dict]:

    prompt = f"""
You are a senior penetration tester writing a remediation report.

Target:
{target}

Reconnaissance summary:
{json.dumps(recon, indent=2)}

Discovered directories:
{directories}

Identified vulnerabilities:
{json.dumps(findings, indent=2)}

TASK:
Generate realistic, target-specific hardening advice.

RULES:
- Return STRICT JSON ARRAY
- Each item must contain:
  - title
  - description (8–25 lines, professional, technical, actionable)
- Advice MUST reference recon data or discovered directories
- Focus on real risks inferred from:
  - HTTP headers
  - DNS / hosting provider
  - Application exposure
  - SQL injection risks
- NO generic security tips
- NO markdown
"""

    raw = call_llm(prompt)

    try:
        parsed = json.loads(raw)
        if isinstance(parsed, list):
            return parsed
    except Exception:
        pass

    # Fallback (never break pipeline)
    return [{
        "title": "Manual Security Review Recommended",
        "description": raw
    }]
