import React from "react";
import { 
  ShieldAlert, 
  BookOpen, 
  Terminal, 
  Cpu, 
  Search, 
  AlertCircle, 
  ChevronLeft,
  Layers,
  FileText,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Docs() {
  return (
    <div className="scroll-container" style={styles.container}>
      {/* Inline Scoped CSS */}
      <style>{`
        .scroll-container::-webkit-scrollbar { display: none; }
        .scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
        }
        .accent-border { border-left: 4px solid #3b82f6; }
        .code-block {
          background: #000;
          font-family: 'JetBrains Mono', monospace;
          padding: 15px;
          border-radius: 8px;
          font-size: 13px;
          color: #94a3b8;
          border: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.logoBox}>
              <ShieldAlert size={18} color="white" />
            </div>
            <span style={styles.logoText}>RedOps <span style={{ color: '#3b82f6' }}>Docs</span></span>
          </div>
          <Link to="/" style={styles.backBtn}>
            <ChevronLeft size={16} /> Back to Terminal
          </Link>
        </div>
      </nav>

      <main style={styles.main}>
        {/* Header Section */}
        <header style={{ marginBottom: '60px' }}>
          <div style={styles.badge}>DOCUMENTATION v2.4</div>
          <h1 style={styles.title}>System Architecture & <br/><span style={{ color: '#3b82f6' }}>Technical Manual</span></h1>
          <p style={styles.subtitle}>
            A comprehensive guide to the RedOps AI orchestration engine, reconnaissance modules, and AI-driven hardening advisory.
          </p>
        </header>

        <div style={styles.grid}>
          {/* Section 1: Core Workflow */}
          <section className="glass-card" style={styles.card}>
            <h2 style={styles.sectionHeading}><Layers size={20} color="#3b82f6" /> 01. The Pipeline</h2>
            <p style={styles.text}>RedOps AI operates on an asynchronous automated pipeline. When a target is initiated, the following sequence occurs:</p>
            <ul style={styles.list}>
              <li><strong>Reconnaissance:</strong> Active and passive data gathering.</li>
              <li><strong>Assessment:</strong> Attack surface inference and CVE correlation.</li>
              <li><strong>AI Strategy:</strong> LLM processing for adversarial reasoning.</li>
              <li><strong>Reporting:</strong> Final advisory generation.</li>
            </ul>
          </section>

          {/* Section 2: Engine Capabilities */}
          <section className="glass-card" style={styles.card}>
            <h2 style={styles.sectionHeading}><Search size={20} color="#3b82f6" /> 02. Reconnaissance Engine</h2>
            <p style={styles.text}>Built for speed and structure, the recon module fetches:</p>
            <div className="code-block" style={{ marginTop: '10px' }}>
              - DNS Records (A, AAAA, MX, NS)<br/>
              - WHOIS Ownership Data<br/>
              - HTTP Security Headers<br/>
              - Target Metadata Analysis
            </div>
          </section>

          {/* Section 3: AI Intelligence */}
          <section className="glass-card" style={styles.card}>
            <h2 style={styles.sectionHeading}><Cpu size={20} color="#8b5cf6" /> 03. AI Reasoning Core</h2>
            <p style={styles.text}>Powered by local Ollama integration, the AI engine processes recon data to provide:</p>
            <ul style={styles.list}>
              <li><strong>Adversary Logic:</strong> High-level exploit path reasoning.</li>
              <li><strong>Remediation:</strong> Actionable hardening advice for Blue Teams.</li>
              <li><strong>Contextual Awareness:</strong> Tailored results based on detected services.</li>
            </ul>
          </section>

          {/* Section 4: Project Structure */}
          <section className="glass-card" style={styles.card}>
            <h2 style={styles.sectionHeading}><Terminal size={20} color="#10b981" /> 04. Repository Structure</h2>
            <div className="code-block" style={{ fontSize: '11px', lineHeight: '1.4' }}>
              src/backend/<br/>
              ├── auto/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Orchestration<br/>
              ├── recon/ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Engine Core<br/>
              ├── ai_engine/ &nbsp;&nbsp;# LLM Processing<br/>
              └── main.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# FastAPI Entry
            </div>
          </section>

          {/* Section 5: Legal & Ethics */}
          <section className="glass-card accent-border" style={{ ...styles.card, gridColumn: 'span 2', background: 'rgba(239, 68, 68, 0.05)' }}>
            <h2 style={{ ...styles.sectionHeading, color: '#ef4444' }}><Lock size={20} /> Ethical & Legal Notice</h2>
            <p style={{ ...styles.text, color: '#f8fafc' }}>
              RedOps AI is designed for <strong>authorized assessments only</strong>. Unauthorized use is strictly prohibited. Users must ensure compliance with local laws and have explicit written consent from the target system owners before execution.
            </p>
          </section>
        </div>

        <footer style={styles.footer}>
          RedOps AI — Documentation End — 2026
        </footer>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    fontFamily: "'Inter', sans-serif",
    overflowY: 'auto',
  },
  nav: {
    height: '80px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
    position: 'sticky',
    top: 0,
    background: 'rgba(10, 10, 12, 0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 100,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBox: {
    padding: '8px',
    background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
    borderRadius: '8px',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '800',
    letterSpacing: '-0.5px',
  },
  backBtn: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontWeight: '500'
  },
  main: {
    maxWidth: '900px',
    margin: '80px auto',
    padding: '0 20px',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 12px',
    background: 'rgba(59, 130, 246, 0.1)',
    color: '#3b82f6',
    borderRadius: '100px',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '1px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '48px',
    fontWeight: '900',
    lineHeight: '1.1',
    letterSpacing: '-1.5px',
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    color: '#94a3b8',
    marginTop: '20px',
    lineHeight: '1.6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    marginTop: '60px',
  },
  card: {
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  sectionHeading: {
    fontSize: '18px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: 0,
    color: 'white',
  },
  text: {
    fontSize: '14px',
    color: '#94a3b8',
    lineHeight: '1.6',
    margin: 0,
  },
  list: {
    fontSize: '14px',
    color: '#94a3b8',
    paddingLeft: '20px',
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  footer: {
    marginTop: '100px',
    textAlign: 'center',
    fontSize: '11px',
    color: '#334155',
    letterSpacing: '2px',
    paddingBottom: '40px',
  }
};