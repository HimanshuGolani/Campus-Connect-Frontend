import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"; // Icons for menu

const Navigation = () => {
  const { auth, setAuth, userType, setUserId, setUserName, setUserTypeContext, setUniversityId } =
    useContext(ApplicationContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutTasks = () => {
    setAuth(false);
    setUserId("");
    setUserName("");
    setUserTypeContext("");
    setUniversityId("");
    setMenuOpen(false); // Close menu on logout
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 md:px-10">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Campus Connect</Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex bg-white md:bg-transparent shadow-md md:shadow-none transition-all duration-300 ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-6 text-lg p-4 md:p-0">
            <li>
              <Link
                className="text-gray-800 hover:text-blue-500"
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            {auth ? (
              <>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                </li>

                {userType === "user" ? (
                  <>
                    <li>
                      <Link
                        className="text-gray-800 hover:text-blue-500"
                        to="/chitchat/chat"
                        onClick={() => setMenuOpen(false)}
                      >
                        Chat
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-800 hover:text-blue-500"
                        to="/companies"
                        onClick={() => setMenuOpen(false)}
                      >
                        Companies
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-800 hover:text-blue-500"
                        to="/leaderboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        Coding Leaderboard
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        className="text-gray-800 hover:text-blue-500"
                        to="/StudentList"
                        onClick={() => setMenuOpen(false)}
                      >
                        Student List
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="text-gray-800 hover:text-blue-500"
                        to="/leaderboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        Coding Leaderboard
                      </Link>
                    </li>
                  </>
                )}

                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/companies"
                    onClick={() => setMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/blogs"
                    onClick={() => setMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/links"
                    onClick={() => setMenuOpen(false)}
                  >
                    Links
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    onClick={logoutTasks}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-800 hover:text-blue-500"
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
