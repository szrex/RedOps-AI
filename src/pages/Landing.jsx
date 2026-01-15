import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 overflow-hidden">

      {/* Glow Orbs */}
      <div className="glow-orb top-[-200px] left-[-200px]" />
      <div className="glow-orb bottom-[-200px] right-[-200px]" />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 w-full z-50 glass px-8 py-4 border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 accent-gradient rounded flex items-center justify-center">
              <ShieldAlert className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">
              RedOps <span className="text-blue-500">AI</span>
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#docs" className="hover:text-white">Documentation</a>
            <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          </div>

          <Link
            to="/dashboard"
            className="px-5 py-2 accent-gradient rounded-lg text-sm font-bold shadow-lg hover:scale-105 transition"
          >
            Launch App
          </Link>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            ● Now v2.4 is Live: Advanced AI Hardening Advisory
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gradient mb-6">
            Autonomous Security <br /> <span className="text-blue-500">RedOps AI</span>
          </h1>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            AI-assisted offensive security framework automating reconnaissance,
            exploitation simulation, and reporting using a decision-driven adversarial core.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="px-8 py-4 accent-gradient rounded-xl font-bold text-white shadow-xl hover:shadow-blue-500/30 transition"
            >
              Explore Platform
            </Link>

            <a
              href="https://github.com/szrex/RedOps-AI"
              target="_blank"
              className="px-8 py-4 glass rounded-xl font-bold text-gray-300 hover:bg-white/10 transition"
            >
              Clone Repo
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-white/5 text-center text-xs text-gray-600">
        RedOps AI © 2026 — Ethical Use Only
      </footer>
    </div>
  );
}
