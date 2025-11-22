import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Update() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    studentAge: "",
    studentClass: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await fetch("https://localhost:7206/api/Student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          S_Name: formData.studentName,
          S_Email: formData.studentEmail,
          S_Age: parseInt(formData.studentAge),
          S_Class: formData.studentClass,
        }),
      });

      if (response.ok) {
        // Redirect to home page with success message
        navigate("/", { state: { message: "Student added successfully!" } });
      } else {
        let errorMessage = "Failed to add student";
        try {
          const errorData = await response.json();
          console.log("API Error Response:", errorData);

          // Handle validation errors
          if (errorData.errors) {
            const validationErrors = Object.entries(errorData.errors)
              .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
              .join(" | ");
            errorMessage = `Validation Error: ${validationErrors}`;
          } else {
            errorMessage =
              errorData.message || errorData.title || JSON.stringify(errorData);
          }
        } catch {
          errorMessage = `Error: ${response.status} ${response.statusText}`;
        }
        setMessage({ type: "error", text: errorMessage });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: `Network error: ${error.message}. Make sure your API is running and CORS is configured.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-300 p-10">
        <div className="p-8 bg-white rounded shadow-md max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4">Create New Student</h1>

          {message.text && (
            <div
              className={`p-3 mb-4 rounded ${
                message.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-400"
                  : "bg-red-100 text-red-700 border border-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="studentName" className="block mb-2 font-medium">
                Student Name
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter Student Name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentEmail" className="block mb-2 font-medium">
                Student Email
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                id="studentEmail"
                name="studentEmail"
                value={formData.studentEmail}
                onChange={handleChange}
                placeholder="Enter Student Email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentAge" className="block mb-2 font-medium">
                Student Age
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="number"
                id="studentAge"
                name="studentAge"
                value={formData.studentAge}
                onChange={handleChange}
                placeholder="Enter Student Age"
                required
                min="1"
                max="120"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="studentClass" className="block mb-2 font-medium">
                Student Class
              </label>
              <input
                className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                id="studentClass"
                name="studentClass"
                value={formData.studentClass}
                onChange={handleChange}
                placeholder="Enter Student Class"
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                type="submit"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Student"}
              </button>
              <a href="/" className="text-blue-500 hover:underline">
                Back to the List
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Update;
