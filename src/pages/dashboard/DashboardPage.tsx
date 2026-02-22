import "./DashboardPage.css";
import OrderList from "./orders-feature/components/OrderList/OrderList";
import OrderProgress from "./orders-feature/components/OrderProgress/OrderProgress";
import { useOrders } from "./orders-feature/hooks/useOrders";

const DashboardPage = () => {
  const {
    consejo,
    cantidadPendientes,
    indicePasoActivo,
    pedidoActivo,
    pedidosVisibles,
    aceptarPedido,
    cancelarPedido,
    marcarPedidoListo,
    seleccionarPedido,
  } = useOrders();

  return (
    <section className="pagina-dashboard">
      <div className="contenedor-dashboard">
        <div className="rejilla-contenido">
          <section className="panel">
            <div className="encabezado-panel">
              <h2>Nuevos Pedidos</h2>
              <span className="insignia">{cantidadPendientes} Pendientes</span>
            </div>

            <OrderList
              pedidos={pedidosVisibles}
              pedidoActivoId={pedidoActivo?.pedidoId ?? -1}
              onSeleccionar={seleccionarPedido}
              onAceptar={aceptarPedido}
              onCancelar={cancelarPedido}
            />
          </section>

          <section className="panel">
            <div className="encabezado-panel">
              <h2>Progreso del Pedido Activo</h2>
            </div>

            <OrderProgress
              pedidoActivo={pedidoActivo}
              indicePasoActivo={indicePasoActivo}
              consejo={consejo}
              onMarcarListo={marcarPedidoListo}
            />
          </section>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
