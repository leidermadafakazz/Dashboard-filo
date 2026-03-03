import type { IconType } from "react-icons";

export type EstadoPedido = "pendiente" | "preparando" | "listo" | "cancelado";

export type EstadoPaso = "completado" | "activo" | "pendiente";

export type ItemPedido = {
  id: number;
  nombre: string;
  cantidad?: number;
  detalles?: string | null;
};

export type PedidoEntrante = {
  id: number;
  codigo: string;
  pedidoId: string;
  comercioId: string;
  usuarioId: number;
  notaDirecion?: string | null;
  mensaje?: string | null;
  cliente: string;
  monto: string;
  montoValor: number;
  metodoPago: string;
  estadoSignalR?: string;
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
  pedidoExternoId: string;
  codigo: string;
  entregaEsperada: string;
  cliente: string;
  comercioId: string;
  usuarioId: number;
  notaDirecion?: string | null;
  mensaje?: string | null;
  metodoPago: string;
  monto: string;
  estadoSignalR?: string;
  items: ItemPedido[];
  repartidor: string;
  pasos: PasoProgreso[];
};

export type PedidoDataShape = {
  pedidosEntrantes: PedidoEntrante[];
  pedidoActivo: PedidoActivo;
  consejo: string;
};
