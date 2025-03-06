import React from "react";
import { useNavigate } from "react-router-dom";
import KPI from "./KPIs";

function UserDB() {

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h1>User Dashboard</h1>
        <KPI userId={sessionStorage.getItem('user')}/>
    </div>
  );
}

export default UserDB;
