import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./ConfiguracionPage.css";

const ConfiguracionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const comercio = user?.comercio;
  const categorias = comercio?.categorias?.join(", ");
  const nombreCompleto = [user?.nombre, user?.familyName].filter(Boolean).join(" ").trim();

  return (
    <section className="config-page">
      <header className="config-page__header">
        <h1>Configuracion del comercio</h1>
        <p>Prioriza los datos operativos del negocio para gestionar el dashboard.</p>
      </header>

      <article className="config-card config-card--primary">
        <h2>Comercio</h2>

        <div className="config-grid">
          <div>
            <span className="config-label">Nombre</span>
            <strong>{comercio?.nombre || "Sin nombre configurado"}</strong>
          </div>
          <div>
            <span className="config-label">ID comercio</span>
            <strong>{user?.comercioId || "No asignado"}</strong>
          </div>
          <div>
            <span className="config-label">Estado</span>
            <strong>{comercio ? (comercio.abierto ? "Abierto" : "Cerrado") : "No disponible"}</strong>
          </div>
          <div>
            <span className="config-label">Calificacion</span>
            <strong>{comercio?.calificacion ?? 0}</strong>
          </div>
          <div>
            <span className="config-label">Ciudad</span>
            <strong>{comercio?.ciudad || "No registrada"}</strong>
          </div>
          <div>
            <span className="config-label">Telefono</span>
            <strong>{comercio?.telefono || "No registrado"}</strong>
          </div>
          <div className="config-grid__full">
            <span className="config-label">Direccion</span>
            <strong>{comercio?.direccion || "No registrada"}</strong>
          </div>
          <div className="config-grid__full">
            <span className="config-label">Categorias</span>
            <strong>{categorias || "Sin categorias"}</strong>
          </div>
        </div>

        {!user?.comercioId && (
          <button className="config-action" onClick={() => navigate("/registre")}>
            Completar datos de comercio
          </button>
        )}
      </article>

      <article className="config-card">
        <h2>Usuario</h2>
        <div className="config-grid">
          <div>
            <span className="config-label">Nombre</span>
            <strong>{nombreCompleto || "No disponible"}</strong>
          </div>
          <div>
            <span className="config-label">Email</span>
            <strong>{user?.email || "No disponible"}</strong>
          </div>
          <div>
            <span className="config-label">Username</span>
            <strong>{user?.username || "No disponible"}</strong>
          </div>
          <div>
            <span className="config-label">ID usuario</span>
            <strong>{user?.id ?? "No disponible"}</strong>
          </div>
        </div>
      </article>
    </section>
  );
};

export default ConfiguracionPage;
