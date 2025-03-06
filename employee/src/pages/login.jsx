import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/login", { username: userId, password });
      sessionStorage.setItem("user", response.data.user);
      sessionStorage.setItem("role", response.data.role);

      const role = response.data.role;
      if (role === "HR") navigate(`/hr/dashboard`);
      else if (role === "TL") navigate(`/tl/dashboard`);
      else if (role === "USER") navigate(`/user/dashboard`);
      else setError("Invalid role assigned.");

    } catch (error) {
      setError("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96 border border-white/30">
        <h2 className="text-3xl font-bold mb-6 text-center text-white">Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="text" 
            placeholder="User ID" 
            value={userId} 
            onChange={(e) => setUserId(e.target.value)} 
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

          
      <h1 class="">
        Hello world!
      </h1>
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="w-full px-4 py-2 bg-white/20 text-white placeholder-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
          />

          <button 
            type="submit" 
            className="w-full bg-white/30 hover:bg-white/50 text-white py-2 rounded-lg transition-all duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
