import React, { createContext, useState, useEffect } from 'react';

// Create context
const ApplicationContext = createContext();

// Create a provider component
const ApplicationContextProvider = ({ children }) => {
  // Initialize state with localStorage or default values
  const [auth, setAuth] = useState(localStorage.getItem('auth') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
  const [userType, setUserTypeContext] = useState(localStorage.getItem('userType') || null);
  const [universityId, setUniversityId] = useState(localStorage.getItem('universityId') || null);

  const BASE_URL = 'http://localhost:8080/api/v1/';
  // const BASE_URL = 'https://campusconnect-ycye.onrender.com/api/v1/';

  useEffect(() => {
    console.log("Updated context:", { auth, userId, userName, userType, universityId });

    if (auth) {
      localStorage.setItem('auth', auth);
    } else {
      localStorage.removeItem('auth');
    }

    if (userId) {
      localStorage.setItem('userId', userId);
    } else {
      localStorage.removeItem('userId');
    }

    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }

    if (userType) {
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('userType');
    }

    if (universityId) {
      localStorage.setItem('universityId', universityId);
    } else {
      localStorage.removeItem('universityId');
    }
  }, [auth, userId, userName, userType, universityId]);

  return (
    <ApplicationContext.Provider value={{ 
      auth, setAuth, 
      userId, setUserId, 
      userName, setUserName, 
      userType, setUserTypeContext, 
      universityId, setUniversityId ,
      BASE_URL
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationContextProvider };
