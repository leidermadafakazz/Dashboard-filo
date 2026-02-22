import type {
  EstadoPedido,
  PasoProgreso,
  PedidoActivo,
  PedidoEntrante,
} from "../types/order.types";

export const construirPasosPreparando = (): PasoProgreso[] => [
  { id: 1, etiqueta: "Pedido Aceptado", icono: "✓", estado: "completado" },
  { id: 2, etiqueta: "Preparando Pedido", icono: "🍳", estado: "activo" },
  { id: 3, etiqueta: "Pedido Enviado", icono: "🛵", estado: "pendiente" },
];

export const construirPasosPendiente = (): PasoProgreso[] => [
  { id: 1, etiqueta: "Pedido Aceptado", icono: "✓", estado: "activo" },
  { id: 2, etiqueta: "Preparando Pedido", icono: "🍳", estado: "pendiente" },
  { id: 3, etiqueta: "Pedido Enviado", icono: "🛵", estado: "pendiente" },
];

export const construirPasosListo = (): PasoProgreso[] => [
  { id: 1, etiqueta: "Pedido Aceptado", icono: "✓", estado: "completado" },
  { id: 2, etiqueta: "Preparando Pedido", icono: "🍳", estado: "completado" },
  { id: 3, etiqueta: "Pedido Enviado", icono: "🛵", estado: "activo" },
];

export const construirPasosPorEstado = (estado: EstadoPedido): PasoProgreso[] => {
  if (estado === "listo") {
    return construirPasosListo();
  }

  if (estado === "preparando") {
    return construirPasosPreparando();
  }

  return construirPasosPendiente();
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
