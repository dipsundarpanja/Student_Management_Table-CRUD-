import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    s_Id: "",
    s_Name: "",
    s_Email: "",
    s_Age: "",
    s_Class: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch current student data
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://localhost:7206/api/Student/${id}`);
        if (!res.ok) throw new Error("Failed to fetch student");
        const data = await res.json();

        setFormData({
          s_Id: data.s_Id,
          s_Name: data.s_Name || "",
          s_Email: data.s_Email || "",
          s_Age: data.s_Age || "",
          s_Class: data.s_Class || "",
        });
        setError("");
      } catch (err) {
        setError("Could not load student details.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`https://localhost:7206/api/Student/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to update student");
      setError("");
      navigate("/", { state: { message: "Student updated!" } }); // 𝗜𝗻𝘀𝘁𝗮𝗻𝘁 𝗿𝗲𝗱𝗶𝗿𝗲𝗰𝘁
    } catch (err) {
      setError("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300 p-10">
      <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Edit Student Details</h1>
        {loading && <p>Loading...</p>}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="studentName" className="block mb-2 font-medium">
              Student Name
            </label>
            <input
              type="text"
              name="s_Name"
              value={formData.s_Name}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" // <-- smaller input size
            />
          </div>
          <div>
            <label htmlFor="studentEmail" className="block mb-2 font-medium">
              Student Email
            </label>
            <input
              type="email"
              name="s_Email"
              value={formData.s_Email}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="studentAge" className="block mb-2 font-medium">
              Student Age
            </label>
            <input
              type="number"
              name="s_Age"
              value={formData.s_Age}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="studentClass" className="block mb-2 font-medium">
              Student Class
            </label>
            <input
              type="text"
              name="s_Class"
              value={formData.s_Class}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              disabled={loading}
            >
              Update Student
            </button>
            <a href="/" className="text-blue-500 hover:underline">
              Back to the List
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Edit;
