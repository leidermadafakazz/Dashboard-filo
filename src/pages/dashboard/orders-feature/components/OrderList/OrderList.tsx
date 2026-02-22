import OrderCard from "../OrderCard/OrderCard";
import type { PedidoEntrante } from "../../types/order.types";

type OrderListProps = {
  pedidos: PedidoEntrante[];
  pedidoActivoId: number;
  onSeleccionar: (pedido: PedidoEntrante) => void;
  onAceptar: (pedido: PedidoEntrante) => void;
  onCancelar: (pedidoId: number, codigoPedido: string) => void;
};

const OrderList = ({
  pedidos,
  pedidoActivoId,
  onSeleccionar,
  onAceptar,
  onCancelar,
}: OrderListProps) => {
  return (
    <div className="lista-pedidos">
      {pedidos.map((pedido) => (
        <OrderCard
          key={pedido.id}
          pedido={pedido}
          seleccionado={pedido.id === pedidoActivoId}
          onSeleccionar={onSeleccionar}
          onAceptar={onAceptar}
          onCancelar={onCancelar}
        />
      ))}
    </div>
  );
};

export default OrderList;
