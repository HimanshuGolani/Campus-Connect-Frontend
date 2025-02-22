import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ApplicationContext } from "../context/ApplicationContext";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const podiumIcons = ["🏆", "🥈", "🥉"];

const LeaderBoard = () => {
  const [data, setData] = useState([]);
  const [hoveredUser, setHoveredUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { universityId, userId, userType, BASE_URL } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const ID_TO_SEND = userType === "university" ? userId : universityId;
        const response = await axios.get(`${BASE_URL}leetcode/${ID_TO_SEND}`);

        const leaderboardData = Object.entries(response.data)
          .map(([username, stats]) => ({
            username,
            totalSolved: stats.totalSolved || 0,
            easySolved: stats.easySolved || 0,
            mediumSolved: stats.mediumSolved || 0,
            hardSolved: stats.hardSolved || 0,
            ranking: stats.ranking || 0,
            progress: [
              { name: "Easy", value: stats.easySolved },
              { name: "Medium", value: stats.mediumSolved },
              { name: "Hard", value: stats.hardSolved },
            ],
          }))
          .sort((a, b) => b.totalSolved - a.totalSolved); 

        setData(leaderboardData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-white text-gray-900 flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-600 text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        🚀 LeetCode Leaderboard
      </motion.h1>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg">{error}</div>
      ) : (
        <motion.div
          className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white text-lg">
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Username</th>
                <th className="py-3 px-4 text-left">Total Solved</th>
                <th className="py-3 px-4 text-left">Easy</th>
                <th className="py-3 px-4 text-left">Medium</th>
                <th className="py-3 px-4 text-left">Hard</th>
                <th className="py-3 px-4 text-left">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user, index) => (
                <motion.tr
                  key={user.username}
                  className="border-b border-gray-300 hover:bg-blue-100 transition duration-300 relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredUser(user)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <td className="py-3 px-4 font-bold text-lg">
                    {index < 3 ? podiumIcons[index] : index + 1}
                  </td>
                  <td className="py-3 px-4 cursor-pointer font-medium">{user.username}</td>
                  <td className="py-3 px-4 font-semibold text-blue-500">{user.totalSolved}</td>
                  <td className="py-3 px-4">{user.easySolved}</td>
                  <td className="py-3 px-4">{user.mediumSolved}</td>
                  <td className="py-3 px-4">{user.hardSolved}</td>
                  <td className="py-3 px-4">{user.ranking}</td>
                  <td className="py-3 px-4">{user.contributionPoints}</td>

                  {hoveredUser?.username === user.username && (
                    <motion.div
                      className="absolute top-0 right-0 bg-white p-4 rounded-lg shadow-lg"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                    >
                      <h2 className="text-blue-600 font-semibold text-lg text-center mb-2">
                        {user.username}'s Progress
                      </h2>
                      <ResponsiveContainer width={300} height={200}>
                        <LineChart data={user.progress}>
                          <XAxis dataKey="name" stroke="#4f46e5" />
                          <YAxis stroke="#4f46e5" />
                          <Tooltip />
                          <Line type="monotone" dataKey="value" stroke="#1d4ed8" strokeDasharray="3 3" />
                        </LineChart>
                      </ResponsiveContainer>
                    </motion.div>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default LeaderBoard;
