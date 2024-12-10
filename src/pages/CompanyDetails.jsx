import React, { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';
import { SortUtils } from 'three/examples/jsm/Addons.js';

const CompanyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userType, userId } = useContext(ApplicationContext);

  // Access the passed state
  const { selectedStudents, companyName, companyId } = location.state || {
    selectedStudents: [],
    companyName: 'Unknown Company',
    companyId: '',
  };

  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null); // Single student object for better management
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent multiple submissions

  // Fetch student by email
  const handleSearch = async () => {
    setErrorMessage('');
    setSearchResult(null); // Clear previous search result
    if (!searchEmail.trim()) {
      setErrorMessage('Please enter an email to search.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/university/search/${userId}?email=${searchEmail.trim()}`
      );
      if (response.data) {
        setSearchResult(response.data);
      } else {
        setErrorMessage('No student found with the provided email.');
      }
    } catch (error) {
      setErrorMessage(
        error.response?.status === 404
          ? 'No student found with that email.'
          : 'An error occurred while searching. Please try again.'
      );
    }
  };

  // Submit a single student to the backend
  const handleAddStudent = async () => {
    if (!searchResult || !companyId) {
      alert('Please search for a valid student and ensure the company ID is available.');
      return;
    }

    if (isSubmitting) {
      return; // Prevent multiple submissions
    }

    setIsSubmitting(true);
    try {
      
      const response  = await axios.post(
        `http://localhost:8080/api/v1/university/addStudent/${userId}/${companyId}/${searchResult.id}`
      );
      console.log(response.data);
      
      alert(`Student ${searchResult.userName} added successfully to ${companyName}.`);
      setSearchEmail('');
      setSearchResult(null);
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add the student. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigate to chat page
  const handleChat = (studentId) => {
    navigate(`/chats/${studentId}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{companyName}</h1>
      <p className="text-gray-600 mb-8">Details about {companyName}</p>

      {/* Selected Students Section */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Selected Students are:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedStudents.length > 0 ? (
          selectedStudents.map((student) => (
            <div
              key={student.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-bold text-blue-600">{student?.userName}</h3>
              <p className="text-gray-600">Email: {student?.email}</p>
              {/* {userType !== 'university' && (
                <button
                  onClick={() => handleChat(student.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Chat
                </button>
              )} */}
            </div>
          ))
        ) : (
          <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-bold text-blue-600">
              No students are placed in this company yet, or your university has not updated the records.
            </h3>
          </div>
        )}
      </div>

      {userType === 'university' && (
        <>
          {/* Add Student Section */}
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Add a Student to {companyName}</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            />
            <button
              onClick={handleSearch}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {/* Display Search Result */}
          {searchResult && (
            <div className="p-4 border rounded-lg shadow-md hover:shadow-lg transition bg-green-100">
              <h3 className="text-lg font-bold text-blue-600">{searchResult.userName}</h3>
              <p className="text-gray-600">Email: {searchResult.email}</p>
              <p className="text-gray-600">University: {searchResult.nameOfUniversity || 'N/A'}</p>
              <button
                onClick={handleAddStudent}
                className={`mt-2 px-4 py-2 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                } text-white rounded-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyDetails;
