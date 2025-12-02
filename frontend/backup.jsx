import ProjectView from "pages/file-viewer/ProjectView";   
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import RightSidebar from "./components/RightSidebar";

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
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  // const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("Plans");

  // const [searchResults, setSearchResults] = useState([]);

const projects = JSON.parse(localStorage.getItem("projects")) || [];

function getProjectNameById(projectId) {
  const project = projects.find(p => p.projectId === projectId);
  return project ? project.name : null; // return null if not found
}


  const STATIC_IMAGE_URL =
    "https://placehold.co/1200x800/dbeafe/1e3a8a?text=Architectural+Plan+Placeholder";

const { projectId } = useParams();

//   const handleSearch = async () => {
//     if (!searchText) return;
//     try {
      
//           const apiUrl = import.meta.env.VITE_API_URL;
//       const res = await fetch(
//      `http://127.0.0.1:3003/search?query=${encodeURIComponent(searchText)}&projectId=${projectId}`
//       );
//       const data = await res.json();
//       console.log(data.results); // replace this with actual rendering
//       setSearchResults(data.results);
//     } catch (err) {
//       console.error("Error fetching search results:", err);
//     }
//   };

  const TopBarButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      // Updated for dark theme header
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
      // Updated for dark theme sidebar
      className={`w-full flex items-center p-3 text-sm font-medium transition duration-150 rounded-lg ${
        isActive
          ? "bg-indigo-700 text-white font-bold" // Active dark state
          : "hover:bg-gray-800 text-gray-300" // Inactive dark state
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      <span className="truncate">{label}</span>
    </button>
  );

  // --- Layout Sections ---

  const TopHeader = () => (
    <header className="bg-gray-800 text-gray-100 border-b border-gray-700 p-2 flex justify-between items-center shadow-md">
      {/* Left Section - Project Name/Tabs */}
      <div className="flex items-center space-x-4 ml-4">
        <span className="text-xl font-semibold text-indigo-400">
          Project View
        </span>
        <div className="hidden md:flex space-x-2 text-sm font-medium">
          <span className="p-2 border-b-2 border-indigo-500 text-indigo-400">
           {getProjectNameById(projectId)}
          </span>
        </div>
      </div>

      {/* Center Section - Main Controls */}
      <div className="flex space-x-1">
        <TopBarButton
          icon={Search}
          label="Search"
          onClick={() => setIsRightSidebarOpen(true)}
        />
        <TopBarButton icon={Zap} label="One-Click Area" />
        <TopBarButton icon={Ruler} label="Auto Count" />
        <TopBarButton icon={FileText} label="View Docs" />
      </div>

      {/* Right Section - Settings/Share */}
      <div className="flex items-center space-x-3 mr-4">
        <TopBarButton icon={Settings} label="Settings" />
        <TopBarButton icon={Share2} label="Share" />
        <div className="w-8 h-8 bg-indigo-500 rounded-full text-white flex items-center justify-center font-bold">
          AB
        </div>
      </div>
    </header>
  );

  const LeftSidebar = () => (
    <aside className="w-64 bg-gray-900 border-r border-gray-700 flex flex-col h-full overflow-hidden">
      {/* Nav Tabs */}
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

      {/* Content Area */}
      <div className="p-4 flex-grow overflow-y-auto">
        {activeTab === "Plans" && (
          <div className="space-y-2">
            <SidebarItem
              icon={FileText}
              label="T| A-101 - GROUND..."
              isActive={true}
            />
            <SidebarItem
              icon={FileText}
              label="T| A-102 - FIRST FLOOR..."
              isActive={false}
            />
          </div>
        )}

        {/* Mock Measurements Section */}
        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <p className="text-sm font-semibold mb-2 text-gray-300">
            Measurements
          </p>
          <p className="text-xs text-gray-400">
            You haven't created any measurements or groups yet.
          </p>
          <button className="mt-3 w-full text-left text-sm text-indigo-400 hover:text-indigo-300 transition duration-150 flex items-center">
            <Ruler className="w-4 h-4 mr-2" /> Create measurement
          </button>
          <button className="mt-2 w-full text-left text-sm text-indigo-400 hover:text-indigo-300 transition duration-150 flex items-center">
            <Users className="w-4 h-4 mr-2" /> Create group
          </button>
        </div>
      </div>

      {/* Bottom Search */}
      <div className="p-3 border-t border-gray-700">
        <input
          type="text"
          placeholder="Search in opened pages"
          // Dark input styling
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </aside>
  );

  // const RightSidebar = () => (
  //   <div className="w-64 bg-gray-900 border-l border-gray-700 shadow-xl flex flex-col p-4 space-y-4 text-gray-100">
  //     <h2 className="text-lg font-bold border-b border-gray-700 pb-2">Tools</h2>

  //     {/* Other Mock Tools */}
  //     <div className="space-y-2">
  //       <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
  //         <span className="flex items-center">
  //           <Ruler className="w-4 h-4 mr-2" /> SCALE
  //         </span>
  //         <span className="text-xs font-semibold bg-gray-700 px-2 py-0.5 rounded text-gray-200">
  //           1:100
  //         </span>
  //       </div>
  //       <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
  //         <Download className="w-4 h-4 mr-2" /> EXPORT
  //       </div>
  //       <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
  //         <Filter className="w-4 h-4 mr-2" /> STYLE FILTER
  //       </div>
  //     </div>

  //     {/* Text Search Panel - Focus of the Request */}
  //     <div className="p-4 bg-gray-800 border border-indigo-700 rounded-xl shadow-inner space-y-3">
  //       <h3 className="flex items-center text-md font-semibold text-indigo-400">
  //         <Search className="w-5 h-5 mr-2" /> TEXT SEARCH
  //       </h3>
  //       <div className="relative">
  //         <input
  //           type="text"
  //           value={searchText}
  //           onChange={(e) => setSearchText(e.target.value)}
  //           placeholder="Enter text to search..."
  //           // Dark input styling
  //           className="w-full p-2 pl-10 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
  //         />
  //         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
  //       </div>
  //       {/* Mock Search Results */}
  //       <div className="text-xs text-gray-400">
  //         {searchText
  //           ? `Searching for "${searchText}"...`
  //           : "Type a query to begin search."}
  //       </div>
  //       <button
  //         className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
  //         onClick={handleSearch}
  //       >
  //         Run Search
  //       </button>
  //       <div className="text-xs text-gray-400 mt-2">
  //         {searchResults.length > 0
  //           ? searchResults.map((r) => <div key={r.id} className="mb-2">{r.text}</div>)
  //           : searchText
  //           ? `No results for "${searchText}"`
  //           : "Type a query to begin search."}
  //       </div>
  //     </div>
  //   </div>
  // );

  const MainViewer = () => (
    <main className="flex-grow bg-gray-700 relative overflow-hidden">
      {/* Image Viewer/Canvas - Kept light for high contrast as per typical CAD/Design viewers */}
      <div className="absolute inset-0 p-4 flex items-center justify-center">
        <div className="w-full h-full bg-white rounded-xl shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={STATIC_IMAGE_URL}
            alt="Main architectural plan view"
            className="max-w-full max-h-full object-contain p-4"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/1200x800/ef4444/fee2e2?text=Error:+Image+not+found";
            }}
          />
        </div>
      </div>

      {/* Toggle Button for Right Sidebar */}
      <button
        onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-l-lg shadow-lg hover:bg-indigo-700 transition z-10"
        title={isRightSidebarOpen ? "Hide Tools" : "Show Tools"}
      >
        {isRightSidebarOpen ? "<" : ">"}
      </button>
    </main>
  );

  return (
    // Main container set to dark background
    <div className="min-h-screen bg-gray-900 flex flex-col font-sans text-gray-100">
      <TopHeader />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <MainViewer />
        <div
          className={`h-full flex-shrink-0 transition-width duration-300 ${
            isRightSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          {isRightSidebarOpen && <RightSidebar projectId={projectId} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectView;   this is projectview.jsx import React, { useState } from 'react';
import { Ruler, Download, Filter, Search } from 'lucide-react';





const RightSidebar = ({projectId}) => {

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  

    const handleSearch = async () => {
    if (!searchText) return;
    try {
       console.log(projectId)
          const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(
     `http://127.0.0.1:3003/search?query=${encodeURIComponent(searchText)}&projectId=${projectId}`
      );

      const data = await res.json();
      console.log(data.results); 
      setSearchResults(data.results);
    } catch (err) {
      console.error("Error fetching search results:", err);
    }
  };


  return (
      <div className="w-64 bg-gray-900 border-l border-gray-700 shadow-xl flex flex-col p-4 space-y-4 text-gray-100">
          <h2 className="text-lg font-bold border-b border-gray-700 pb-2">Tools</h2>
    
          {/* Other Mock Tools */}
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
              <span className="flex items-center">
                <Ruler className="w-4 h-4 mr-2" /> SCALE
              </span>
              <span className="text-xs font-semibold bg-gray-700 px-2 py-0.5 rounded text-gray-200">
                1:100
              </span>
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
              <Download className="w-4 h-4 mr-2" /> EXPORT
            </div>
            <div className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer text-gray-300">
              <Filter className="w-4 h-4 mr-2" /> STYLE FILTER
            </div>
          </div>
    
          {/* Text Search Panel - Focus of the Request */}
          <div className="p-4 bg-gray-800 border border-indigo-700 rounded-xl shadow-inner space-y-3">
            <h3 className="flex items-center text-md font-semibold text-indigo-400">
              <Search className="w-5 h-5 mr-2" /> TEXT SEARCH
            </h3>
            <div className="relative">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Enter text to search..."
                // Dark input styling
                className="w-full p-2 pl-10 bg-gray-700 text-white border border-gray-600 rounded-lg text-sm focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            {/* Mock Search Results */}
            <div className="text-xs text-gray-400">
              {searchText
                ? `Searching for "${searchText}"...`
                : "Type a query to begin search."}
            </div>r
            <button
              className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              onClick={handleSearch}
            >
              Run Search
            </button>
            <div className="text-xs text-gray-400 mt-2">
              {searchResults.length > 0
                ? searchResults.map((r) => <div key={r.id}>{r.text}</div>)
                : searchText
                ? `No results for "${searchText}"`
                : "Type a query to begin search."}
            </div>
          </div>
        </div>
  )
}

export default RightSidebar and this is sidebar inside components insiderightsidebar. mujai 1 aisa hi tool chhaihai ya to paid ya to bna skai.