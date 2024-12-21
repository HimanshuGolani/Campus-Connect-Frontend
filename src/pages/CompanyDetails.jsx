import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';

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

  const [companyDetails, setCompanyDetails] = useState({}); // For storing company details
  const [errorMessage, setErrorMessage] = useState('');

  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch company details from the backend
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/company/details?name=${companyName}`
        );
        setCompanyDetails(response.data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setErrorMessage('Failed to load company details. Please try again.');
      }
    };

    fetchCompanyDetails();
  }, [companyName]);

  // Search for student by email
  const handleSearch = async () => {
    setErrorMessage('');
    setSearchResult(null);
    if (!searchEmail.trim()) {
      setErrorMessage('Please enter an email to search.');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/university/search/${userId}?email=${searchEmail.trim()}`
      );
      setSearchResult(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.status === 404
          ? 'No student found with that email.'
          : 'An error occurred while searching.'
      );
    }
  };

  // Submit selected student to backend
  const handleAddStudent = async () => {
    if (!searchResult || !companyId) {
      alert('Invalid student or company.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/university/addStudent/${userId}/${companyId}/${searchResult.id}`
      );
      alert(`Student ${searchResult.userName} added to ${companyName}.`);
      setSearchResult(null);
      setSearchEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add the student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>

      {/* Company Details Section - Only for userType 'user' */}
      {userType === 'user' && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Details</h2>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          {Object.keys(companyDetails).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(companyDetails).map(([key, value]) => (
                <p key={key} className="text-gray-700">
                  <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Loading company details...</p>
          )}
        </div>
      )}

      {/* Selected Students Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedStudents.length > 0 ? (
            selectedStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              >
                <h3 className="text-lg font-semibold text-blue-600">{student?.userName}</h3>
                <p className="text-gray-600">Email: {student?.email}</p>
              </div>
            ))
          ) : (
            <div className="p-4 border border-gray-200 rounded-lg shadow-md">
              <p className="text-gray-600">No students are placed in this company yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Student Section - Only for userType 'university' */}
      {userType === 'university' && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Add a Student to {companyName}
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="mt-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          {searchResult && (
            <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-green-100">
              <h3 className="text-lg font-semibold text-blue-600">{searchResult.userName}</h3>
              <p className="text-gray-600">Email: {searchResult.email}</p>
              <p className="text-gray-600">
                University: {searchResult.nameOfUniversity || 'N/A'}
              </p>
              <button
                onClick={handleAddStudent}
                className={`mt-4 px-6 py-3 ${
                  isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
                } text-white rounded-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyDetails;
