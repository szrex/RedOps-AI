import StatusBadge from "./StatusBadge";

export default function TargetList({ targets }) {
  return (
    <div className="bg-neutral-900 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-4">
        Target List
      </h2>

      <div className="space-y-3">
        {targets.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-neutral-800 px-4 py-3 rounded"
          >
            <div>
              <p className="font-medium">{item.target}</p>
              <p className="text-sm text-gray-400">
                {statusText(item.status)}
              </p>
            </div>

            <StatusBadge
              status={item.status}
              progress={item.progress}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function statusText(status) {
  if (status === "ENUM") return "Subdomain Enumeration";
  if (status === "ACTIVE") return "Active Simulation";
  if (status === "DONE") return "Scanning Finished";
  return "Unknown State";
}
