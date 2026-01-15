import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import lucide from "lucide";

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    lucide.createIcons();

    // Terminal animation (unchanged logic)
    const command = "python redops.py --target 10.0.4.155 --mode auto";
    const outputLines = [
      "[INFO] Loading LLM Adversary Engine...",
      "[INFO] Recon Module: 4 subdomains identified.",
      "[WARN] Port 8080 detected: Unprotected Jenkins instance.",
      "[AI-REASONING] Attempting auth brute-force...",
      "[EXPL] Exploit successful. RCE achieved.",
      "[DONE] Execution completed. Report generated."
    ];

    let charIdx = 0;
    let lineIdx = 0;
    const cmdSpan = document.getElementById("command-text");
    const outputDiv = document.getElementById("terminal-output");

    function typeCommand() {
      if (charIdx < command.length) {
        cmdSpan.innerHTML += command.charAt(charIdx);
        charIdx++;
        setTimeout(typeCommand, 60);
      } else {
        setTimeout(showOutput, 500);
      }
    }

    function showOutput() {
      if (lineIdx < outputLines.length) {
        const line = document.createElement("div");
        line.className = "text-green-400";
        line.innerText = outputLines[lineIdx];
        outputDiv.appendChild(line);
        lineIdx++;
        setTimeout(showOutput, 700);
      }
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          typeCommand();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const docs = document.getElementById("docs");
    if (docs) observer.observe(docs);
  }, []);

  return (
    <div className="bg-[#0a0a0c] text-slate-200 font-sans overflow-x-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 accent-gradient rounded flex items-center justify-center">
              <i data-lucide="shield-alert" className="text-white w-4 h-4"></i>
            </div>
            <span className="text-lg font-bold text-white">
              RedOps <span className="text-blue-500">AI</span>
            </span>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-2 accent-gradient rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20 hover:scale-105 transition"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-24">
        <h1 className="text-6xl font-extrabold text-gradient mb-6">
          Autonomous Offensive Security
        </h1>
        <p className="text-gray-400 max-w-2xl mb-10">
          AI-powered penetration testing platform for modern red teams.
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="px-8 py-4 accent-gradient rounded-xl font-bold shadow-xl hover:shadow-blue-500/40 transition"
        >
          Enter Dashboard
        </button>
      </section>

      {/* DOCS / TERMINAL */}
      <section id="docs" className="py-24 px-6 bg-[#0c0c0e]/60">
        <div className="max-w-4xl mx-auto glass rounded-2xl overflow-hidden">
          <div className="bg-[#1a1a1e] px-4 py-3 flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="p-6 font-mono text-sm">
            <div className="text-gray-500 mb-2">
              # Initializing RedOps-AI Framework…
            </div>
            <div className="flex gap-2 text-white">
              <span className="text-blue-500">$</span>
              <span id="command-text"></span>
              <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse ml-1"></span>
            </div>
            <div id="terminal-output" className="mt-4 space-y-1"></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-xs text-gray-600 border-t border-white/5">
        RedOps AI © 2026 | Built for Security Engineers
      </footer>
    </div>
  );
}
