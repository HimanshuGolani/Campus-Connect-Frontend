// src/context/ApplicationContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create context
const ApplicationContext = createContext();

// Create a provider component
const ApplicationContextProvider = ({ children }) => {
  // Initialize state with localStorage or default values
  const [auth, setAuth] = useState(localStorage.getItem('auth') || null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [userName, setUserName] = useState(localStorage.getItem('userName') || null);
  const [userType,setUserTypeContext] = useState(localStorage.getItem('userType') || null); 
  const [universityId,setUniversityId] = useState(localStorage.getItem('universityId') || null);

  useEffect(() => {
    console.log(auth,userId,userName,universityId);
    
    if (auth) {
      localStorage.setItem('auth', auth);
      localStorage.setItem('userType', userType);
    } else {
      localStorage.removeItem('auth');
    }
    if (userId) {
      localStorage.setItem('userId', userId);
      localStorage.setItem('universityId',universityId)
    } else {
      localStorage.removeItem('userId');
    }
    if (userName) {
      localStorage.setItem('userName', userName);
    } else {
      localStorage.removeItem('userName');
    }
  }, [auth, userId, userName]);

  return (
    <ApplicationContext.Provider value={{ auth, userId, userName, setAuth, setUserId, setUserName,userType,setUserTypeContext,universityId,setUniversityId }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext, ApplicationContextProvider };
