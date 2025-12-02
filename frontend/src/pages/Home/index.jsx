import React, { useState, useEffect } from "react";
import { LayoutGrid, List, Folder } from "lucide-react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const [view, setView] = useState("grid");
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;


  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role?.toLowerCase() || "user");


      const res = await fetch(`${apiUrl}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch projects");

      const data = await res.json();

      const mappedProjects = data.projects
        ? data.projects.map((proj) => ({
            _id: proj._id,
            project_name: proj.project_name,
            pdf_path: proj.pdf_path,
            scale: proj.scale || null,
          }))
        : data.map((proj) => ({
            _id: proj._id,
            project_name: proj.project_name,
            pdf_path: proj.pdf_path,
            scale: proj.scale || null,
          }));

      setProjects(mappedProjects);
    } catch (err) {
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col h-full text-white">
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">Projects</span>
        </div>

        <div className="flex items-center space-x-3">
          <select className="bg-[#1b263b] border border-[#2d3e56] text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
            <option>My projects</option>
            <option>Team projects</option>
            <option>Archived projects</option>
          </select>

          <div className="flex space-x-1 bg-[#1b263b] border border-[#2d3e56] rounded-xl p-1">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                view === "grid"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all duration-200 ${
                view === "list"
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

  
      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400">
          Loading projects...
        </div>
      ) : (
        <div
          className={`mt-6 grid ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              : "grid-cols-1 gap-4"
          }`}
        >
          {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center col-span-full text-center py-20">
              <Folder size={48} className="text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold mb-2">No projects found</h3>
              <p className="text-gray-400 mb-8">
                Get started by creating your first project or exploring templates
              </p>
            </div>
          ) : (
            projects.map((project) => (
              <Link
                to={`/project/${project._id}`}
                key={project._id}
                state={{
                  name: project.project_name,
                  fileUrl: `${apiUrl}${project.pdf_path}`,
                  scale: project.scale, 
                }}
              >
                <div className="p-6 rounded-2xl bg-[#1b263b] border border-[#2d3e56] hover:border-blue-500/50 hover:bg-[#2d3e56] transition-all duration-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-white truncate">
                      {project.project_name}
                    </h4>
                  </div>

                  
                  {project.scale && (
                    <p className="text-xs text-blue-400 mb-2">
                     
                    </p>
                  )}

                  {project.pdf_path ? (
                    project.pdf_path.toLowerCase().endsWith(".pdf") ? (
                      <iframe
                        src={`${apiUrl}${project.pdf_path}`}
                        title={project.project_name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        style={{ border: "none" }}
                      />
                    ) : (
                      <img
                        src={`${apiUrl}${project.pdf_path}`}
                        alt={project.project_name}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    )
                  ) : null}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
