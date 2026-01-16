import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert, LayoutDashboard, FileText, Globe, AlertTriangle, 
  ShieldCheck, Cpu, Activity, Zap, ChevronRight
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
    axios.get("http://127.0.0.1:8000/auto/results")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh", backgroundColor: theme.bg, display: "flex", alignItems: "center", justifyContent: "center", color: theme.textDim, fontFamily: "sans-serif" }}>
        <Activity size={40} style={{ color: "#3b82f6" }} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflow: "hidden", fontFamily: "sans-serif" }}>
      
      {/* INJECT CSS TO HIDE SCROLLBARS GLOBALLY */}
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
      `}</style>

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
        </nav>
      </aside>

      {/* MAIN CONTENT AREA (Scrollable but no scrollbar visible) */}
      <main style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        
        <header style={{ height: "64px", borderBottom: `1px solid ${theme.border}`, padding: "0 40px", display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "rgba(13, 13, 16, 0.5)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Zap size={16} color="#3b82f6" />
            <span style={{ fontSize: "13px", fontWeight: "600" }}>{data?.target || "No Target"}</span>
          </div>
        </header>

        <div style={{ padding: "40px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "40px" }}>Automated Pentest Results</h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            
            {/* Recon Section */}
            <SectionCard title="Reconnaissance" icon={<Globe size={18} color="#3b82f6"/>}>
               {data?.results?.recon ? Object.entries(data.results.recon).map(([k, v]) => (
                 <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                    <span style={{ fontSize: "12px", color: theme.textDim }}>{k}</span>
                    <span style={{ fontSize: "13px", fontFamily: "monospace" }}>{JSON.stringify(v)}</span>
                 </div>
               )) : <p>No Recon Data</p>}
            </SectionCard>

            {/* AI Strategy */}
            <pre
  style={{
    background: "#050505",
    padding: "16px",
    borderRadius: "8px",
    whiteSpace: "pre-wrap",
    fontSize: "13px",
    color: "#c084fc",
    fontFamily: "monospace"
  }}
>
  {typeof data?.results?.ai_strategy === "string"
    ? data.results.ai_strategy
    : JSON.stringify(data.results.ai_strategy, null, 2)}
</pre>

            {/* Vulnerabilities (Full Width) */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionCard title="Detected Vulnerabilities" icon={<AlertTriangle size={18} color="#ef4444"/>}>
                <div style={{ display: "grid", gap: "16px" }}>
                  {data?.results?.vulnerabilities?.map((v, i) => (
                    <div key={i} style={{ padding: "16px", background: "rgba(239, 68, 68, 0.05)", border: "1px solid rgba(239, 68, 68, 0.1)", borderRadius: "12px" }}>
                       <strong style={{ color: "#ef4444" }}>{v.name || "Risk Found"}</strong>
                       <p style={{ margin: "8px 0 0", fontSize: "13px", color: theme.textDim }}>{v.description || JSON.stringify(v)}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Hardening Advice */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionCard title="Hardening Advice" icon={<ShieldCheck size={18} color="#22c55e"/>}>
                <div style={{ color: "#22c55e", background: "rgba(34, 197, 94, 0.05)", padding: "20px", borderRadius: "12px", border: "1px solid rgba(34, 197, 94, 0.1)", lineHeight: "1.6" }}>
                  {data?.results?.hardening_advice || "Standard security measures recommended."}
                </div>
              </SectionCard>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// Helper Components
function NavItem({ icon, label, active }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", color: active ? "#3b82f6" : "#94a3b8", backgroundColor: active ? "rgba(59, 130, 246, 0.1)" : "transparent", marginBottom: "4px", fontWeight: "600", fontSize: "14px" }}>
      {icon} {label}
    </div>
  );
}

function SectionCard({ title, icon, children }) {
  return (
    <div style={{ backgroundColor: "#111114", borderRadius: "16px", border: "1px solid rgba(255, 255, 255, 0.05)", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "20px" }}>
        {icon} <h3 style={{ margin: 0, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", color: "#94a3b8" }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}