import React from "react";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Globe, 
  ChevronLeft, 
  ShieldAlert,
  Zap,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="scroll-container" style={styles.container}>
      {/* Inline Styles for Theme Consistency */}
      <style>{`
        .scroll-container::-webkit-scrollbar { display: none; }
        .scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-panel {
          background: rgba(23, 23, 26, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .mission-gradient {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
        }
      `}</style>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.logoBox}>
              <ShieldAlert size={18} color="white" />
            </div>
            <span style={styles.logoText}>RedOps <span style={{ color: '#3b82f6' }}>About</span></span>
          </div>
          <Link to="/" style={styles.backBtn}>
            <ChevronLeft size={16} /> Return to Home
          </Link>
        </div>
      </nav>

      <main style={styles.main}>
        <div className="glass-panel" style={styles.landscapeGrid}>
          
          {/* Left Column: Mission Statement */}
          <div style={styles.leftCol} className="mission-gradient">
            <div style={styles.badge}>PROJECT ORIGIN</div>
            <h1 style={styles.heroTitle}>Next-Gen <br /><span className="text-glow" style={{ color: '#3b82f6' }}>Offensive AI</span></h1>
            <p style={styles.description}>
              RedOps AI was born from a simple realization: <strong>Security moves faster than human analysts.</strong> 
              Our mission is to democratize high-level penetration testing intelligence, 
              allowing developers and security researchers to identify critical paths before they are exploited.
            </p>
            <div style={styles.statsRow}>
              <StatItem label="Phase" value="Beta 2.4" />
              <StatItem label="Focus" value="Automation" />
              <StatItem label="Ethos" value="Open Source" />
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div style={styles.rightCol}>
            <div style={styles.pillar}>
              <div style={styles.iconBox}><Zap size={20} color="#3b82f6" /></div>
              <div>
                <h3 style={styles.pillarTitle}>Autonomous Reasoning</h3>
                <p style={styles.pillarText}>We don't just scan; we reason. By integrating local LLMs, we simulate how an adversary thinks about a network.</p>
              </div>
            </div>

            <div style={styles.pillar}>
              <div style={styles.iconBox}><Eye size={20} color="#8b5cf6" /></div>
              <div>
                <h3 style={styles.pillarTitle}>Transparent Security</h3>
                <p style={styles.pillarText}>Every action is logged. We believe in "White Box" automation where the user retains full visibility over the AI’s logic.</p>
              </div>
            </div>

            <div style={styles.pillar}>
              <div style={styles.iconBox}><ShieldCheck size={20} color="#10b981" /></div>
              <div>
                <h3 style={styles.pillarTitle}>Ethical Guardrails</h3>
                <p style={styles.pillarText}>Built-in scope control and legal checkpoints ensure that RedOps AI remains a tool for hardening, not harm.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Global Reach Section */}
        <section style={styles.footerInfo}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b' }}>
            <Globe size={14} /> Distributed Research Project — EST 2026
          </div>
        </section>
      </main>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
      <span style={{ fontSize: '16px', fontWeight: '800', color: 'white' }}>{value}</span>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    fontFamily: "'Inter', sans-serif",
    display: 'flex',
    flexDirection: 'column',
  },
  nav: {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
    background: 'rgba(10, 10, 12, 0.8)',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
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
  logoText: { fontSize: '20px', fontWeight: '800' },
  backBtn: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  landscapeGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    maxWidth: '1100px',
    width: '100%',
    minHeight: '550px',
    overflow: 'hidden',
  },
  leftCol: {
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRight: '1px solid rgba(255,255,255,0.05)',
  },
  badge: {
    fontSize: '10px',
    fontWeight: '800',
    color: '#3b82f6',
    letterSpacing: '2px',
    marginBottom: '16px',
  },
  heroTitle: {
    fontSize: '52px',
    fontWeight: '900',
    lineHeight: '1.1',
    margin: '0 0 24px 0',
    letterSpacing: '-2px',
  },
  description: {
    fontSize: '17px',
    color: '#94a3b8',
    lineHeight: '1.7',
    marginBottom: '40px',
  },
  statsRow: {
    display: 'flex',
    gap: '40px',
  },
  rightCol: {
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '40px',
  },
  pillar: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
  },
  iconBox: {
    padding: '12px',
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
  },
  pillarTitle: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'white',
    margin: '0 0 8px 0',
  },
  pillarText: {
    fontSize: '14px',
    color: '#64748b',
    lineHeight: '1.5',
    margin: 0,
  },
  footerInfo: {
    marginTop: '30px',
    fontSize: '12px',
  }
};