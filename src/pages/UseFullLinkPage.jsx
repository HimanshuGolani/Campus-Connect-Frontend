import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApplicationContext } from "../context/ApplicationContext";
import { FaFolder, FaFolderOpen, FaLink, FaPlus } from "react-icons/fa";

const UseFullLinkPage = () => {
  const { userId, universityId, userType } = useContext(ApplicationContext);
  const [folders, setFolders] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [folderName, setFolderName] = useState("");
  const [subFolderName, setSubFolderName] = useState("");
  const [linkName, setLinkName] = useState("");
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFolders();
  }, []);

  const fetchFolders = async () => {
    try {
      setLoading(true);
      let tempId = userType === "university" ? userId : universityId;
      const response = await axios.get(`http://localhost:8080/api/v1/folders/${tempId}`);
      console.log(response.data);
      setFolders(response.data || []);
    } catch (err) {
      setError("Failed to load folders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (folderId) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const createFolder = async () => {
    if (!folderName.trim()) return;
    
    try {
      let tempId = userType === "university" ? userId : universityId;
      await axios.post(`http://localhost:8080/api/v1/folders/${tempId}/create`, { name: folderName });
      setFolderName("");
      fetchFolders();
    } catch (error) {
      console.error("Error creating folder:", error);
    }
  };

  const addSubFolder = async () => {
    if (!subFolderName.trim() || !selectedFolder) return;
    
    try {
      let tempId = userType === "university" ? userId : universityId;
      await axios.post(`http://localhost:8080/api/v1/folders/${tempId}/${selectedFolder}/add-subfolder`, { name: subFolderName });
      setSubFolderName("");
      setSelectedFolder(null);
      fetchFolders();
    } catch (error) {
      console.error("Error adding subfolder:", error);
    }
  };

  const addLink = async () => {
    if (!linkName.trim() || !selectedFolder) return;
    
    try {
      let tempId = userType === "university" ? userId : universityId;
      await axios.post(`http://localhost:8080/api/v1/folders/${tempId}/${selectedFolder}/add-file`, {
        name: linkName,
        fileType: "link",
        content: linkName,
      });
      setLinkName("");
      setSelectedFolder(null);
      fetchFolders();
    } catch (error) {
      console.error("Error adding link:", error);
    }
  };

  const renderFolder = (folder) => {
    const folderKey = folder.id ? `folder-${folder.id.toString()}` : `folder-${folder.name}`;

    return (
      <div key={folderKey} className="ml-4 border-l-4 border-blue-300 pl-4">
        <div className="flex items-center cursor-pointer text-blue-700 text-lg font-semibold" onClick={() => toggleFolder(folderKey)}>
          {expandedFolders[folderKey] ? <FaFolderOpen className="mr-2 text-2xl text-yellow-500" /> : <FaFolder className="mr-2 text-2xl text-yellow-500" />}
          {folder.name}
        </div>

        {expandedFolders[folderKey] && (
          <div className="ml-6 mt-2">
            {folder.subFolders && folder.subFolders.map((subFolder) => renderFolder(subFolder))}
            {folder.files && folder.files.map((file, index) => (
              <div key={`file-${index}`} className="flex items-center text-gray-800 mt-2 text-lg">
                <FaLink className="mr-2 text-xl text-purple-500" />
                <a href={file.content} target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-700">{file.name}</a>
              </div>
            ))}
            {userType === 'university' && <button className="mt-2 text-sm text-blue-500 hover:underline" onClick={() => setSelectedFolder(folder.id)}>+ Add SubFolder or Link</button>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen text-gray-900">
      <motion.h1 className="text-4xl font-bold text-blue-700 mb-6" animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
        Useful Links
      </motion.h1>

      {userType === "university" && (
        <div className="mb-6 flex items-center space-x-4">
          <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Folder Name" className="p-3 border rounded-lg text-lg w-1/3" />
          <button onClick={createFolder} className="bg-blue-500 text-white px-5 py-3 rounded-lg text-lg hover:bg-blue-700 flex items-center space-x-2">
            <FaPlus /> <span>Create Folder</span>
          </button>
        </div>
      )}

      {selectedFolder && (
        <div className="mb-6 flex items-center space-x-4">
          <input type="text" value={subFolderName} onChange={(e) => setSubFolderName(e.target.value)} placeholder="SubFolder Name" className="p-3 border rounded-lg text-lg w-1/3" />
          <button onClick={addSubFolder} className="bg-green-500 text-white px-5 py-3 rounded-lg text-lg hover:bg-green-700">Add SubFolder</button>
          <input type="text" value={linkName} onChange={(e) => setLinkName(e.target.value)} placeholder="Link URL" className="p-3 border rounded-lg text-lg w-1/3" />
          <button onClick={addLink} className="bg-purple-500 text-white px-5 py-3 rounded-lg text-lg hover:bg-purple-700">Add Link</button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-600 text-lg">Loading folders...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : folders.length === 0 ? (
        <p className="text-gray-600 text-lg">No folders available.</p>
      ) : (
        <div className="mt-4">{folders.map(renderFolder)}</div>
      )}
    </div>
  );
};

export default UseFullLinkPage;
