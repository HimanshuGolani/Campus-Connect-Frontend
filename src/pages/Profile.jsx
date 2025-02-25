import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApplicationContext } from "../context/ApplicationContext";

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // User profile data
  const [universityProfileData, setUniversityProfileData] = useState(null); // University profile data
  const [activeTab, setActiveTab] = useState("user"); // Active tab: 'user' or 'university'
  const [leetcodeUserName, setLeetcodeUserName] = useState("");
  const [isLeetcodeSubmitted, setIsLeetcodeSubmitted] = useState(false);

  const { userId, userType, universityId , BASE_URL } = useContext(ApplicationContext);

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    console.log("Fetching user profile for userId:", userId);

    try {
      const response = await axios.get(
        `${BASE_URL}user/myProfile/${userId}`
      );
      console.log("User Profile Response:", response.data);
      setProfileData(response.data);
      
      // If LeetCode username already exists, disable the submission
      if (response.data.leetCodeUserName) {
        setIsLeetcodeSubmitted(true);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Function to fetch the university profile
  const fetchUniversityProfile = async () => {
    console.log("Fetching university profile...");

    try {
      const ID = userType === "university" ? userId : universityId;
      const response = await axios.get(
        `${BASE_URL}university/myProfile/${ID}`
      );
      console.log("University Profile Response:", response.data);
      setUniversityProfileData(response.data);
    } catch (error) {
      console.error("Error fetching university profile:", error);
    }
  };

  const handleLeetcodeSubmit = async () => {
    if (!leetcodeUserName.trim()) return;
    try {
      await axios.post(`${BASE_URL}user/add/leetcode/${userId}/${leetcodeUserName}`);
      setIsLeetcodeSubmitted(true);
    } catch (error) {
      console.error("Error submitting LeetCode username:", error);
    }
  };

  useEffect(() => {
    if (userType === "university") {
      fetchUniversityProfile();
    } else {
      fetchUserProfile();
      fetchUniversityProfile();
    }
  }, [userId, userType, universityId]);

  if ((userType !== "university" && !profileData) || !universityProfileData) {
    return <div>Loading Profiles...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#f0f2f5] p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">


        {userType !== "university" && (
          <div className="mb-6">
            {!profileData?.leetCodeUserName && (
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  placeholder="Enter your LeetCode username"
                  value={leetcodeUserName}
                  onChange={(e) => setLeetcodeUserName(e.target.value)}
                  disabled={isLeetcodeSubmitted}
                />
                <button
                  className={`px-4 py-2 rounded text-white ${isLeetcodeSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                  onClick={handleLeetcodeSubmit}
                  disabled={isLeetcodeSubmitted}
                >
                  {isLeetcodeSubmitted ? "Submitted" : "Submit"}
                </button>
              </div>
            )}
          </div>
        )}

        {userType !== "university" && (
          <div className="flex justify-around mb-6">
            <button
              className={`px-4 py-2 rounded ${activeTab === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveTab("user")}
            >
              My Profile
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "university" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setActiveTab("university")}
            >
              University Profile
            </button>
          </div>
        )}

        {activeTab === "user" && userType !== "university" && profileData && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">University Name</p>
                <p className="text-sm text-[#60778a]">{profileData.universityName || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Email</p>
                <p className="text-sm text-[#60778a]">{profileData.email || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Branch</p>
                <p className="text-sm text-[#60778a]">{profileData.branch || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Course</p>
                <p className="text-sm text-[#60778a]">{profileData.course || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Current Company</p>
                <p className="text-sm text-[#60778a]">{profileData.currentCompany || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Profile Statement</p>
                <p className="text-sm text-[#60778a]">{profileData.placementStatement || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">leetCode User name</p>
                <p className="text-sm text-[#60778a]">{profileData.leetCodeUserName || "N/A"}</p>
              </div>
            </div>
          </>
        )}


        {(activeTab === "university" || userType === "university") && universityProfileData && (
          <>
            <h1 className="text-2xl font-bold text-[#111518] mb-4">
              University Profile
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Established In</p>
                <p className="text-sm text-[#60778a]">
                  {new Date(universityProfileData.establishedIn).toLocaleDateString() || "N/A"}
                </p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">University Name</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.universityName  || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Location</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.locationOfUniversity || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">NIRF Ranking</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.nirfRank || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Number of Company's visits of placements</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.numberOfCompaniesVisiting || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">All students</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.numberOfStudents || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Placement Head name</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.officerHead || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">Location</p>
                <p className="text-sm text-[#60778a]">{universityProfileData.locationOfUniversity || "N/A"}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
