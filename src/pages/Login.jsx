import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user');  

  const { setAuth, setUserId, setUserName, setUserTypeContext , setUniversityId , BASE_URL} = useContext(ApplicationContext);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both your email and password.');
      return;
    }

    try {
      // Dynamically set the API URL based on the userType
      let apiUrl;
      switch (userType) {
        case 'user':
          apiUrl = `${BASE_URL}auth/user/login`;  // URL for student
          break;
        case 'alumni':
          apiUrl = `${BASE_URL}auth/user/login`;  // URL for alumni
          break;
        case 'university':
          apiUrl = `${BASE_URL}auth/university/login`;  // URL for university staff
          break;
        default:
          apiUrl = `${BASE_URL}auth/user/login`; // Default URL
      }

      // Making the POST request
      const response = await axios.post(apiUrl, {
        email,
        password,
        userType,  // Include userType to help server identify the user role
      });


      // Handle successful login by updating the context with user data
      setAuth(true);  // Set authentication status
      setUserId(response.data.id);  

      // Set the userName based on userType
      if (userType === 'user' || userType === 'alumni' || userType === 'student') {
        setUserName(response.data.userName);  
        console.log(response.data.universityId);
        setUniversityId(response.data.universityId);
      } else {
        setUserName(response.data.universityName);  // Set universityName for university staff
      }

      setUserTypeContext(userType);  // Set the user type in context (e.g., 'student', 'alumni', 'university')


      // Optionally, store the token in localStorage for persistence
      localStorage.setItem('authToken', response.data.token);

      
      navigate('/'); 

    } catch (error) {
      console.error('Login failed:', error);

      // Improved error handling
      if (error.response) {
        // If the server responds with a status code outside 2xx
        console.error('Server error:', error.response.status);
        alert(`Login failed with status: ${error.response.status}. Please check your credentials and try again.`);
      } else if (error.request) {
        // If the request was made but no response was received
        console.error('Network error:', error.request);
        alert('Network error. Please check your internet connection or try again later.');
      } else {
        // General error (in the code itself)
        console.error('Error message:', error.message);
        alert('An error occurred while processing your request. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">University Portal Login</h1>
        <p className="text-center text-gray-600 mb-6">Select your role and enter your email address to log in.</p>

        <div className="space-y-4">
          {/* User Type Selection */}
          <div className="flex justify-around">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="user"
                checked={userType === 'user'}
                onChange={() => setUserType('user')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-800">Student</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="alumni"
                checked={userType === 'user'}
                onChange={() => setUserType('user')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-800">Alumni</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="university"
                checked={userType === 'university'}
                onChange={() => setUserType('university')}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-800">University</span>
            </label>
          </div>

          {/* Email Input Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Your Email Address</span>
            <input
              type="email"
              placeholder="example@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          {/* Password Input Field */}
          <label className="block">
            <span className="text-gray-700 font-medium">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-2 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full mt-6 py-3 px-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>

          {/* Footer */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              By logging in, you agree to our <a href="#" className="text-blue-500">Terms of Service</a> and <a href="#" className="text-blue-500">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
