// src/components/Navbar.tsx
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

export default function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("client_token");
    window.location.href = "/client/login";
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center shadow-md border-b border-gray-700 sticky top-0 z-50">
      {/* Left - App Title */}
      <div className="text-xl font-bold tracking-wide">
        SPU Portal
      </div>

      {/* Center - Nav Links */}
      <div className="hidden md:flex items-center gap-6">
        <a href="/client/dashboard" className="hover:text-yellow-400 transition">Dashboard</a>
        <a href="/client/reports" className="hover:text-yellow-400 transition">Reports</a>
        <a href="/client/settings" className="hover:text-yellow-400 transition">Settings</a>
      </div>

      {/* Right - User Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-2xl text-yellow-400" />
          <span className="hidden sm:inline">Client</span>
        </div>

        <button
          onClick={handleLogout}
          className="
            flex items-center gap-2
            !bg-yellow-500 hover:!bg-yellow-600
            !text-gray-900 font-medium px-4 py-2 rounded-lg
            transition shadow-sm hover:shadow-yellow-500/30
          "
        >
          <FaSignOutAlt />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
}
