import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LayoutDashboard, Package, Settings, HelpCircle, LogOut, History } from "lucide-react";
import "./Sidebar.css";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setShowLogoutModal(true);
    setTimeout(() => {
      navigate("/users/login", { replace: true });
    }, 2000);
  };

  return (
    <aside className={`sidebar ${isOpen ? "sidebar--open" : "sidebar--closed"}`}> 

      <button className="sidebar__toggle" onClick={onToggle}>
        {isOpen ? "✕" : "☰"}
      </button>
      {isOpen && <h1 className="sidebar__title">Filo Socio</h1>}

      <nav className="sidebar__menu">
        <NavLink to="/dashboard" className="sidebar__menu-item">
          <LayoutDashboard size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink to="/productos" className="sidebar__menu-item">
          <Package size={20} />
          {isOpen && <span>Productos</span>}
        </NavLink>
        <NavLink to="/historial" className="sidebar__menu-item">
          <History size={20} />
          {isOpen && <span>Historial</span>}
        </NavLink>
      </nav>

      <div className="sidebar__bottom">
        <button className="sidebar__bottom-logout">
          <Settings size={20} />
          {isOpen && <span>Configuracion</span>}
        </button>
        <button className="sidebar__bottom-logout">
          <HelpCircle size={20} />
          {isOpen && <span>Ayuda</span>}
        </button>
        <button className="sidebar__bottom-logout" onClick={handleLogout}>
          <LogOut size={20} />
          {isOpen && <span>Salir</span>}
        </button>
      </div>

      {showLogoutModal && (
        <div className="logout-overlay">
          <div className="logout-box">
            <div className="logout-icon">✓</div>
            <h3>Sesión cerrada</h3>
            <p>Has salido correctamente</p>
            <span>Redirigiendo...</span>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;