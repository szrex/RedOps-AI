import React from "react";
import { ShieldAlert, AlertTriangle, FileText, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Legal() {
  return (
    <div style={styles.container}>
      {/* CSS Animations */}
      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
*::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
* {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.hover-scale {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.05);
}

/* ... keep the rest of your glass-effect and glow-orb styles here ... */
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide {
          animation: slideUp 0.6s ease-out forwards;
        }
        .glass-panel {
          background: rgba(17, 17, 20, 0.8);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .red-alert-border {
          border-left: 4px solid #ef4444;
        }
      `}</style>

      {/* Header / Logo Area */}
      <header style={styles.header}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={styles.logoIcon}>
            <ShieldAlert size={20} color="white" />
          </div>
          <span style={styles.logoText}>
            RedOps <span style={{ color: "#3b82f6" }}>AI</span>
          </span>
        </div>
        <Link to="/" style={styles.backLink}>
          <ChevronLeft size={16} /> Back to Home
        </Link>
      </header>

      {/* Main Content Landscape Layout */}
      <main style={styles.main} className="animate-slide">
        <div className="glass-panel" style={styles.grid}>
          
          {/* Left Column: Warning & Critical Notice */}
          <div style={styles.leftCol} className="red-alert-border">
            <div style={styles.warningIcon}>
              <AlertTriangle size={32} color="#ef4444" />
            </div>
            <h1 style={styles.title}>Disclaimer</h1>
            <p style={styles.criticalText}>
              Unauthorized access to computer systems is a crime. By deploying the RedOps AI engine, 
              you confirm you have <strong>Explicit Written Permission</strong> from the target asset owner.
            </p>
            <div style={styles.terminalCode}>
              STATUS: LEGAL_CLEARANCE_REQUIRED <br />
              ID: ROE-2026-V.1.04
            </div>
          </div>

          {/* Right Column: Terms List */}
          <div style={styles.rightCol}>
            <section style={styles.section}>
              <h3 style={styles.sectionTitle}><FileText size={16} color="#3b82f6" /> 01. Limitation of Liability</h3>
              <p style={styles.text}>
                The developers of RedOps AI are not responsible for any damage, data loss, or legal 
                repercussions caused by the misuse of this automated security framework.
              </p>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}><FileText size={16} color="#3b82f6" /> 02. Ethical Use Policy</h3>
              <p style={styles.text}>
                This tool is for White-Hat security research and professional hardening only. 
                Any detected "Black-Hat" activity will result in a permanent hardware ID ban.
              </p>
            </section>

            <section style={styles.section}>
              <h3 style={styles.sectionTitle}><FileText size={16} color="#3b82f6" /> 03. Data Handling</h3>
              <p style={styles.text}>
                Local scan logs and reconnaissance data are stored on the host machine. 
                User is responsible for ensuring data privacy compliance (GDPR/SOC2).
              </p>
            </section>

            <Link to="/dashboard" style={styles.acceptBtn}>
              I UNDERSTAND & PROCEED
            </Link>
          </div>

        </div>
      </main>

      <footer style={styles.footer}>
        REDOPS AI LEGAL DIRECTIVE v1.0.4 — 2026
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0a0a0c",
    color: "#e2e8f0",
    fontFamily: "Inter, sans-serif",
    display: "flex",
    flexDirection: "column",
    padding: "0 40px",
  },
  header: {
    height: "100px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1100px",
    width: "100%",
    margin: "0 auto",
  },
  logoIcon: {
    height: "36px",
    width: "36px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: "22px",
    fontWeight: "800",
    color: "white",
    letterSpacing: "-0.5px",
  },
  backLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr",
    maxWidth: "1100px",
    width: "100%",
    minHeight: "500px",
    overflow: "hidden",
  },
  leftCol: {
    padding: "60px",
    backgroundColor: "rgba(239, 68, 68, 0.02)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  warningIcon: {
    marginBottom: "24px",
  },
  title: {
    fontSize: "36px",
    fontWeight: "900",
    marginBottom: "20px",
    color: "white",
    letterSpacing: "-1px",
  },
  criticalText: {
    fontSize: "18px",
    lineHeight: "1.6",
    color: "#cbd5e1",
    marginBottom: "32px",
  },
  terminalCode: {
    fontFamily: "monospace",
    fontSize: "13px",
    color: "#ef4444",
    background: "rgba(0,0,0,0.3)",
    padding: "16px",
    borderRadius: "8px",
    border: "1px solid rgba(239, 68, 68, 0.2)",
  },
  rightCol: {
    padding: "60px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    borderLeft: "1px solid rgba(255,255,255,0.05)",
  },
  section: {
    marginBottom: "28px",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#3b82f6",
    textTransform: "uppercase",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  text: {
    fontSize: "14px",
    color: "#94a3b8",
    lineHeight: "1.5",
  },
  acceptBtn: {
    marginTop: "20px",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    color: "white",
    textAlign: "center",
    padding: "16px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "800",
    fontSize: "14px",
    boxShadow: "0 10px 20px rgba(59, 130, 246, 0.2)",
    transition: "transform 0.2s",
  },
  footer: {
    textAlign: "center",
    padding: "24px",
    fontSize: "10px",
    color: "#334155",
    letterSpacing: "2px",
  },
};