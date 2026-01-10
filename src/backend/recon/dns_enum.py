import dns.resolver

def resolve_domain(domain: str):
    records = {}

    for record_type in ["A", "AAAA", "MX", "NS"]:
        try:
            answers = dns.resolver.resolve(domain, record_type)
            records[record_type] = [str(r) for r in answers]
        except Exception:
            records[record_type] = []

    return records
