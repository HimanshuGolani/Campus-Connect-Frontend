import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApplicationContext } from "../context/ApplicationContext";

const Profile = () => {
  const [profileData, setProfileData] = useState(null); // User profile data
  const [universityProfileData, setUniversityProfileData] = useState(null); // University profile data
  const [activeTab, setActiveTab] = useState("user"); // Active tab: 'user' or 'university'

  const { userId, userType, universityId } = useContext(ApplicationContext);

  // Function to fetch the user profile
  const fetchUserProfile = async () => {
    console.log("Fetching user profile for userId:", userId);

    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/user/myProfile/${userId}`
      );
      console.log("User Profile Response:", response.data);
      setProfileData(response.data);
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
        `http://localhost:8080/api/v1/university/myProfile/${ID}`
      );
      console.log("University Profile Response:", response.data);
      setUniversityProfileData(response.data);
    } catch (error) {
      console.error("Error fetching university profile:", error);
    }
  };

  useEffect(() => {
    if (userType === "university") {
      fetchUniversityProfile();
    } else {
      fetchUserProfile();
      fetchUniversityProfile();
    }
  }, [userId, userType]);

  if ((userType !== "university" && !profileData) || !universityProfileData) {
    return <div>Loading Profiles...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#f0f2f5] p-6">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        {userType !== "university" && (
          <div className="flex justify-around mb-6">
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("user")}
            >
              My Profile
            </button>
            <button
              className={`px-4 py-2 rounded ${
                activeTab === "university"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setActiveTab("university")}
            >
              University Profile
            </button>
          </div>
        )}

        {activeTab === "user" && userType !== "university" && profileData && (
          <>
            <h1 className="text-2xl font-bold text-[#111518] mb-4">
              {profileData.userName || "User Name"}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <p className="font-semibold text-[#111518]">Placement Statement</p>
                <p className="text-sm text-[#60778a]">{profileData.placementStatement || "N/A"}</p>
              </div>
              <div className="bg-[#f0f2f5] p-4 rounded-xl">
                <p className="font-semibold text-[#111518]">University</p>
                <p className="text-sm text-[#60778a]">{profileData.universityName || "N/A"}</p>
              </div>
            </div>
          </>
        )}

        {(activeTab === "university" || userType === "university") &&
          universityProfileData && (
            <>
              <h1 className="text-2xl font-bold text-[#111518] mb-4">
                {universityProfileData.universityName || "University Name"}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">Established In</p>
                  <p className="text-sm text-[#60778a]">
                    {new Date(
                      universityProfileData.establishedIn
                    ).toLocaleDateString() || "N/A"}
                  </p>
                </div>
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">Location</p>
                  <p className="text-sm text-[#60778a]">
                    {universityProfileData.locationOfUniversity || "N/A"}
                  </p>
                </div>
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">NIRF Rank</p>
                  <p className="text-sm text-[#60778a]">
                    {universityProfileData.nirfRank || "N/A"}
                  </p>
                </div>
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">
                    Number of Companies Visiting
                  </p>
                  <p className="text-sm text-[#60778a]">
                    {universityProfileData.numberOfCompaniesVisiting || 0}
                  </p>
                </div>
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">Number of Students</p>
                  <p className="text-sm text-[#60778a]">
                    {universityProfileData.numberOfStudents || 0}
                  </p>
                </div>
                <div className="bg-[#f0f2f5] p-4 rounded-xl">
                  <p className="font-semibold text-[#111518]">Officer Head</p>
                  <p className="text-sm text-[#60778a]">
                    {universityProfileData.officerHead || "N/A"}
                  </p>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
};

export default Profile;
