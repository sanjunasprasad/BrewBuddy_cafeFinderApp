import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.js";
import AdminNavbar from "../components/AdminNavbar.js";

function AdminDashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <AdminNavbar />
        <div className="p-4">
          <h1> welcome admin</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
