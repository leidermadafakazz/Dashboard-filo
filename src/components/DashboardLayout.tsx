import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../styles/dashboard.css";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="dashboard-main">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;