import { useState } from "react";
import axios from "axios";

export default function AIReport() {
  const [target, setTarget] = useState("");
  const [report, setReport] = useState(null);

  const generateReport = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/report",
      {},
      { params: { target } }
    );
    setReport(response.data.ai_report);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI Report</h1>

      <input
        className="border p-2 w-full mb-4"
        placeholder="Target"
        value={target}
        onChange={(e) => setTarget(e.target.value)}
      />

      <button
        onClick={generateReport}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Generate Report
      </button>

      {report && (
        <pre className="mt-6 bg-black text-green-400 p-4 rounded overflow-x-auto">
          {report}
        </pre>
      )}
    </div>
  );
}
