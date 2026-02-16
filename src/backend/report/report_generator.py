import os
from datetime import datetime
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Image,
    Table,
    TableStyle,
    ListFlowable,
    ListItem
)
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.lib import utils


def generate_pdf_report(results: dict, output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    elements = []

    styles = getSampleStyleSheet()

    title_style = styles["Heading1"]
    section_style = styles["Heading2"]

    normal_style = ParagraphStyle(
        "NormalStyle",
        parent=styles["Normal"],
        fontSize=11,
        leading=15
    )

    small_style = ParagraphStyle(
        "SmallStyle",
        parent=styles["Normal"],
        fontSize=9,
        textColor=colors.grey
    )

    # -------------------------
    # BANNER IMAGE
    # -------------------------
    banner_path = os.path.join("assets", "report_banner.png")

    if os.path.exists(banner_path):
        img = Image(banner_path, width=6.5 * inch, height=1.2 * inch)
        elements.append(img)
        elements.append(Spacer(1, 20))

    # -------------------------
    # TITLE
    # -------------------------
    elements.append(Paragraph("RedOps AI Security Assessment Report", title_style))
    elements.append(Spacer(1, 12))

    elements.append(Paragraph(
        f"Target: <b>{results.get('target', 'N/A')}</b>",
        normal_style
    ))
    elements.append(Paragraph(
        f"Date: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
        normal_style
    ))

    elements.append(Spacer(1, 25))

    # -------------------------
    # EXECUTIVE SUMMARY
    # -------------------------
    elements.append(Paragraph("Executive Summary", section_style))
    elements.append(Spacer(1, 10))

    summary_text = """
This report presents the findings of an automated security assessment conducted
by RedOps AI. The evaluation included reconnaissance, vulnerability analysis,
SQL injection detection, and AI-assisted risk correlation.

The objective of this assessment was to identify potential weaknesses,
misconfigurations, and exposed attack surfaces that could be exploited by
malicious actors.
"""

    elements.append(Paragraph(summary_text, normal_style))
    elements.append(Spacer(1, 20))

    # -------------------------
    # VULNERABILITIES
    # -------------------------
    elements.append(Paragraph("Detected Vulnerabilities", section_style))
    elements.append(Spacer(1, 10))

    vulns = results.get("results", {}).get("vulnerabilities", [])

    if vulns:
        for v in vulns:
            elements.append(Paragraph(f"<b>{v.get('name', 'Finding')}</b>", normal_style))
            elements.append(Spacer(1, 5))
            elements.append(Paragraph(v.get("description", ""), normal_style))
            elements.append(Spacer(1, 12))
    else:
        elements.append(Paragraph("No critical vulnerabilities were detected.", normal_style))

    elements.append(Spacer(1, 20))

    # -------------------------
    # SQL INJECTION
    # -------------------------
    elements.append(Paragraph("SQL Injection Findings", section_style))
    elements.append(Spacer(1, 10))

    sqli = results.get("results", {}).get("sqli", [])

    if sqli:
        for s in sqli:
            elements.append(Paragraph(
                f"<b>Parameter:</b> {s.get('parameter', 'Unknown')}",
                normal_style
            ))
            elements.append(Spacer(1, 4))
            elements.append(Paragraph(s.get("description", ""), normal_style))
            elements.append(Spacer(1, 10))
    else:
        elements.append(Paragraph("No SQL injection vectors were identified.", normal_style))

    elements.append(Spacer(1, 20))

    # -------------------------
    # HARDENING ADVICE
    # -------------------------
    elements.append(Paragraph("Hardening Recommendations", section_style))
    elements.append(Spacer(1, 10))

    hardening = results.get("results", {}).get("hardening_advice", [])

    if hardening:
        for item in hardening:
            elements.append(Paragraph(f"<b>{item.get('title')}</b>", normal_style))
            elements.append(Spacer(1, 5))
            elements.append(Paragraph(item.get("description"), normal_style))
            elements.append(Spacer(1, 15))
    else:
        elements.append(Paragraph("No specific hardening recommendations available.", normal_style))

    elements.append(Spacer(1, 30))

    # -------------------------
    # CLOSING SIGNATURE
    # -------------------------
    closing_text = """
If you have any questions or would like further clarification regarding this report,
please do not hesitate to contact us.

Sincerely,<br/>
<b>Sreyas S</b><br/>
Penetration Tester<br/>
RedOps-AI
"""

    elements.append(Paragraph(closing_text, normal_style))

    elements.append(Spacer(1, 20))

    elements.append(Paragraph(
        "Confidential – Authorized Security Assessment Only",
        small_style
    ))

    doc.build(elements)
