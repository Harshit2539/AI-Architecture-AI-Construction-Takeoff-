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


    const [showDropdown, setShowDropdown] = useState(false);
      const [openModal, setOpenModal] = useState(false);
        const [selectedClass, setSelectedClass] = useState("");
          const [filteredData, setFilteredData] = useState([]);




  const apiUrl = import.meta.env.VITE_API_URL;


    const boqData = [
    { room: "Room 101", classRef: "FLOOR", divRef: "F1", subRef: "F1.1", description: "Vitrified Tile", unit: "m2", quantity: 45, rate: 850 },
    { room: "Room 102", classRef: "WALL", divRef: "W1", subRef: "W1.1", description: "Emulsion Paint", unit: "m2", quantity: 60, rate: 120 },
  ];

  const handleClassChange = (e) => {
    const value = e.target.value;
    setSelectedClass(value);
    const filtered = boqData.filter(item => item.classRef === value);
    setFilteredData(filtered);
  };

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


//   function Modal({ setOpenModal }) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-96 border border-gray-700">
        
//         {/* Modal Title */}
//         <h2 className="text-white text-lg font-semibold mb-4">Add BOQ Item</h2>

//         {/* Non-editable Input */}
//         <input
//           type="text"
//           value="Selected Drawing Area"
//           readOnly
//           className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg text-sm mb-3 cursor-not-allowed"
//         />

//         {/* Dropdown */}
//         <select
//           className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm mb-4"
//         >
//           <option value="">Select BOQ Category</option>
//           <option value="flooring">Flooring</option>
//           <option value="painting">Painting</option>
//           <option value="plastering">Plastering</option>
//         </select>

//         {/* Buttons */}
//         <div className="flex justify-end space-x-2">
//           <button
//             onClick={() => setOpenModal(false)}
//             className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
//           >
//             Cancel
//           </button>

//           <button
//             className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


function Modal({ setOpenModal, boqData, selectedClass, handleClassChange, filteredData }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-11/12 max-w-xl border border-gray-700">
        <h2 className="text-white text-lg font-semibold mb-4">Add BOQ Item</h2>

        {/* Dropdown for Class Ref */}

                <label className="text-gray-300 text-sm mb-1 block">Area</label>
        <input
          type="text"
          placeholder="Enter area (m²)"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm mb-4"
        />

        {/* 🔹 Dropdown for Class Ref */}
        <label className="text-gray-300 text-sm mb-1 block">Class Ref</label>
        
        <select
          value={selectedClass}
          onChange={handleClassChange}
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm mb-4"
        >
          <option value="">Select Class Ref</option>
          <option value="FLOOR">FLOOR</option>
          <option value="WALL">WALL</option>
        </select>

        {/* Display filtered data */}
        {filteredData.length > 0 && (
          <div className="overflow-x-auto max-h-60">
            <table className="w-full text-sm text-left text-white">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="px-2 py-1">Room</th>
                  <th className="px-2 py-1">Div Ref</th>
                  <th className="px-2 py-1">Sub Ref</th>
                  <th className="px-2 py-1">Description</th>
                  <th className="px-2 py-1">Unit</th>
                  <th className="px-2 py-1">Quantity</th>
                  <th className="px-2 py-1">Rate</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-700">
                    <td className="px-2 py-1">{item.room}</td>
                    <td className="px-2 py-1">{item.divRef}</td>
                    <td className="px-2 py-1">{item.subRef}</td>
                    <td className="px-2 py-1">{item.description}</td>
                    <td className="px-2 py-1">{item.unit}</td>
                    <td className="px-2 py-1">{item.quantity}</td>
                    <td className="px-2 py-1">{item.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={() => setOpenModal(false)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Calculate Cost
          </button>
        </div>
      </div>
    </div>
  );
}


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

  {/* Button → open modal */}
  <button
    onClick={() => setOpenModal(true)}
    className="w-full mt-3 p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium"
  >
    Project BOQ
  </button>

  {/* Modal Component */}
  {openModal && (
    <Modal
      setOpenModal={setOpenModal}
      boqData={boqData}
      selectedClass={selectedClass}
      handleClassChange={handleClassChange}
      filteredData={filteredData}
    />
  )}
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
