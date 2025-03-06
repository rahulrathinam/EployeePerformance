import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";

function KPI({ userId }) {
  const [kpi, setKpi] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/user/kpi/${userId}`)
        .then((response) => setKpi(response.data.kpi))
        .catch(() => setError("Failed to fetch KPI data"));
    }
  }, [userId]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!kpi) return <p>Loading KPI data...</p>;

  // 🎯 KPI Table Data
  const tableData = [
    { label: "Average Review Rating", value: kpi.average_review_rating },
    { label: "Goal Completion Rate", value: `${kpi.goal_completion_rate}%` },
    { label: "Timeliness Factor", value: `${kpi.timeliness_factor}%` },
    { label: "Overall KPI Score", value: kpi.kpi_score },
  ];

  // 📈 Line Chart for Goal Completion Rate & Timeliness Factor
  const lineData = [
    { name: "Goal Completion", value: kpi.goal_completion_rate },
    { name: "Timeliness", value: kpi.timeliness_factor },
  ];

  // 🎯 KPI Score Pie Chart
  const pieData = [
    { name: "KPI Score", value: kpi.kpi_score },
    { name: "Remaining", value: 100 - kpi.kpi_score },
  ];

  // 🎯 Gauge Meter (Radial Bar Chart) for Average Review Rating
  const gaugeData = [{ name: "Avg Rating", value: kpi.average_review_rating }];
  const COLORS = ["#FF4D4F", "#FAAD14", "#FADB14", "#52C41A", "#389E0D"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Performance Metrics</h2>

      {/* Three-column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* 📊 KPI Table */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-center">KPI Overview</h3>
          <table className="w-full border-collapse border border-gray-300">
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className="border">
                  <td className="p-2 font-semibold">{row.label}</td>
                  <td className="p-2 text-right">{parseFloat(row.value).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📈 Line Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2 text-center">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1890FF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 🎯 KPI Score Pie Chart */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex justify-center">
          <PieChart width={250} height={250}>
            <Pie data={pieData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#1890FF" : "#E8E8E8"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* 🎯 Gauge Meter for Average Review Rating */}
      <div className="mt-6 flex justify-center">
        <RadialBarChart
          width={300}
          height={200}
          cx="50%"
          cy="50%"
          innerRadius="40%"
          outerRadius="100%"
          barSize={15}
          data={gaugeData}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar
            minAngle={15}
            label
            background
            dataKey="value"
            fill={COLORS[Math.floor(kpi.average_review_rating) - 1]}
          />
          <Tooltip />
        </RadialBarChart>
      </div>
    </div>
  );
}

export default KPI;
