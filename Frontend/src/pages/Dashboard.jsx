import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  ShieldAlert, LayoutDashboard, Target, Terminal as TerminalIcon,
  FileText, Settings, Activity, Plus, Trash2, ChevronRight
} from "lucide-react";

export default function Dashboard() {
  const [metrics, setMetrics] = useState({ active_scans: 0, critical: 0, medium: 0, assets: 0 });
  const [targets, setTargets] = useState([]);
  const [logs, setLogs] = useState([]);

  // Use a ref to keep track of targets without triggering re-renders during logic checks
  const lastTargets = useRef([]);

  useEffect(() => {
    // 1. Initial Metrics Fetch
    axios.get("http://127.0.0.1:8000/dashboard/metrics")
      .then(res => setMetrics(res.data))
      .catch(e => console.error("Metrics fail"));

    // 2. Continuous Polling
    const interval = setInterval(async () => {
      try {
        const [logsRes, targetsRes] = await Promise.all([
          axios.get("http://127.0.0.1:8000/dashboard/logs"),
          axios.get("http://127.0.0.1:8000/dashboard/targets")
        ]);

        // Always update logs
        setLogs(Array.isArray(logsRes.data) ? logsRes.data : []);

        // PERSISTENCE LOGIC: 
        // Only update the state if the backend returns a non-empty array.
        // This prevents the "disappearing" issue if the backend returns [] temporarily.
        if (Array.isArray(targetsRes.data) && targetsRes.data.length > 0) {
          setTargets(targetsRes.data);
          lastTargets.current = targetsRes.data;
        }
      } catch (e) {
        console.error("Polling error");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const theme = {
    bg: "#0a0a0c",
    sidebar: "#0d0d10",
    card: "#111114",
    border: "rgba(255, 255, 255, 0.05)",
    accent: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    textMain: "#e2e8f0"
  };

  // Requirement 2: Function to link to #
  const handleLinkClick = (e) => {
    e.preventDefault();
    window.location.hash = "#";
  };

  const clearTargets = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/dashboard/targets/clear");
      setTargets([]); // Only clears when button is pressed
      lastTargets.current = [];
    } catch (e) {
      setTargets([]); 
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: theme.bg, color: theme.textMain, overflow: "hidden", fontFamily: "sans-serif" }}>
      
      {/* Sidebar */}
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
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active onClick={handleLinkClick} />
          <NavItem icon={<Target size={18} />} label="Scopes" onClick={handleLinkClick} />
          <NavItem icon={<TerminalIcon size={18} />} label="Automated Scans" onClick={handleLinkClick} />
          <NavItem icon={<FileText size={18} />} label="Reports" onClick={handleLinkClick} />
          <div style={{ padding: "24px 16px 8px", fontSize: "10px", fontWeight: "bold", color: "#64748b", textTransform: "uppercase" }}>Configuration</div>
          <NavItem icon={<Settings size={18} />} label="Settings" onClick={handleLinkClick} />
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <header style={{ height: "64px", borderBottom: `1px solid ${theme.border}`, padding: "0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 12px", borderRadius: "20px", backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)" }}>
              <span style={{ height: "6px", width: "6px", borderRadius: "50%", backgroundColor: "#22c55e" }} />
              <span style={{ fontSize: "10px", fontWeight: "bold", color: "#22c55e" }}>Engine Online</span>
            </div>
          </div>
          <a href="/auto" onClick={handleLinkClick} style={{ textDecoration: "none" }}>
            <button style={{ padding: "8px 20px", background: theme.accent, color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              + New Scan
            </button>
          </a>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "32px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginBottom: "32px" }}>
              <MetricCard label="Active Scans" value={metrics.active_scans} border="rgba(255,255,255,0.05)" />
              <MetricCard label="Critical" value={metrics.critical} color="#ef4444" border="#ef444480" />
              <MetricCard label="Medium" value={metrics.medium} color="#fbbf24" border="#fbbf2480" />
              <MetricCard label="Assets" value={metrics.assets} color="#3b82f6" border="#3b82f680" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "32px" }}>
              
              {/* Logs */}
              <div style={{ backgroundColor: theme.card, borderRadius: "16px", border: `1px solid ${theme.border}`, height: "480px", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: `1px solid ${theme.border}`, fontWeight: "bold", fontSize: "11px" }}>LIVE EXECUTION STREAM</div>
                <div style={{ flex: 1, padding: "24px", overflowY: "auto", fontFamily: "monospace", backgroundColor: "rgba(0,0,0,0.2)" }}>
                  {logs.map((line, i) => <LogLine key={i} text={line} />)}
                </div>
              </div>

              {/* Targets (Requirement 1: Persistence) */}
              <div style={{ backgroundColor: theme.card, borderRadius: "16px", border: `1px solid ${theme.border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: `1px solid ${theme.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: "bold", fontSize: "11px" }}>TARGET LIST</span>
                  <Trash2 
                    size={16} 
                    style={{ cursor: "pointer", color: "#64748b" }} 
                    onClick={clearTargets} 
                  />
                </div>
                <div style={{ flex: 1, overflowY: "auto" }}>
                  {targets.map((t, i) => (
                    <div key={i} style={{ padding: "20px", borderBottom: `1px solid ${theme.border}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "bold" }}>{t.target}</span>
                        <span style={{ fontSize: "10px", color: "#3b82f6" }}>{t.progress}%</span>
                      </div>
                      <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${t.progress}%`, background: "#3b82f6", transition: "width 0.5s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <a href="#" onClick={onClick} style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "12px", cursor: "pointer", color: active ? "#3b82f6" : "#94a3b8", backgroundColor: active ? "rgba(59, 130, 246, 0.1)" : "transparent", marginBottom: "4px" }}>
        {icon} <span style={{ fontSize: "14px", fontWeight: "600" }}>{label}</span>
      </div>
    </a>
  );
}

function MetricCard({ label, value, color = "white", border }) {
  return (
    <div style={{ padding: "24px", backgroundColor: "#111114", borderRadius: "16px", borderBottom: `2px solid ${border}` }}>
      <p style={{ fontSize: "10px", color: "#64748b", textTransform: "uppercase", marginBottom: "8px" }}>{label}</p>
      <div style={{ fontSize: "32px", fontWeight: "bold", color }}>{value.toLocaleString()}</div>
    </div>
  );
}

function LogLine({ text }) {
  const getColor = (t) => {
    if (t.includes("[ERROR]")) return "#f87171";
    if (t.includes("[WARN]")) return "#fbbf24";
    if (t.includes("[AI]")) return "#c084fc";
    return "#4ade80";
  };
  return <p style={{ color: getColor(text), margin: "0 0 4px", fontSize: "12px" }}>{text}</p>;
}