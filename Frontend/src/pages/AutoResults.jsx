import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ShieldAlert, LayoutDashboard, FileText, Globe, AlertTriangle,
  ShieldCheck, Cpu, Activity, Zap, Folder
} from "lucide-react";

export default function AutoResults() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = {
    bg: "#0a0a0c",
    sidebar: "#0d0d10",
    card: "#111114",
    border: "rgba(255, 255, 255, 0.05)",
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
      <div style={{
        height: "100vh",
        background: theme.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.textDim
      }}>
        <Activity size={40} color="#3b82f6" />
      </div>
    );
  }

  const results = data?.results || {};
  const hardening = results.hardening_advice;

  return (
    <div style={{ display: "flex", height: "100vh", background: theme.bg, color: theme.textMain }}>

      {/* SIDEBAR */}
      <aside style={{ width: 280, background: theme.sidebar, borderRight: `1px solid ${theme.border}` }}>
        <div style={{ padding: 32, fontWeight: "bold" }}>
          RedOps <span style={{ color: "#3b82f6" }}>AI</span>
        </div>
        <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
        <NavItem icon={<FileText size={18} />} label="Scan Results" active />
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        <header style={{
          padding: "20px 40px",
          borderBottom: `1px solid ${theme.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <Zap size={16} color="#3b82f6" />
          <strong>{data?.target || "Unknown Target"}</strong>
        </header>

        <div style={{ padding: 40, maxWidth: 1100, margin: "0 auto" }}>
          <h1 style={{ fontSize: 32, marginBottom: 40 }}>
            Automated Pentest Results
          </h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>

            {/* Recon */}
<SectionCard title="Reconnaissance" icon={<Globe size={18} color="#3b82f6" />}>

  {/* META */}
  <ReconBlock title="Scan Metadata">
    <ReconItem label="Target" value={results.recon?.meta?.target} />
    <ReconItem label="Type" value={results.recon?.meta?.type} />
    <ReconItem label="Timestamp" value={results.recon?.meta?.timestamp} />
    <ReconItem label="Tool" value={results.recon?.meta?.tool} />
  </ReconBlock>

  {/* DNS */}
  <ReconBlock title="DNS Records">
    <ReconList label="A Records" values={results.recon?.data?.dns?.A} />
    <ReconList label="AAAA Records" values={results.recon?.data?.dns?.AAAA} />
    <ReconList label="MX Records" values={results.recon?.data?.dns?.MX} />
    <ReconList label="NS Records" values={results.recon?.data?.dns?.NS} />
  </ReconBlock>

  {/* WHOIS */}
  <ReconBlock title="WHOIS Information">
    <ReconItem label="Registrar" value={results.recon?.data?.whois?.registrar} />
    <ReconItem label="Created On" value={results.recon?.data?.whois?.creation_date} />
    <ReconItem label="Expires On" value={results.recon?.data?.whois?.expiration_date} />
  </ReconBlock>

  {/* HTTP HEADERS */}
  <ReconBlock title="HTTP Headers">
    {Object.entries(results.recon?.data?.http_headers || {}).map(([k, v]) => (
      <ReconItem key={k} label={k} value={v} />
    ))}
  </ReconBlock>

</SectionCard>


            {/* AI Strategy */}
            <SectionCard title="AI Strategy" icon={<Cpu size={18} color="#c084fc" />}>
              <Code>
                {typeof results.ai_strategy === "string"
                  ? results.ai_strategy
                  : JSON.stringify(results.ai_strategy, null, 2)}
              </Code>
            </SectionCard>

            {/* Vulnerabilities */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionCard title="Detected Vulnerabilities" icon={<AlertTriangle size={18} color="#ef4444" />}>
                {Array.isArray(results.vulnerabilities) && results.vulnerabilities.length > 0
                  ? results.vulnerabilities.map((v, i) => (
                      <Card key={i}>
                        <strong>{v.name || "Finding"}</strong>
                        <p>{v.description || JSON.stringify(v)}</p>
                      </Card>
                    ))
                  : <Muted>No vulnerabilities detected</Muted>}
              </SectionCard>
            </div>

            {/* Directory Enumeration */}
            <SectionCard title="Directory Enumeration" icon={<Folder size={18} color="#60a5fa" />}>
              <Code>
                {JSON.stringify(results.directory_enum || {}, null, 2)}
              </Code>
            </SectionCard>

            {/* HARDENING ADVICE — FINAL FIX */}
            <div style={{ gridColumn: "1 / -1" }}>
              <SectionCard title="Hardening Advice" icon={<ShieldCheck size={18} color="#22c55e" />}>

                {/* Structured array */}
                {Array.isArray(hardening) && hardening.length > 0 && (
                  <div style={{ display: "grid", gap: 20 }}>
                    {hardening.map((item, i) => (
                      <div key={i} style={{
                        background: "rgba(34,197,94,0.05)",
                        border: "1px solid rgba(34,197,94,0.15)",
                        borderRadius: 12,
                        padding: 16
                      }}>
                        <h4 style={{
                          margin: 0,
                          marginBottom: 6,
                          color: "#22c55e"
                        }}>
                          {item.title || `Recommendation ${i + 1}`}
                        </h4>
                        <p style={{
                          margin: 0,
                          fontSize: 13,
                          lineHeight: "1.6",
                          color: theme.textDim
                        }}>
                          {item.description || "No description provided."}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {Array.isArray(hardening) && hardening.length > 0 && (
  <div style={{ display: "grid", gap: "20px" }}>
    {hardening.map((item, i) => (
      <div
        key={i}
        style={{
          padding: "18px",
          borderRadius: "12px",
          background: "rgba(34,197,94,0.05)",
          border: "1px solid rgba(34,197,94,0.15)"
        }}
      >
        <h4 style={{
          margin: "0 0 8px",
          fontSize: "15px",
          fontWeight: "bold",
          color: "#22c55e"
        }}>
          {item.title}
        </h4>

        <p style={{
          margin: 0,
          fontSize: "14px",
          lineHeight: "1.7",
          color: "#bbf7d0"
        }}>
          {item.description}
        </p>
      </div>
    ))}
  </div>
)}


                {!hardening && <Muted>No hardening advice available</Muted>}
              </SectionCard>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

/* ---------- Helpers ---------- */

const NavItem = ({ icon, label, active }) => (
  <div style={{
    padding: "12px 24px",
    color: active ? "#3b82f6" : "#94a3b8",
    fontWeight: active ? "bold" : "normal",
    display: "flex",
    gap: 12
  }}>
    {icon} {label}
  </div>
);

const SectionCard = ({ title, icon, children }) => (
  <div style={{ background: "#111114", padding: 24, borderRadius: 16 }}>
    <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
      {icon}
      <strong style={{ color: "#94a3b8" }}>{title}</strong>
    </div>
    {children}
  </div>
);

const Row = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace" }}>
    <span>{label}</span>
    <span>{typeof value === "object" ? JSON.stringify(value) : String(value)}</span>
  </div>
);

const Code = ({ children }) => (
  <pre style={{
    background: "#050505",
    padding: 16,
    borderRadius: 8,
    whiteSpace: "pre-wrap",
    fontSize: 12
  }}>
    {children}
  </pre>
);

const Card = ({ children }) => (
  <div style={{ background: "rgba(239,68,68,0.05)", padding: 16, borderRadius: 12 }}>
    {children}
  </div>
);

const Muted = ({ children }) => (
  <p style={{ color: "#94a3b8", fontStyle: "italic" }}>{children}</p>
);

const ReconBlock = ({ title, children }) => (
  <div style={{ marginBottom: 20 }}>
    <h4 style={{
      marginBottom: 10,
      color: "#94a3b8",
      fontSize: 13,
      textTransform: "uppercase",
      letterSpacing: "1px"
    }}>
      {title}
    </h4>
    <div style={{ display: "grid", gap: 6 }}>
      {children}
    </div>
  </div>
);

const ReconItem = ({ label, value }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    fontSize: 13
  }}>
    <span style={{ color: "#64748b" }}>{label}</span>
    <span style={{ fontFamily: "monospace", color: "#e2e8f0" }}>
      {value ?? "—"}
    </span>
  </div>
);

const ReconList = ({ label, values }) => (
  <ReconItem
    label={label}
    value={Array.isArray(values) ? values.join(", ") : "—"}
  />
);
