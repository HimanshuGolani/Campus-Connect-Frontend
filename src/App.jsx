import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from "./commponents/Navigation";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChatContainer from './pages/ChatContainer';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Companies from './pages/Companies';
import CompanyDetails from './pages/CompanyDetails';
import './style.css';
import StudentList from './pages/StudentList';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chats" element={<ChatContainer />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/blogs" element={<Blog />} />
            {/* Add routes for companies */}
            <Route path="/companies" element={<Companies />} />
            <Route path="/companieyDetails/:id" element={<CompanyDetails />} />
            <Route path='/StudentList' element={<StudentList />} />
            {/* <Route path="/chats/:id" element={<ChatContainer />} />
            <Route path="/chats" element={<ChatContainer />} /> */}

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
