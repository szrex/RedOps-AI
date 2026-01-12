from backend.ai_engine.llm_client import call_llm


def build_prompt(target: str, findings: list) -> str:
    return f"""
You are a senior penetration tester.

Target: {target}

The following vulnerabilities were identified:

{findings}

Tasks:
1. Explain each vulnerability in simple but professional language
2. Describe potential impact
3. Provide remediation advice
4. Write an executive summary at the end

Output must be structured and professional.
"""


def generate_ai_report(target: str, findings: list) -> dict:
    prompt = build_prompt(target, findings)
    ai_text = call_llm(prompt)

    return {
        "target": target,
        "ai_report": ai_text
    }
