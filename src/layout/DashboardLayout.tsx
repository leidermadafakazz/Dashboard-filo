import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./DashboardLayout.css";
import { hasCommerce } from "../Auth/auth";
import { useState } from "react";

const DashboardLayout = () => {
  const commerceReady = hasCommerce();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!commerceReady) {
    return <Navigate to="/registre" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="dashboard-layout__content">
        <Topbar />
        <main className="dashboard-layout__main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
