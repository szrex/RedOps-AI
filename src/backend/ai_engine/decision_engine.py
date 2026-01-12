def decide_next_actions(context: dict) -> list:
    """
    Decide recommended next steps based on available context.
    This does NOT execute anything.
    """

    recommendations = []

    if "recon" not in context:
        recommendations.append("recon")
        return recommendations

    if "vulnerability_assessment" not in context:
        recommendations.append("vulnerability_assessment")

    if "ai_report" not in context:
        recommendations.append("ai_reporting")

    return recommendations
