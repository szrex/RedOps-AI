import { useState } from "react";
import axios from "axios";

export default function AgentPlanner() {
  const [target, setTarget] = useState("");
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ask AI for next recommended actions
  const fetchPlan = async () => {
    if (!target) {
      alert("Please enter a target");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/agent/plan",
        {},
        {
          params: { target },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setPlan(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch AI plan");
    } finally {
      setLoading(false);
    }
  };

  // Execute a tool after human approval
  const executeTool = async (tool, requiresApproval) => {
    if (!target) {
      alert("Target is missing");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/agent/execute",
        {},
        {
          params: {
            target: target,
            tool: tool,
            requires_human_approval: requiresApproval,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(`Execution status: ${response.data.status}`);
    } catch (error) {
      console.error(error);
      alert("Execution failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        RedOps AI — Agent Planner
      </h1>

      {/* Target Input */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Enter target (domain / IP / CIDR)"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring"
        />

        <button
          onClick={fetchPlan}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      {/* AI Recommended Plan */}
      {plan && (
        <div className="bg-white rounded-md shadow p-4">
          <h2 className="text-xl font-semibold mb-3">
            AI Recommended Actions
          </h2>

          <ul className="space-y-2">
            {plan.recommended_actions.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span className="font-medium capitalize">
                  {item.tool}
                </span>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-sm ${
                      item.requires_human_approval
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.requires_human_approval
                      ? "Approval Required"
                      : "Auto Allowed"}
                  </span>

                  <button
                    onClick={() =>
                      executeTool(
                        item.tool,
                        item.requires_human_approval
                      )
                    }
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Execute
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
