import React, { useEffect, useState } from "react";
import axios from "axios";

function Goals() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]); // Store employee IDs
  const [dueDate, setDueDate] = useState(""); // New state for due_date
  
  useEffect(() => {
    axios.get("http://localhost:8080/goals")
      .then(response => {
        setGoals(response.data.goals);
        setEmployees(response.data.employees); // Store employee IDs
      })
      .catch(error => console.error("Error fetching goals:", error));
  }, []);

  const submitGoal = () => {
    console.log()
    axios.post("http://localhost:8080/goals", { 
        username: employeeId, 
        goal_description: newGoal, 
        due_date: dueDate  // Include due_date
      })
      .then(response => {
        window.location.reload();
      })
      .catch(error => console.error("Error submitting goal:", error));
  };
  console.log(employeeId)
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Goals</h2>
      <div className="mb-4">
        {/* Employee Dropdown */}
        <select 
          className="border p-2 rounded mr-2"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        >
          <option value="">Select Employee</option>
          {employees.map((emp, index) => (
            <option key={emp.username} value={emp.username}>
              {emp.username}
            </option>
          ))}
        </select>

        {/* Goal Description Input */}
        <input 
          type="text" 
          className="border p-2 rounded mr-2" 
          placeholder="Enter goal" 
          value={newGoal} 
          onChange={(e) => setNewGoal(e.target.value)}
        />

        {/* Due Date Input */}
        <input 
          type="date" 
          className="border p-2 rounded mr-2" 
          value={dueDate} 
          onChange={(e) => setDueDate(e.target.value)}
        />

        {/* Submit Button */}
        <button 
          className="bg-blue-600 text-white p-2 rounded" 
          onClick={submitGoal}
        >
          Submit
        </button>
      </div>

      {/* Goals Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Employee ID</th>
            <th className="border p-2">Goal Description</th>
            <th className="border p-2">Due Date</th>
            
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {goals.map(goal => (
            <tr key={goal.id} className="hover:bg-gray-100">
              <td className="border p-2">{goal.id}</td>
              <td className="border p-2">{goal.employee_id}</td>
              <td className="border p-2">{goal.goal_description}</td>
              <td className="border p-2">{goal.due_date}</td>
              <td className="border p-2">{goal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Goals;
