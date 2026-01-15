import { useEffect } from "react";
import {
  ShieldAlert,
  Cpu,
  ShieldCheck,
  Check,
  Play,
  Code,
  AlertTriangle,
} from "lucide-react";

import "../styles/landing.css";

export default function Landing() {
  useEffect(() => {
    // Terminal animation
    const command = "python redops.py --target 10.0.4.155 --mode auto";
    const outputLines = [
      { text: "[INFO] Loading LLM Adversary Engine...", cls: "text-blue-400" },
      { text: "[INFO] Recon Module: 4 subdomains identified.", cls: "text-green-400" },
      { text: "[WARN] Port 8080 detected: Unprotected Jenkins instance.", cls: "text-yellow-400" },
      { text: "[AI] Attempting exploit reasoning...", cls: "text-purple-400" },
      { text: "[EXPL] Exploit successful. RCE achieved.", cls: "text-red-500" },
      { text: "[DONE] Report generated.", cls: "text-green-500 font-bold" },
    ];

    let c = 0;
    let l = 0;
    const cmd = document.getElementById("cmd");
    const out = document.getElementById("out");

    function type() {
      if (c < command.length) {
        cmd.textContent += command[c++];
        setTimeout(type, 60);
      } else show();
    }

    function show() {
      if (l < outputLines.length) {
        const div = document.createElement("div");
        div.className = outputLines[l].cls;
        div.textContent = outputLines[l].text;
        out.appendChild(div);
        l++;
        setTimeout(show, 700);
      }
    }

    type();
  }, []);

  return (
    <div className="antialiased">
      {/* Glow Orbs */}
      <div className="glow-orb -top-52 -left-52" />
      <div className="glow-orb bottom-[-200px] right-[-200px]" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 accent-gradient rounded flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">
              RedOps <span className="text-blue-500">AI</span>
            </span>
          </div>
          <a
            href="/dashboard"
            className="px-6 py-2 accent-gradient rounded-lg font-bold text-sm shadow-lg"
          >
            Launch App
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-6xl font-extrabold text-gradient mb-6">
            Autonomous Security <br />
            <span className="text-blue-500">RedOps AI</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            AI-powered offensive security framework automating recon,
            exploitation, and reporting.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#docs" className="px-8 py-4 accent-gradient rounded-xl font-bold">
              Explore Platform
            </a>
            <a
              href="https://github.com/szrex/RedOps-AI"
              className="px-8 py-4 glass rounded-xl font-bold"
            >
              Clone Repo
            </a>
          </div>
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="glass rounded-2xl overflow-hidden border border-white/10">
            <div className="bg-[#1a1a1e] p-4 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="p-6 mono text-sm min-h-[280px]">
              <div className="text-gray-500 mb-2">$ <span id="cmd"></span></div>
              <div id="out" className="space-y-1" />
            </div>
          </div>

          <div className="space-y-6">
            <Info icon={<Cpu />} title="AI Core" text="LLM-driven adversary reasoning" />
            <Info icon={<ShieldCheck />} title="Mapped" text="MITRE ATT&CK aligned" />
            <Info icon={<AlertTriangle />} title="Ethical Use" text="Authorized testing only" />
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-gray-600 text-xs border-t border-white/5">
        RedOps AI © 2026
      </footer>
    </div>
  );
}

function Info({ icon, title, text }) {
  return (
    <div className="glass p-5 rounded-xl">
      <div className="text-blue-500 mb-2">{icon}</div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-xs text-gray-400">{text}</p>
    </div>
  );
}
