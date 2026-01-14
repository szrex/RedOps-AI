import {
  ShieldAlert,
  LayoutDashboard,
  Target,
  Terminal,
  FileText,
  Settings
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {

  // ---------------- STATE ----------------
  const [metrics, setMetrics] = useState({
    active_scans: 0,
    critical: 0,
    medium: 0,
    assets: 0
  });

  const [targets, setTargets] = useState([]);
  const [logs, setLogs] = useState([]);

  // ---------------- EFFECTS ----------------

  // Fetch metrics (one-time)
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard/metrics")
      .then(res => setMetrics(res.data))
      .catch(err => console.error("Metrics error:", err));
  }, []);

  // Fetch targets (one-time)
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/dashboard/targets")
      .then(res => setTargets(res.data))
      .catch(err => console.error("Targets error:", err));
  }, []);

  // Fetch logs (poll every 2s) — SINGLE SOURCE OF TRUTH
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/dashboard/logs");
        setLogs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Logs error:", err);
        setLogs([]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ---------------- UI ----------------
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 glass border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="h-8 w-8 accent-gradient rounded-lg flex items-center justify-center">
            <ShieldAlert className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-white">
            RedOps <span className="text-blue-500">AI</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <NavItem icon={<LayoutDashboard />} active>Dashboard</NavItem>
          <NavItem icon={<Target />}>Scopes</NavItem>
          <NavItem icon={<Terminal />}>Automated Scans</NavItem>
          <NavItem icon={<FileText />}>Reports</NavItem>
          <NavItem icon={<Settings />}>Settings</NavItem>
        </nav>

        <div className="p-4 border-t border-white/5 text-xs">
          <p className="text-white font-medium">Admin User</p>
          <p className="text-gray-500">Enterprise Node</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">

        {/* Header */}
        <header className="sticky top-0 glass border-b border-white/5 px-8 py-4 flex justify-between">
          <div className="text-sm text-green-500">
            ● Engine Online <span className="text-gray-500 ml-2">ID: 0x882_Alpha</span>
          </div>
          <button className="px-4 py-2 accent-gradient rounded-lg text-sm font-semibold">
            New Scan +
          </button>
        </header>

        {/* Content */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">

          {/* Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <Metric label="Active Scans" value={metrics.active_scans} />
            <Metric label="Critical Vulnerabilities" value={metrics.critical} color="text-red-500" />
            <Metric label="Medium Risk" value={metrics.medium} color="text-yellow-400" />
            <Metric label="Assets Scanned" value={metrics.assets} color="text-blue-400" />
          </div>

          {/* Panels */}
          <div className="grid grid-cols-3 gap-8">

            {/* Live Execution Stream */}
            <div className="col-span-2 glass rounded-2xl p-6 mono text-sm space-y-2 overflow-y-auto h-[320px]">
              {logs.length === 0 && (
                <p className="text-gray-500">No execution logs yet</p>
              )}

              {logs.map((line, i) => (
                <p
                  key={i}
                  className={
                    line.includes("[ERROR]") ? "text-red-400" :
                    line.includes("[WARN]") ? "text-yellow-400" :
                    line.includes("[SCAN]") ? "text-blue-400" :
                    line.includes("[AI]") ? "text-purple-400" :
                    "text-green-400"
                  }
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Target List */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
                <h2 className="font-semibold text-white">Target List</h2>

                <button
                  onClick={() => {
                    axios.post("http://127.0.0.1:8000/dashboard/targets/clear")
                      .then(() => setTargets([]))
                      .catch(err => console.error(err));
                  }}
                  className="text-xs px-3 py-1 rounded bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                >
                  Clear
                </button>
              </div>

              <div className="divide-y divide-white/5">
                {targets.length === 0 && (
                  <div className="p-4 text-gray-500 text-sm">
                    No active scans
                  </div>
                )}

                {targets.map((t, i) => (
                  <div key={i} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-white">{t.target}</p>
                      <p className="text-xs text-gray-500 italic">{t.status}</p>
                    </div>

                    <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {t.progress}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

// ---------------- COMPONENTS ----------------

function NavItem({ icon, children, active }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
      active ? "bg-blue-600/10 text-blue-400" : "text-gray-400 hover:bg-white/5"
    }`}>
      {icon} {children}
    </div>
  );
}

function Metric({ label, value, color = "text-white" }) {
  return (
    <div className="glass p-6 rounded-2xl">
      <p className="text-gray-400 text-sm">{label}</p>
      <h3 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h3>
    </div>
  );
}
