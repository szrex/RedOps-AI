export default function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Metric
        label="Active Scans"
        value={metrics.active_scans}
        color="text-white"
        border="border-gray-700"
      />
      <Metric
        label="Critical Vulnerabilities"
        value={metrics.critical}
        color="text-red-500"
        border="border-red-500"
      />
      <Metric
        label="Medium Risk"
        value={metrics.medium}
        color="text-yellow-400"
        border="border-yellow-400"
      />
      <Metric
        label="Assets Scanned"
        value={metrics.assets}
        color="text-blue-400"
        border="border-blue-400"
      />
    </div>
  );
}

function Metric({ label, value, color, border }) {
  return (
    <div
      className={`bg-neutral-900 border ${border} rounded-lg p-5`}
    >
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}
