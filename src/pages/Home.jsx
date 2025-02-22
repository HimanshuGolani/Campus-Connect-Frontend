import React, { useState, useEffect, useContext } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ApplicationContext } from "../context/ApplicationContext";
 
const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { auth } = useContext(ApplicationContext);

  const navigation = useNavigate();

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [bgStyle, setBgStyle] = useState({});
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("welcome");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    setBgStyle({
      background: `radial-gradient(circle at ${x}% ${y}%, rgba(0, 204, 255, 0.3), rgba(0, 0, 0, 0.7))`,
    });
  };

  const sections = ["welcome", "problem", "solution", "features", "cta"];
  
  const handleScroll = () => {
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
          setActiveSection(section);
        }
      }
    }
    )};



  useEffect(() => {
    setTimeout(() => {
      setIsContentLoaded(true);
    }, 3000); // Preloader duration
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const sidebarVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div
      className="min-h-screen w-full overflow-hidden bg-gray-100"
      onMouseMove={handleMouseMove}
      style={{ scrollBehavior: "smooth", ...bgStyle }}
    >
      {/* Preloader Animation */}
      {!isContentLoaded && (
        <motion.div
        className="preloader flex flex-col items-center justify-center fixed inset-0 bg-black z-50 min-h-screen px-4"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
        onAnimationComplete={() => setIsContentLoaded(true)}
      >
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center animate-pulse"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            textShadow:
              "0 0 15px rgba(0, 204, 255, 0.6), 0 0 30px rgba(0, 204, 255, 0.8)",
          }}
        >
          🚀 Campus Connect is loading...
        </motion.h1>
      </motion.div>
      
      )}

      {/* Scroll Progress Bar */}
      {isContentLoaded && (
        <motion.div className="progress-bar" style={{ scaleX }} />
      )}

      {/* Sidebar for navigation */}
      {isContentLoaded && (
       <>
       {/* Mobile Menu Button */}
       <button
         className="fixed top-6 left-6 bg-black text-white p-3 rounded-lg shadow-md z-50 md:hidden"
         onClick={() => setIsMenuOpen(!isMenuOpen)}
       >
         ☰
       </button>
 
       {/* Sidebar Navigation */}
       <motion.div
         className={`fixed top-1/2 left-4 transform -translate-y-1/2 bg-black text-white rounded-lg p-6 shadow-lg z-50 transition-all duration-300
         ${isMenuOpen ? "block" : "hidden md:block"}`}
         initial={{ opacity: 0, x: -50 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
       >
         <ul className="space-y-6 text-white">
           {sections.map((section) => (
             <li key={section}>
               <a
                 href={`#${section}`}
                 className={`hover:text-gray-400 ${
                   activeSection === section ? "text-blue-400 font-bold" : ""
                 }`}
               >
                 {section.charAt(0).toUpperCase() + section.slice(1)}
               </a>
             </li>
           ))}
         </ul>
       </motion.div>
     </>
      )}

      {/* Welcome Section */}
      {isContentLoaded && (
        <motion.section
          id="welcome"
          className="flex flex-col items-center justify-center py-16 sm:py-24 lg:py-32 px-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white min-h-screen"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            transition={{ delay: 0.3, staggerChildren: 0.1 }}
          >
            🌟 Welcome to Campus Connect
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-4xl mx-auto text-gray-200 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            transition={{ delay: 0.5, staggerChildren: 0.1 }}
          >
            Campus Connect is designed to streamline communication and data
            management between universities, students, and placement companies.
          </motion.p>
        </motion.section>
      )}

      {/* Problem Section */}
      {isContentLoaded && (
        <motion.section
          id="problem"
          className="flex flex-col items-center justify-center bg-white py-16 sm:py-24 text-center min-h-screen px-4 sm:px-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-blue-600">
            🚨 The Problem We Solve
          </h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl max-w-4xl mx-auto text-gray-800 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            transition={{ delay: 1.5, staggerChildren: 0.1 }}
          >
            Universities face challenges in managing placement data and ensuring
            effective communication with students. Placement information is
            scattered across various platforms, leading to confusion and missed
            opportunities.
          </motion.p>
        </motion.section>
      )}

      {/* Solution Section */}
      {isContentLoaded && (
        <motion.section
          id="solution"
          className="flex flex-col items-center justify-center bg-gray-100 py-32 text-center h-screen"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-5xl font-extrabold text-gray-800 mb-6 text-blue-600">
            💡 Our Solution
          </h2>
          <motion.p
            className="text-xl max-w-3xl mx-auto text-gray-800 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            transition={{ delay: 1.5, staggerChildren: 0.1 }}
          >
            Campus Connect centralizes placement-related information into one
            easy-to-navigate platform. Universities can upload company visit
            details, track placements, and engage students effectively.
          </motion.p>
        </motion.section>
      )}

      {/* Features Section */}
      {isContentLoaded && (
        <motion.section
          id="features"
          className="flex flex-col items-center justify-center bg-white py-16 sm:py-24 text-center min-h-screen px-4 sm:px-8"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-8 text-blue-600">
            🔥 Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
            {/* Feature 1 */}
            <motion.div
              className="bg-gray-100 p-6 sm:p-8 shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                University & Student Registration
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                Seamless sign-up for both students and university admins with
                tailored access for managing placements.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="bg-gray-100 p-6 sm:p-8 shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Company & Placement Management
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                Upload company data, track placements, and engage students
                effectively from a centralized dashboard.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="bg-gray-100 p-6 sm:p-8 shadow-lg rounded-xl transition-all duration-300 hover:scale-105"
              initial="hidden"
              animate="visible"
              variants={letterVariants}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
                Post & Inquiry System
              </h3>
              <p className="text-base sm:text-lg text-gray-600">
                A dynamic posting system that keeps students and university
                admins updated on key placement events and opportunities.
              </p>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Call to Action Section */}
      {isContentLoaded && (
        <motion.section
          id="cta"
          className="flex flex-col items-center justify-center bg-blue-600 text-center min-h-screen px-4 sm:px-8 py-16 sm:py-24"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 sm:mb-6">
            Get Started with Campus Connect
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white max-w-md sm:max-w-xl md:max-w-2xl mb-6 sm:mb-8">
            Ready to streamline your placement experience? Join Campus Connect
            today and take the first step towards a more efficient, organized
            process.
          </p>
          {!auth && (
            <button
              onClick={() => navigate("/signup")}
              className="px-5 sm:px-6 py-2 sm:py-3 text-base sm:text-lg bg-black text-white font-semibold rounded-lg hover:bg-gray-700 transition-all"
            >
              Sign Up Now
            </button>
          )}
        </motion.section>
      )}
    </div>
  );
};

export default Home;
