import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileViewer } from "./FileViewer";
const api=import.meta.env.VITE_API_URL;

import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Share2,
  Search,
  Zap,
  Ruler,
  Download,
  Filter,
} from "lucide-react";

const ProjectView = () => {
  const [activeTab, setActiveTab] = useState("Plans");
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const webViewerInstanceRef = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
  const token = localStorage.getItem("token");
  const fetchProject = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(data);
    } catch (err) {
      console.error("Failed to load project:", err);
    }
  };
  fetchProject();
}, [projectId, apiUrl]);


  const handleViewerReady = (instance) => {
    webViewerInstanceRef.current = instance;
    try {
      instance.docViewer.getToolManager().setToolMode("Pan");
    } catch (e) {
      console.warn("Could not set default tool:", e);
    }
  };

  const setTool = (toolName) => {
    const inst = webViewerInstanceRef.current;
    if (!inst) {
      console.warn("Viewer not ready.");
      return;
    }
    const map = {
      pan: "Pan",
      select: "AnnotationEdit",
      line: "AnnotationCreateLine",
      polyline: "AnnotationCreatePolyline",
      freehand: "AnnotationCreateFreeHand",
      text: "AnnotationCreateText",
      measure: "AnnotationCreateDistanceMeasurement",
    };
    const mode = map[toolName] || toolName;
    try {
      inst.setToolMode(mode);
    } catch (err) {
      console.error("Failed to set tool mode:", mode, err);
      inst.setToolMode("AnnotationEdit");
    }
  };

  const TopBarButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-2 rounded-lg text-gray-200 hover:bg-gray-700 transition duration-150"
      title={label}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs mt-1 hidden sm:block">{label}</span>
    </button>
  );

  const SidebarItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 text-sm font-medium transition duration-150 rounded-lg ${
        isActive
          ? "bg-indigo-700 text-white font-bold"
          : "hover:bg-gray-800 text-gray-300"
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="truncate">{label}</span>
    </button>
  );

  const TopHeader = () => (
    <header className="bg-gray-800 text-gray-100 border-b border-gray-700 p-2 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-4 ml-4">
        <span className="text-xl font-semibold text-indigo-400">
          Project:
        </span>
        <div className="hidden md:flex space-x-4 text-sm font-medium">
          <span className="text-xl p-2 border-b-2 border-indigo-500 text-indigo-400">
            {project ? project.project_name : "Loading..."}
          </span>
          {project?.scale && (
            <span className="p-2 bg-gray-700 text-gray-300 rounded-lg">
              Scale: {project.scale}
            </span>
          )}
        </div>
      </div>

      <div className="flex space-x-1">
        <TopBarButton icon={Ruler} label="Measure" onClick={() => setTool("measure")} />
        <TopBarButton icon={Search} label="Search" />
        <TopBarButton icon={Zap} label="Poly" onClick={() => setTool("polyline")} />
        <TopBarButton icon={Ruler} label="Line" onClick={() => setTool("line")} />
        <TopBarButton icon={FileText} label="Select" onClick={() => setTool("select")} />
      </div>

      <div className="flex items-center space-x-3 mr-4">
        <TopBarButton icon={Settings} label="Settings" />
        <TopBarButton icon={Share2} label="Share" />
      </div>
    </header>
  );

  const LeftSidebar = () => (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-full overflow-hidden">
      <div className="flex border-b border-gray-700">
        {["Project", "Plans", "Assemblies"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`p-3 text-sm font-semibold transition duration-150 ${
              activeTab === tab
                ? "border-b-2 border-indigo-500 text-indigo-400"
                : "text-gray-400 hover:text-indigo-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-4 flex-grow overflow-y-auto">
        {activeTab === "Plans" && (
          <div className="space-y-2">
            <SidebarItem
              icon={FileText}
              label={project ? project.project_name : "Loading..."}
              isActive={true}
            />
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-700">
        <input
          type="text"
          placeholder="Search in opened pages"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </aside>
  );

  const MainViewer = () => (
    <main className="flex-grow bg-gray-700 relative overflow-hidden">
      <div className="absolute inset-0 p-4 flex items-stretch">
        <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden">
          {project ? (
            <FileViewer
              initialDoc={`${apiUrl}${project.pdf_path}`}
              onReady={handleViewerReady}
              style={{ height: "100%", width: "100%" }}
              scale={project.scale || "1:100"}
              apiBase={apiUrl} 
            />
          ) : (
            <div className="flex justify-center items-center h-full text-gray-400">
              Loading file...
            </div>
          )}
        </div>
      </div>
    </main>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans text-gray-100">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <MainViewer />
      </div>
    </div>
  );
};

export default ProjectView;
