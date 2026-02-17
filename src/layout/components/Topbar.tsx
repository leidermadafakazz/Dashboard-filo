import "./Topbar.css";

const Topbar = () => {
  return (
    <header className="topbar">
      <input className="topbar__search" type="text" placeholder="Buscar..." />

      <div className="topbar__profile">
        <div className="topbar__avatar"></div>
        <span>Filo</span>
      </div>
    </header>
  );
};

export default Topbar;
