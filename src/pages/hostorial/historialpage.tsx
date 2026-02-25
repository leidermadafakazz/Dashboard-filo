import { useState } from "react";
import "../hostorial/historialPage.css";

type Filtro = "todo" | "hoy" | "venta" | "semana" | "Registro" | "Eliminacion";

const HistorialPage = () => {
  const [filtro, setFiltro] = useState<Filtro>("todo");

  const historial = [
    { id: 1, fecha: "2026-02-24", descripcion: "Venta de Pizza Hawaiana", monto: 35000, tipo: "venta" },
    { id: 2, fecha: "2026-02-23", descripcion: "Registro de producto", monto: 0, tipo: "registro" },
    { id: 3, fecha: "2026-02-22", descripcion: "Venta de Hamburguesa", monto: 50000, tipo: "venta" },
    { id: 4, fecha: "2026-02-18", descripcion: "Eliminación de producto", monto: 0, tipo: "eliminacion" },
  ];

  const hoy = new Date().toISOString().split("T")[0];
  const hace7Dias = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const historialFiltrado = historial.filter((item) => {
    if (filtro === "hoy") return item.fecha === hoy;
    if (filtro === "semana") return item.fecha >= hace7Dias;
    if (filtro === "Registro") return item.tipo === "registro";
    if (filtro === "Eliminacion") return item.tipo === "eliminacion";
    if (filtro === "venta") return item.tipo === "venta";
    return true;
  });

  const badgeColor: Record<string, string> = {
    venta: "#e8f5e9",
    registro: "#e3f2fd",
    eliminacion: "#fdecea",
  };

  const textColor: Record<string, string> = {
    venta: "#1b5e20",
    registro: "#0d47a1",
    eliminacion: "#b71c1c",
  };

  return (
    <section className="historial-page">
      <div className="historial-page__header">
        <div>
          <h1>Historial</h1>
          <p>Registro de actividad de tu tienda</p>
        </div>

        <div className="historial-page__filtros">
          <button
            className={`historial-filtro ${filtro === "todo" ? "active" : ""}`}
            onClick={() => setFiltro("todo")}
          >
            Todo
          </button>
          <button
            className={`historial-filtro ${filtro === "venta" ? "active" : ""}`}
            onClick={() => setFiltro("venta")}
          >
            Venta
          </button>
          <button
            className={`historial-filtro ${filtro === "hoy" ? "active" : ""}`}
            onClick={() => setFiltro("hoy")}
          >
            Hoy
          </button>
          <button
            className={`historial-filtro ${filtro === "semana" ? "active" : ""}`}
            onClick={() => setFiltro("semana")}
          >
            Esta semana
          </button>
          <button
            className={`historial-filtro ${filtro === "Registro" ? "active" : ""}`}
            onClick={() => setFiltro("Registro")}
          >
            Registro
          </button>
          <button
            className={`historial-filtro ${filtro === "Eliminacion" ? "active" : ""}`}
            onClick={() => setFiltro("Eliminacion")}
          >
            Eliminacion
          </button>
        </div>
      </div>

      <div className="historial-page__table-wrapper">
        <table className="historial-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>Descripción</th>
              <th>Tipo</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {historialFiltrado.length > 0 ? (
              historialFiltrado.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.fecha}</td>
                  <td>{item.descripcion}</td>
                  <td>
                    <span style={{
                      background: badgeColor[item.tipo],
                      color: textColor[item.tipo],
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}>
                      {item.tipo}
                    </span>
                  </td>
                  <td>{item.monto > 0 ? `$${item.monto.toLocaleString()}` : "—"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="historial-table__empty">
                  No hay registros para este período
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default HistorialPage;