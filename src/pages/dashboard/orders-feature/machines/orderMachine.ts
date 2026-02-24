import { FaUtensils, FaMotorcycle, FaCheck } from "react-icons/fa";
import type {
  EstadoPedido,
  PasoProgreso,
  PedidoActivo,
  PedidoEntrante,
} from "../types/order.types";
const pasosBase = [
  { id: 1, etiqueta: "Pedido Aceptado", icono: FaCheck }, 
  { id: 2, etiqueta: "Preparando Pedido", icono: FaUtensils },
  { id: 3, etiqueta: "Pedido Enviado", icono: FaMotorcycle },
] satisfies Omit<PasoProgreso, "estado">[];
export const construirPasos = (pasoActivo:number): PasoProgreso[] => 
  pasosBase.map((paso) => ({ ...paso, estado: paso.id <= pasoActivo ? "completado" : "pendiente" }));

export const construirPasosPorEstado = (estado: EstadoPedido): PasoProgreso[] => {
  if (estado === "listo") {
    return construirPasos(3);
  }

  if (estado === "preparando") {
    return construirPasos(2); 
  }

  return construirPasos(1);
};

export const construirPedidoActivoDesdePedido = (
  pedido: PedidoEntrante,
  repartidor: string,
): PedidoActivo => ({
  pedidoId: pedido.id,
  codigo: pedido.codigo,
  entregaEsperada: "12:45 PM",
  cliente: pedido.cliente,
  repartidor,
  pasos: construirPasosPorEstado(pedido.estado),
});
