import requests
import json

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "mistral"


def call_llm(prompt: str) -> str:
    payload = {
        "model": MODEL_NAME,
        "prompt": prompt,
        "stream": False
    }

    response = requests.post(
        OLLAMA_URL,
        headers={"Content-Type": "application/json"},
        data=json.dumps(payload),
        timeout=120
    )

    response.raise_for_status()
    return response.json()["response"]
