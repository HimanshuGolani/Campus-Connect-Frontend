import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ApplicationContext } from '../context/ApplicationContext';

const Navigation = () => {
  const { auth, setAuth, userType  ,setUserId ,
    setUserName ,
    setUserTypeContext ,
  setUniversityId } = useContext(ApplicationContext);

  const logoutTasks = () => {
    setAuth(false);
    setUserId("");
    setUserName("");
    setUserTypeContext(""); 
    setUniversityId("");
  };
  
  return (
    <header className="flex items-center justify-between border-b border-gray-200 px-10 py-3">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-gray-800">
          <Link to="/">Campus Connect</Link>
        </div>
      </div>
      <nav className="flex items-center gap-8">
        <Link className="text-gray-800 hover:text-blue-500" to="/">Home</Link>
        {auth ? (
          // If authenticated
          userType === 'user' ? (
            <>
              {/* User-specific navigation */}
              <Link className="text-gray-800 hover:text-blue-500" to="/profile">Profile</Link>
              <Link className="text-gray-800 hover:text-blue-500" to="/chitchat/chat">Chat</Link>
              <Link className="text-gray-800 hover:text-blue-500" to="/companies">Companies</Link>
              {/* <Link className="text-gray-800 hover:text-blue-500" to="/chats">All Chat's</Link> */}
              <Link className="text-gray-800 hover:text-blue-500" to="/blogs">Blogs</Link>
              <Link className='text-gray-800 hover:text-blue-500' to='/links'>Links</Link>
              <Link
                onClick={logoutTasks}
                className="text-gray-800 hover:text-blue-500"
                to="/"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              {/* University-specific navigation */}
              <Link className="text-gray-800 hover:text-blue-500" to="/profile">Profile</Link>
              <Link className="text-gray-800 hover:text-blue-500" to="/StudentList">Student-List</Link>
              <Link className="text-gray-800 hover:text-blue-500" to="/companies">Companies</Link>
              <Link className="text-gray-800 hover:text-blue-500" to="/blogs">Blogs</Link>
              <Link className='text-gray-800 hover:text-blue-500' to='/links'>Links</Link>
              <Link
                onClick={() => setAuth(false)}
                className="text-gray-800 hover:text-blue-500"
                to="/"
              >
                Logout
              </Link>
            </>
          )
        ) : (
          // If not authenticated
          <>
            <Link className="text-gray-800 hover:text-blue-500" to="/login">Login</Link>
            <Link className="text-gray-800 hover:text-blue-500" to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
