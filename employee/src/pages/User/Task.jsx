import React, { useEffect, useState } from "react";
import axios from "axios";

function Task() {
  const [goals, setGoals] = useState([]);
  const userId = sessionStorage.getItem("user"); // Retrieve logged-in user's ID

  useEffect(() => {
    axios.get(`http://localhost:8080/user/goals/${userId}`)
      .then(response => setGoals(response.data.goals))
      .catch(error => console.error("Error fetching goals:", error));
  }, [userId]);

  const updateGoalStatus = (goalId, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "in_progress" : "completed";
    const timeField = currentStatus === "pending" ? "start" : "finish";

    axios.put(`http://localhost:8080/user/goals/${goalId}`, { status: newStatus, timeField })
      .then(() => {
        window.location.reload();
      })
      .catch(error => console.error("Error updating goal:", error));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">My Goals</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Goal Description</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {goals.map(goal => (
            <tr key={goal.id} className="hover:bg-gray-100">
              <td className="border p-2">{goal.id}</td>
              <td className="border p-2">{goal.goal_description}</td>
              <td className="border p-2">{goal.status}</td>
              <td className="border p-2">
                {goal.status !== "completed" && (
                  <button 
                    className="bg-blue-600 text-white p-2 rounded"
                    onClick={() => updateGoalStatus(goal.id, goal.status)}
                  >
                    {goal.status === "pending" ? "Take" : "Complete"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Task;
