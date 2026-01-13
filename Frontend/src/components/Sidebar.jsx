export default function Sidebar() {
  return (
    <aside className="w-64 bg-neutral-900 text-gray-300 min-h-screen p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white">
          RedOps <span className="text-red-500">AI</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Enterprise Node
        </p>
      </div>

      <nav className="space-y-4">
        <div className="text-white font-medium bg-neutral-800 px-4 py-2 rounded">
          Dashboard
        </div>

        <div className="px-4 py-2 hover:bg-neutral-800 rounded cursor-pointer">
          Scopes
        </div>

        <div className="px-4 py-2 hover:bg-neutral-800 rounded cursor-pointer">
          Automated Scans
        </div>

        <div className="px-4 py-2 hover:bg-neutral-800 rounded cursor-pointer">
          Reports
        </div>

        <div className="px-4 py-2 hover:bg-neutral-800 rounded cursor-pointer">
          Settings
        </div>
      </nav>

      <div className="absolute bottom-6 left-6 text-sm text-gray-500">
        Admin User<br />
        <span className="text-xs">Simulation Mode</span>
      </div>
    </aside>
  );
}
