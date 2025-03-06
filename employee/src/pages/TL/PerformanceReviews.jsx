import React, { useEffect, useState } from "react";
import axios from "axios";

function PerformanceReviews() {
  const [reviews, setReviews] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState("");
  const reviewerId = sessionStorage.getItem("user"); // Logged-in user as reviewer

  useEffect(() => {
    axios.get("http://localhost:8080/reviews")
      .then(response => {
        setReviews(response.data.reviews);
        setEmployees(response.data.employees);
      })
      .catch(error => console.error("Error fetching reviews:", error));
  }, []);

  const submitReview = () => {
    axios.post("http://localhost:8080/reviews", { 
      username: employeeId, 
      reviewer_username: reviewerId, 
      comments, 
      rating 
    })
      .then(() => window.location.reload())
      .catch(error => console.error("Error submitting review:", error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Performance Reviews</h2>
      
      {/* Form Section */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee Selection */}
          <div>
            <label className="block font-semibold mb-1">Select Employee:</label>
            <select 
              className="border p-2 rounded w-full"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
            >
              <option value="">-- Select --</option>
              {employees.map(emp => (
                <option key={emp.username} value={emp.username}>{emp.username}</option>
              ))}
            </select>
          </div>

          {/* Rating Input */}
          <div>
            <label className="block font-semibold mb-1">Rating (1-5):</label>
            <input 
              type="number" 
              className="border p-2 rounded w-full" 
              placeholder="Enter rating" 
              value={rating} 
              min="1" max="5"
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          {/* Comments Input */}
          <div className="col-span-2">
            <label className="block font-semibold mb-1">Comments:</label>
            <textarea 
              className="border p-2 rounded w-full" 
              placeholder="Enter comments" 
              value={comments} 
              onChange={(e) => setComments(e.target.value)}
              rows="3"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 text-center">
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={submitReview}
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="border p-3">ID</th>
              <th className="border p-3">Employee</th>
              <th className="border p-3">Reviewer</th>
              <th className="border p-3">Rating</th>
              <th className="border p-3">Comments</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, index) => (
              <tr key={review.id} className={`border p-3 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}>
                <td className="border p-3">{review.id}</td>
                <td className="border p-3">{review.employee}</td>
                <td className="border p-3">{review.reviewer}</td>
                <td className="border p-3 font-bold text-center">{review.overall_rating}</td>
                <td className="border p-3">{review.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
}

export default PerformanceReviews;
