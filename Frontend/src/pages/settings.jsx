import React, { useState } from "react";
import { 
  Settings as SettingsIcon, 
  Cpu, 
  Shield, 
  User, 
  Globe, 
  Save, 
  ChevronLeft,
  Terminal,
  Database,
  Lock
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div style={styles.container} className="no-scrollbar">
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .glass-card {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
        }
        .sidebar-item {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .sidebar-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .active-tab {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border-right: 3px solid #3b82f6;
        }
        input, select {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 10px 14px;
          border-radius: 8px;
          outline: none;
          width: 100%;
          font-size: 14px;
        }
        input:focus { border-color: #3b82f6; }
      `}</style>

      {/* Top Nav */}
      <nav style={styles.nav}>
        <div style={styles.navContent}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={styles.logoBox}><SettingsIcon size={18} color="white" /></div>
            <span style={styles.logoText}>System <span style={{ color: '#3b82f6' }}>Settings</span></span>
          </div>
          <Link to="/dashboard" style={styles.backBtn}>
            <ChevronLeft size={16} /> Dashboard
          </Link>
        </div>
      </nav>

      <main style={styles.main}>
        <div className="glass-card" style={styles.settingsWrapper}>
          
          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <SidebarItem 
              icon={<Globe size={18} />} 
              label="General" 
              active={activeTab === "general"} 
              onClick={() => setActiveTab("general")} 
            />
            <SidebarItem 
              icon={<Cpu size={18} />} 
              label="AI Engine" 
              active={activeTab === "ai"} 
              onClick={() => setActiveTab("ai")} 
            />
            <SidebarItem 
              icon={<Shield size={18} />} 
              label="Scanner" 
              active={activeTab === "scanner"} 
              onClick={() => setActiveTab("scanner")} 
            />
            <SidebarItem 
              icon={<Lock size={18} />} 
              label="Privacy" 
              active={activeTab === "privacy"} 
              onClick={() => setActiveTab("privacy")} 
            />
          </aside>

          {/* Content Area */}
          <section style={styles.content}>
            {activeTab === "general" && (
              <div style={styles.tabContent}>
                <h2 style={styles.tabTitle}>General Configuration</h2>
                <SettingRow label="Operator Alias" description="Display name used in reports and logs.">
                  <input type="text" placeholder="Zoro_01" />
                </SettingRow>
                <SettingRow label="Interface Theme" description="Set the visual mode for the dashboard.">
                  <select>
                    <option>Deep Space (Dark)</option>
                    <option>Hacker Terminal (Green)</option>
                  </select>
                </SettingRow>
              </div>
            )}

            {activeTab === "ai" && (
              <div style={styles.tabContent}>
                <h2 style={styles.tabTitle}>AI Core (Ollama)</h2>
                <SettingRow label="Local Endpoint" description="The URL of your running Ollama instance.">
                  <input type="text" placeholder="http://localhost:11434" />
                </SettingRow>
                <SettingRow label="Preferred Model" description="LLM used for exploit strategy generation.">
                  <select>
                    <option>llama3 (Recommended)</option>
                    <option>mistral</option>
                    <option>codellama</option>
                  </select>
                </SettingRow>
              </div>
            )}

            {activeTab === "scanner" && (
              <div style={styles.tabContent}>
                <h2 style={styles.tabTitle}>Recon Parameters</h2>
                <SettingRow label="Max Concurrent Tasks" description="Limit simultaneous scans.">
                  <input type="number" placeholder="5" />
                </SettingRow>
                <SettingRow label="Stealth Mode" description="Increases delay between requests to avoid detection.">
                  <select>
                    <option>Aggressive (Fast)</option>
                    <option>Balanced</option>
                    <option>Ghost (Stealth)</option>
                  </select>
                </SettingRow>
              </div>
            )}

            {/* Save Button Container */}
            <div style={styles.footer}>
              <button style={styles.saveBtn} className="hover-scale">
                <Save size={18} /> Save Changes
              </button>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}

// Sub-components
const SidebarItem = ({ icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`sidebar-item ${active ? "active-tab" : ""}`}
    style={styles.sidebarItem}
  >
    {icon}
    <span style={{ fontSize: '14px', fontWeight: '500' }}>{label}</span>
  </div>
);

const SettingRow = ({ label, description, children }) => (
  <div style={styles.settingRow}>
    <div style={{ flex: 1 }}>
      <div style={{ fontWeight: '600', marginBottom: '4px' }}>{label}</div>
      <div style={{ fontSize: '12px', color: '#64748b' }}>{description}</div>
    </div>
    <div style={{ flex: 1, maxWidth: '300px' }}>
      {children}
    </div>
  </div>
);

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0a0a0c',
    color: '#e2e8f0',
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    height: '70px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    padding: '0 40px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(10, 10, 12, 0.8)',
    backdropFilter: 'blur(10px)',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBox: { padding: '6px', background: '#3b82f6', borderRadius: '6px' },
  logoText: { fontSize: '18px', fontWeight: '700' },
  backBtn: { color: '#94a3b8', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' },
  main: { maxWidth: '1100px', margin: '60px auto', padding: '0 20px' },
  settingsWrapper: {
    display: 'flex',
    minHeight: '600px',
    overflow: 'hidden',
  },
  sidebar: {
    width: '240px',
    borderRight: '1px solid rgba(255,255,255,0.05)',
    padding: '20px 0',
    background: 'rgba(0,0,0,0.2)',
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 24px',
    color: '#94a3b8',
  },
  content: {
    flex: 1,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
  },
  tabContent: { flex: 1 },
  tabTitle: { fontSize: '24px', fontWeight: '700', marginBottom: '30px', color: 'white' },
  settingRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '20px 0',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
  },
  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  saveBtn: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.2)',
  },
};