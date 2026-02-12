import { NavLink } from "react-router-dom";
import "../styles/dashboard.css";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo">Filo</div>

            <div className="menu">
                <NavLink to="/dashboard" className="menu-item">
                    Dashboard
                </NavLink>

                <NavLink to="/productos" className="menu-item">
                    Productos
                </NavLink>
            </div>

            <div className="sidebar-bottom">
                <p>Configuración</p>
                <p>Ayuda</p>
                <p>Salir</p>
            </div>
        </div>
    );
};

export default Sidebar;