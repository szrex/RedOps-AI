import re

class Target:
    def __init__(self, value: str):
        self.value = value
        self.type = self._detect_type()

    def _detect_type(self):
        if self._is_ip():
            return "ip"
        if self._is_cidr():
            return "cidr"
        if self._is_domain():
            return "domain"
        return "unknown"

    def _is_ip(self):
        ip_regex = r"^(?:\d{1,3}\.){3}\d{1,3}$"
        return re.match(ip_regex, self.value)

    def _is_cidr(self):
        cidr_regex = r"^(?:\d{1,3}\.){3}\d{1,3}/\d{1,2}$"
        return re.match(cidr_regex, self.value)

    def _is_domain(self):
        domain_regex = r"^(?!-)[A-Za-z0-9-]{1,63}(?:\.[A-Za-z]{2,})+$"
        return re.match(domain_regex, self.value)
