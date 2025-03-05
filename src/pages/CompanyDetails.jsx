import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';
import { FaTrash } from 'react-icons/fa';
import Loader from '../commponents/Loader';

const CompanyDetails = () => {
  const location = useLocation();
  const { userType, universityId, BASE_URL, userId } = useContext(ApplicationContext);

  const { selectedStudents = [], companyName = 'Unknown Company', companyId = '' } = location.state || {};

  const [companyDetails, setCompanyDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (userType === 'university') return;

      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`${BASE_URL}company/details`, {
          params: { name: companyName, universityId },
        });

        console.log(response.data);

        if (response.data.length === 2) {
          setPosts(response.data[0] || []);
          setCompanyDetails(response.data[1] || {});
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load company details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyData();
  }, [companyName, universityId, userType, BASE_URL]);

  const handleSearch = async () => {
    if (!searchEmail) {
      alert('Please enter an email to search.');
      return;
    }

    try {
setLoading(true)      
      const response = await axios.get(`${BASE_URL}university/search/${userId}`, {
        params: { email: searchEmail },
      });
      

      setSearchResult(response.data);
    } catch (error) {
      console.error('Error searching student:', error);
      alert('Student not found.');
    }
    finally{
      setLoading(false)
    }
  };

  const handleAddStudent = async () => {
    if (!searchResult || !companyId) {
      alert('Invalid student or company.');
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      setLoading(true)
      await axios.post(
        `${BASE_URL}university/addStudent/${userId}/${companyId}/${searchResult.id}`
      );

      alert(`Student ${searchResult.userName} added to ${companyName}.`);
      setSearchResult(null);
      setSearchEmail('');
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add the student.');
    } finally {
      setIsSubmitting(false);
      setLoading(false)
    }
  };

  const handelDelete = async () => {
      try{
        setLoading(true);
        let universityId = userId;
        const response = await axios.delete(`${BASE_URL}university/remove-company/${companyId}/${universityId}`);
        console.log(response);
        setLoading(false);
        
        alert("Succesfully deleted the company.");
      }
      catch(error){
        console.log('Error removing comoapny:', error);
       alert('Failed to remove the company.');
      }
      finally{
        setLoading(false)
      }
  }

  return (
   
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
       {loading && <><Loader /></>}
      <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>

      {
        userType === 'university' && (
          <div className="flex justify-end p-4">
      <button 
        onClick={handelDelete} 
        className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full max-w-[200px] md:w-auto">
        <FaTrash />
        Delete the company
      </button>
    </div>
        )
      }

      {error && <p className="text-red-500">{error}</p>}

      {userType === 'user' && (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Company Details</h2>
          {loading ? (
            <p className="text-gray-600">Loading company details...</p>
          ) : (
            Object.keys(companyDetails).length > 0 ? (
              <div className="space-y-4">
                {Object.entries(companyDetails).map(([key, value]) => (
                  <p key={key} className="text-gray-700">
                    <strong className="capitalize">{key.replace(/_/g, ' ')}:</strong> {value || 'N/A'}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No details available for this company.</p>
            )
          )}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Posts about {companyName}</h2>
        {loading ? (
          <p className="text-gray-600">Loading posts...</p>
        ) : posts.length > 0 ? (
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
                <div className="text-sm text-gray-500 mt-2">
                  Posted by <span className="font-semibold">{post.userName}</span> on {new Date(post.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No posts available for this company.</p>
        )}
      </div>

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


          {searchResult && (
            <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-green-100">
              <h3 className="text-lg font-semibold text-blue-600">{searchResult.userName}</h3>
              <p className="text-gray-600">Email: {searchResult.email}</p>
              <p className="text-gray-600">
                University: {searchResult.nameOfUniversity || 'N/A'}
              </p>
              <button
                onClick={handleAddStudent}
                className={`mt-4 px-6 py-3 ${isSubmitting ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'} text-white rounded-lg`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Student'}
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Selected Students</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedStudents.length > 0 ? (
            selectedStudents.map((student) => (
              <div key={student.id} className="p-4 border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-blue-600">{student.userName}</h3>
                <p className="text-gray-600">Email: {student.email}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No students are placed in this company yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
