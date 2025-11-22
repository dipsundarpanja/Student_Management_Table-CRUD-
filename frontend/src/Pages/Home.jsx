import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchStudents();

    // Check if there's a success message from navigation
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://localhost:7206/api/Student", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setStudents(data.students || data || []);
      setError(null);
    } catch (err) {
      const errorMessage = err.message.includes("Failed to fetch")
        ? "Cannot connect to API. Check CORS settings or if API is running."
        : err.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (studentId) => {
    // Navigates to the edit form page with the student ID
    navigate(`/edit/${studentId}`);
  };

  const handleDelete = (studentId) => {
    // Redirects to the Delete confirmation page
    navigate(`/delete/${studentId}`);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300 p-10">
        <div className="p-8 bg-white rounded shadow-md">
          <h1 className="text-3xl font-bold mb-4">Student Management Table</h1>

          {/* Success message banner */}
          {successMessage && (
            <div className="bg-green-100 text-green-700 border border-green-400 p-3 rounded mb-4">
              {successMessage}
            </div>
          )}

          {loading && <p className="text-center py-4">Loading students...</p>}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-300">
                    STUDENT ID
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">
                    STUDENT NAME
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">
                    STUDENT EMAIL
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">
                    STUDENT AGE
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">
                    STUDENT CLASS
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">
                    EDIT DETAILS
                  </th>
                  <th className="py-2 px-4 border-b border-gray-300">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-4 text-center text-gray-500">
                      No students found
                    </td>
                  </tr>
                ) : (
                  students.map((student, index) => (
                    <tr key={student.s_Id || index}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {student.s_Id}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {student.s_Name}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {student.s_Email}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {student.s_Age}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {student.s_Class}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <button
                          onClick={() => handleEdit(student.s_Id)}
                          className="bg-blue-400 hover:bg-blue-500 text-white py-1 px-3 rounded"
                        >
                          Edit
                        </button>
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <button
                          onClick={() => handleDelete(student.s_Id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          <div className="mt-4 flex gap-4">
            <button
              onClick={fetchStudents}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Refresh Data
            </button>
            <a
              href="/update"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Add New Student
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
