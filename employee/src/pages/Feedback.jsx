import React, { useEffect, useState } from "react";
import axios from "axios";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]);
  const [feedbackType, setFeedbackType] = useState("positive");
  const userId = sessionStorage.getItem("user"); // Assuming userId is stored in session
  const role = sessionStorage.getItem('role');
  useEffect(() => {
    axios.get(`http://localhost:8080/feedback/${userId}`)
      .then(response => setFeedbacks(response.data.feedbacks))
      .catch(error => console.error("Error fetching feedback:", error));

    axios.get(`http://localhost:8080/users/exclude/${userId}`)
      .then(response => setUsers(response.data.users))
      .catch(error => console.error("Error fetching users:", error));
  }, [userId]);

  const submitFeedback = () => {
    if (!selectedUser || !newFeedback) {
      alert("Please fill in all fields.");
      console.log(selectedUser,newFeedback)
      return;
    }

    axios.post("http://localhost:8080/feedback", { 
      username: selectedUser, 
      prid: userId, 
      feedback_text: newFeedback,
      feedback_type: feedbackType
    })
    .then(response => {
      window.location.reload();
    })
    .catch(error => console.error("Error submitting feedback:", error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Feedback</h2>

      {/* Feedback Form */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Select Employee */}
          <div>
            <label className="block font-semibold mb-1">Select Employee:</label>
            <select
              className="border p-2 rounded w-full"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">-- Select --</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </select>
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block font-semibold mb-1">Feedback:</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              placeholder="Enter feedback"
              value={newFeedback}
              onChange={(e) => setNewFeedback(e.target.value)}
            />
          </div>

          {/* Feedback Type Selection */}
          <div className="col-span-2 flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="feedbackType"
                value="positive"
                checked={feedbackType === "positive"}
                onChange={() => setFeedbackType("positive")}
                className="mr-2"
              />
              <span className="text-green-600 font-semibold">Positive</span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="feedbackType"
                value="negative"
                checked={feedbackType === "negative"}
                onChange={() => setFeedbackType("negative")}
                className="mr-2"
              />
              <span className="text-red-600 font-semibold">Negative</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={submitFeedback}
          >
            Submit Feedback
          </button>
        </div>
      </div>

      {/* Feedback Table (Only for Users) */}
      {role === "USER" && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-3">ID</th>
                <th className="border p-3">Employee</th>
                <th className="border p-3">Provider</th>
                <th className="border p-3">Feedback</th>
                <th className="border p-3">Type</th>
                <th className="border p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((fb, index) => (
                <tr key={fb.id} className={`border p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                  <td className="border p-3">{fb.id}</td>
                  <td className="border p-3">{fb.employee_name}</td>
                  <td className="border p-3">{fb.provider_name}</td>
                  <td className="border p-3">{fb.feedback_text}</td>
                  <td className={`border p-3 font-bold ${fb.feedback_type === "positive" ? "text-green-600" : "text-red-600"}`}>
                    {fb.feedback_type}
                  </td>
                  <td className="border p-3">{new Date(fb.feedback_date).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Feedback;
