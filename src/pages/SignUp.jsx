import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';
import Loader from '../commponents/Loader';


const SignUp = () => {
  const navigate = useNavigate();

  const {BASE_URL} = useContext(ApplicationContext);

  const [loading, setLoading] = useState(false); // State for loader


  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    nameOfUniversity: '',
    universityId: '', 
    universityReg: '',
    course: '',
    branch: '',
    currentCompany: '',
    placementStatement: '',
    studentType: '',
    officerHead: '',
    establishedIn: '',
    noOfCompanyVisit: '',
    nirfRanking: '',
    locationOfUniversity: '',
  });

  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get(
          '${BASE_URL}university/universityList'
        );
        setUniversities(response.data || []);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleUniversityChange = (value) => {
    const selectedUniversity = universities.find(
      (university) => university.nameOfUniversity === value
    );
    setFormData({
      ...formData,
      nameOfUniversity: value,
      universityId: selectedUniversity ? selectedUniversity.id : '',
    });
  };

  const handleSignUp = async () => {
    const { email, password, confirmPassword, nameOfUniversity, universityId } = formData;

    if (!email || !password || !confirmPassword || !nameOfUniversity) {
      alert('Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    } 

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}auth/${userType}/signup`, {
        ...formData,
        userType,
      });


      setLoading(false);


      navigate("/");
      
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Sign-Up Failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
            {loading && <Loader />} {/* Show loader when loading */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

        {/* User Type Selection */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setUserType('user')}
            className={`py-2 px-6 rounded-l-lg ${
              userType === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            Student/Alumni
          </button>
          <button
            onClick={() => setUserType('university')}
            className={`py-2 px-6 rounded-r-lg ${
              userType === 'university' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
          >
            University
          </button>
        </div>

        <div className="space-y-4">
          {/* Common Fields */}
          <label className="block">
            <span className="text-gray-700 font-medium">Email Address</span>
            <input
              type="email"
              placeholder="example@domain.com"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <label className="block">
            <span className="text-gray-700 font-medium">Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value)}
              className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          {/* Dynamic Fields for Student/Alumni */}
          {userType === 'user' && (
            <>
              <label className="block">
                <span className="text-gray-700 font-medium">User Name</span>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.userName}
                  onChange={(e) => handleChange('userName', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">University Name</span>
                <select
                  value={formData.nameOfUniversity}
                  onChange={(e) => handleUniversityChange(e.target.value)}
                  className="form-select mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                >
                  <option value="">Select University</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.nameOfUniversity} >
                      {university.nameOfUniversity}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Course</span>
                <input
                  type="text"
                  placeholder="Course"
                  value={formData.course}
                  onChange={(e) => handleChange('course', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">University Registration Number</span>
                <input
                  type="text"
                  placeholder="University Registration Number"
                  value={formData.universityReg}
                  onChange={(e) => handleChange('universityReg', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Branch</span>
                <input
                  type="text"
                  placeholder="Branch"
                  value={formData.branch}
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Placement Statement</span>
                <select
                  value={formData.placementStatement}
                  onChange={(e) => handleChange('placementStatement', e.target.value)}
                  className="form-select mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                >
                  <option value="">Select Placement Statement</option>
                  <option value="on-campus">On-Campus</option>
                  <option value="off-campus">Off-Campus</option>
                </select>
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Current Company</span>
                <input
                  type="text"
                  placeholder="Current Company"
                  value={formData.currentCompany}
                  onChange={(e) => handleChange('currentCompany', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>
            </>
          )}

          {/* Dynamic Fields for University */}
          {userType === 'university' && (
            <>
              <label className="block">
                <span className="text-gray-700 font-medium">University Name</span>
                <input
                  type="text"
                  placeholder="University Name"
                  value={formData.nameOfUniversity}
                  onChange={(e) => handleChange('nameOfUniversity', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

             
              

              <label className="block">
                <span className="text-gray-700 font-medium">Established In</span>
                <input
                  type="text"
                  placeholder="Established Year"
                  value={formData.establishedIn}
                  onChange={(e) => handleChange('establishedIn', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">No of Companies Visit</span>
                <input
                  type="text"
                  placeholder="No of Companies"
                  value={formData.noOfCompanyVisit}
                  onChange={(e) => handleChange('noOfCompanyVisit', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">NIRF Ranking</span>
                <input
                  type="text"
                  placeholder="NIRF Ranking"
                  value={formData.nirfRanking}
                  onChange={(e) => handleChange('nirfRanking', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Location</span>
                <input
                  type="text"
                  placeholder="University Location"
                  value={formData.locationOfUniversity}
                  onChange={(e) => handleChange('locationOfUniversity', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>

              <label className="block">
                <span className="text-gray-700 font-medium">Head of the Officer</span>
                <input
                  type="text"
                  placeholder="Head of the Officer"
                  value={formData.officerHead}
                  onChange={(e) => handleChange('officerHead', e.target.value)}
                  className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300"
                />
              </label>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleSignUp}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
