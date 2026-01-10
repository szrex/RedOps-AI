import whois

def get_whois(domain: str):
    try:
        data = whois.whois(domain)
        return {
            "registrar": data.registrar,
            "creation_date": str(data.creation_date),
            "expiration_date": str(data.expiration_date),
            "name_servers": data.name_servers
        }
    except Exception:
        return {}
