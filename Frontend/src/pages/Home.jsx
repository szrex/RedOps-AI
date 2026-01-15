import { ShieldAlert, Cpu, Globe, Lock, Code2, Database, Zap, Github, FileText, ChevronRight } from "lucide-react";

export default function Home() {
  const sectionStyle = {
    minHeight: '80vh', // Reduced height for tighter scrolling
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '60px 24px', // Tighter vertical padding
    backgroundColor: '#050505',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <div style={{ backgroundColor: '#050505', color: 'white', scrollBehavior: 'smooth', fontFamily: 'sans-serif' }}>
      
      {/* --- NAVIGATION BAR --- */}
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 10px', // Adjusted for better edge spacing
        zIndex: 100,
        backgroundColor: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1 }}>
          <div style={{ background: '#6366f1', padding: '5px', borderRadius: '8px' }}>
            <ShieldAlert size={20} color="white" />
          </div>
          <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>RedOps <span style={{ color: '#6366f1' }}>AI</span></span>
        </div>
        
        <div style={{ display: 'flex', gap: '30px', color: '#9ca3af', fontSize: '0.9rem', flex: 2, justifyContent: 'center' }}>
          <a href="#" style={navLinkStyle}>Home</a>
          <a href="#about" style={navLinkStyle}>About</a>
          <a href="#docs" style={navLinkStyle}>Documentation</a>
          <a href="www.linkedin.com/in/szrexx" style={navLinkStyle}>LinkedIn</a>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <a href="/dashboard" style={{
            background: 'linear-gradient(90deg, #4f46e5, #9333ea)',
            padding: '10px 28px',
            borderRadius: '10px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            fontSize: '0.9rem',
            boxShadow: '0 4px 15px rgba(79, 70, 229, 0.3)'
          }}>Launch App</a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section style={{...sectionStyle, minHeight: '80vh'}}>
        <div style={pillStyle}>
          <span style={{ height: '8px', width: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></span>
          Now v2.4 is Live: Advanced AI Hardening Advisory
        </div>

        <h1 style={heroTitleStyle}>Autonomous Pentesting<br />RedOps AI</h1>

        <p style={heroSubtextStyle}>
          The next generation of Open Source penetration testing. Automate discovery, exploitation, and reporting with an LLM-powered adversarial core.
        </p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#about" style={primaryBtnStyle}>Explore Platform</a>
          <a href="https://github.com/szrex/RedOps-AI" target="_blank" style={githubBtnStyle}>
            <Github size={20} /> Clone Repo
          </a>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" style={{ ...sectionStyle, backgroundColor: '#080808' }}>
        <h3 style={sectionTitleStyle}>About the Engine</h3>
        <div style={gridStyle}>
          <div style={cardStyle}><Globe color="#6366f1" size={32} /><h4>Global Recon</h4><p style={cardParaStyle}>Automated footprinting of your entire attack surface.</p></div>
          <div style={cardStyle}><Zap color="#9333ea" size={32} /><h4>Adversarial LLM</h4><p style={cardParaStyle}>Context-aware exploitation using custom fine-tuned models.</p></div>
          <div style={cardStyle}><Lock color="#3b82f6" size={32} /><h4>Secure Orchestration</h4><p style={cardParaStyle}>Safe execution environment for offensive operations.</p></div>
        </div>
      </section>

      {/* --- DOCUMENTATION SECTION --- */}
      <section id="docs" style={{ ...sectionStyle, alignItems: 'flex-start', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <FileText color="#6366f1" />
          <span style={{ color: '#6366f1', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.8rem' }}>DOCUMENTATION</span>
        </div>
        <h3 style={{ ...sectionTitleStyle, textAlign: 'left', marginBottom: '30px' }}>Getting Started with RedOps</h3>
        
        <div style={docsContainerStyle}>
          <div style={docsBoxStyle}>
            <h4 style={docsHeaderStyle}>1. Installation</h4>
            <code style={codeStyle}>git clone https://github.com/szrex/RedOps-AI.git<br/>cd RedOps-AI<br/>pip install -r requirements.txt</code>
          </div>
          
          <div style={docsBoxStyle}>
            <h4 style={docsHeaderStyle}>2. Configuration</h4>
            <p style={cardParaStyle}>Rename <code style={inlineCode}>.env.example</code> to <code style={inlineCode}>.env</code> and add your OpenAI/Anthropic API keys and target scope parameters.</p>
          </div>

          <div style={docsBoxStyle}>
            <h4 style={docsHeaderStyle}>3. Deployment</h4>
            <p style={cardParaStyle}>Run the local dashboard or deploy via Docker:</p>
            <code style={codeStyle}>docker-compose up --build</code>
          </div>
        </div>
      </section>

      {/* --- TECH STACK SECTION --- */}
      <section id="techstack" style={{...sectionStyle, minHeight: '60vh'}}>
        <h3 style={sectionTitleStyle}>Built With</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', maxWidth: '800px' }}>
          {['Next.js 14', 'Python FastAPI', 'PyTorch', 'Docker', 'Tailwind CSS', 'PostgreSQL'].map((tech) => (
            <div key={tech} style={badgeStyle}><Code2 size={16} />{tech}</div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 40px', textAlign: 'center', borderTop: '1px solid #111', color: '#4b5563', fontSize: '0.8rem' }}>
        RedOps AI © 2026 · Ethical Use Only · All Rights Reserved
      </footer>
    </div>
  );
}

// --- STYLES OBJECTS ---

const navLinkStyle = { textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' };

const pillStyle = {
  backgroundColor: 'rgba(30, 58, 138, 0.2)',
  border: '1px solid rgba(59, 130, 246, 0.3)',
  padding: '8px 20px',
  borderRadius: '50px',
  fontSize: '0.85rem',
  color: '#60a5fa',
  marginBottom: '30px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const heroTitleStyle = {
  fontSize: 'clamp(3rem, 8vw, 5rem)',
  fontWeight: '800',
  textAlign: 'center',
  lineHeight: '1.1',
  marginBottom: '24px',
  color: '#e5e7eb',
  letterSpacing: '-1px'
};

const heroSubtextStyle = {
  color: '#9ca3af',
  maxWidth: '700px',
  textAlign: 'center',
  fontSize: '1.1rem',
  lineHeight: '1.7',
  marginBottom: '40px'
};

const sectionTitleStyle = { fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '40px', textAlign: 'center' };

const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', maxWidth: '1100px', width: '100%' };

const cardStyle = {
  background: 'rgba(255,255,255,0.02)',
  padding: '40px',
  borderRadius: '24px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'border 0.3s ease'
};

const cardParaStyle = { color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5' };

const primaryBtnStyle = {
  padding: '16px 36px',
  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
  borderRadius: '12px',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none'
};

const githubBtnStyle = {
  padding: '16px 36px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  fontWeight: 'bold',
  color: 'white',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const badgeStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.05)',
  borderRadius: '12px',
  color: '#9ca3af',
  fontSize: '0.9rem'
};

// Documentation Styles
const docsContainerStyle = { width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' };
const docsBoxStyle = { padding: '24px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' };
const docsHeaderStyle = { marginBottom: '12px', color: '#e5e7eb', fontSize: '1.1rem' };
const codeStyle = { 
  display: 'block', 
  backgroundColor: '#000', 
  padding: '15px', 
  borderRadius: '8px', 
  fontFamily: 'monospace', 
  fontSize: '0.85rem', 
  color: '#6366f1', 
  border: '1px solid #111',
  lineHeight: '1.8'
};
const inlineCode = { color: '#a855f7', backgroundColor: 'rgba(168, 85, 247, 0.1)', padding: '2px 6px', borderRadius: '4px' };