import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';

const CompanyDetails = () => {
  const location = useLocation();
  const { userType, universityId } = useContext(ApplicationContext);
  
  const { selectedStudents, companyName, companyId } = location.state || {
    selectedStudents: [],
    companyName: 'Unknown Company',
    companyId: '',
  };

  const [companyDetails, setCompanyDetails] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchCompanyData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/company/details`, {
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
  }, [companyName, universityId]);

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>
      
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
            <div className="p-4 border border-gray-200 rounded-lg shadow-md">
              <p className="text-gray-600">No students are placed in this company yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
