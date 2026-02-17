import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">Filo</div>

      <nav className="sidebar__menu">
        <NavLink to="/dashboard" className="sidebar__menu-item">
          Dashboard
        </NavLink>

        <NavLink to="/productos" className="sidebar__menu-item">
          Productos
        </NavLink>
      </nav>

      <div className="sidebar__bottom">
        <p>Configuracion</p>
        <p>Ayuda</p>
        <p>Salir</p>
      </div>
    </aside>
  );
};

export default Sidebar;
