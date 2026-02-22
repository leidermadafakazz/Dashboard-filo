import type { PedidoEntrante } from "../../types/order.types";

type OrderCardProps = {
  pedido: PedidoEntrante;
  seleccionado: boolean;
  onSeleccionar: (pedido: PedidoEntrante) => void;
  onAceptar: (pedido: PedidoEntrante) => void;
  onCancelar: (pedidoId: number, codigoPedido: string) => void;
};

const OrderCard = ({
  pedido,
  seleccionado,
  onSeleccionar,
  onAceptar,
  onCancelar,
}: OrderCardProps) => {
  return (
    <article
      className={`tarjeta-pedido ${pedido.urgente ? "tarjeta-pedido-urgente" : ""} ${
        seleccionado ? "tarjeta-pedido-seleccionada" : ""
      }`}
      onClick={() => onSeleccionar(pedido)}
    >
      <div className="encabezado-pedido">
        <div>
          <h3>Pedido {pedido.codigo}</h3>
          <p className="cliente-pedido">Cliente: {pedido.cliente}</p>
        </div>
        <div className="contenedor-monto-pedido">
          <p className="monto-pedido">{pedido.monto}</p>
          <p className="metodo-pago-pedido">{pedido.metodoPago}</p>
        </div>
      </div>

      <ul className="items-pedido">
        {pedido.items.map((item) => (
          <li key={`${pedido.id}-${item.id}`}>{item.nombre}</li>
        ))}
      </ul>

      <div className="acciones-pedido">
        <button
          type="button"
          className="boton boton-primario"
          onClick={(evento) => {
            evento.stopPropagation();
            onAceptar(pedido);
          }}
          disabled={pedido.estado !== "pendiente"}
        >
          {pedido.estado === "pendiente" ? "Aceptar Pedido" : "Aceptado"}
        </button>
        <button
          type="button"
          className="boton boton-secundario"
          onClick={(evento) => {
            evento.stopPropagation();
            onCancelar(pedido.id, pedido.codigo);
          }}
          disabled={pedido.estado !== "pendiente"}
        >
          Cancelar
        </button>
      </div>
    </article>
  );
};

export default OrderCard;
