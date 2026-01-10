import requests

def get_http_headers(domain: str):
    try:
        response = requests.get(f"http://{domain}", timeout=5)
        return dict(response.headers)
    except Exception:
        return {}
