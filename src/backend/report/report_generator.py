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
    # SAFE ACCESS
    # -------------------------
    data = results.get("results", results)

    # -------------------------
    # COVER PAGE
    # -------------------------
    banner_path = os.path.join("assets", "report_banner.png")

    if os.path.exists(banner_path):
        img = Image(banner_path, width=6.5 * inch, height=1.2 * inch)
        elements.append(img)

    elements.append(Spacer(1, 30))

    elements.append(Paragraph("RedOps AI Security Assessment Report", title_style))
    elements.append(Spacer(1, 20))

    elements.append(Paragraph(
        f"Target: <b>{results.get('target', 'N/A')}</b>",
        normal_style
    ))

    elements.append(Paragraph(
        f"Date: {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}",
        normal_style
    ))

    elements.append(Spacer(1, 40))

    elements.append(Paragraph(
        "This report provides a comprehensive security assessment including reconnaissance, "
        "vulnerability analysis, and AI-driven remediation strategies.",
        normal_style
    ))

    from reportlab.platypus import PageBreak
    elements.append(PageBreak())

    # -------------------------
    # EXECUTIVE SUMMARY
    # -------------------------
    elements.append(Paragraph("Executive Summary", section_style))
    elements.append(Spacer(1, 10))

    vulns = data.get("vulnerabilities", [])

    elements.append(Paragraph(
        f"A total of <b>{len(vulns)}</b> vulnerabilities were identified. "
        "These issues may expose the system to potential exploitation if not addressed.",
        normal_style
    ))

    elements.append(Spacer(1, 20))

    # -------------------------
    # VULNERABILITIES (ENHANCED)
    # -------------------------
    elements.append(Paragraph("Detected Vulnerabilities", section_style))
    elements.append(Spacer(1, 10))

    if vulns:
        for v in vulns:

            severity = v.get("severity", "Medium")

            color = (
                colors.red if severity == "High" else
                colors.orange if severity == "Medium" else
                colors.green
            )

            table = Table([
                ["Name", v.get("name", "Finding")],
                ["Severity", severity],
                ["Description", v.get("description", "")]
            ], colWidths=[100, 350])

            table.setStyle(TableStyle([
                ("BACKGROUND", (0, 0), (-1, 0), color),
                ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
                ("GRID", (0, 0), (-1, -1), 0.5, colors.grey),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
            ]))

            elements.append(table)
            elements.append(Spacer(1, 15))

            # Attack scenario
            if v.get("attack"):
                elements.append(Paragraph("<b>Attack Scenario:</b>", normal_style))
                elements.append(Paragraph(v["attack"], normal_style))
                elements.append(Spacer(1, 10))

            # Exploit
            if v.get("exploit"):
                elements.append(Paragraph("<b>Exploitation:</b>", normal_style))
                elements.append(Paragraph(v["exploit"], normal_style))
                elements.append(Spacer(1, 15))

    else:
        elements.append(Paragraph("No vulnerabilities detected.", normal_style))

    elements.append(Spacer(1, 20))

    # -------------------------
    # SQLi
    # -------------------------
    elements.append(Paragraph("SQL Injection Findings", section_style))
    elements.append(Spacer(1, 10))

    sqli = data.get("sqli", [])

    if sqli:
        for s in sqli:
            elements.append(Paragraph(
                f"<b>Parameter:</b> {s.get('parameter', 'Unknown')}",
                normal_style
            ))
            elements.append(Paragraph(s.get("description", ""), normal_style))
            elements.append(Spacer(1, 10))
    else:
        elements.append(Paragraph("No SQL injection vectors detected.", normal_style))

    elements.append(Spacer(1, 20))

    # -------------------------
    # HARDENING
    # -------------------------
    elements.append(Paragraph("Hardening Recommendations", section_style))
    elements.append(Spacer(1, 10))

    hardening = data.get("hardening_advice", [])

    if hardening:
        for h in hardening:
            elements.append(Paragraph(f"<b>{h.get('title')}</b>", normal_style))
            elements.append(Spacer(1, 5))

            desc = h.get("description") or "No description provided."

            for line in desc.split(". "):
                if len(line.strip()) > 15:
                    elements.append(Paragraph(line.strip() + ".", normal_style))
                    elements.append(Spacer(1, 5))

            elements.append(Spacer(1, 10))
    else:
        elements.append(Paragraph("No recommendations available.", normal_style))

    elements.append(Spacer(1, 40))

    # -------------------------
    # FOOTER
    # -------------------------
    elements.append(Paragraph(
        "If you have any questions or would like further clarification regarding this report, "
        "please do not hesitate to contact us.",
        normal_style
    ))

    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "<b>Sreyas S</b><br/>Penetration Tester<br/>RedOps-AI",
        normal_style
    ))

    elements.append(Spacer(1, 10))

    elements.append(Paragraph(
        "Confidential – Authorized Security Assessment Only",
        small_style
    ))

    doc.build(elements)