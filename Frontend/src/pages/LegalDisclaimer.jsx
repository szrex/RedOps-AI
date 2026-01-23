import React, { useEffect } from "react";

export default function LegalDisclaimer() {
  useEffect(() => {
    // Load Lucide icons
    const script = document.createElement("script");
    script.src = "https://unpkg.com/lucide@latest";
    script.onload = () => window.lucide?.createIcons();
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a0a0c", color: "#e2e8f0" }}>
      
      {/* Sidebar */}
      <aside style={{
        width: 280,
        background: "#0d0d10",
        borderRight: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ padding: 32, display: "flex", gap: 12 }}>
          <div style={{
            height: 36,
            width: 36,
            background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <i data-lucide="shield-alert" style={{ color: "white" }} />
          </div>
          <strong style={{ fontStyle: "italic", fontSize: 20 }}>
            RedOps <span style={{ color: "#3b82f6" }}>AI</span>
          </strong>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: "auto", padding: "60px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          <h1>Legal Terms & Disclaimer</h1>
          <p style={{ color: "#94a3b8" }}>Version 1.0.4 | January 2026</p>

          <div style={{
            background: "#111114",
            borderLeft: "4px solid #ef4444",
            padding: 32,
            borderRadius: 16,
            marginTop: 32
          }}>
            <h3 style={{ color: "#ef4444" }}>
              <i data-lucide="alert-octagon" /> AUTHORIZED USE ONLY
            </h3>
            <p>
              RedOps AI is an automated penetration testing system.  
              Unauthorized access to systems is a federal crime.
            </p>
          </div>

          <section style={{ marginTop: 40 }}>
            <h2 style={{ color: "#3b82f6" }}>Rules of Engagement</h2>
            <ul>
              <li>No scanning without explicit permission</li>
              <li>No production systems</li>
              <li>No government or healthcare assets</li>
            </ul>
          </section>

          <section style={{ marginTop: 30 }}>
            <h2 style={{ color: "#3b82f6" }}>Ethical Compliance</h2>
            <p>White-hat use only. Abuse may result in permanent ban.</p>
          </section>

          <div style={{ marginTop: 40 }}>
            <a
              href="/auto"
              style={{
                padding: "14px 32px",
                background: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color: "white",
                borderRadius: 10,
                fontWeight: "bold",
                textDecoration: "none"
              }}
            >
              I AGREE & PROCEED →
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
