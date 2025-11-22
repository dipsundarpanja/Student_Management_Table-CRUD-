import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Delete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the student details by ID
    const fetchStudent = async () => {
      try {
        const res = await fetch(`https://localhost:7206/api/Student/${id}`);
        if (!res.ok) throw new Error("Student not found");
        const data = await res.json();
        setStudent(data);
        setError("");
      } catch {
        setError("Failed to fetch student");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://localhost:7206/api/Student/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      navigate("/", { state: { message: "Student deleted successfully!" } });
    } catch {
      setError("Delete failed");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-10">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Confirm Delete</h1>
        <h6 className="mb-4">Are you sure you want to delete this student?</h6>
        <div className="mb-6 space-y-4">
          <div>
            <label htmlFor="studentId" className="block mb-2 font-medium">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              value={student.s_Id}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="studentName" className="block mb-2 font-medium">
              Student Name
            </label>
            <input
              type="text"
              id="studentName"
              value={student.s_Name}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="studentEmail" className="block mb-2 font-medium">
              Student Email
            </label>
            <input
              type="email"
              id="studentEmail"
              value={student.s_Email}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="studentAge" className="block mb-2 font-medium">
              Student Age
            </label>
            <input
              type="number"
              id="studentAge"
              value={student.s_Age}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label htmlFor="studentClass" className="block mb-2 font-medium">
              Student Class
            </label>
            <input
              type="text"
              id="studentClass"
              value={student.s_Class}
              readOnly
              className="border p-2 rounded w-full bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleConfirmDelete}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Confirm Delete
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
