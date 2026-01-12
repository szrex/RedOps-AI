from backend.ai_engine.llm_client import call_llm


def generate_hardening_advice(target: str, findings: list) -> str:
    prompt = f"""
You are a senior security engineer.

Target: {target}

The following vulnerabilities were identified:
{findings}

Tasks:
1. Recommend patches or upgrades
2. Suggest configuration hardening
3. Propose compensating security controls
4. Do NOT suggest automatic execution

Output must be clear, safe, and professional.
"""

    return call_llm(prompt)
