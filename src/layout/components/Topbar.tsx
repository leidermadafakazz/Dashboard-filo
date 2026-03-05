import "./Topbar.css";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { user } = useAuth();

  const comercioNombre = user?.comercio?.nombre?.trim() || (user?.comercioId ? `Comercio ${user.comercioId}` : "Comercio sin registrar");
  const comercioUbicacion = [user?.comercio?.ciudad, user?.comercio?.direccion].filter(Boolean).join(" • ");
  const comercioEstado = user?.comercio ? (user.comercio.abierto ? "Abierto" : "Cerrado") : null;
  const displayName = [user?.nombre, user?.familyName].filter(Boolean).join(" ").trim() || user?.email || "Cuenta";

  return (
    <header className="topbar">
      <input className="topbar__search" type="text" placeholder="Buscar..." />

      <div className="topbar__identity">
        <div className="topbar__commerce">
          <span className="topbar__commerce-label">Comercio</span>
          <strong className="topbar__commerce-name">{comercioNombre}</strong>
          {comercioUbicacion && <span className="topbar__commerce-meta">{comercioUbicacion}</span>}
          {comercioEstado && (
            <span className={`topbar__commerce-status ${user?.comercio?.abierto ? "is-open" : "is-closed"}`}>
              {comercioEstado}
            </span>
          )}
        </div>

        <div className="topbar__profile" title={displayName}>
          {user?.pictureUrl ? (
            <img className="topbar__avatar topbar__avatar--image" src={user.pictureUrl} alt={displayName} />
          ) : (
            <div className="topbar__avatar" />
          )}
          <span className="topbar__profile-name">{displayName}</span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
