export default function ExecutionStream({ logs }) {
  return (
    <div className="col-span-2 bg-neutral-900 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">
        Live Execution Stream
      </h2>

      <div className="bg-black rounded p-3 h-64 overflow-y-auto font-mono text-sm">
        {logs.length === 0 && (
          <p className="text-gray-500">Waiting for events…</p>
        )}

        {logs.map((line, index) => (
          <div key={index} className="mb-1">
            {line.startsWith("[INFO]") && (
              <span className="text-green-400">{line}</span>
            )}
            {line.startsWith("[SCAN]") && (
              <span className="text-blue-400">{line}</span>
            )}
            {line.startsWith("[WARN]") && (
              <span className="text-yellow-400">{line}</span>
            )}
            {line.startsWith("[AI]") && (
              <span className="text-purple-400">{line}</span>
            )}
            {line.startsWith("[SIM]") && (
              <span className="text-gray-400">{line}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
