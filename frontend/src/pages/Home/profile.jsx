import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const POLL_INTERVAL = 5000; // 5 seconds

  useEffect(() => {
    if (!token) return;
    let intervalId;

    const fetchProfileData = async () => {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        // Fetch user details
        const userRes = await fetch(`${apiUrl}/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user data");
        const user = await userRes.json();

        // Fetch company details
        const companyRes = await fetch(`${apiUrl}/api/companies/${user.companyId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!companyRes.ok) throw new Error("Failed to fetch company data");
        const company = await companyRes.json();

        // Fetch all teams for this company
        const teamsRes = await fetch(`${apiUrl}/api/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!teamsRes.ok) throw new Error("Failed to fetch teams");
        const teams = await teamsRes.json();

        const companyTeam = teams.find(team => team.companyId === company._id);
        const users = companyTeam?.users || [];

        setUserData({ ...user, company, team: { ...companyTeam, users } });
        setIsLoading(false);
      } catch (err) {
        console.error("Profile load error:", err);
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchProfileData();

    // Poll for team updates
    intervalId = setInterval(fetchProfileData, POLL_INTERVAL);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, [apiUrl, token]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
    
  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="bg-red-900/30 border border-red-700/50 rounded-2xl p-8 max-w-md text-center backdrop-blur-sm transition-all duration-300 hover:border-red-600/70">
          <div className="w-16 h-16 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-red-300 mb-2">Failed to load profile</h3>
          <p className="text-red-400/80 text-sm">Please check your connection and try again.</p>
        </div>
      </div>
    );

  const { firstName, lastName, email, role, status, userId, company, team } = userData;

  return (
    // <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8 transition-all duration-500">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 transform transition-all duration-300 hover:translate-x-2">
          <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-400">Manage your personal and company information</p>
        </div>

        <div className="space-y-6">
          {/* Personal Details Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-cyan-500/30 hover:shadow-cyan-500/10">
            <div className="px-6 py-5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 text-cyan-400 mr-3 transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">First Name</label>
                  <p className="text-white font-medium text-lg">{firstName}</p>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Last Name</label>
                  <p className="text-white font-medium text-lg">{lastName}</p>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Email Address</label>
                  <p className="text-white font-medium">{email}</p>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Role</label>
                  <p className="text-white font-medium">{role}</p>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      status === "Active" 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                    }`}>
                      {status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">User ID</label>
                  <p className="text-gray-300 font-mono text-sm bg-gray-900/50 px-3 py-2 rounded-lg border border-gray-700/50 transition-all duration-300 hover:border-cyan-500/30">
                    {userId}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-purple-500/10">
            <div className="px-6 py-5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 text-purple-400 mr-3 transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Company Details
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Company Name</label>
                  <p className="text-white font-medium text-lg">{company?.name}</p>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Company Status</label>
                  <div className="mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                      company?.status === "Active" 
                        ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                    }`}>
                      {company?.status || "Unknown"}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">Active Users</label>
                  <div className="flex items-center space-x-3">
                    <p className="text-white font-medium text-xl">{team?.users?.length || 0}</p>
                    <span className="text-gray-500">/</span>
                    <p className="text-gray-400">{company?.maxUsers}</p>
                  </div>
                </div>
                <div className="space-y-2 transform transition-all duration-300 hover:translate-y-1">
                  <label className="text-sm font-medium text-gray-400">User Capacity</label>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 mt-3 transition-all duration-500">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${Math.min(100, ((team?.users?.length || 0) / company?.maxUsers) * 100)}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {((team?.users?.length || 0) / company?.maxUsers * 100).toFixed(1)}% utilized
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Card */}
          <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-amber-500/10">
            <div className="px-6 py-5 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <svg className="w-5 h-5 text-amber-400 mr-3 transition-transform duration-300 hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Team Members
                {team?.users && team.users.length > 0 && (
                  <span className="ml-3 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 hover:bg-amber-500/30">
                    {team.users.length}
                  </span>
                )}
              </h2>
            </div>
            <div className="p-6">
              {team?.users && team.users.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
                  {team.users.map((member, idx) => (
                    <div
                      key={member._id || `member-${idx}`}
                      className="flex items-center justify-between p-5 bg-gray-900/40 rounded-xl border border-gray-700/50 transition-all duration-300 hover:border-amber-500/30 hover:bg-gray-800/60 hover:translate-y-1 group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <span className="text-white font-semibold text-sm">
                            {member.firstName?.[0]}{member.lastName?.[0]}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-white group-hover:text-amber-100 transition-colors duration-300">
                            {member.firstName} {member.lastName}
                          </p>
                          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-300 bg-gray-700/50 px-3 py-1.5 rounded-full border border-gray-600/50 transition-all duration-300 group-hover:border-amber-500/30">
                          {member.role}
                        </span>
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                          member.status === "Active"
                            ? "bg-green-500/20 text-green-400 border border-green-500/30 group-hover:bg-green-500/30"
                            : "bg-red-500/20 text-red-400 border border-red-500/30 group-hover:bg-red-500/30"
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 transform transition-all duration-500 hover:scale-105">
                  <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <p className="text-gray-400 font-medium text-lg mb-2">No team members found</p>
                  <p className="text-gray-500 text-sm">Team members will appear here once added</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    // </main>
  );
};

export default Profile;