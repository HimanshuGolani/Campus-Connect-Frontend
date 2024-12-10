import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '' });
  const { userId,universityId , userType} = useContext(ApplicationContext);
  const navigate = useNavigate();

  // Fetch companies from backend
  const fetchCompanies = async () => {
    try {
      let ID;
      if(userType === 'university'){
        ID = userId;
      }
      else {
        ID = universityId;
      }
      const response = await axios.get(
        `http://localhost:8080/api/v1/university/getListOfCompanies/${ID}`
      );

      console.log(response.data);
      

      setCompanies(response.data);

    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  // Add a new company
  const addCompany = async () => {
    if (!newCompany.name.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/university/createCompany/${userId}`,
        {
          companyName: newCompany.name,
        }
      );
      console.log(response.data);
      
      setCompanies([...companies, response.data]);
      setIsModalOpen(false); // Close the modal
      setNewCompany({ name: '' }); // Reset the form
    } catch (error) {
      console.error('Error adding company:', error);
      alert('Failed to add company. Please try again.');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Filtered companies based on search query
  const filteredCompanies = companies.filter((company) =>
    company.companyName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Navigate to company details page
  const handleCardClick = (company) => {    
    navigate(`/companieyDetails/${company.id}`, { state: { selectedStudents: company.selectedStudents, companyName: company.companyName, companyId: company.id } });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Companies</h1>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
      />

      {filteredCompanies.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 mb-4">
            No companies have been added yet. Please add companies visiting your campus for placements.
          </p>
         {userType === 'university'  && 
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Companies
          </button>}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => handleCardClick(company)}
            >
              <h2 className="text-xl font-bold text-blue-600">
                {company.companyName || 'Unnamed Company'}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Company</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Company Name</label>
              <input
                type="text"
                value={newCompany.name}
                onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={addCompany}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Company
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;
