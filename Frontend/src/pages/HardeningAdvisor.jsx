import { useState } from "react";
import axios from "axios";

export default function HardeningAdvisor() {
  const [target, setTarget] = useState("");
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (!target) {
      alert("Please enter a target");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/hardening",
        {},
        {
          params: { target },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setAdvice(response.data.hardening_advice);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch hardening advice");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        AI Hardening Advisor
      </h1>

      <input
        type="text"
        placeholder="Enter target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
        className="border p-2 w-full mb-4"
      />

      <button
        onClick={fetchAdvice}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Analyzing..." : "Get Hardening Advice"}
      </button>

      {advice && (
        <pre className="mt-6 bg-gray-900 text-white p-4 rounded overflow-x-auto whitespace-pre-wrap">
          {advice}
        </pre>
      )}
    </div>
  );
}
