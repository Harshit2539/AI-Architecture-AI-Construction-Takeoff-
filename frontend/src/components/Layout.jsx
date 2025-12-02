import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  Plus,
  Folder,
  FolderPlus,
  Database,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import {jwtDecode} from "jwt-decode";

const Layout = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-menu")) setDropdownOpen(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role?.toLowerCase() || "user");

      const fetchUser = async () => {
        const res = await fetch(`${apiUrl}/api/users/${decoded.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch user info");
        const user = await res.json();
        setUserName(`${user.firstName}`);
      };
      fetchUser();
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#0d1b2a] to-[#1a2d45] text-white">
      <aside className="w-64 bg-[#0d1b2a]/80 backdrop-blur-lg border-r border-[#2d3e56] flex flex-col">
        <div className="flex items-center px-6 py-6 border-b border-[#2d3e56]">
          <img src="/assets/images/logo.png" alt="Logo" className="h-12 object-contain mr-3" />
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <button
            onClick={() => navigate("/create")}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 rounded-lg mb-6 transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            <span className="font-medium">Create Project</span>
          </button>

          {userRole === "admin" && (
            <Link
              to="/users"
              className={`flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer group transition-colors ${
                location.pathname === "/users" ? "bg-[#2d3e56]" : "hover:bg-[#2d3e56]"
              }`}
            >
              <User size={18} className="text-gray-400 group-hover:text-white" />
              <span className="font-medium">User Management</span>
            </Link>
          )}

          <Link
            to="/home"
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer group transition-colors ${
              location.pathname === "/home" ? "bg-[#2d3e56]" : "hover:bg-[#2d3e56]"
            }`}
          >
            <Folder size={18} className="text-gray-400 group-hover:text-white" />
            <span className="font-medium">Projects</span>
          </Link>

          <Link
            to="/templates"
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer group transition-colors ${
              location.pathname === "/templates" ? "bg-[#2d3e56]" : "hover:bg-[#2d3e56]"
            }`}
          >
            <FolderPlus size={18} className="text-gray-400 group-hover:text-white" />
            <span className="font-medium">Templates</span>
          </Link>

          <Link
            to="/assemblies"
            className={`flex items-center space-x-3 px-3 py-3 rounded-lg cursor-pointer group transition-colors ${
              location.pathname === "/assemblies" ? "bg-[#2d3e56]" : "hover:bg-[#2d3e56]"
            }`}
          >
            <Database size={18} className="text-gray-400 group-hover:text-white" />
            <span className="font-medium">Assemblies Database</span>
          </Link>
        </nav>

        <div className="px-4 py-4 border-t border-[#2d3e56]">
          <div className="text-sm text-gray-400 font-medium mb-2">Demo Projects</div>
          <div className="space-y-2">
            <div className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer py-1 transition-colors">
              Architecture Concept
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer py-1 transition-colors">
              Urban Planning
            </div>
            <div className="text-xs text-gray-500 hover:text-gray-300 cursor-pointer py-1 transition-colors">
              Landscape Design
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 border border-red-500/40 rounded-lg hover:bg-red-500/10 hover:text-red-300 transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#2d3e56] bg-[#0d1b2a]/50 backdrop-blur-sm">
          <div className="flex-1 h-16 max-w-2xl relative">
            <Search size={18} className="absolute left-3 top-6 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-3 bg-[#1b263b] border border-[#2d3e56] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="user-menu relative ml-6 z-[9999]">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <span className="user-img relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-blue-500 shadow-md">
                <User size={20} className="text-white" />
                <span className="status absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0d1b2a]" />
              </span>

              <span className="font-semibold">{userName || "User"}</span>

              <svg
                className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-[#1b263b] border border-[#2d3e56] rounded-xl shadow-xl z-[9999]">
                {location.pathname !== "/profile" && (
                  <a
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#2d3e56] cursor-pointer"
                  >
                    <User size={16} /> <span>My Profile</span>
                  </a>
                )}
                {location.pathname !== "/settings" && (
                  <a
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/settings");
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-200 hover:bg-[#2d3e56] cursor-pointer"
                  >
                    <Settings size={16} /> <span>Settings</span>
                  </a>
                )}
                <a
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 cursor-pointer"
                >
                  <LogOut size={16} /> <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 p-8 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
