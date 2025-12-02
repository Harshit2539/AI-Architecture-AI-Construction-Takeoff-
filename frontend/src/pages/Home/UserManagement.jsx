import React, { useState, useEffect, useCallback } from "react";
import {
  UserPlus,
  Trash2,
  Edit,
  Save,
  X,
  Search,
  Users,
  Shield,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
    status: "Active",
  });
  const [teamMember, setTeamMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [userLimit, setUserLimit] = useState(0);
  const [teamCount, setTeamCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Decode JWT once on mount
  useEffect(() => {
    if (!token) return;
    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role?.toLowerCase() || "user");
      setUserId(decoded.id);
      setCompanyId(decoded.companyId);
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/signin");
    }
  }, [token, navigate]);

  // Fetch company info and initialize team
  const fetchCompanyAndTeam = useCallback(async () => {
    if (!token) return;
    try {
      // Company info
      const companyRes = await fetch(`${apiUrl}/api/companies/my-company`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!companyRes.ok) throw new Error("Failed to fetch company info");
      const companyData = await companyRes.json();
      setCompanyId(companyData._id);
      setUserLimit(companyData.maxUsers);

      // Teams
      const teamRes = await fetch(`${apiUrl}/api/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!teamRes.ok) throw new Error("Failed to fetch teams");
      let teams = await teamRes.json();

      // Find or create company team
      let companyTeam = teams.find(
        (team) => team.companyId === companyData._id
      );
      if (!companyTeam) {
        const createTeamRes = await fetch(`${apiUrl}/api/teams`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: companyData.name,
            companyId: companyData._id,
            maxUsers: companyData.maxUsers,
          }),
        });
        if (!createTeamRes.ok) throw new Error("Failed to create default team");
        companyTeam = await createTeamRes.json();
      }

      setTeamCount(companyTeam.users?.length || 0);
      return companyTeam._id;
    } catch (err) {
      console.error(err);
    }
  }, [apiUrl, token]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    const teamId = await fetchCompanyAndTeam();
    if (!teamId) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/teams`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const teams = await res.json();
      const companyTeam = teams.find((team) => team._id === teamId);
      if (!companyTeam) return;

      const allUsers = companyTeam.users || [];
      const visibleUsers =
        userRole === "admin"
          ? allUsers
          : allUsers.filter((u) => u._id === userId);
      setUsers(visibleUsers);
      setTeamCount(companyTeam.users?.length || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, token, userRole, userId, fetchCompanyAndTeam]);

  useEffect(() => {
    if (token && userRole) fetchUsers();
  }, [token, userRole, fetchUsers]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const openEditModal = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isEditing
        ? `${apiUrl}/api/users/${selectedUser._id}`
        : `${apiUrl}/api/users`;
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, companyId }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(isEditing ? "User updated" : "User created");
        setShowModal(false);
        fetchUsers();
      } else toast.error(data.message || "Error saving user");
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  // const handleDelete = async (id) => {
  //   if (!window.confirm("Are you sure you want to delete this user?")) return;
  //   try {
  //     const res = await fetch(`${apiUrl}/api/users/${id}`, {
  //       method: "DELETE",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     if (res.ok) setUsers(users.filter((u) => u._id !== id));
  //     else toast.error(data.message || "Error deleting user");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleDelete = (id) => {
    toast.info(
      <div className="flex flex-col space-y-2">
        <span>Are you sure you want to delete this user?</span>
        <div className="flex justify-end space-x-2">
          <button
            onClick={async () => {
              toast.dismiss();
              try {
                const res = await fetch(`${apiUrl}/api/users/${id}`, {
                  method: "DELETE",
                  headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (res.ok) {
                  setUsers(users.filter((u) => u._id !== id));
                  toast.success("User deleted successfully!");
                } else {
                  toast.error(data.message || "Error deleting user");
                }
              } catch (err) {
                console.error(err);
                toast.error("Server error while deleting user");
              }
            }}
            className="px-3 py-1 bg-red-500/80 text-white rounded-md hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="px-3 py-1 bg-gray-600/80 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        className: "bg-gray-800/90 text-white",
      }
    );
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    const teamId = await fetchCompanyAndTeam();
    if (!teamId) return toast.error("Team not loaded yet");
    try {
      const res = await fetch(`${apiUrl}/api/teams/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ teamId, ...teamMember }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Team member added!");
        setShowInviteModal(false);
        setTeamMember({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
        fetchUsers();
      } else toast.error(data.message || "Error adding user");
    } catch (err) {
      console.error("Server error:", err);
      toast.error("Server error");
    }
  };

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    const colors = {
      admin: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      manager: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      supervisor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      user: "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };
    return colors[role.toLowerCase()] || colors.user;
  };

  return (
    // <div >
    <div className="max-w-7xl mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Header Section */}
      <div className="mb-8 transform transition-all duration-300">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              User Management
            </h1>
            <p className="text-gray-400">
              Manage team members and their permissions
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex flex-wrap gap-4">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 min-w-[140px] transition-all duration-300 hover:border-cyan-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{teamCount}</p>
                  <p className="text-xs text-gray-400">Active Users</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 min-w-[140px] transition-all duration-300 hover:border-purple-500/30">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{userLimit}</p>
                  <p className="text-xs text-gray-400">User Limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Action Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
          />
        </div>

        {userRole === "admin" && (
          <button
            onClick={() => setShowInviteModal(true)}
            disabled={teamCount >= userLimit}
            className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105"
          >
            <UserPlus size={18} />
            <span>Add Team Member</span>
          </button>
        )}
      </div>

      {/* Capacity Warning */}
      {teamCount >= userLimit && userRole === "admin" && (
        <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 backdrop-blur-sm transition-all duration-300">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-red-300 font-medium">User limit reached</p>
              <p className="text-red-400/80 text-sm">
                You've reached the maximum number of users ({userLimit}). Please
                upgrade your plan to add more team members.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/30">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-800/80 to-gray-900/80">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700/50">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700/50">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700/50">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 border-b border-gray-700/50">
                  Status
                </th>
                {userRole === "admin" && (
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300 border-b border-gray-700/50">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={userRole === "admin" ? 5 : 4}
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-gray-400 font-medium">
                        Loading users...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={userRole === "admin" ? 5 : 4}
                    className="text-center py-12"
                  >
                    <div className="flex flex-col items-center space-y-3">
                      <Users className="w-12 h-12 text-gray-600" />
                      <p className="text-gray-400 font-medium">
                        No users found
                      </p>
                      <p className="text-gray-500 text-sm">
                        Try adjusting your search criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="group hover:bg-gray-700/40 transition-all duration-300 border-b border-gray-700/30 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <span className="text-white font-semibold text-sm">
                            {user.firstName?.[0]}
                            {user.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-cyan-100 transition-colors duration-300">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-gray-400">
                            ID: {user._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-medium">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${getRoleColor(
                          user.role
                        )} transition-all duration-300 group-hover:scale-105`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 ${
                          user.status === "Active"
                            ? "bg-green-500/20 text-green-400 border-green-500/30 group-hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30 group-hover:bg-red-500/30"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    {userRole === "admin" && (
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => openEditModal(user)}
                            className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 hover:border-blue-400/50 rounded-lg text-blue-400 hover:text-blue-300 transition-all duration-300 transform hover:scale-110"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-400/50 rounded-lg text-red-400 hover:text-red-300 transition-all duration-300 transform hover:scale-110"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* </div> */}

      {showModal && (
        <Modal
          title={isEditing ? "Edit User" : "Add New User"}
          onClose={() => setShowModal(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {["firstName", "lastName", "email"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                value={formData[field]}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
                required
              />
            ))}
            {!isEditing && (
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
                required
              />
            )}
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
            >
              <option value="user">User</option>
              <option value="supervisor">Supervisor</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105 flex justify-center items-center"
            >
              <Save size={18} className="mr-2" />
              {isEditing ? "Update User" : "Create User"}
            </button>
          </form>
        </Modal>
      )}

      {showInviteModal && (
        <Modal
          title={`Add Team Member • ${teamCount}/${userLimit} Users`}
          onClose={() => setShowInviteModal(false)}
        >
          <form onSubmit={handleInvite} className="space-y-4">
            {["firstName", "lastName", "email", "password"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                placeholder={field.replace(/^\w/, (c) => c.toUpperCase())}
                value={teamMember[field]}
                onChange={(e) =>
                  setTeamMember({ ...teamMember, [field]: e.target.value })
                }
                required
                className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
              />
            ))}
            <select
              value={teamMember.role}
              onChange={(e) =>
                setTeamMember({ ...teamMember, role: e.target.value })
              }
              className="w-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/30 transition-all duration-300"
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="user">User</option>
              <option value="supervisor">Supervisor</option>
            </select>
            <button
              type="submit"
              disabled={teamCount >= userLimit}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 disabled:shadow-none transition-all duration-300 transform hover:scale-105 disabled:transform-none"
            >
              Add Team Member
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-300">
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 w-full max-w-md border border-gray-700/50 shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700/50 rounded-lg text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110"
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

export default UserManagement;
