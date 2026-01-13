import { useState } from "react";
import AgentPlanner from "./pages/AgentPlanner";
import AIReport from "./pages/AIReport";
import HardeningAdvisor from "./pages/HardeningAdvisor";

function App() {
  const [page, setPage] = useState("planner");

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-black text-white p-4 flex gap-6">
        <button onClick={() => setPage("planner")}>Planner</button>
        <button onClick={() => setPage("report")}>AI Report</button>
        <button onClick={() => setPage("hardening")}>Hardening</button>
      </nav>

      {page === "planner" && <AgentPlanner />}
      {page === "report" && <AIReport />}
      {page === "hardening" && <HardeningAdvisor />}
    </div>
  );
}

export default App;
