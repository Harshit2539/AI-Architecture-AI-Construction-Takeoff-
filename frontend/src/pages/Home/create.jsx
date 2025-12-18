import React, { useState } from "react";
import { Users, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [shareWithCompany, setShareWithCompany] = useState(true);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualScaleLeft, setManualScaleLeft] = useState("");
  const [manualScaleRight, setManualScaleRight] = useState("");
  const [showScaleModal, setShowScaleModal] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const pyApiUrl = import.meta.env.VITE_PYTHON_API_URL;

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const submitWithManualScale = async () => {

    try{
  const finalScale =  manualScaleLeft && manualScaleRight  ? `${manualScaleLeft}:${manualScaleRight}` 
    : "Unknown";
    const projectNameInput = document.getElementById("projectName").value;

  const formData = new FormData();
  formData.append("project_name", projectNameInput);
  formData.append("share_with_company", shareWithCompany);
  formData.append("file", file);
  formData.append("scale", finalScale);
  formData.append("user_id", localStorage.getItem("token"));

  setLoading(true);

  const response = await fetch(`${apiUrl}/api/projects/store`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  });

    const data = await response.json();
      if (response.ok) {
        toast.success(`Project created successfully!`);
        setShowScaleModal(false);
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(data.message || "Something went wrong");
      }
     }
     catch (error) {
      console.error(error);
      setLoading(false);
       setShowScaleModal(false);
      toast.error("Server error, please try again later.");
    } finally {
      setLoading(false);
    }

 
};

  const handleCreateProject = async () => {
    const projectNameInput = document.getElementById("projectName").value;

    if (!projectNameInput) return toast.error("Please enter project name");
    if (!file) return toast.error("Please select a file");

    try {
      setLoading(true);
      const scaleForm = new FormData();
      scaleForm.append("file", file);

      const scaleResponse = await fetch(`${pyApiUrl}/extract-scale/`, {
        method: "POST",
        body: scaleForm,
      });

      const scaleData = await scaleResponse.json();

      const scale = scaleData?.scale || "Unknown";
      setLoading(false);

      if (scale === "Unknown") {
        setShowScaleModal(true);
        return;
      }

      const formData = new FormData();
      formData.append("project_name", projectNameInput);
      formData.append("share_with_company", shareWithCompany);
      formData.append("file", file);
      formData.append("scale", scale);
      formData.append("user_id", localStorage.getItem("token"));
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/projects/store`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(`Project created successfully!`);
        setTimeout(() => navigate("/home"), 2000);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 h-full relative">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1b263b] p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="border-4 border-blue-400 border-t-transparent rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-white text-sm">
              Detecting scale, please wait...
            </p>
          </div>
        </div>
      )}


    {showScaleModal && (
<div className="modal-overlay">
  <div className="modal sexy-modal">
    <h3>Scale Not Detected</h3>
    <p>
      The CAD file does not contain scale information.  
      Please enter drawing scale.
    </p>
 <div className="d-flex gap-2 align-items-center">
  <input
    type="text"
    placeholder="1"
    value={manualScaleLeft}
    onChange={(e) => setManualScaleLeft(e.target.value)}
    className="modal-input scale-input"
  />

  <span className="scale-separator">:</span>

  <input
    type="text"
    placeholder="100"
    value={manualScaleRight}
    onChange={(e) => setManualScaleRight(e.target.value)}
    className="modal-input scale-input"
  />
</div>
    

     <button className="modal-btn" onClick={submitWithManualScale}>Submit</button>
      <button className="modal-btn" onClick={() => setShowScaleModal(false)}>Cancel</button>
  </div>
</div>

 )} 

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

      <div className="bg-[#1b263b]/80 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-5xl flex border border-[#2d3e56] overflow-hidden">
        <div className="flex-1 p-4 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Create New Project</h2>
            <p className="text-gray-400">
              Start by naming your project and setting up permissions
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                placeholder="Enter project name..."
                className="w-full px-4 py-3 bg-[#0d1b2a] border border-[#2d3e56] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-[#0d1b2a] rounded-xl border border-[#2d3e56]">
              <div className="font-medium">Share with company</div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareWithCompany}
                  onChange={() => setShareWithCompany(!shareWithCompany)}
                  className="sr-only"
                />
                <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-all duration-300"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-6 transition-all duration-300 shadow-lg"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Template
              </label>
              <select className="w-full px-4 py-3 bg-[#0d1b2a] border border-[#2d3e56] rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all">
                <option>Start from scratch</option>
                <option>Architecture Template</option>
                <option>Urban Planning Template</option>
                <option>Landscape Design Template</option>
              </select>
            </div>

            <button
              onClick={handleCreateProject}
              disabled={loading}
              className={`w-full py-3 rounded-xl transition-all font-medium shadow-lg shadow-blue-600/20 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              }`}
            >
              {loading ? "Processing..." : "Create Project"}
            </button>
          </div>
        </div>

        <div className="flex-1 border-l border-[#2d3e56] p-8">
          <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-[#2d3e56] rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 group">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 bg-blue-500/10 rounded-2xl">
                <Upload size={32} className="text-blue-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Upload Map View</h3>
              <p className="text-gray-400 text-sm">
                Drag & Drop your files here or browse
              </p>

              <div className="bg-[#0d1b2a] rounded-lg p-4 border border-[#2d3e56]">
                <p className="text-sm font-medium mb-2">Supported formats:</p>
                <p className="text-xs text-gray-400 leading-6">
                  PDF, DWG, DXF, DWF, DGN, PNG, TIFF, JPG, JPEG, BMP, EMF, GIF
                </p>
              </div>

              <input
                type="file"
                id="fileUpload"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="fileUpload"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                Browse Files
              </label>

              {file && (
                <p className="text-sm text-gray-300 mt-3">
                  Selected: <span className="font-medium">{file.name}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
