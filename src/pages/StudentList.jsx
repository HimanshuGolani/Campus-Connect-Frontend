import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ApplicationContext } from '../context/ApplicationContext';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/university/${userId}/listOfStudents`
        );
        console.log(response.data);
        setStudents(response.data || []);
      } catch (err) {
        setError('Failed to fetch students. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [userId]);

  if (loading) return <p className="text-center text-lg font-medium">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-medium">{error}</p>;

  return (
    <div className="flex justify-center bg-gray-50 py-10">
      <div className="w-full max-w-4xl px-2 sm:px-6 lg:px-8">
        <h1 className="text-xl font-bold text-gray-900 mb-4 text-center">Student List</h1>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                >
                  Serial No.
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-blue-500"
                >
                  Branch
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-orange-500"
                >
                  Course
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Placement Status
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Current Company
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                    {student.userName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {student.branch}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {student.course}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {student.placementStatement}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                    {student.currentCompany}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
