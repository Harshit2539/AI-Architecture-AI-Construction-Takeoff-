import React from "react";
import { FolderPlus, Plus, Users, FileText } from "lucide-react";

const Templates = () => {
  return (
    <div className="flex-1 p-2 overflow-auto">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2 flex items-center space-x-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <FolderPlus size={24} className="text-blue-400" />
            </div>
            <span>Project Templates</span>
          </h2>
          <p className="text-gray-400">
            Create and manage templates to streamline your project workflow
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select className="bg-[#1b263b] border border-[#2d3e56] text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
            <option>All Categories</option>
            <option>Architecture</option>
            <option>Urban Planning</option>
            <option>Landscape Design</option>
          </select>
          <select className="bg-[#1b263b] border border-[#2d3e56] text-sm rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all">
            <option>Sort by: Newest</option>
            <option>Sort by: Most Used</option>
            <option>Sort by: Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Empty State / Content */}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="max-w-md mx-auto">
          <div className="inline-flex p-6 bg-blue-500/10 rounded-2xl mb-6">
            <FileText size={48} className="text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold mb-2">No templates found</h3>
          <p className="text-gray-400 mb-8">
            Start by creating your first template or explore existing categories
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            <button className="flex flex-col items-center p-6 rounded-2xl bg-[#1b263b] border border-[#2d3e56] hover:border-blue-500/50 hover:bg-[#2d3e56] transition-all duration-200 group">
              <div className="p-3 bg-blue-500/10 rounded-xl mb-3 group-hover:bg-blue-500/20 transition-colors">
                <Plus size={24} className="text-blue-400" />
              </div>
              <span className="font-medium mb-1">Create Template</span>
              <span className="text-xs text-gray-400">Start from scratch</span>
            </button>

            <button className="flex flex-col items-center p-6 rounded-2xl bg-[#1b263b] border border-[#2d3e56] hover:border-blue-500/50 hover:bg-[#2d3e56] transition-all duration-200 group">
              <div className="p-3 bg-purple-500/10 rounded-xl mb-3 group-hover:bg-purple-500/20 transition-colors">
                <Users size={24} className="text-purple-400" />
              </div>
              <span className="font-medium mb-1">Team Templates</span>
              <span className="text-xs text-gray-400">Collaborate with team</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
