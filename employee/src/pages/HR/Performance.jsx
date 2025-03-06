import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from "recharts";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

function HRPerformanceMetrics() {
  const [metrics, setMetrics] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/hr/kpi")
      .then(response => {
        const sortedMetrics = response.data.kpis.sort((a, b) => b.kpi_score - a.kpi_score);
        setMetrics(sortedMetrics);
      })
      .catch(() => setError("Failed to fetch KPI data"));
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  // Generate different colors for users dynamically
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d45087", "#1f77b4"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Employee Performance Metrics</h2>

      {metrics.length > 0 ? (
        <>
          {/* KPI Table */}
          {/* <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Employee</th>
                <th className="border p-2">Avg. Review Rating</th>
                <th className="border p-2">Goal Completion Rate</th>
                <th className="border p-2">Timeliness Factor</th>
                <th className="border p-2">Positive Feedback</th>
                <th className="border p-2">Negative Feedback</th>
                <th className="border p-2">KPI Score</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric) => (
                <tr key={metric.employee_id} className="hover:bg-gray-100">
                  <td className="border p-2">{metric.username}</td>
                  <td className="border p-2">{metric.average_review_rating.toFixed(2)}</td>
                  <td className="border p-2">{metric.goal_completion_rate.toFixed(2)}%</td>
                  <td className="border p-2">{metric.timeliness_factor.toFixed(2)}%</td>
                  <td className="border p-2 text-green-600 font-bold">{metric.positive_feedback_count}</td>
                  <td className="border p-2 text-red-600 font-bold">{metric.negative_feedback_count}</td>
                  <td className="border p-2 font-bold text-blue-600">{metric.kpi_score.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table> */}

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Speedometer for Avg. Review Rating */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-center">Avg. Review Rating</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadialBarChart 
                  innerRadius="70%" outerRadius="100%" barSize={20} 
                  data={metrics.map((m, index) => ({ 
                    name: m.username, 
                    value: m.average_review_rating, 
                    fill: colors[index % colors.length] 
                  }))}
                  startAngle={180} endAngle={0}
                >
                  <PolarAngleAxis type="number" domain={[1, 5]} angleAxisId={0} tick={true} />
                  <RadialBar minAngle={15} background clockWise dataKey="value" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart for Positive & Negative Feedback */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-center">Feedback Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={metrics}>
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="positive_feedback_count" stroke="#4caf50" name="Positive Feedback" />
                  <Line type="monotone" dataKey="negative_feedback_count" stroke="#f44336" name="Negative Feedback" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart for Goal Completion Rate & Timeliness Factor */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-center">Goal Completion vs Timeliness</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={metrics}>
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="goal_completion_rate" stroke="#0088FE" name="Goal Completion Rate" />
                  <Line type="monotone" dataKey="timeliness_factor" stroke="#FFBB28" name="Timeliness Factor" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Single KPI Score Graph (Grouped Bar Chart) */}
            <div className="p-4 bg-gray-100 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-2 text-center">KPI Score Comparison</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics}>
                  <XAxis dataKey="username" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="kpi_score" fill="#8884d8" name="KPI Score" />
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
        </>
      ) : (
        <p>No KPI data available.</p>
      )}
    </div>
  );
}

export default HRPerformanceMetrics;
