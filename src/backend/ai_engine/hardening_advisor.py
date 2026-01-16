from backend.ai_engine.llm_client import call_llm
import json


def generate_hardening_advice(target: str, findings: list):
    """
    Returns structured hardening advice suitable for UI + PDF rendering.
    """

    prompt = f"""
You are a senior penetration tester and defensive security architect.

Target: {target}

Identified vulnerabilities and exposures:
{findings}

Your task:
- Produce SECURITY HARDENING ADVICE
- Each item MUST contain:
  1. A short, professional heading
  2. A clear explanation (4–5 sentences, paragraph form)
- Focus on REALISTIC defensive actions (config, access control, monitoring, architecture)
- DO NOT suggest exploit execution
- DO NOT include commands
- DO NOT include markdown

OUTPUT FORMAT (STRICT JSON ONLY):

[
  {{
    "title": "Short hardening heading",
    "description": "4–5 sentence paragraph explaining the risk and how to mitigate it."
  }}
]

Rules:
- Return ONLY valid JSON
- No extra text
- No markdown
"""

    response = call_llm(prompt)

    try:
        return json.loads(response)
    except Exception:
        # Failsafe to prevent UI crashes
        return [
            {
                "title": "Hardening Guidance Unavailable",
                "description": "The system was unable to generate structured hardening advice. Review findings manually and apply standard security best practices."
            }
        ]
