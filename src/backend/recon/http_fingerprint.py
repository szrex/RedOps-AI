import httpx

async def get_http_headers(domain: str):
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            response = await client.get(f"http://{domain}")
            return dict(response.headers)
    except Exception:
        return {}
