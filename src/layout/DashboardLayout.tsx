import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import "./DashboardLayout.css";
import { hasCommerce } from "../Auth/auth";

const DashboardLayout = () => {
  const commerceReady = hasCommerce();

  if (!commerceReady) {
    return <Navigate to="/registre" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
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
