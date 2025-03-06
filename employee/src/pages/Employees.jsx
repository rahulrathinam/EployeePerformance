import React, { useEffect, useState } from "react";
import axios from "axios";

function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/employees")
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employees:", error));
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Position</th>
            <th className="border p-2">Department</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id} className="hover:bg-gray-100">
              <td className="border p-2">{emp.id}</td>
              <td className="border p-2">{emp.first_name}</td>
              <td className="border p-2">{emp.last_name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.position}</td>
              <td className="border p-2">{emp.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
