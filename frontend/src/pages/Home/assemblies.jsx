import React, { useState, useEffect } from "react";
import { Upload, FileSpreadsheet, Database, AlertCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ---------- REPLACEMENT FOR jwt-decode PACKAGE ----------
function jwtDecode(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(
      decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      )
    );
  } catch (e) {
    console.error("Invalid JWT:", e);
    return null;
  }
}
// ----------------------------------------------------------

const Assemblies = () => {
  const [userRole, setUserRole] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded) {
        setUserRole(decoded.role?.toLowerCase() || "user");
      }
    }
  }, [token]);

  const fetchUploads = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/boq/uploads`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUploadedFiles(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  const handleUpload = async (file, type) => {
    if (!file) return toast.error("Select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    let projectName = null;

    if (type === "project") {
      projectName = prompt("Enter project name:");
      if (!projectName) return toast.error("Project name required");
      formData.append("project_name", projectName);
      formData.append("uploaded_by", "current_user");
    }

    try {
      setIsLoading(true);
      const endpoint =
        type === "master"
          ? `${apiUrl}/api/boq/upload-master`
          : `${apiUrl}/api/boq/upload-project/${projectName.replace(/\s+/g, "_")}`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          `${type === "master" ? "Master" : "Project"} BOQ uploaded successfully`
        );
        fetchUploads();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during upload");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <ToastContainer theme="dark" position="top-right" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">BOQ Management</h1>
        <p className="text-gray-400">
          Manage master and project BOQs with AI parsing and classification
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {userRole === "admin" && (
          <UploadCard
            title="Upload Master BOQ"
            description="Upload classification hierarchy (A–Z)"
            type="master"
            icon={<Database className="text-blue-400 w-8 h-8" />}
            onUpload={handleUpload}
            isLoading={isLoading}
          />
        )}

        <UploadCard
          title="Upload Project BOQ"
          description="Upload project-specific cost sheets"
          type="project"
          icon={<FileSpreadsheet className="text-cyan-400 w-8 h-8" />}
          onUpload={handleUpload}
          isLoading={isLoading}
        />
      </div>

      <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-700/50 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-900/70 text-gray-300">
            <tr>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">File</th>
              <th className="px-6 py-4 text-left">Uploaded By</th>
              <th className="px-6 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {uploadedFiles.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 text-center text-gray-500 flex flex-col items-center"
                >
                  <AlertCircle className="w-10 h-10 mb-3 text-gray-500" />
                  <p>No BOQ files uploaded yet.</p>
                </td>
              </tr>
            ) : (
              uploadedFiles.map((file, idx) => (
                <tr
                  key={idx}
                  className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-all duration-300"
                >
                  <td className="px-6 py-3 text-gray-200 capitalize">
                    {file.type}
                  </td>
                  <td className="px-6 py-3 text-white">{file.filename}</td>
                  <td className="px-6 py-3 text-gray-400">
                    {file.uploaded_by || "-"}
                  </td>
                  <td className="px-6 py-3 text-gray-400">
                    {new Date(file.uploaded_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UploadCard = ({
  title,
  description,
  type,
  icon,
  onUpload,
  isLoading,
}) => {
  const [file, setFile] = useState(null);

  return (
    <div className="bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <div className="p-3 bg-gray-900/50 rounded-xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>
      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={(e) => setFile(e.target.files[0])}
        className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-500/20 file:text-cyan-300 hover:file:bg-cyan-600/30 cursor-pointer"
      />
      <button
        onClick={() => onUpload(file, type)}
        disabled={!file || isLoading}
        className="mt-4 w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2.5 rounded-lg font-medium shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default Assemblies;
