import React, { useState } from 'react';
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
     
        </div>
  )
}

export default RightSidebar