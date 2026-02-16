import os
import json
from datetime import datetime
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    ListFlowable,
    ListItem
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import A4
from reportlab.platypus import HRFlowable

from backend.auto.state import get_results
from backend.ai_engine.llm_client import call_llm


REPORT_DIR = os.path.join(os.getcwd(), "reports")
os.makedirs(REPORT_DIR, exist_ok=True)


def generate_executive_summary(results: dict):
    prompt = f"""
You are a senior cybersecurity consultant.

Generate a professional executive summary for a penetration test.

Target:
{results.get("recon", {}).get("meta", {}).get("target")}

Recon Summary:
{json.dumps(results.get("recon"), indent=2)}

Vulnerabilities:
{results.get("vulnerabilities")}

SQL Injection Findings:
{results.get("sqli")}

Keep it:
- Professional
- 20–35 lines
- Generate in well structured visually appelaing paragraphs for each phase
- Industry style
- No markdown
"""

    return call_llm(prompt)


def generate_pdf_report():
    results = get_results()

    target = results.get("recon", {}).get("meta", {}).get("target", "Unknown")
    filename = f"RedOps_Report_{target}_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf"
    filepath = os.path.join(REPORT_DIR, filename)

    doc = SimpleDocTemplate(
        filepath,
        pagesize=A4,
        rightMargin=40,
        leftMargin=40,
        topMargin=60,
        bottomMargin=40
    )

    elements = []

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=20,
        textColor=colors.HexColor("#111111"),
        spaceAfter=14
    )

    section_style = ParagraphStyle(
        'SectionStyle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor("#1f4e79"),
        spaceAfter=8
    )

    normal_style = styles["Normal"]

    # Title
    elements.append(Paragraph("RedOps AI Penetration Test Report", title_style))
    elements.append(Spacer(1, 0.3 * inch))
    elements.append(HRFlowable(width="100%", thickness=1, color=colors.grey))
    elements.append(Spacer(1, 0.3 * inch))

    # Executive Summary
    elements.append(Paragraph("Executive Summary", section_style))
    summary = generate_executive_summary(results)
    elements.append(Paragraph(summary, normal_style))
    elements.append(Spacer(1, 0.4 * inch))

    # Recon Section
    elements.append(Paragraph("Reconnaissance Findings", section_style))
    recon = results.get("recon", {})
    elements.append(Paragraph(json.dumps(recon, indent=2), normal_style))
    elements.append(Spacer(1, 0.4 * inch))

    # Vulnerabilities
    elements.append(Paragraph("Detected Vulnerabilities", section_style))
    vulns = results.get("vulnerabilities", [])

    if vulns:
        vuln_list = [
            ListItem(Paragraph(f"{v.get('name','Finding')} — {v.get('description','')}", normal_style))
            for v in vulns
        ]
        elements.append(ListFlowable(vuln_list, bulletType='bullet'))
    else:
        elements.append(Paragraph("No vulnerabilities detected.", normal_style))

    elements.append(Spacer(1, 0.4 * inch))

    # SQLi Findings
    elements.append(Paragraph("SQL Injection Analysis", section_style))
    sqli = results.get("sqli", [])

    if sqli:
        sqli_list = [
            ListItem(Paragraph(f"{s.get('endpoint')} — {s.get('details')}", normal_style))
            for s in sqli
        ]
        elements.append(ListFlowable(sqli_list, bulletType='bullet'))
    else:
        elements.append(Paragraph("No SQL injection vectors detected.", normal_style))

    elements.append(Spacer(1, 0.4 * inch))

    # Hardening Advice
    elements.append(Paragraph("Remediation Recommendations", section_style))
    advice = results.get("hardening_advice", [])

    if advice:
        advice_list = [
            ListItem(
                Paragraph(
                    f"<b>{a.get('title')}</b><br/>{a.get('description')}",
                    normal_style
                )
            )
            for a in advice
        ]
        elements.append(ListFlowable(advice_list, bulletType='bullet'))
    else:
        elements.append(Paragraph("No recommendations generated.", normal_style))

    doc.build(elements)

    return filepath
