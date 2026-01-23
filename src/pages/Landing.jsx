import React from "react";
import { ShieldAlert, Github, ChevronRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={styles.container}>
      {/* Native CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.2); }
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
        .glass-effect {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .glow-orb {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
        }
      `}</style>

      {/* Decorative Background Orbs */}
      <div className="glow-orb" style={{ top: '-200px', left: '-200px' }} />
      <div className="glow-orb" style={{ bottom: '-200px', right: '-200px' }} />

      {/* Navbar */}
      <nav style={styles.nav} className="glass-effect">
        <div style={styles.navContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.logoIcon}>
              <ShieldAlert size={20} color="white" />
            </div>
            <span style={styles.logoText}>
              RedOps <span style={{ color: '#3b82f6' }}>AI</span>
            </span>
          </div>

          <div style={styles.navLinks}>
            <a href="#about" style={styles.navLink}>About</a>
            <a href="https://github.com/szrex/RedOps-AI" target="_blank" rel="noreferrer" style={styles.navLink}>Docs</a>
            <Link to="/legal" style={styles.launchBtn} className="hover-scale">
              Launch App
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={styles.hero} className="animate-fade-in">
        <div style={styles.badge}>
          <span style={styles.dot}></span>
          Now v2.4 Live: Advanced AI Hardening Advisory
        </div>

        <h1 style={styles.mainTitle}>
          Autonomous Security <br />
          <span style={{ color: '#3b82f6' }}>RedOps AI</span>
        </h1>

        <p style={styles.description}>
          AI-assisted offensive security framework automating reconnaissance,
          exploitation simulation, and reporting using a decision-driven adversarial core.
        </p>

        <div style={styles.ctaGroup}>
          <Link to="/legal" style={styles.primaryBtn} className="hover-scale">
            Explore Platform <ChevronRight size={18} />
          </Link>
          <a 
            href="https://github.com/szrex/RedOps-AI" 
            target="_blank" 
            rel="noreferrer" 
            style={styles.secondaryBtn} 
            className="glass-effect hover-scale"
          >
            <Github size={18} /> Clone Repo
          </a>
        </div>
      </main>
      <br />
      <br />
      <br />

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
           <Link to="/legal" style={styles.footerLink}>Legal Terms</Link>
           <Link to="/legal" style={styles.footerLink}>Rules of Engagement</Link>
        </div>
        <div style={{ opacity: 0.4, letterSpacing: '1px' }}>
          REDOPS AI © 2026 — <span style={{ color: '#ef4444' }}>ETHICAL USE ONLY</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '16px 40px',
    zIndex: 100,
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoIcon: {
    height: '32px',
    width: '32px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '20px',
    fontWeight: '700',
    letterSpacing: '-0.5px',
    color: 'white',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
  navLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
  },
  launchBtn: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '10px 24px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
  },
  hero: {
    paddingTop: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    zIndex: 1,
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  badge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 16px',
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.2)',
    borderRadius: '100px',
    fontSize: '12px',
    color: '#60a5fa',
    fontWeight: '600',
    marginBottom: '32px',
  },
  dot: {
    height: '6px',
    width: '6px',
    background: '#3b82f6',
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: '0 0 8px #3b82f6',
  },
  mainTitle: {
    fontSize: 'clamp(42px, 8vw, 82px)',
    fontWeight: '900',
    lineHeight: 1.05,
    margin: '0 0 24px 0',
    letterSpacing: '-3px',
    color: 'white',
  },
  description: {
    maxWidth: '640px',
    color: '#94a3b8',
    fontSize: '18px',
    lineHeight: 1.6,
    marginBottom: '40px',
  },
  ctaGroup: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryBtn: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '16px 36px',
    borderRadius: '14px',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.3)',
  },
  secondaryBtn: {
    color: 'white',
    padding: '16px 36px',
    borderRadius: '14px',
    textDecoration: 'none',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  footer: {
    marginTop: 'auto',
    padding: '30px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '11px',
    color: '#475569',
    width: '100%',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    backgroundColor: '#0d0d10',
  },
  footerLink: {
    color: '#94a3b8',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.2s',
  },
};