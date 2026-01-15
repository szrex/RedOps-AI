import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert, LayoutDashboard, FileText, Globe, AlertTriangle, 
  ShieldCheck, Cpu, Activity, Zap, Download, ChevronRight, Settings
} from "lucide-react";

export default function AutoResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = {
    bg: "#0a0a0c",
    sidebar: "#0d0d10",
    card: "#111114",
    border: "rgba(255, 255, 255, 0.05)",
    accent: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    textMain: "#e2e8f0",
    textDim: "#94a3b8"
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auto/results")
      .then(res => {
        if (res.data?.status === "DONE") {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* ---------------- CONDITIONAL STATES ---------------- */

  if (loading) {
    return (
      <FullScreen theme={theme}>
        <Activity size={40} style={{ color: "#3b82f6", opacity: 0.8 }} className="animate-spin" />
        <p style={{ letterSpacing: "2px", fontSize: "12px", fontWeight: "bold", color: theme.textDim }}>DECRYPTING DATA...</p>
      </FullScreen>
    );
  }

  if (!data || !data.results) {
    return (
      <FullScreen theme={theme}>
        <AlertTriangle size={32} color="#ef4444" />
        <p style={{ color: theme.textMain }}>No completed scan results found.</p>
        <button onClick={() => window.location.hash = "#"} style={{ background: theme.accent, border: "none", color: "white", padding: "8px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>Return to Dashboard</button>
      </FullScreen>
    );
  }

  const {
    recon = {},
    vulnerabilities = [],
    ai_strategy = null,
    hardening_advice = null
  } = data.results;

  /* ---------------- UI ---------------- */

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflow: "hidden", fontFamily: "sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ width: "280px", backgroundColor: theme.sidebar, borderRight: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ height: "36px", width: "36px", background: theme.accent, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ShieldAlert size={20} color="white" />
          </div>
          <span style={{ fontSize: "20px", fontWeight: "bold", fontStyle: "italic" }}>
            RedOps <span style={{ color: "#3b82f6" }}>AI</span>
          </span>
        </div>

        <nav style={{ flex: 1, padding: "0 16px" }}>
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem icon={<FileText size={18} />} label="Scan Results" active />
          <div style={{ padding: "24px 16px 8px", fontSize: "10px", fontWeight: "bold", color: "#64748b", textTransform: "uppercase" }}>Options</div>
          <NavItem icon={<Download size={18} />} label="Export Report" />
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        
        {/* Navbar */}
        <header style={{ height: "64px", borderBottom: `1px solid ${theme.border}`, padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(13, 13, 16, 0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Zap size={16} color="#3b82f6" />
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Analysis Mode: <span style={{ color: theme.textDim }}>{data.target}</span></span>
          </div>
          <div style={{ fontSize: "10px", fontWeight: "bold", color: "#22c55e", background: "rgba(34, 197, 94, 0.1)", padding: "6px 12px", borderRadius: "20px", border: "1px solid rgba(34, 197, 94, 0.2)" }}>
            ENGINE_STATUS: OPTIMAL
          </div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            
            {/* Header Title */}
            <div style={{ marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: theme.textDim, fontSize: "12px", marginBottom: "8px" }}>
                <span>Reports</span> <ChevronRight size={12} /> <span>Automated Pentest</span> <ChevronRight size={12} /> <span style={{ color: "#3b82f6" }}>{data.target}</span>
              </div>
              <h1 style={{ fontSize: "32px", fontWeight: "bold", margin: 0 }}>Vulnerability Assessment</h1>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              
              {/* RECONNAISSANCE */}
              <Section title="Reconnaissance Intel" icon={<Globe size={18} color="#3b82f6" />}>
                <div style={{ display: "grid", gap: "8px" }}>
                  {Object.keys(recon).length === 0 ? (
                    <Muted>No asset data discovered.</Muted>
                  ) : (
                    Object.entries(recon).map(([k, v]) => (
                      <KeyValue key={k} label={k} value={v} />
                    ))
                  )}
                </div>
              </Section>

              {/* AI STRATEGY */}
              <Section title="AI Attack Logic" icon={<Cpu size={18} color="#c084fc" />}>
                <CodeBlock value={ai_strategy} color="#c084fc" />
              </Section>

              {/* VULNERABILITIES (Full Width) */}
              <div style={{ gridColumn: "1 / -1" }}>
                <Section title="Security Vulnerabilities" icon={<AlertTriangle size={18} color="#ef4444" />}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "16px" }}>
                    {Array.isArray(vulnerabilities) && vulnerabilities.length > 0 ? (
                      vulnerabilities.map((v, i) => (
                        <Card key={i}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                             <strong style={{ color: "#ef4444", fontSize: "14px" }}>{v.name || "Critical Risk"}</strong>
                             <span style={{ fontSize: "10px", fontWeight: "bold", padding: "2px 8px", borderRadius: "4px", background: "rgba(239, 64, 64, 0.2)", color: "#ef4444" }}>CRITICAL</span>
                          </div>
                          <p style={{ margin: 0, fontSize: "13px", color: theme.textDim, lineHeight: "1.5" }}>{typeof v === 'string' ? v : v.description || JSON.stringify(v)}</p>
                        </Card>
                      ))
                    ) : (
                      <Muted>No vulnerabilities detected by engine.</Muted>
                    )}
                  </div>
                </Section>
              </div>

              {/* HARDENING */}
              <div style={{ gridColumn: "1 / -1" }}>
                <Section title="Remediation & Hardening" icon={<ShieldCheck size={18} color="#22c55e" />}>
                  <div style={{ background: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.1)", borderRadius: "12px", padding: "20px", color: "#22c55e", fontSize: "14px", lineHeight: "1.7" }}>
                    {typeof hardening_advice === "string" ? hardening_advice : JSON.stringify(hardening_advice, null, 2)}
                  </div>
                </Section>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

const FullScreen = ({ theme, children }) => (
  <div style={{ height: "100vh", background: theme.bg, color: theme.textDim, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "sans-serif" }}>
    {children}
  </div>
);

const NavItem = ({ icon, label, active }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", color: active ? "#3b82f6" : "#94a3b8", backgroundColor: active ? "rgba(59, 130, 246, 0.1)" : "transparent", marginBottom: "4px", fontWeight: "600", fontSize: "14px" }}>
    {icon} {label}
  </div>
);

const Section = ({ title, icon, children }) => (
  <div style={{ backgroundColor: "#111114", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)", padding: "24px", height: "100%", boxSizing: "border-box" }}>
    <h3 style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 20px 0", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8" }}>
      {icon} {title}
    </h3>
    {children}
  </div>
);

const KeyValue = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
    <span style={{ fontSize: "12px", color: "#64748b", textTransform: "capitalize" }}>{label.replace(/_/g, ' ')}</span>
    <span style={{ fontSize: "13px", color: "white", fontFamily: "monospace" }}>{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
  </div>
);

const Card = ({ children }) => (
  <div style={{ padding: "20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "12px" }}>
    {children}
  </div>
);

const CodeBlock = ({ value, color = "#4ade80" }) => (
  <pre style={{ background: "#050505", padding: "16px", borderRadius: "8px", whiteSpace: "pre-wrap", fontSize: "13px", lineHeight: "1.6", color: color, fontFamily: "'Fira Code', monospace", border: "1px solid rgba(255,255,255,0.05)", margin: 0 }}>
    {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
  </pre>
);

const Muted = ({ children }) => (
  <p style={{ color: "#475569", fontStyle: "italic", fontSize: "13px" }}>{children}</p>
);