import type { IconType } from "react-icons";

export type EstadoPedido = "pendiente" | "preparando" | "listo" | "cancelado";

export type EstadoPaso = "completado" | "activo" | "pendiente";

export type ItemPedido = {
  id: number;
  nombre: string;
};

export type PedidoEntrante = {
  id: number;
  codigo: string;
  cliente: string;
  monto: string;
  metodoPago: string;
  items: ItemPedido[];
  urgente?: boolean;
  estado: EstadoPedido;
};

export type PasoProgreso = {
  id: number;
  etiqueta: string;
  icono: IconType;
  estado: EstadoPaso;
};

export type PedidoActivo = {
  pedidoId: number;
  codigo: string;
  entregaEsperada: string;
  cliente: string;
  repartidor: string;
  pasos: PasoProgreso[];
};

export type PedidoDataShape = {
  pedidosEntrantes: PedidoEntrante[];
  pedidoActivo: PedidoActivo;
  consejo: string;
};
