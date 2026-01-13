export default function StatusBadge({ status, progress }) {
  if (status === "ENUM") {
    return (
      <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded">
        {progress}% ENUM
      </span>
    );
  }

  if (status === "ACTIVE") {
    return (
      <span className="text-xs bg-red-600 text-white px-3 py-1 rounded">
        ACTIVE
      </span>
    );
  }

  if (status === "DONE") {
    return (
      <span className="text-xs bg-green-600 text-white px-3 py-1 rounded">
        DONE
      </span>
    );
  }

  return (
    <span className="text-xs bg-gray-600 text-white px-3 py-1 rounded">
      UNKNOWN
    </span>
  );
}
