import "../styles/dashboard.css";

const Topbar = () => {
  return (
    <div className="topbar">
      <input type="text" placeholder="Search task..." />

      <div className="profile">
        <div className="avatar"></div>
        <span>Filo</span>
      </div>
    </div>
  );
};

export default Topbar;